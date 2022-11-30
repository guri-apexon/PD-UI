import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import {
  getFilters,
  getSearchResult,
  getIndications,
  getSponsors,
  getRecentDate,
  getRangeDate,
  getTotalSearchResult,
  getPhaseValues,
} from './searchSlice';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';
import { localISOTime } from '../../../utils/utilFunction';
// import moment from "moment";

const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;

const ALLISP = `${BASE_URL_8000}/api/keyword_search/`;

function* getState() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  // userId = id;
  return id.substring(1);
}
export function setAsssociateProtocols(id, data, associateDocs) {
  const arr =
    data &&
    data.map((item) => {
      if (item.id === id) {
        const temp = cloneDeep(item);
        temp.rows = associateDocs;
        temp.rowsLoading = false;
        temp.viewAssociate = true;
        return temp;
      }
      return item;
    });

  return arr;
}
function convertDate(date) {
  const newDate = new Date(date);
  let dd = newDate.getDate();

  let mm = newDate.getMonth() + 1;
  const yyyy = newDate.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  // console.log(`${yyyy}${mm}${dd}`)
  return `${yyyy}${mm}${dd}`;
}
export function createJSONFormat(data) {
  const arr = [];

  for (let i = 0; i < data.length; i++) {
    let qcStatus = '';
    switch (data[i].qcStatus) {
      case 'QC_NOT_STARTED':
        qcStatus = 'QC Not Started';
        break;
      case 'QC1':
      case 'QC2':
      case 'FEEDBACK_RUN':
        qcStatus = 'QC In Progress';
        break;
      case 'QC_COMPLETED':
        qcStatus = 'QC Completed';
        break;
      default:
        qcStatus = '-';
        break;
    }
    const obj = {
      protocolNumber: data[i].ProtocolNo,
      AiDocId: data[i].AiDocId,
      protocolDescription: data[i].ProtocolTitle,
      indication: data[i].Indication,
      phase: data[i].phase,
      sponsor: data[i].SponsorName,
      molecule: data[i].MoleculeDevice,
      approval_date: data[i].approval_date,
      uploadDate: data[i].uploadDate,
      followed: data[i].Follow ? data[i].Follow : false,
      rows: [],
      rowsLoading: true,
      isActive: data[i].is_active,
      viewAssociate: false,
      projectId: data[i].ProjectId,
      source: data[i].SourceFileName,
      path: `${data[i].documentPath}\\${data[i].SourceFileName}`,
      documentStatus: data[i].DocumentStatus,
      version: data[i].VersionNumber,
      UserRole: data[i].UserRole,
      qcStatus,
      uploadedBy: data[i].uploadedBy,
    };
    arr.push(obj);
  }

  return arr;
}
export function* getIndicationData() {
  try {
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: 'GET',
    });

    if (indicationList.success) {
      // let respData = indicationList.data.slice(0, 700);
      const respData = indicationList.data;
      const formatIndication = respData.map((item) => {
        return {
          title: item.indicationName,
          id: item.indId,
        };
      });
      const obj = {
        success: true,
        sectionContent: formatIndication,
      };
      yield put(getIndications(obj));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}
export function* getSponsorData() {
  try {
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: 'GET',
    });
    // let respData = sponsorList.data.slice(0, 8000);
    const respData = sponsorList.data;
    if (sponsorList.success) {
      const formatSponser = respData.map((item) => {
        return {
          title: item.sponsorName,
          id: item.sponsorId,
        };
      });
      const obj = {
        success: true,
        sectionContent: formatSponser,
      };
      yield put(getSponsors(obj));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}
