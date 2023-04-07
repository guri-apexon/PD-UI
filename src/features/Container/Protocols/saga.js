import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import FileDownload from 'js-file-download';
import {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
  setSectionDetails,
  getProtocolTocData,
  setSectionLoader,
  getFileStream,
  getRightBladeValue,
  getTOCActive,
  setAccordianMetaData,
  setAccordianMetaParam,
  getMetadataApiCall,
  getEnrichedValue,
  updateSectionResp,
  TOCActive,
  setSOAData,
  getSectionIndex,
  getLabData,
  updateGetLabData,
  // eslint-disable-next-line import/named
  deleteGetLabData,
  createGetLabData,
  setLoader,
  resetSectionData,
  setSectionLockDetails,
  setEnrichedWord,
  getDipaViewData,
  getAllDipaViewData,
} from './protocolSlice';
import BASE_URL, { httpCall, BASE_URL_8000, Apis } from '../../../utils/api';
import { PROTOCOL_RIGHT_MENU } from './Constant/Constants';
import { flattenObject, mergeSummary } from './MetaData/utilFunction';

const jsonContentHeader = { 'Content-Type': 'application/json' };

function* getUserId() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
}

function* getUserType() {
  const state = yield select();
  const userType = state.user.userDetail.user_type;
  return userType;
}

