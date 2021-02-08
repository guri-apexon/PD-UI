import {
  put,
  takeEvery,
  all,
  call,
  takeLatest,
  select,
} from "redux-saga/effects";
import {
  getFilters,
  getSearchResult,
  getIndications,
  getSponsors,
  getRecentDate,
  getRangeDate,
} from "./searchSlice";
import BASE_URL, { httpCall, Apis, BASE_URL_8000 } from "../../../utils/api";
import _ from "lodash";
import moment from "moment";

const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;

export function* getIndicationData(action) {
  try {
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: "GET",
    });

    if (indicationList.success) {
      let respData = indicationList.data.slice(0, 700);
      // let respData = indicationList;
      // debugger;
      let formatIndication = respData.map((item) => {
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
  } catch (e) {}
}
export function* getSponsorData(action) {
  try {
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: "GET",
    });
    let respData = sponsorList.data.slice(0, 8000);
    // let respData = sponsorList;
    if (sponsorList.success) {
      let formatSponser = respData.map((item) => {
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
  } catch (e) {}
}

export function* getFilterData(action) {
  const url = "../../../../filters.json";
  const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
  const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;

  try {
    const data = yield call(httpCall, { url, method: "GET" });
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: "GET",
    });
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: "GET",
    });
    if (indicationList.success && sponsorList.success) {
      // let data = data;
      let formatSponser = sponsorList.data.map((item) => {
        return {
          title: item.sponsor_name,
          id: item.id,
        };
      });
      let formatIndication = indicationList.data.map((item) => {
        return {
          title: item.indication_name,
          id: item.id,
        };
      });
      let formatFilter = data.data.map((item) => {
        if (item.sectionName === "Sponsors") {
          let items = _.cloneDeep(item);
          items.sectionContent = formatSponser;
          return items;
        } else if (item.sectionName === "Indication") {
          let items = _.cloneDeep(item);
          items.sectionContent = formatIndication;
          return items;
        } else {
          return item;
        }
      });
      const obj = {
        success: true,
        data: formatFilter,
      };
      yield put(getFilters(obj));
    }
  } catch (e) {}
}