export function* getPhaseData(action) {
  if (action.payload.sectionContent.length === 0) {
    const phaseObj = {
      success: true,
      loader: true,
      sectionContent: [],
    };
    yield put(getPhaseValues(phaseObj));
    const userId = yield getState();
    const postBody = {
      key: '',
      toc: [],
      sponsor: ['3SBio'],
      indication: ['Acne'],
      phase: ['I/Ib'],
      qcStatus: [],
      documentStatus: ['final'],
      dateType: 'approval_date',
      dateFrom: '',
      dateTo: '',
      sortField: 'score',
      sortOrder: 'desc',
      pageNo: 1,
      pageSize: 10,
      dateSection: '0',
      qID: userId,
    };
    try {
      const respData = yield call(httpCall, {
        url: ALLISP,
        method: 'POST',
        data: postBody,
      });

      if (respData.success) {
        const phaseData = respData.data.phases;
        // eslint-disable-next-line func-names
        const filtered = phaseData.filter(function (el) {
          return el !== '';
        });
        const formatPhases = filtered.sort().map((item) => {
          return {
            title: item,
            id: item,
          };
        });
        const phaseObj = {
          success: true,
          loader: false,
          sectionContent: formatPhases,
        };
        yield put(getPhaseValues(phaseObj));
      }
    } catch (e) {
      toast.error('Something went wrong');
    }
  }
}

export function* getFilterData() {
  const url = '../../../../filters.json';
  const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
  const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;

  try {
    const data = yield call(httpCall, { url, method: 'GET' });
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: 'GET',
    });
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: 'GET',
    });
    if (indicationList.success && sponsorList.success) {
      // let data = data;
      const formatSponser = sponsorList.data.map((item) => {
        return {
          title: item.sponsor_name,
          id: item.id,
        };
      });
      const formatIndication = indicationList.data.map((item) => {
        return {
          title: item.indication_name,
          id: item.id,
        };
      });
      const formatFilter = data.data.map((item) => {
        if (item.sectionName === 'Sponsors') {
          const items = cloneDeep(item);
          items.sectionContent = formatSponser;
          return items;
        }
        if (item.sectionName === 'Indication') {
          const items = cloneDeep(item);
          items.sectionContent = formatIndication;
          return items;
        }
        return item;
      });
      const obj = {
        success: true,
        data: formatFilter,
      };
      yield put(getFilters(obj));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}
function constructFilterObject(arr) {
  if (arr.length > 0) {
    const phaseData = arr;
    // eslint-disable-next-line func-names
    const filtered = phaseData.filter(function (el) {
      return el !== '';
    });
    const formatPhases = filtered.sort().map((item) => {
      return {
        title: item,
        id: item,
      };
    });
    const phaseObj = {
      success: true,
      loader: false,
      sectionContent: formatPhases,
    };
    return phaseObj;
  }
  const phaseObj = {
    success: true,
    loader: false,
    sectionContent: [],
  };
  return phaseObj;
}
export function* getSearchData(action) {
  const userId = yield getState();
  if (action.payload) {
    const obj = {
      search: true,
      loader: true,
      success: false,
      data: [],
    };
    yield put(getSearchResult(obj));
    try {
      let postObj;
      if (action.payload.key === '*') {
        postObj = {
          ...action.payload,
          qID: userId,
          key: '',
        };
      } else {
        postObj = {
          ...action.payload,
          qID: userId,
        };
      }
      const searchurl = `${BASE_URL_8000}/api/keyword_search/`;
      const searchResp = yield call(httpCall, {
        url: searchurl,
        method: 'POST',
        data: postObj,
      });
      if (searchResp.success) {
        const resData = searchResp.data;
        const searchData = resData.data;
        const phaseData = resData.phases;
        if (searchData.length > 0) {
          const requiredFormat = createJSONFormat(resData.data);
          const searchObj = {
            search: true,
            loader: false,
            success: true,
            data: { ...resData, data: requiredFormat },
          };
          yield put(getSearchResult(searchObj));
        } else {
          const obj = {
            search: true,
            loader: false,
            success: true,
            data: [],
          };
          yield put(getSearchResult(obj));
        }
        const phaseList = constructFilterObject(phaseData);
        yield put(getPhaseValues(phaseList));
      }
    } catch (e) {
      const obj = {
        success: false,
        data: [],
      };
      yield put(getSearchResult(obj));
      const phaseObj = {
        success: true,
        loader: false,
        sectionContent: [],
      };
      yield put(getPhaseValues(phaseObj));
    }
  } else {
    const obj = {
      search: false,
      loader: false,
      success: true,
      data: [],
    };
    yield put(getSearchResult(obj));
  }
}

