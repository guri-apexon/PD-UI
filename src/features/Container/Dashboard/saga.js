import {
  takeEvery,
  all,
  call,
  put,
  select,
  takeLatest,
} from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";
// import uniqBy from "lodash/uniqBy";
import { toast } from "react-toastify";
import BASE_URL, { httpCall, BASE_URL_8000, UI_URL } from "../../../utils/api";
import {
  localISOTime,
  qcIconStatus,
  iconStatus,
} from "../../../utils/utilFunction";
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
  setSelectedProtocols,
  setIndicationLoading,
  setSponsorLoading,
} from "./dashboardSlice";

function* getState() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
}

export function* protocolAsyn(action) {
  if (action.payload && action.payload.length > 0) {
    yield put(getFollowedProtocols(action.payload));
  } else {
    yield put(setTableLoader(true));
    yield put(setSelectedProtocols([]));
    let userId = yield getState();
    const protocolUrl = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}`;

    const protocolConfig = {
      url: protocolUrl,
      method: "GET",
    };
    try {
      const protocolData = yield call(httpCall, protocolConfig);

      if (protocolData.success) {
        const followedProtocolData = [];
        const myPorotocolsData = [];
        protocolData.data.map((item, i) => {
          // item.id = item.aidocId;
          item.protocolTitle = !item.protocolTitle ? "" : item.protocolTitle;
          item.protocol = !item.protocol ? "" : item.protocol;
          item.projectId = !item.projectId ? "" : item.projectId;
          item.sponsor = !item.sponsor ? "" : item.sponsor;
          item.uploadDate = !item.uploadDate ? "" : new Date(item.uploadDate);
          item.qcActivity = qcIconStatus(item.qcStatus);
          item.status = iconStatus(item.status);
          if (item.userUploadedFlag || item.userPrimaryRoleFlag) {
            myPorotocolsData.push(item);
          }
          if (item.userFollowingFlag) {
            followedProtocolData.push(item);
          }
          return item;
        });

        yield put(getProtocols(myPorotocolsData));
        yield put(getFollowedProtocols(followedProtocolData));
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
  yield put(setSponsorLoading(true));

  try {
    const sponsorList = yield call(httpCall, {
      url: sponsorUrl,
      method: "GET",
    });
    if (sponsorList.success) {
      let actualSponsorList = sponsorList.data.map((item) => {
        let temp = Object.assign({}, item);
        temp.label = item.sponsorName;
        return temp;
      });
      yield put(getSponsor(actualSponsorList));
      yield put(setSponsorLoading(false));
    } else {
      yield put(setError(sponsorList.err.statusText));
      yield put(setSponsorLoading(false));
      yield put(setApiError(true));
    }
  } catch (err) {
    yield put(setError(err.statusText));
    yield put(setSponsorLoading(false));
    yield put(setApiError(true));
  }
}
export function* addProtocolIndication() {
  const indicationUrl = `${BASE_URL_8000}/api/indications/?skip=0`;
  yield put(setIndicationLoading(true));
  try {
    const indicationList = yield call(httpCall, {
      url: indicationUrl,
      method: "GET",
    });
    if (indicationList.success) {
      let actualIndicationList = indicationList.data.map((item) => {
        let temp = Object.assign({}, item);
        temp.label = item.indicationName;
        return temp;
      });
      yield put(getIndication(actualIndicationList));
      yield put(setIndicationLoading(false));
    } else {
      yield put(setError(indicationList.err.statusText));
      yield put(setIndicationLoading(false));
      yield put(setApiError(true));
    }
  } catch (err) {
    yield put(setError(err.statusText));
    yield put(setIndicationLoading(false));
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
        checkAuth: true,
      });
      if (postResponse.success) {
        yield put(setAddProtocolModal(false));
      } else {
        yield put(setAddProtocolModal(true));
        yield put(setAddprotocolError("Upload Failed"));
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
    yield put(setAddprotocolError("Upload Failed"));
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
        timeCreated: localISOTime(),
        lastUpdated: localISOTime(),
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
  const obj = {
    docIdArray: ids,
    targetStatus: "QC1",
  };
  const url = `${BASE_URL_8000}/api/protocol_metadata/change_qc_status`;
  const config = {
    url: url,
    method: "PUT",
    data: obj,
  };
  try {
    const data = yield call(httpCall, config);
    const success = [];
    const failure = [];
    const resObj = data.data.response;
    ids.map((item) => {
      if (resObj[item] && resObj[item].is_success) {
        success.push(item);
      } else {
        failure.push(item);
      }
      return item;
    });

    yield put({ type: "GET_PROTOCOL_TABLE_SAGA" });
    if (success.length) {
      toast.info(`Sent to QC Review Successfully`);
    }
    if (failure.length) {
      toast.error(`Something Went Wrong`);
    }
  } catch (err) {
    console.log(err);
    toast.error("Something Went Wrong");
  }
}

function* handleDownload(action) {
  try {
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${action.payload}`,
      method: "GET",
    };
    let url;
    const resp = yield call(httpCall, config);

    url = `${UI_URL}/${resp.data}`;
    let encodeUrl = encodeURI(url);
    let myWindow = window.open("about:blank", "_blank");
    myWindow.document.write(
      `<embed src=${encodeUrl}  frameborder="0" width="100%" height="100%">`
    );
  } catch (err) {
    console.log(err);
    toast.error("Download Failed");
  }
}

