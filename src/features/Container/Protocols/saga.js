import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  select,
} from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';

import {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
  getHeaderList,
  setSectionDetails,
  getProtocolTocData,
  setSectionLoader,
  getFileStream,
  getRightBladeValue,
  getMetaDataVariable,
  getTOCActive,
} from './protocolSlice';
import { httpCall, BASE_URL_8000, Apis } from '../../../utils/api';
import { PROTOCOL_RIGHT_MENU } from './Constant/Constants';

function* getUserId() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
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
      section_num &&
      file_section_level === '1' &&
      level_1_CPT_section !== 'Unmapped' &&
      !sectionList.includes(level_1_CPT_section)
    ) {
      list.push({
        section: `${section_num} ${level_1_CPT_section}`,
        id: `TOC-${item[9]}`,
      });
      sectionList.push(level_1_CPT_section);
    } else if (
      type === 'header' &&
      file_section_level === '1' &&
      level_1_CPT_section !== 'Unmapped' &&
      !sectionList.includes(level_1_CPT_section)
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
  // const sectionList = [];
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
  //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
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
export function* fetchSectionHeaderList(action) {
  const {
    payload: { docId },
  } = action;
  yield put(getHeaderList({}));
  const URL = `${BASE_URL_8000}${Apis.HEADER_LIST}/?aidoc_id=${docId}&link_level=1&toc=0`;
  const config = {
    url: URL,
    method: 'GET',
  };
  const header = yield call(httpCall, config);
  if (header.success) {
    if (!header.data?.length) {
      toast.error(header.message);
    }
    yield put(getHeaderList(header));
  } else {
    yield put(getHeaderList({ success: false, data: [] }));
    toast.error('Something Went Wrong');
  }
}
function* getState() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
}
export function* getSectionList(action) {
  const userId = yield getState();
  const config = {
    url: `${BASE_URL_8000}${Apis.GET_SECTION_CONTENT}?aidoc_id=${action.payload.docId}&link_level=1&userId=${userId}&protocol=${action.payload.protocol}&user=user&link_id=${action.payload.linkId}`,
    method: 'GET',
  };
  const sectionDetails = yield call(httpCall, config);
  yield put(setSectionLoader(false));

  if (sectionDetails.success) {
    yield put(
      setSectionDetails({
        protocol: action.payload.protocol,
        data: sectionDetails.data,
        linkId: action.payload.linkId,
      }),
    );
  } else if (sectionDetails.message === 'No Access') {
    console.log('No Access');
  } else {
    console.log('Error while loading');
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
  yield put(getHeaderList({}));

  const linkLevel = action.payload.tocFlag ? 6 : 1;
  const URL = `${BASE_URL_8000}${Apis.HEADER_LIST}/?aidoc_id=${docId}&link_level=${linkLevel}&toc=${action.payload.tocFlag}`;
  const config = {
    url: URL,
    method: 'GET',
  };

  const header = yield call(httpCall, config);
  if (header.success) {
    if (action.payload.tocFlag === 1) {
      if (header?.data?.status === 204) {
        header.data = [];
      }
      const tocIsactive = [];
      for (let i = 0; i < header.data.length; i++) {
        tocIsactive.push(false);
      }
      yield put(getTOCActive(tocIsactive));
      yield put(getProtocolTocData(header));
    } else {
      yield put(getHeaderList(header));
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (!action.payload.tocFlag) {
      yield put(
        getProtocolTocData({
          success: false,
          data: [],
          errorMsg:
            header?.err?.data?.message ||
            'This document is not available in our database',
        }),
      );
    } else {
      yield put(
        getHeaderList({
          success: false,
          data: [],
          errorMsg:
            header?.err?.data?.message ||
            'This document is not available in our database',
        }),
      );
    }
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

  const userId = yield getUserId();
  const { name, dfsPath } = action.payload;
  const apiBaseUrl = BASE_URL_8000; // 'https://dev-protocoldigitalization-api.work.iqvia.com';
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
    yield put(getFileStream(successState));
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

export function* MetaDataVariable() {
  const config = {
    url: '/mockMetaData.json',
    method: 'GET',
  };

  const MetaData = yield call(httpCall, config);

  if (MetaData.success) {
    yield put(getMetaDataVariable(MetaData));
  } else {
    yield put(getMetaDataVariable({ success: false, data: [] }));
  }
}

export function* RightBladeValue(action) {
  yield put(getRightBladeValue(action.payload.name));
}

export function* setTOCActive(action) {
  yield put(getTOCActive(action.payload.data));
}

function* watchProtocolAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery('GET_PROTOCOL_SUMMARY', getSummaryData);
  yield takeLatest('GET_PROTOCOL_TOC_SAGA', getProtocolToc);
  yield takeLatest('FETCH_ASSOCIATE_PROTOCOLS', fetchAssociateProtocol);
  yield takeEvery('POST_COMPARE_PROTOCOL', getCompareResult);
}

function* watchProtocolViews() {
  yield takeEvery('GET_PROTOCOL_SECTION', getProtocolTocDataResult);
  yield takeEvery('GET_SECTION_LIST', getSectionList);
  yield takeEvery('GET_FILE_STREAM', fetchFileStream);
  yield takeEvery('GET_PROTOCOL_TOC_DATA', getProtocolTocDataResult);
  yield takeEvery('GET_METADATA_VARIABLE', MetaDataVariable);
  yield takeEvery('GET_RIGHT_BLADE', RightBladeValue);
  yield takeEvery('SET_TOC_Active', setTOCActive);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchProtocolAsync(), watchProtocolViews()]);
}
