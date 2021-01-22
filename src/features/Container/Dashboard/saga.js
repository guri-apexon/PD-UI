import { takeEvery, all, call, put, select } from "redux-saga/effects";
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
  setApiError,
} from "./dashboardSlice";

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function* protocolAsyn() {
  const state = yield select();
  const id = state.user.userDetail.userId
  console.log(id);
  // const protocolUrl =
  // `http://ca2spdml01q:8000/api/protocol_metadata/?userId=${id}`;
  const protocolUrl =
    "http://ca2spdml01q:8000/api/protocol_metadata/?userId=1021402";
  // const statusUrl = "./status.json";
  const protocolConfig = {
    url: protocolUrl,
    method: "GET",
  };
  // const statusConfig = {
  //   url: statusUrl,
  //   method: "GET",
  // };
  try {
    const protocolData = yield call(httpCall, protocolConfig);
    // const statusData = yield call(httpCall, statusConfig);
    // if (protocolData.success && statusData.success) {
    // const mergedData = _.mergeWith(protocolData.data,statusData.data, customizer);
    // yield put(getProtocols(mergedData));
    // } else

    if (protocolData.success) {
      let data = protocolData.data.map((item) => {
        item.protocolTitle = !item.protocolTitle ? "" : item.protocolTitle;
        item.protocol = !item.protocol ? "" : item.protocol;
        item.projectId = !item.projectId ? "" : item.projectId;
        item.sponsor = !item.sponsor ? "" : item.sponsor;
        item.uploadDate = !item.uploadDate ? "" : item.uploadDate;
        return item;
      });
      yield put(getProtocols(data));
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
  const url = "http://ca2spdml01q:8000/api/recent_search/?userId=1021402";
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
  const url = "http://ca2spdml01q:8000/api/saved_search/?userId=1021402";
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
        temp.label = item.indicationName;
        return temp;
      });
      let actualSponsorList = sponsorList.data.map((item) => {
        let temp = Object.assign({}, item);
        temp.label = item.sponsorName;
        return temp;
      });
      // console.log("sponsorList :", actualIndicationList, actualSponsorList);
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
  const postUrl = `${BASE_URL}/pd/api/v1/documents/?sourceFileName=${data.fileName}&versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&sponsor=${data.sponsor}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&projectID=${data.projectID}&indication=${data.indication}&moleculeDevice=${data.moleculeDevice}&userId=1021402`;
  const duplicateCheck = `http://ca2spdml01q:8000/api/duplicate_check/?versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&sponsor=${data.sponsor}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&userId=1021402`;
  var bodyFormData = new FormData();
  bodyFormData.append("file", data.uploadFile[0]);
  try {
    const duplicateCheckRes = yield call(httpCall, {
      url: duplicateCheck,
      method: "GET",
    });
    console.log("duplicateCheckRes :", duplicateCheckRes);
    if (duplicateCheckRes && duplicateCheckRes.data === null) {
      const postResponse = yield call(httpCall, {
        url: postUrl,
        method: "POST",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("postResponseww :", postResponse);
      if (postResponse.success) {
        yield put(setAddProtocolModal(false));
      } else {
        yield put(setAddProtocolModal(true));
        // console.log("postResponsefailed :", postResponse.err);
        yield put(
          setAddprotocolError(
            postResponse.err && postResponse.err.data
              ? postResponse.err.data.message
              : "API Error"
          )
        );
      }
    } else {
      yield put(setAddProtocolModal(true));
      yield put(
        setAddprotocolError(
          duplicateCheckRes && duplicateCheckRes.data.Duplicate
            ? duplicateCheckRes.data.Duplicate
            : "This protocol document cannot be added to the library because it already exists."
        )
      );
    }

    yield put({ type: "GET_PROTOCOL_TABLE_SAGA" });
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
function* resetErrorAddProtocol() {
  yield put(setAddprotocolError(""));
}

function* saveRecentSearch(action) {
  const url = "http://ca2spdml01q:8000/api/recent_search/";
  const config = {
    url,
    method: "POST",
    data: {
      keyword: action.payload,
      userId: "1021402",
      timeCreated: "2020-12-16T12:34:59.460Z",
      lastUpdated: "2020-12-16T12:34:59.460Z",
    },
  };
  try {
    yield call(httpCall, config);
    // if (searchData.success) {
    //   yield put(getSavedSearches(searchData.data));
    // }
    // yield put(setError(searchData.err.statusText));
  } catch (err) {
    yield put(setError(err.statusText));
  }
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
  yield takeEvery("POST_RECENT_SEARCH_DASHBOARD", saveRecentSearch);
}

export default function* dashboardSaga() {
  yield all([watchDashboard()]);
}