// --- Sorting the Protocols When sortby is clicked
export function* updateSearchResult(action) {
  yield put(getSearchResult(action.payload));
}

// -----Updating and adding Associate Protocol to a Single protocol when individual expand is clicked
function* updateSearchAssociated(action) {
  const state = yield select();
  const searchData = state.search.searchResult;
  const tempRes = cloneDeep(action.payload.obj);
  const foundIndex = tempRes.findIndex(
    (obj) => obj.id === action.payload.data.id,
  );
  tempRes[foundIndex].rowsLoading = true;
  tempRes[foundIndex].expanded = true;
  tempRes[foundIndex].viewAssociate = true;
  // tempRes[foundIndex].expanded = !tempRes[foundIndex].expanded;
  // tempRes.rowsLoading= true;
  const initialObj = {
    search: true,
    loader: false,
    success: true,
    data: {
      ...searchData.data,
      data: [...tempRes],
    },
  };
  yield put(getSearchResult(initialObj));
  // ProtocolNo
  if (action.payload.data.protocolNumber) {
    const userId = yield getState();
    const associateURL = `${BASE_URL_8000}/api/Related_protocols/?protocol=${action.payload.data.protocolNumber}&userId=${userId}`;
    // let associateURL =  `http://ca2spdml01q:8000/api/Related_protocols/?protocol=SSR_AKB-6548-CI-0014`;
    const associateDocs = yield call(httpCall, {
      url: associateURL,
      method: 'GET',
    });
    // Checking Primary or Secondary User based on Protocol Number
    // let userId = yield getState();
    // let userStatusURL = `${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userId}&protocol=${action.payload.data.protocolNumber}`;
    // const userStatus = yield call(httpCall, {
    //   url: userStatusURL,
    //   method: "GET",
    // });
    // const URL = `http://ca2spdml01q:8000/api/Related_protocols/?protocol=${action.payload.protocolNumber}`;
    //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
    // const config = {
    //   url: URL,
    //   method: "GET",
    // };
    //  const associateDocs = yield call(httpCall, config);
    if (associateDocs.success) {
      const temp = cloneDeep(associateDocs.data);
      const arr = temp.filter((item) => item.id !== action.payload.data.id);
      if (arr.length === 0) {
        toast.info(
          `The Protocol: "${action.payload.data.protocolNumber}" selected has no associated protocols available`,
        );
      }
      arr.sort((a, b) => {
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      });
      // let primaryUser = userStatus && userStatus.data ? true : false;
      const resultarr = arr.map((item) => {
        return {
          ...item,
        };
      });
      const result = setAsssociateProtocols(
        // action.payload.data.protocolNumber,
        action.payload.data.id,
        action.payload.obj,
        resultarr,
      );
      const obj1 = {
        search: true,
        loader: false,
        success: true,
        data: {
          ...searchData.data,
          data: [...result],
        },
      };
      // if (associateDocs.data.length === 0) {
      //   toast.info(
      //     `The Protocol: "${action.payload.data.protocolNumber}" selected has no associated protocols available`
      //   );
      // }

      yield put(getSearchResult(obj1));
    } else {
      yield;
    }
  } else {
    const result = setAsssociateProtocols(
      // action.payload.data.protocolNumber,
      action.payload.data.id,
      action.payload.obj,
      [],
    );
    const obj = {
      search: true,
      loader: false,
      success: true,
      data: result,
    };
    yield put(getSearchResult(obj));
  }
  // yield put(getSearchResult(action.payload));
}