function* handleFollow(action) {
  try {
    const { data, follow } = action.payload;
    const id = yield getState();
    const state = yield select();
    const protocolData = state.dashboard.followedProtocols;
    let temp = cloneDeep(protocolData);
    var lists = temp.filter((item) => {
      return item.protocol !== data.protocol;
    });
    const config = {
      url: `${BASE_URL_8000}/api/follow_protocol/`,
      method: "POST",
      data: {
        userId: id,
        protocol: data.protocol,
        follow: follow,
        userRole: data.UserRole,
      },
    };
    const res = yield call(httpCall, config);
    if (res && res.data) {
      toast.info(`Protocol Successfully Unfollowed`);
      yield put(getFollowedProtocols(lists));
      yield put({ type: "GET_PROTOCOL_TABLE_SAGA", payload: lists });

      yield put({ type: "GET_NOTIFICATION_SAGA", payload: id });
    }
  } catch (err) {
    toast.error("Something Went Wrong");
    console.log(err);
  }
}

function* fetchAssociateData(action) {
  const { protocol, id } = action.payload;
  const state = yield select();
  const protocolData = state.dashboard.followedProtocols;
  try {
    const config = {
      url: `${BASE_URL_8000}/api/Related_protocols/?protocol=${protocol}`,
      method: "GET",
    };
    const resp = yield call(httpCall, config);
    const respData = resp.data;
    const data = respData.sort((a, b) => {
      return new Date(b.approvalDate) - new Date(a.approvalDate);
    });
    if (data.length > 0) {
      let temp = cloneDeep(protocolData);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp[i].associateddata = data;
          temp[i].linkEnabled = false;
        }
      }
      yield put(getFollowedProtocols(temp));
    } else {
      let temp = cloneDeep(protocolData);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp[i].linkEnabled = false;
        }
      }
      yield put(getFollowedProtocols(temp));
      toast.info(
        `The Protocol: "${protocol}" selected has no associated protocols available`
      );
    }
  } catch (e) {
    console.log(e);
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
  yield takeLatest("SEND_QC_REVIEW_SAGA", sendQcReview);
  yield takeLatest("GET_INDICATION_ADDPROTCOL_SAGA", addProtocolIndication);
  yield takeLatest("HANDLE_DOWNLOAD_SAGA", handleDownload);
  yield takeLatest("HANDLE_FOLLOW_SAGA", handleFollow);
  yield takeLatest("FETCH_ASSOCIATE_DATA", fetchAssociateData);
}

export default function* dashboardSaga() {
  yield all([watchDashboard()]);
}