export function* getSummaryData(action) {
  const obj = {
    loading: true,
    success: false,
    data: null,
  };
  yield put(getRightBladeValue(PROTOCOL_RIGHT_MENU.HOME));
  yield put(getSummary(obj));

  const userId = yield getUserId();
  const url = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}&docId=${action.payload}`;

  const resp = yield call(httpCall, { url, method: 'GET' });
  if (resp.data && resp.data.length) {
    const obj = {
      loading: false,
      success: true,
      data: resp.data[0],
    };
    yield put(getSummary(obj));
    yield put({
      type: 'FETCH_ASSOCIATE_PROTOCOLS',
      payload: resp.data[0].protocol,
    });
  } else {
    const obj = {
      loading: false,
      success: true,
      data: null,
    };
    yield put(getSummary(obj));
  }
}

export function parsedData(data) {
  return JSON.parse(JSON.parse(data));
}

export function captalize(data) {
  return data
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}
/* eslint-disable */
export function getTocSections(toc) {
  const sectionList = [];
  const list = [];
  toc.data.map((item) => {
    let file_section_level = item[8].toString();
    const type = item[2];
    if (!file_section_level && type === 'header') {
      file_section_level = '1';
    }
    const level_1_CPT_section = captalize(item[6]);
    const section_num = item[7];

    if (
      (section_num &&
        file_section_level === '1' &&
        level_1_CPT_section !== 'Unmapped' &&
        !sectionList.includes(level_1_CPT_section)) ||
      (type === 'header' &&
        file_section_level === '1' &&
        level_1_CPT_section !== 'Unmapped' &&
        !sectionList.includes(level_1_CPT_section))
    ) {
      list.push({
        section: `${section_num} ${level_1_CPT_section}`,
        id: `TOC-${item[9]}`,
      });
      sectionList.push(level_1_CPT_section);
    }
    return item;
  });
  return list;
}
/* eslint-enable */
export function getSoaSections(soa) {
  const list = [];
  soa.map((item) => {
    const { TableIndex } = item;
    const { TableName } = item;
    list.push({
      section: `${TableName}`,
      id: `SOA-${TableIndex}`,
    });
    return item;
  });
  return list;
}

export function* getProtocolToc(action) {
  const viewData = {
    iqvdataSoa: null,
    iqvdataSummary: null,
    iqvdataToc: null,
    loader: true,
    tocSections: null,
    soaSections: null,
    err: null,
  };
  const userId = yield getUserId();
  yield put(getProcotoclToc(viewData));
  let URL = '';
  if (action.payload.user === 'qc') {
    URL = `${BASE_URL_8000}/api/protocol_qcdata/?id=${action.payload.id}`;
  } else {
    URL = `${BASE_URL_8000}/api/${action.payload.endPoint}?aidoc_id=${action.payload.id}&user=${action.payload.user}&userId=${userId}&protocol=${action.payload.protocol}`;
  }

  const config = {
    url: URL,
    method: 'GET',
  };
  try {
    const data = yield call(httpCall, config);
    if (data.success && data.data) {
      const toc = parsedData(data.data.iqvdataToc);
      const soa = parsedData(data.data.iqvdataSoa);
      const viewData = {
        iqvdataSoa: soa,
        iqvdataSummary: parsedData(data.data.iqvdataSummary),
        iqvdataToc: toc,
        loader: false,
        tocSections: getTocSections(toc),
        soaSections: getSoaSections(soa),
        err: null,
        download: data.data,
      };
      yield put(getProcotoclToc(viewData));
    } else {
      const viewData = {
        iqvdataSoa: null,
        iqvdataSummary: null,
        iqvdataToc: null,
        loader: false,
        tocSections: null,
        soaSections: null,
        err: 'No data found',
      };
      yield put(getProcotoclToc(viewData));
    }
  } catch (err) {
    const viewData = {
      iqvdataSoa: null,
      iqvdataSummary: null,
      iqvdataToc: null,
      loader: false,
      tocSections: null,
      soaSections: null,
      err: 'No data found',
    };
    yield put(getProcotoclToc(viewData));
  }
}

export function* fetchAssociateProtocol(action) {
  const userId = yield getUserId();
  const URL = `${BASE_URL_8000}/api/Related_protocols/?protocol=${action.payload}&userId=${userId}`;
  const config = {
    url: URL,
    method: 'GET',
  };
  const associateDocs = yield call(httpCall, config);
  if (associateDocs.success) {
    yield put(getAssociateDocuments(associateDocs.data));
  } else {
    yield put(getAssociateDocuments([]));
  }
}

function* getState(withPrefix) {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return withPrefix ? id : id.substring(1);
}

export function* updateSectionData(action) {
  try {
    const {
      payload: { reqBody },
    } = action;
    const userID = yield getState();
    const updatedReq = reqBody.map((ele) => {
      if (ele.type === 'table') {
        return {
          ...ele,
          audit: {
            last_updated_user: userID,
          },
        };
      }
      return ele;
    });
    const config = {
      url: `${BASE_URL_8000}${Apis.SAVE_SECTION_CONTENT}`,
      method: 'POST',
      data: updatedReq,
    };
    const sectionSaveRes = yield call(httpCall, config);

    if (sectionSaveRes?.data?.success) {
      if (action?.payload?.refreshToc) {
        yield put({
          type: 'GET_PROTOCOL_TOC_DATA',
          payload: {
            docId: action?.payload?.docId,
            tocFlag: 1,
          },
        });
      } else {
        yield put(updateSectionResp({ response: sectionSaveRes.data }));
        toast.success('Section content updated successfully');
      }
    } else {
      yield put(
        updateSectionResp({ response: sectionSaveRes.data, error: true }),
      );
      toast.error(sectionSaveRes.data.message || 'Something Went Wrong');
    }
  } catch (error) {
    updateSectionResp({ response: null, error: true });
    toast.error('Something Went Wrong');
  }
}

export function* handleConfigurableAPI(action) {
  const { docId, protocol, linkId, linkLevel, sectionText, configVariable } =
    action.payload;
  let apiURL = `${BASE_URL}${Apis.API_CONFIGURABLE}?aidoc_id=${docId}`;
  if (protocol) {
    apiURL += `&protocol=${protocol}`;
  }
  if (linkId) {
    apiURL += `&link_id=${linkId}`;
  }
  if (linkLevel) {
    apiURL += `&link_level=${linkLevel}`;
  } else {
    apiURL += '&link_level=1';
  }

  if (sectionText) {
    apiURL += `&section_text=${sectionText}`;
  }

  if (configVariable) {
    apiURL += `&config_variable=${configVariable.toString()}`;
  }

  const userId = yield getUserId();
  apiURL += `&user_id=${userId}`;

  const config = {
    url: apiURL,
    method: 'GET',
    checkAuth: true,
    headers: jsonContentHeader,
  };

  try {
    yield put(
      setSectionDetails({
        protocol,
        data: [],
        linkId,
      }),
    );
    const sectionDetails = yield call(httpCall, config);
    yield put(setSectionLoader(false));
    yield put(
      setSectionDetails({
        protocol: action.payload.protocol,
        data: sectionDetails.data[0],
        linkId: action.payload.linkId,
      }),
    );
  } catch (error) {
    console.log('No Access');
  }
}

export function* getCompareResult(action) {
  if (action.payload) {
    yield put(
      getCompare({
        iqvdata: '',
        loading: true,
        called: true,
        error: false,
        message: '',
      }),
    );
    // const url = `${BASE_URL_8000}/api/document_compare/?id1=${action.payload.docID}&id2=${action.payload.docID2}`;
    const url = '/compareWithSection.json';
    const resp = yield call(httpCall, { url, method: 'GET' });

    if (resp.data) {
      const temp = cloneDeep(resp.data);
      temp.loading = false;
      temp.called = true;
      yield put(getCompare(temp));
    } else {
      const temp = {
        iqvdata: '',
        loading: false,
        called: false,
        error: true,
        message: 'Comparison is Under Process.',
      };
      yield put(getCompare(temp));
    }
  } else {
    yield put(
      getCompare({
        iqvdata: '',
        loading: false,
        called: false,
        error: false,
        message: '',
      }),
    );
  }
}

export function* getProtocolTocDataResult(action) {
  const {
    payload: { docId },
  } = action;
  const userId = yield getState();
  const URL = `${BASE_URL}${Apis.API_CONFIGURABLE}?aidoc_id=${docId}&user_id=${userId}&link_level=6&toc=1`;
  const config = {
    url: URL,
    method: 'GET',
    checkAuth: true,
    headers: jsonContentHeader,
  };

  try {
    const result = yield call(httpCall, config);

    if (result.success) {
      const header = {
        success: true,
        data: result.data[0],
      };
      const tocIsactive = Array(header.data.length).fill(false);
      yield put(getTOCActive(tocIsactive));
      yield put(getProtocolTocData(header));
    } else {
      // eslint-disable-next-line no-lonely-if
      yield put(
        getProtocolTocData({
          success: false,
          data: [],
          errorMsg:
            result?.err?.data?.message ||
            'This document is not available in our database',
        }),
      );
    }
  } catch (error) {
    yield put(
      getProtocolTocData({
        success: false,
        data: [],
        errorMsg: 'This document is not available in our database',
      }),
    );
  }
}

export function* fetchFileStream(action) {
  const preLoadingState = {
    loader: true,
    success: false,
    error: '',
    data: null,
  };
  yield put(getFileStream(preLoadingState));
  const userType = yield getUserType();
  let userId = 'qc';
  if (userType !== 'QC1') {
    userId = yield getUserId();
  }
  const { name, dfsPath, fileName, isDownlod } = action.payload;
  const apiBaseUrl = BASE_URL_8000;
  const config = {
    url: `${apiBaseUrl}${Apis.DOWNLOAD_API}/?filePath=${encodeURIComponent(
      dfsPath,
    )}&userId=${userId}&protocol=${name}`,
    method: 'GET',
    responseType: 'blob',
  };
  try {
    const { data } = yield call(httpCall, config);
    const file = new Blob([data], { type: 'application/pdf' });
    const successState = {
      loader: false,
      success: true,
      error: '',
      data: file,
    };
    if (isDownlod) {
      FileDownload(file, fileName);
    } else {
      yield put(getFileStream(successState));
    }
  } catch (error) {
    const errorState = {
      loader: false,
      success: false,
      error: 'Error',
      data: null,
    };
    yield put(getFileStream(errorState));
    toast.error('File not found');
  }
}

export function* MetaDataVariable(action) {
  const {
    payload: { op, docId },
  } = action;
  const config = {
    url: `${BASE_URL}${Apis.METADATA}/meta_data_summary?op=${op}&aidocId=${docId}`,
    method: 'GET',
    checkAuth: true,
    headers: jsonContentHeader,
  };
  const MetaData = yield call(httpCall, config);
  if (MetaData.success) {
    if (op === 'metadata') {
      const updatedData = {};
      const result = flattenObject(updatedData, MetaData?.data?.data, 1, '');
      const updateResultForSummary = mergeSummary(result);
      yield put(setAccordianMetaData(updateResultForSummary));
    } else {
      yield put(setAccordianMetaParam(MetaData?.data?.data));
    }
  } else if (op === 'metadata') {
    yield put(setAccordianMetaData({}));
  } else {
    yield put(setAccordianMetaParam({}));
  }
}

export function* addMetaDataAttributes(action) {
  const {
    payload: { reqData, docId, fieldName, attributes },
  } = action;
  const config = {
    url: `${BASE_URL}${Apis.METADATA}/add_update_meta_data`,
    method: 'POST',
    checkAuth: true,
    headers: jsonContentHeader,
    data: {
      aidocId: docId,
      fieldName,
      attributes,
    },
  };
  const MetaData = yield call(httpCall, config);
  if (MetaData?.data?.isAdded) {
    toast.info('Protocol Attributes Updated Successfully');
    yield put(
      getMetadataApiCall({
        status: true,
        reqData,
        op: 'addAttributes',
      }),
    );
  } else {
    toast.error('Protocol Attributes Not Added');
    yield put(
      getMetadataApiCall({
        status: false,
        reqData,
        op: 'addAttributes',
      }),
    );
  }
}

export function* addMetaDataField(action) {
  const {
    payload: { op, docId, fieldName, attributes, reqData },
  } = action;
  const config = {
    url: `${BASE_URL}${Apis.METADATA}/add_meta_data`,
    method: 'PUT',
    checkAuth: true,
    headers: jsonContentHeader,
    data: {
      op,
      aidocId: docId,
      fieldName,
      attributes,
    },
  };
  const MetaData = yield call(httpCall, config);
  if (MetaData?.data?.isAdded) {
    toast.info(`${reqData.name} added successfully`);
    yield put(
      getMetadataApiCall({
        status: true,
        reqData,
        op,
      }),
    );
  } else {
    toast.error(`${reqData.name} already added`);
    yield put(
      getMetadataApiCall({
        status: false,
        reqData,
        op,
      }),
    );
  }
}

export function* deleteAttribute(action) {
  const {
    payload: { op, docId, fieldName, attributeNames, reqData },
  } = action;
  const config = {
    url: `${BASE_URL}${Apis.METADATA}/delete_meta_data`,
    method: 'DELETE',
    checkAuth: true,
    headers: jsonContentHeader,
    data: {
      op,
      aidocId: docId,
      fieldName,
      attributeNames,
    },
  };
  const data = yield call(httpCall, config);
  if (data?.data?.isDeleted) {
    yield put(
      getMetadataApiCall({
        status: true,
        reqData,
        op,
        attributeNames,
      }),
    );
    if (op === 'deleteField') {
      toast.info(`${reqData.accData.name} successfully deleted`);
    } else {
      toast.info('attributes successfully deleted');
    }
  } else if (!data.success) {
    if (op === 'deleteField') {
      yield put(
        getMetadataApiCall({
          status: false,
          reqData,
          op,
        }),
      );
      toast.info(`${reqData?.accData?.name} not deleted`);
    } else {
      toast.info('attributes not deleted');
    }
  }
}

export function* RightBladeValue(action) {
  if (action.payload.name === PROTOCOL_RIGHT_MENU.HOME) {
    const TocActiveList = yield select(TOCActive);
    const TocFalse = new Array(TocActiveList.length).fill(false);
    yield put(getTOCActive(TocFalse));
  }
  yield put(getRightBladeValue(action.payload.name));
}

export function* setTOCActive(action) {
  yield put(getTOCActive(action.payload.data));
}

export function* setEnrichedAPI(action) {
  const {
    payload: { flag },
  } = action;
  yield put(getEnrichedValue(flag));
}

export function* saveEnrichedAPI(action) {
  const {
    payload: { docId, linkId, data, opType },
  } = action;
  let url = `${BASE_URL_8000}${Apis.ENRICHED_CONTENT}?doc_id=${docId}&link_id=${linkId}`;
  if (opType) url = `${url}&operation_type=${opType}`;
  const config = {
    url,
    method: 'POST',
    data: {
      data,
    },
  };
  const enrichedData = yield call(httpCall, config);

  if (enrichedData?.success) {
    toast.info('Enriched Data Updated');
    yield put({
      type: 'GET_ENRICHED_API',
      payload: { flag: true },
    });
  } else {
    toast.error('Error While Updation');
  }
}

export function* getSOAData(action) {
  const {
    payload: { docId, operationValue },
  } = action;

  const params = `?operationValue=${operationValue}&id=${docId}`;
  const config = {
    url: `${BASE_URL}${Apis.METADATA}/protocol_normalized_soa${params}`,
    method: 'GET',
    headers: { 'X-API-KEY': 'ypd_unit_test:!53*URTa$k1j4t^h2~uSseatnai@nr' },
  };
  yield put(setLoader(true));
  const enrichedData = yield call(httpCall, config);
  if (enrichedData?.success) {
    yield put(setLoader(false));
    yield put(setSOAData(enrichedData.data));
  } else {
    yield put(setLoader(false));
    yield put(setSOAData({}));
    toast.error('Error While Updation');
  }
}

export function* soaUpdateDetails({ data, method }) {
  const config = {
    url: `${BASE_URL}${Apis.METADATA}/protocol_normalized_soa`,
    method,
    headers: { 'X-API-KEY': 'ypd_unit_test:!53*URTa$k1j4t^h2~uSseatnai@nr' },
    data,
  };

  yield call(httpCall, config);
}

export function* setSectionIndex(action) {
  yield put(getSectionIndex(action.payload.index));
}

export function* getenrichedword(action) {
  yield put(
    setEnrichedWord({ word: action.payload.word, modal: action.payload.modal }),
  );
}

export function* setResetSectionData() {
  yield put(resetSectionData());
}

export function* getSectionLockDetails(action) {
  yield put(setSectionLockDetails({}));
  const userId = yield getState(true);
  const config = {
    url: `${BASE_URL_8000}${Apis.SECTION_LOCK}/get_section_lock?doc_id=${action.payload.doc_id}&userId=${userId}&link_id=${action.payload.link_id}`,
    method: 'GET',
  };
  const sectionLockDetails = yield call(httpCall, config);

  if (sectionLockDetails.success) {
    yield put(setSectionLockDetails(sectionLockDetails?.data?.info));
  }
}
export function* updateSectionLockDetails(action) {
  const {
    payload: { docId, linkId, sectionLock },
  } = action;
  const userId = yield getState(true);
  const config = {
    url: `${BASE_URL_8000}${Apis.SECTION_LOCK}/put_section_lock`,
    method: 'PUT',
    data: {
      doc_id: docId,
      link_id: linkId,
      section_lock: sectionLock,
      userId,
    },
  };
  const sectionLockDetails = yield call(httpCall, config);

  if (sectionLockDetails.success) {
    yield put(setSectionLockDetails({}));
  }
}
export function* setResetQCData() {
  yield put(getSummary({}));
  yield put(getProtocolTocData({}));
  yield put(resetSectionData());
}

export function* LabData(action) {
  const {
    payload: { docId },
  } = action;

  const config = {
    url: `${BASE_URL_8000}${Apis.LAB_DATA}/?aidoc_id=${docId}`,

    method: 'GET',
  };

  const labData = yield call(httpCall, config);

  const successState = {
    data: labData.data,
  };

  if (labData.success) {
    yield put(getLabData(successState));
  } else {
    yield put(getLabData({ data: [] }));
  }
}

export function* UpdateLabData(action) {
  const {
    payload: { data },
  } = action;
  const config = {
    url: `${BASE_URL_8000}${Apis.UPDATE_LAB_DATA}`,
    method: 'POST',
    data: {
      data,
    },
  };
  const labData = yield call(httpCall, config);
  if (labData?.success) {
    toast.info('Lab Data Updated');
    yield put(updateGetLabData(labData));
  } else {
    toast.error('Error While Updation');
  }
}

export function* DeleteLabData(action) {
  const {
    payload: { data },
  } = action;
  const config = {
    url: `${BASE_URL_8000}${Apis.DELETE_LAB_DATA}`,
    method: 'POST',
    data: {
      data,
    },
  };
  const labData = yield call(httpCall, config);
  if (labData.success) {
    yield put(deleteGetLabData(labData));
    toast.info('Lab Data row deleted');
  } else {
    toast.error('Error While deleting');
  }
}

export function* CreateLabData(action) {
  const {
    payload: { data },
  } = action;
  const config = {
    url: `${BASE_URL_8000}${Apis.CREATE_LAB_DATA}`,
    method: 'POST',
    data: {
      data,
    },
  };
  const labData = yield call(httpCall, config);
  if (labData?.success) {
    yield put(createGetLabData(labData));
    toast.info('Lab Data row created');
  } else {
    toast.error('Error While creating');
  }
}

export function* getDipaViewDataById(action) {
  const {
    payload: { docId },
  } = action;
  const params = `?doc_id=${docId}`;
  const config = {
    method: 'get',
    url: `${BASE_URL}${Apis.METADATA}/get_dipadata_by_doc_id${params}`,
    checkAuth: true,
    headers: { 'Content-Type': 'application/json' },
  };

  const DipaView = yield call(httpCall, config);

  if (DipaView.success) {
    yield put(getDipaViewData(DipaView));
  } else {
    yield put(getDipaViewData({ success: false, data: [] }));
  }

  yield call(httpCall, config);
}

export function* getAllDipaViewDataByCategory(action) {
  const {
    payload: { data },
  } = action;

  const config = {
    method: 'get',
    url: `${BASE_URL}${Apis.METADATA}/get_dipadata_by_category`,
    params: data,
    checkAuth: true,
    headers: { 'Content-Type': 'application/json' },
  };

  const DipaView = yield call(httpCall, config);

  if (DipaView.success) {
    yield put(getAllDipaViewData(DipaView));
  } else {
    yield put(getAllDipaViewData({ success: false, data: [] }));
  }

  yield call(httpCall, config);
}

export function* updateDipaData(action) {
  const {
    payload: { data },
  } = action;
  const config = {
    method: 'PUT',
    url: `${BASE_URL}${Apis.METADATA}/update_dipa_data`,
    data,
    checkAuth: true,
    headers: { 'Content-Type': 'application/json' },
  };
  const DipaData = yield call(httpCall, config);

  if (DipaData?.success) {
    toast.info(' Data Updated');
    yield put({
      type: 'GET_ALL_DIPA_VIEW',
      payload: {
        data: {
          category: data.category,
          doc_id: data.doc_id,
          id: data.id,
        },
      },
    });
  } else {
    toast.error('Error While Updation');
  }
}

function* watchProtocolAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery('GET_PROTOCOL_SUMMARY', getSummaryData);
  yield takeLatest('GET_PROTOCOL_TOC_SAGA', getProtocolToc);
  yield takeLatest('FETCH_ASSOCIATE_PROTOCOLS', fetchAssociateProtocol);
  yield takeEvery('POST_COMPARE_PROTOCOL', getCompareResult);
}

function* watchProtocolViews() {
  yield takeEvery('GET_SECTION_LIST', handleConfigurableAPI);
  yield takeEvery('GET_FILE_STREAM', fetchFileStream);
  yield takeEvery('GET_PROTOCOL_TOC_DATA', getProtocolTocDataResult);
  yield takeEvery('GET_METADATA_VARIABLE', MetaDataVariable);
  yield takeEvery('GET_RIGHT_BLADE', RightBladeValue);
  yield takeEvery('SET_TOC_Active', setTOCActive);
  yield takeEvery('ADD_METADATA_ATTRIBUTES', addMetaDataAttributes);
  yield takeEvery('ADD_METADATA_FIELD', addMetaDataField);
  yield takeEvery('DELETE_METADATA', deleteAttribute);
  yield takeEvery('SAVE_ENRICHED_DATA', saveEnrichedAPI);
  yield takeEvery('GET_ENRICHED_API', setEnrichedAPI);
  yield takeLatest('GET_SOA_DATA', getSOAData);
  yield takeEvery('ADD_SECTION_INDEX', setSectionIndex);
  yield takeEvery('UPDATE_SECTION_DATA', updateSectionData);
  yield takeEvery('GET_LAB_DATA', LabData);
  yield takeEvery('UPDATE_LAB_DATA', UpdateLabData);
  yield takeEvery('DELETE_LAB_DATA', DeleteLabData);
  yield takeEvery('CREATE_LAB_DATA', CreateLabData);
  yield takeEvery('SET_ENRICHED_WORD', getenrichedword);
  yield takeLatest('SOA_UPDATE_DETAILS', soaUpdateDetails);
  yield takeLatest('RESET_SECTION_DATA', setResetSectionData);
  yield takeLatest('GET_SECTION_LOCK', getSectionLockDetails);
  yield takeLatest('SET_SECTION_LOCK', updateSectionLockDetails);
  yield takeLatest('RESET_QC_DATA', setResetQCData);
  yield takeEvery('GET_DIPA_VIEW', getDipaViewDataById);
  yield takeEvery('GET_ALL_DIPA_VIEW', getAllDipaViewDataByCategory);
  yield takeEvery('UPDATE_DIPA_VIEW', updateDipaData);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchProtocolAsync(), watchProtocolViews()]);
}