export function* getRecentData(action) {
  if (action.payload === '0') {
    const recentDate = {
      from: '',
      to: '',
    };
    yield put(getRecentDate(recentDate));
  } else {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() - parseInt(action.payload, 10));

    // let momDate = moment(newDate);
    // const getDate = momDate.format("YYYYMMDD");
    // const nowData = moment(new Date()).format("YYYYMMDD");
    const getDate = convertDate(newDate);
    const nowData = convertDate(new Date());
    const recentDate = {
      from: getDate,
      // to: "now/d",
      to: nowData,
    };

    yield put(getRecentDate(recentDate));
  }
}

export function* getDataByRange(action) {
  if (action.payload.from && action.payload.to) {
    const from = convertDate(new Date(action.payload.from));
    const to = convertDate(new Date(action.payload.to));
    // let fromDate = new Date(action.payload.from);
    // let toDate = new Date(action.payload.to);
    // let momFromDate = moment(fromDate);
    // let momToDate = moment(toDate);
    // const from = momFromDate.format("YYYYMMDD");
    // const to = momToDate.format("YYYYMMDD");

    const rangeDate = {
      from,
      to,
    };
    yield put(getRangeDate(rangeDate));
  } else if (action.payload.from) {
    const from = convertDate(new Date(action.payload.from));
    const to = convertDate(new Date());
    // let fromDate = new Date(action.payload.from);
    // let toDate = new Date();
    // let momFromDate = moment(fromDate);
    // let momToDate = moment(toDate);
    // const from = momFromDate.format("YYYYMMDD");
    // const to = momToDate.format("YYYYMMDD");

    const rangeDate = {
      from,
      to,
    };
    yield put(getRangeDate(rangeDate));
  } else if (action.payload.to) {
    const from = convertDate(new Date(null));
    const to = convertDate(new Date(action.payload.to));
    // let fromDate = new Date(null);
    // let toDate = new Date(action.payload.to);
    // let momFromDate = moment(fromDate);
    // let momToDate = moment(toDate);
    // const from = momFromDate.format("YYYYMMDD");
    // const to = momToDate.format("YYYYMMDD");

    const rangeDate = {
      from,
      to,
    };
    yield put(getRangeDate(rangeDate));
  } else {
    const rangeDate = {
      from: null,
      to: null,
    };
    yield put(getRangeDate(rangeDate));
  }
  // try {
  //   // const url = `http://localhost:4000/filter/?from=${from}&to=${to}`;
  //   const url = `/filter/?from=${from}&to=${to}`;
  //   const resp = yield call(httpCall, {
  //     url,
  //     method: "GET",
  //   });
  //   const data = resp.data.hits.hits;
  //
  //   if (resp.data && resp.data.hits && data.length !== 0) {
  //     const requiredFormat = createJSONFormat(data);

  //     const obj = {
  //       search: true,
  //       loader: false,
  //       success: true,
  //       data: requiredFormat,
  //     };
  //     yield put(getSearchResult(obj));
  //   } else if (resp.data.hits.hits.length === 0) {
  //     const obj = {
  //       search: true,
  //       loader: false,
  //       success: true,
  //       data: [],
  //     };
  //     yield put(getSearchResult(obj));
  //   }
  // } catch (e) {
  //   const obj = {
  //     success: false,
  //     data: [],
  //   };
  //   yield put(getSearchResult(obj));
  // }
}

function* saveSearch(action) {
  if (action.payload) {
    const userId = yield getState();
    const url = `${BASE_URL_8000}/api/saved_search/`;
    const config = {
      url,
      method: 'POST',
      data: {
        keyword: action.payload,
        userId,
        timeCreated: localISOTime(),
        lastUpdated: localISOTime(),
      },
    };
    try {
      yield call(httpCall, config);
      // if (searchData.success) {
      //   yield put(getSavedSearches(searchData.data));
      // }
      // yield put(setError(searchData.err.statusText));
    } catch (err) {
      toast.error('Something went wrong');
    }
  }
}

