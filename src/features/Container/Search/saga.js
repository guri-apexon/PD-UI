import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import {
  getFilters,
  getSearchResult,
  getIndications,
  getSponsors,
  getRecentDate,
  getRangeDate,
} from "./searchSlice";
import { httpCall, Apis, BASE_URL_8000 } from "../../../utils/api";
import _ from "lodash";
import moment from "moment";

const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;

function* getIndicationData(action) {
  try {
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: "GET",
    });

    if (indicationList.success) {
      let formatIndication = indicationList.data.map((item) => {
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
function* getSponsorData(action) {
  try {
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: "GET",
    });
    if (sponsorList.success) {
      let formatSponser = sponsorList.data.map((item) => {
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

function* getFilterData(action) {
  // console.log("search", action.payload);
  // debugger
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
    // console.log("filter", indicationList, sponsorList);
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
      console.log("format Fi", formatFilter);
      const obj = {
        success: true,
        data: formatFilter,
      };
      yield put(getFilters(obj));
    }
  } catch (e) {}

  // console.log(data);
  // console.log(",,,,,,,", sponsorList);
  // console.log("1111111", indicationList);
  // getSummaryData(data)
}

function* getSearchData(action) {
  // console.log("search", action.payload);

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
      // console.log("Search Result", data);
      // const data = [];
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
function* updateSearchResult(action) {
  yield put(getSearchResult(action.payload));
}

// -----Updating and adding Associate Protocol to a Single protocol when individual expand is clicked
function* updateSearchAssociated(action) {
  console.log("assoc pay",action.payload.data.protocolNumber)
  let tempRes = _.cloneDeep(action.payload.obj);
  let foundIndex = tempRes.findIndex(
    (obj) => obj.id === action.payload.data.id
  );
  tempRes[foundIndex].rowsLoading = true;
  tempRes[foundIndex].expanded = !tempRes[foundIndex].expanded;
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
  let associateURL =  `http://ca2spdml01q:8000/api/Related_protocols/?protocol=${action.payload.data.protocolNumber}`;
  // let associateURL =  `http://ca2spdml01q:8000/api/Related_protocols/?protocol=SSR_AKB-6548-CI-0014`;
  const associateDocs = yield call(httpCall, {
    url: associateURL,
    method: "GET",
  });
  console.log("associateDocs :", associateDocs);
  // const URL = `http://ca2spdml01q:8000/api/Related_protocols/?protocol=${action.payload.protocolNumber}`;
  //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
  // const config = {
  //   url: URL,
  //   method: "GET",
  // };
  //  const associateDocs = yield call(httpCall, config);
  //  console.log('associateDocs :', associateDocs.data);
  // debugger
  if (associateDocs.success) {
    let result = setAsssociateProtocols(
      action.payload.data.protocolNumber,
      action.payload.obj,
      associateDocs.data
    );
    const obj = {
      search: true,
      loader: false,
      success: true,
      data: result,
    };
    // debugger
    yield put(getSearchResult(obj));
  } else {
    yield;
  }
  // yield put(getSearchResult(action.payload));
}

// -----For updating and Associate Protocol to all Protocol when Expand all is clicked
function* updateAllSearchAssociated(action) {
  console.log("action payload:", action.payload);
  let associateURL = "/searchMockResult.json";
  const associateDocs = yield call(httpCall, {
    url: associateURL,
    method: "GET",
  });
  // if (associateDocs.success) {
  //   let result = setAsssociateProtocols(
  //     action.payload.data.protocolNumber,
  //     action.payload.obj,
  //     associateDocs.data.AssociateDocs
  //   );
  //   const obj = {
  //     search: true,
  //     loader: false,
  //     success: true,
  //     data: result,
  //   };
  //   yield put(getSearchResult(obj));
  // } else {
  //   yield;
  // }
}

function* getRecentData(action) {
  if(action.payload === '0') {
    const recentDate = {
      from: '',
      to: ''
    }
    yield put(getRecentDate(recentDate))
  } else {

    let newDate = new Date();
    newDate.setMonth(newDate.getMonth() - parseInt(action.payload));
    console.log("date", newDate);
    let momDate = moment(newDate);
    const getDate = momDate.format("YYYYMMDDHHMMSS");
    const recentDate = {
      from: getDate,
      to: 'now/d'
    }
    console.log("recentDate", recentDate);
    yield put(getRecentDate(recentDate))
  }
  // try {
  //   // const url = `http://localhost:4000/filter?from=${getDate}&to=now/d`;
  //   const url = `/filter?from=${getDate}&to=now/d`;
  //   const resp = yield call(httpCall, {
  //     url,
  //     method: "GET",
  //   });
  //   const data = resp.data.hits.hits;
  //   console.log("Search Result", data);
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
  console.log("from", from);
  console.log("to", to);
  const rangeDate = {
    from,
    to
  }
  yield put(getRangeDate(rangeDate))

  // try {
  //   // const url = `http://localhost:4000/filter/?from=${from}&to=${to}`;
  //   const url = `/filter/?from=${from}&to=${to}`;
  //   const resp = yield call(httpCall, {
  //     url,
  //     method: "GET",
  //   });
  //   const data = resp.data.hits.hits;
  //   console.log("Search Result", data);
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

function* watchIncrementAsync() {
  yield takeEvery("GET_SEARCH_FILTER", getFilterData);
  yield takeEvery("GET_SEARCH_RESULT", getSearchData);
  yield takeEvery("UPDATE_SEARCH_RESULT", updateSearchResult);
  yield takeEvery("GET_INDICATIONS", getIndicationData);
  yield takeEvery("GET_SPONSORS", getSponsorData);
  yield takeEvery("UPDATE_SEARCH_ASSOCIATED_PROTOCOLS", updateSearchAssociated);
  yield takeEvery(
    "UPDATE_ALL_SEARCH_ASSOCIATED_PROTOCOLS",
    updateAllSearchAssociated
  );
  yield takeEvery("FILTER_BY_RECENT_SAGA", getRecentData);
  yield takeEvery("FILTER_BY_DATE_RANGE_SAGA", getDataByRange);
}

export default function* protocolSaga() {
  yield all([watchIncrementAsync()]);
}

function createJSONFormat(data) {
  let arr = [];

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
    };
    arr.push(obj);
  }

  console.log("arrs", arr);
  return getUniqObject(arr);
}

// --To Remove duplicate Protocol numbers from list
function getUniqObject(obj) {
  const uniqueObj = Array.from(new Set(obj.map((a) => a.protocolNumber))).map(
    (protocolNumber) => {
      return obj.find((a) => a.protocolNumber === protocolNumber);
    }
  );
  return uniqueObj;
}
function setAsssociateProtocols(id, data, associateDocs) {
  // console.log('id, data, associateDocs :', id, data, associateDocs);
  let arr =
    data &&
    data.map((item) => {
      if (item.protocolNumber === id) {
        let temp = _.cloneDeep(item);
        temp.rows = associateDocs;
        temp.rowsLoading = false;
        return temp;
      }
      return item;
    });

  console.log("arr :", arr);
  return arr;
}
