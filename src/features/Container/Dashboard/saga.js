import { takeEvery, all, call, put } from "redux-saga/effects";
import _ from "lodash";
import BASE_URL, { httpCall, BASE_URL_8000 } from "../../../utils/api";
import {
  getProtocols,
  setError,
  setCompareSelected,
  getRecentSearches,
  getSponsor,
  getIndication,
  getProtocolData,
  setAddprotocolError,
  setAddProtocolModal,
  setLoading,
  getSavedSearches,
  setApiError
} from "./dashboardSlice";

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}


  
function* protocolAsyn() {
  const protocolUrl = "http://ca2spdml01q:8000/api/user_protocol_documents/?userId=10001";
  const statusUrl = "./status.json";
  const protocolConfig = {
    url: protocolUrl,
    method: "GET",
  };
  const statusConfig = {
    url: statusUrl,
    method: "GET",
  };
  try {
    const protocolData = yield call(httpCall, protocolConfig);
    // const statusData = yield call(httpCall, statusConfig);
    // if (protocolData.success && statusData.success) {
      // const mergedData = _.mergeWith(protocolData.data,statusData.data, customizer);
      // yield put(getProtocols(mergedData));
    // } else 
    if (protocolData.success) {
      yield put(getProtocols(protocolData.data));
    } else {
      yield put(setError(protocolData.err.statusText));
    }
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

function* compareSelectedAsyn(action) {
  console.log(action.payload === 2);
  if (action.payload === 2) {
    yield put(setCompareSelected(true));
  } else {
    yield put(setCompareSelected(false));
  }
}

function* recentSearchAsyn() {
  const url = "http://ca2spdml01q:8000/api/recent_search/?user=user3";
  const config = {
    url,
    method: "GET",
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getRecentSearches(searchData.data));
    }
    yield put(setError(searchData.err.statusText));
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

function* savedSearchAsyn() {
  const url = "http://ca2spdml01q:8000/api/saved_search/?user=user1";
  const config = {
    url,
    method: "GET",
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getSavedSearches(searchData.data));
    }
    yield put(setError(searchData.err.statusText));
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

function* addProtocolSponsor() {
  // const url = "../../../../sponsor.json";
  const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
  const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;
  // const protocolData = yield call(httpCall, {url, method:'GET'});

  // try {
  //   const protocolData = yield call(httpCall, { url, method: "GET" });
  //   if (protocolData.success) {
  //     yield put(getProtocolData(protocolData.data));
  //   }
  //   yield put(setError(protocolData.err.statusText));
  // } catch (err) {
  //   yield put(setError(err.statusText));
  // }

  try {
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: "GET",
    });
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: "GET",
    });
    if (sponsorList.success && indicationList.success) {
      let actualIndicationList = indicationList.data.map((item) => {
        let temp = Object.assign({}, item);
        temp.label = item.indication_name;
        return temp;
      });
      let actualSponsorList = sponsorList.data.map((item) => {
        let temp = Object.assign({}, item);
        temp.label = item.sponsor_name;
        return temp;
      });
      console.log("sponsorList :", actualIndicationList, actualSponsorList);
      yield put(getSponsor(actualSponsorList));
      yield put(getIndication(actualIndicationList));
      yield put(setLoading(false));
    } else {
      yield put(setError(sponsorList.err.statusText));
      yield put(setLoading(false));
      yield put(setApiError(true));
    }
  } catch (err) {
    yield put(setError(err.statusText));
    yield put(setLoading(false));
    yield put(setApiError(true));
  }
}
function* postAddProtocol(postData) {
  const { payload: data } = postData;
  yield put(setLoading(true));
  const postUrl = `${BASE_URL}/pd/api/v1/documents/?fileName=${data.fileName}&versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&sponsor=${data.sponsor}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&projectID=${data.projectID}&indication=${data.indication}&moleculeDevice=${data.moleculeDevice}`;
  var bodyFormData = new FormData();
  bodyFormData.append("file", data.uploadFile[0]);
  try {
    const postResponse = yield call(httpCall, {
      url: postUrl,
      method: "POST",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("postResponseww :", postResponse);
    if (postResponse.success) {
      // if(postResponse && postResponse.data.duplicate && postResponse.data.duplicate !== null && postResponse.data.duplicate.length > 0  ){
      //   yield put(setAddProtocolModal(true));
      //   yield put(setAddprotocolError(postResponse.data.duplicate));
      // } else {
      //   yield put(setAddProtocolModal(false));
      // }
      yield put(setAddProtocolModal(false));
    } else {
      yield put(setAddProtocolModal(true));
      console.log("postResponsefailed :", postResponse.err);
      yield put(
        setAddprotocolError(postResponse.err && postResponse.err.data ? postResponse.err.data.message : "API Error")
      );
    }
    yield put(setLoading(false));
  } catch (err) {
    console.log("err12333 :", err);
    yield put(setAddprotocolError(err.statusText));
    yield put(setAddProtocolModal(false));
    yield put(setLoading(false));
  }
}

function* toggleAddProtocol(data) {
  yield put(setAddProtocolModal(data.payload));
}
function* resetErrorAddProtocol(){
  yield put(setAddprotocolError(""));
}

function* watchDashboard() {
  yield takeEvery("GET_PROTOCOL_TABLE_SAGA", protocolAsyn);
  yield takeEvery("CHECK_COMPARE_SAGA", compareSelectedAsyn);
  yield takeEvery("GET_RECENT_SEARCH_DATA", recentSearchAsyn);
  yield takeEvery("GET_SPONSOR_ADDPROTCOL_SAGA", addProtocolSponsor);
  yield takeEvery("POST_ADDPROTOCOL_DATA", postAddProtocol);
  yield takeEvery("TOGGLE_ADDPROTOCOL_MODAL", toggleAddProtocol);
  yield takeEvery("GET_SAVED_SEARCH_DATA", savedSearchAsyn);
  yield takeEvery("RESET_ERROR_ADD_PROTOCOL", resetErrorAddProtocol);
}

export default function* dashboardSaga() {
  yield all([watchDashboard()]);
}