function* onPageChange(action) {
  const obj1 = {
    search: true,
    loader: true,
    success: true,
    data: [],
  };
  yield put(getSearchResult(obj1));
  const state = yield select();
  const data = state.search.totalSearchResult;
  // 0-10, 10-20, 20-30
  const lastPage = (action.payload + 1) * 10;
  // let lastPage=(action.payload)*10;
  const firstPage = lastPage - 10;
  let res;
  yield (res = data.slice(firstPage, lastPage));
  // console.log('pagination data :',action.payload,firstPage, lastPage,res, data);
  const obj = {
    search: true,
    loader: false,
    success: true,
    data: res,
  };
  yield put(getSearchResult(obj));
}

function* updateTotalSearchResult(action) {
  yield put(getTotalSearchResult(action.payload));
}
function formatFilterObject(arr) {
  // eslint-disable-next-line func-names
  const filtered = arr.filter(function (el) {
    return el !== '';
  });
  const formatedData = filtered.map((item) => {
    return {
      title: item,
      id: item,
    };
  });
  const obj = {
    success: true,
    sectionContent: formatedData,
  };
  return obj;
}
function* getALLISP() {
  // getIndications,
  // getSponsors,
  // getPhaseValues,
  const postBody = {
    key: '',
    toc: [],
    sponsor: [],
    indication: [],
    phase: [],
    documentStatus: [],
    dateType: '',
    dateFrom: '',
    dateTo: '',
    sortField: '',
    sortOrder: '',
    pageNo: 1,
    pageSize: 10,
    qID: 'q1061485',
  };
  try {
    const ispList = yield call(httpCall, {
      url: ALLISP,
      method: 'POST',
      data: postBody,
    });

    if (ispList.success) {
      const respData = ispList.data;
      const phaseData = formatFilterObject(respData.phases);
      const indicationData = formatFilterObject(respData.indications);
      const sponsorData = formatFilterObject(respData.sponsors);
      yield put(getPhaseValues(phaseData));
      yield put(getIndications(indicationData));
      yield put(getSponsors(sponsorData));
    }
  } catch (e) {
    toast.error('Something went wrong');
  }
}

function* watchIncrementAsync() {
  yield takeEvery('GET_SEARCH_FILTER', getFilterData);
  yield takeEvery('GET_SEARCH_RESULT', getSearchData);
  yield takeEvery('UPDATE_SEARCH_RESULT', updateSearchResult);
  yield takeEvery('UPDATE_TOTAL_SEARCH_RESULT', updateTotalSearchResult);
  yield takeEvery('GET_INDICATIONS', getIndicationData);
  yield takeEvery('GET_SPONSORS', getSponsorData);
  yield takeEvery('GET_PHASES', getPhaseData);
  yield takeEvery('UPDATE_SEARCH_ASSOCIATED_PROTOCOLS', updateSearchAssociated);
  yield takeEvery('FILTER_BY_RECENT_SAGA', getRecentData);
  yield takeEvery('FILTER_BY_DATE_RANGE_SAGA', getDataByRange);
  yield takeEvery('SAVE_SEARCH_SAGA', saveSearch);
  yield takeEvery('PAGE_CHANGE', onPageChange);
  yield takeEvery('GET_INDICATIONs_SPONSORS_PHASES', getALLISP);
}

export default function* protocolSaga() {
  yield all([watchIncrementAsync()]);
}

// --To Remove duplicate Protocol numbers from list
// function getUniqObject(obj) {
//   const uniqueObj = Array.from(new Set(obj.map((a) => a.protocolNumber))).map(
//     (protocolNumber) => {
//       return obj.find((a) => a.protocolNumber === protocolNumber);
//     }
//   );
//   return uniqueObj;
// }
// function getOnlyActiveItem(obj) {
//   let activeObj = obj.filter((item) => item.isActive !== 0);
//   return activeObj;
// }