export function* getSearchData(action) {
  if (action.payload) {
    const obj = {
      search: true,
      loader: true,
      success: false,
      data: [],
    };
    yield put(getSearchResult(obj));

    try {
      const url = `/elastic?${action.payload}`;
      // const url = `http://localhost:4000/elastic?${action.payload}`;

      const resp = yield call(httpCall, {
        url,
        method: "GET",
      });
      const data = resp.data.hits.hits;
      if (resp.data && resp.data.hits && data.length !== 0) {
        const requiredFormat = createJSONFormat(data);

        const obj = {
          search: true,
          loader: false,
          success: true,
          data: requiredFormat,
        };
        yield put(getSearchResult(obj));
      } else if (resp.data.hits.hits.length === 0) {
        const obj = {
          search: true,
          loader: false,
          success: true,
          data: [],
        };
        yield put(getSearchResult(obj));
      }
    } catch (e) {
      const obj = {
        success: false,
        data: [],
      };
      yield put(getSearchResult(obj));
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
  let tempRes = _.cloneDeep(action.payload.obj);
  let foundIndex = tempRes.findIndex(
    (obj) => obj.id === action.payload.data.id
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
    data: tempRes,
  };
  yield put(getSearchResult(initialObj));
  //ProtocolNo
  // debugger
  if (action.payload.data.protocolNumber) {
    let associateURL = `${BASE_URL_8000}/api/Related_protocols/?protocol=${action.payload.data.protocolNumber}`;
    // let associateURL =  `http://ca2spdml01q:8000/api/Related_protocols/?protocol=SSR_AKB-6548-CI-0014`;
    const associateDocs = yield call(httpCall, {
      url: associateURL,
      method: "GET",
    });
    // Checking Primary or Secondary User based on Protocol Number
    let userId = yield getState();
    let userStatusURL =`${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userId}&protocol=${action.payload.data.protocolNumber}`
    const userStatus = yield call(httpCall, {
      url: userStatusURL,
      method: "GET"
    })
    // const URL = `http://ca2spdml01q:8000/api/Related_protocols/?protocol=${action.payload.protocolNumber}`;
    //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
    // const config = {
    //   url: URL,
    //   method: "GET",
    // };
    //  const associateDocs = yield call(httpCall, config);
    if (associateDocs.success) {
      let arr = _.cloneDeep(associateDocs.data);
      arr.sort((a, b) => {
        return moment(b.uploadDate) - moment(a.uploadDate);
      });
      let primaryUser= userStatus && userStatus.data?true:false
      let resultarr= arr.map(item=>{
        return{
          ...item,
          isPrimaryUser:primaryUser
        }
      })
      let result = setAsssociateProtocols(
        // action.payload.data.protocolNumber,
        action.payload.data.id,
        action.payload.obj,
        resultarr,
        primaryUser
      );
      const obj = {
        search: true,
        loader: false,
        success: true,
        data: result,
      };

      yield put(getSearchResult(obj));
    } else {
      yield;
    }
  } else {
    let result = setAsssociateProtocols(
      // action.payload.data.protocolNumber,
      action.payload.data.id,
      action.payload.obj,
      []
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



function* getRecentData(action) {
  if (action.payload === "0") {
    const recentDate = {
      from: "",
      to: "",
    };
    yield put(getRecentDate(recentDate));
  } else {
    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - parseInt(action.payload));

    let momDate = moment(newDate);
    const getDate = momDate.format("YYYYMMDDHHMMSS");
    const recentDate = {
      from: getDate,
      to: "now/d",
    };

    yield put(getRecentDate(recentDate));
  }
  // try {
  //   // const url = `http://localhost:4000/filter?from=${getDate}&to=now/d`;
  //   const url = `/filter?from=${getDate}&to=now/d`;
  //   const resp = yield call(httpCall, {
  //     url,
  //     method: "GET",
  //   });
  //   const data = resp.data.hits.hits;

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

function* getDataByRange(action) {
  let fromDate = new Date(action.payload.from);
  let toDate = new Date(action.payload.to);
  let momFromDate = moment(fromDate);
  let momToDate = moment(toDate);
  const from = momFromDate.format("YYYYMMDDHHMMSS");
  const to = momToDate.format("YYYYMMDDHHMMSS");

  const rangeDate = {
    from,
    to,
  };
  yield put(getRangeDate(rangeDate));

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
function* getState() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  // userId = id;
  return id.substring(1);
}

function* saveSearch(action) {
  if(action.payload) {
    let userId = yield getState();
    const url = `${BASE_URL_8000}/api/saved_search/`;
    const config = {
      url,
      method: "POST",
      data: {
        keyword: action.payload,
        userId: userId,
        timeCreated: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      },
    };
    try {
      yield call(httpCall, config);
      // if (searchData.success) {
      //   yield put(getSavedSearches(searchData.data));
      // }
      // yield put(setError(searchData.err.statusText));
    } catch (err) {
      console.log(err);
    }
  }
}

function* watchIncrementAsync() {
  yield takeEvery("GET_SEARCH_FILTER", getFilterData);
  yield takeEvery("GET_SEARCH_RESULT", getSearchData);
  yield takeEvery("UPDATE_SEARCH_RESULT", updateSearchResult);
  yield takeEvery("GET_INDICATIONS", getIndicationData);
  yield takeEvery("GET_SPONSORS", getSponsorData);
  yield takeEvery("UPDATE_SEARCH_ASSOCIATED_PROTOCOLS", updateSearchAssociated);
  yield takeEvery("FILTER_BY_RECENT_SAGA", getRecentData);
  yield takeEvery("FILTER_BY_DATE_RANGE_SAGA", getDataByRange);
  yield takeEvery("SAVE_SEARCH_SAGA", saveSearch);
}

export default function* protocolSaga() {
  yield all([watchIncrementAsync()]);
}

export function createJSONFormat(data) {
  let arr = [];
console.log('ddddd', data)
  for (let i = 0; i < data.length; i++) {
    // let sampleRows = data.filter(
    //   (item) => item._source.ProtocolNo === data[i]._source.ProtocolNo
    // );
    // let rows = sampleRows.map((item) => {
    //   return {
    //     version: item._source.ProtocolVersion,
    //     draft: "",
    //     sourceDocument: item._source.SourceFileName,
    //     documentPath: item._source.documentPath,
    //     uploadDate: item._source.uploadDate,
    //     documentStatus: item._source.DocumentStatus,
    //   };
    // });
    let obj = {
      protocolNumber: data[i]._source.ProtocolNo,
      AiDocId: data[i]._source.AiDocId,
      protocolDescription: data[i]._source.ProtocolTitle,
      indication: data[i]._source.Indication,
      phase: data[i]._source.phase,
      sponsor: data[i]._source.SponsorName,
      molecule: data[i]._source.MoleculeDevice,
      approvalDate: data[i]._source.approval_date,
      uploadDate: data[i]._source.uploadDate,
      followed: false,
      rows: [],
      rowsLoading: true,
      isActive: data[i]._source.is_active,
      viewAssociate: false,
      projectId: data[i]._source.ProjectId,
      source: data[i]._source.SourceFileName,
      path: `${data[i]._source.documentPath}\\${data[i]._source.SourceFileName}`,
      documentStatus: data[i]._source.DocumentStatus,
      version: data[i]._source.VersionNumber,
    };
    arr.push(obj);
  }

  return arr;
}

// --To Remove duplicate Protocol numbers from list
function getUniqObject(obj) {
  const uniqueObj = Array.from(new Set(obj.map((a) => a.protocolNumber))).map(
    (protocolNumber) => {
      return obj.find((a) => a.protocolNumber === protocolNumber);
    }
  );
  // debugger;
  return uniqueObj;
}
// function getOnlyActiveItem(obj) {
//   let activeObj = obj.filter((item) => item.isActive !== 0);
//   // debugger
//   return activeObj;
// }
export function setAsssociateProtocols(id, data, associateDocs, isPrimaryUser) {
  let arr =
    data &&
    data.map((item) => {
      if (item.id === id) {
        let temp = _.cloneDeep(item);
        temp.rows = associateDocs;
        temp.rowsLoading = false;
        temp.viewAssociate = true;
        temp.isPrimaryUser  = isPrimaryUser
        return temp;
      }
      return item;
    });

  return arr;
}
