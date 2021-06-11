import {
  takeEvery,
  all,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import { toast } from "react-toastify";

import BASE_URL, { httpCall, BASE_URL_8000 } from "../../../utils/api";
import {
  getProtocols,
  setError,
  getRecentSearches,
  getSponsor,
  getIndication,
  setAddprotocolError,
  setAddProtocolModal,
  setLoading,
  getSavedSearches,
  setApiError,
  getFollowedProtocols,
  setTableLoader,
} from "./dashboardSlice";

function* getState() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
}

export function* protocolAsyn() {
  yield put(setTableLoader(true));
  let userId = yield getState();
  const protocolUrl = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}`;

  const protocolConfig = {
    url: protocolUrl,
    method: "GET",
  };
  try {
    const protocolData = yield call(httpCall, protocolConfig);

    if (protocolData.success) {
      let data = protocolData.data.map((item, i) => {
        item.id = item.aidocId;
        item.protocolTitle = !item.protocolTitle ? "" : item.protocolTitle;
        item.protocol = !item.protocol ? "" : item.protocol;
        item.projectId = !item.projectId ? "" : item.projectId;
        item.sponsor = !item.sponsor ? "" : item.sponsor;
        item.uploadDate = !item.uploadDate ? "" : item.uploadDate;

        if (i === 1) {
          item.qcActivity = "QC_COMPLETED";
        } else if (i === 2) {
          item.qcActivity = "QC_IN_PROGRESS";
        } else if (i === 3) {
          item.qcActivity = "QC_NOT_STARTED";
        } else {
          item.qcActivity = "QC_NOT_STARTED";
        }
        return item;
      });
      yield put(getProtocols(data));
      yield put(setTableLoader(false));
    } else {
      yield put(setTableLoader(false));
      yield put(setError(protocolData.err.statusText));
    }
  } catch (err) {
    yield put(setTableLoader(false));
    yield put(setError(err.statusText));
  }
}
export function* followedProtocols() {
  yield put(setTableLoader(true));
  let userId = yield getState();
  const protocolUrl = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}`;

  const protocolConfig = {
    url: protocolUrl,
    method: "GET",
  };
  try {
    const protocolData = yield call(httpCall, protocolConfig);

    if (protocolData.success) {
      let data = protocolData.data.map((item, i) => {
        item.id = item.aidocId;
        item.protocolTitle = !item.protocolTitle ? "" : item.protocolTitle;
        item.protocol = !item.protocol ? "" : item.protocol;
        item.projectId = !item.projectId ? "" : item.projectId;
        item.sponsor = !item.sponsor ? "" : item.sponsor;
        item.uploadDate = !item.uploadDate ? "" : item.uploadDate;

        // To be removed when API available
        if (i === 1) {
          item.qcActivity = "QC_COMPLETED";
          item.status = "PROCESS_COMPLETED";
        } else if (i === 2) {
          item.qcActivity = "QC_IN_PROGRESS";
          item.status = "PROCESS_COMPLETED";
        } else if (i === 3) {
          item.qcActivity = "QC_NOT_STARTED";
          item.status = "COMPARISON_COMPLETED";
        } else if (i === 4) {
          item.qcActivity = "QC_NOT_STARTED";
          item.status = "PROCESS_COMPLETED";
        } else if (i === 5) {
          item.qcActivity = "QC_NOT_STARTED";
          item.status = "ERROR";
        } else if (i === 6) {
          item.qcActivity = "QC_NOT_STARTED";
          item.status = "DIGITIZER1_STARTED";
        } else {
          item.qcActivity = "QC_NOT_STARTED";
        }
        return item;
      });
      yield put(getFollowedProtocols(data));
      yield put(setTableLoader(false));
    } else {
      yield put(setTableLoader(false));
      yield put(setError(protocolData.err.statusText));
    }
  } catch (err) {
    yield put(setTableLoader(false));
    yield put(setError(err.statusText));
  }
}

function sorting(data, key) {
  return data.sort(function (x, y) {
    return new Date(y[key]) - new Date(x[key]);
  });
}

export function* recentSearchAsyn() {
  let userId = yield getState();
  const url = `${BASE_URL_8000}/api/recent_search/?userId=${userId}`;
  const config = {
    url,
    method: "GET",
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getRecentSearches(sorting(searchData.data, "timeCreated")));
    } else {
      yield put(setError(searchData.err.statusText));
    }
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

export function* savedSearchAsyn() {
  let userId = yield getState();
  const url = `${BASE_URL_8000}/api/saved_search/?userId=${userId}`;
  const config = {
    url,
    method: "GET",
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getSavedSearches(sorting(searchData.data, "timeCreated")));
    } else {
      yield put(setError(searchData.err.statusText));
    }
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

export function* addProtocolSponsor() {
  const sponsorUrl = `${BASE_URL_8000}/api/protocol_sponsor/?skip=0`;
  const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;
  // const protocolData = yield call(httpCall, {url, method:'GET'});
  yield put(setLoading(true));
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
export function* postAddProtocol(postData) {
  let userId = yield getState();
  const { payload: data } = postData;
  yield put(setLoading(true));
  const postUrl = `${BASE_URL}/pd/api/v1/documents/?sourceFileName=${data.fileName}&versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&sponsor=${data.sponsor}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&projectID=${data.projectID}&indication=${data.indication}&moleculeDevice=${data.moleculeDevice}&userId=${userId}`;
  const duplicateCheck = `${BASE_URL_8000}/api/duplicate_check/?versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&sponsor=${data.sponsor}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&userId=${userId}`;
  var bodyFormData = new FormData();
  bodyFormData.append("file", data.uploadFile[0]);
  try {
    const duplicateCheckRes = yield call(httpCall, {
      url: duplicateCheck,
      method: "GET",
    });
    if (duplicateCheckRes && duplicateCheckRes.data === null) {
      const postResponse = yield call(httpCall, {
        url: postUrl,
        method: "POST",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (postResponse.success) {
        yield put(setAddProtocolModal(false));
      } else {
        yield put(setAddProtocolModal(true));
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
    yield put(setAddprotocolError(err.statusText));
    yield put(setAddProtocolModal(false));
    yield put(setLoading(false));
  }
}

export function* toggleAddProtocol(data) {
  yield put(setAddProtocolModal(data.payload));
}
export function* resetErrorAddProtocol() {
  yield put(setAddprotocolError(""));
}

export function* saveRecentSearch(action) {
  if (action.payload) {
    let userId = yield getState();
    const url = `${BASE_URL_8000}/api/recent_search/`;
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
    } catch (err) {
      yield put(setError(err.statusText));
    }
  }
}
export function* sendQcReview() {
  const state = yield select();
  const ids = state.dashboard.selectedProtocols;
  const url = `${BASE_URL_8000}/api/protocol_metadatas/qc1_to_qc2?aidoc_id=${ids}`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    const data = yield call(httpCall, config);
    if (data.success) {
      toast.info("Sent For QC2 Approval Successfully");
    } else {
      toast.error("Error While Sending");
    }
    console.log(data);
  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong");
  }
}

export function* watchDashboard() {
  yield takeLatest("GET_PROTOCOL_TABLE_SAGA", protocolAsyn);
  yield takeEvery("GET_RECENT_SEARCH_DATA", recentSearchAsyn);
  yield takeEvery("GET_SPONSOR_ADDPROTCOL_SAGA", addProtocolSponsor);
  yield takeEvery("POST_ADDPROTOCOL_DATA", postAddProtocol);
  yield takeEvery("TOGGLE_ADDPROTOCOL_MODAL", toggleAddProtocol);
  yield takeEvery("GET_SAVED_SEARCH_DATA", savedSearchAsyn);
  yield takeEvery("RESET_ERROR_ADD_PROTOCOL", resetErrorAddProtocol);
  yield takeEvery("POST_RECENT_SEARCH_DASHBOARD", saveRecentSearch);
  yield takeLatest("GET_FOLLOWED_PROTOCOL_SAGA", followedProtocols);
  yield takeLatest("SEND_QC_REVIEW_SAGA", sendQcReview);
}

export default function* dashboardSaga() {
  yield all([watchDashboard()]);
}
