/* eslint-disable */
import {
  takeEvery,
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import BASE_URL, { httpCall, BASE_URL_8000, UI_URL } from '../../../utils/api';
import {
  localISOTime,
  qcIconStatus,
  iconStatus,
} from '../../../utils/utilFunction';
import {
  getProtocols,
  setError,
  getRecentSearches,
  setAddprotocolError,
  setAddProtocolModal,
  setLoading,
  getSavedSearches,
  setApiError,
  getFollowedProtocols,
  setTableLoader,
  setSelectedProtocols,
  setworkflowData,
  setAddProtocolErrorState,
  setworkflowSubmit,
} from './dashboardSlice';
import { errorMessage, dashboardErrorType } from './constant';

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
    const userId = yield getState();
    const protocolUrl = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}`;

    const protocolConfig = {
      url: protocolUrl,
      method: 'GET',
    };
    try {
      const protocolData = yield call(httpCall, protocolConfig);

      if (protocolData.success) {
        const followedProtocolData = [];
        const myPorotocolsData = [];
        protocolData.data.map((item) => {
          item.protocolTitle = !item.protocolTitle ? '' : item.protocolTitle;
          item.protocol = !item.protocol ? '' : item.protocol;
          item.projectId = !item.projectId ? '' : item.projectId;
          item.sponsor = !item.sponsor ? '' : item.sponsor;
          item.uploadDate = !item.uploadDate ? '' : new Date(item.uploadDate);
          item.qcActivity = qcIconStatus(item.qcStatus, item.status);
          item.status = iconStatus(item.status, item.qcStatus);
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
  const userId = yield getState();
  const url = `${BASE_URL_8000}/api/recent_search/?userId=${userId}`;
  const config = {
    url,
    method: 'GET',
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getRecentSearches(sorting(searchData.data, 'timeCreated')));
    } else {
      yield put(setError(searchData.err.statusText));
    }
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

export function* savedSearchAsyn() {
  const userId = yield getState();
  const url = `${BASE_URL_8000}/api/saved_search/?userId=${userId}`;
  const config = {
    url,
    method: 'GET',
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getSavedSearches(sorting(searchData.data, 'timeCreated')));
    } else {
      yield put(setError(searchData.err.statusText));
    }
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

export function* postAddProtocol(postData) {
  const userId = yield getState();
  const { payload: data } = postData;
  yield put(setLoading(true));
  const postUrl = `${BASE_URL}/pd/api/v1/documents/?sourceFileName=${data.fileName}&versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&projectID=${data.projectID}&userId=${userId}&duplicateCheck=${data.duplicateCheck}`;
  const duplicateCheck = `${BASE_URL_8000}/api/duplicate_check/?versionNumber=${data.protocol_version}&protocolNumber=${data.protocol_number}&sponsor=${data.sponsor}&documentStatus=${data.documentStatus}&amendmentNumber=${data.amendmentNumber}&userId=${userId}`;
  const bodyFormData = new FormData();
  bodyFormData.append('file', data.uploadFile[0]);
  try {
    const duplicateCheckRes = yield call(httpCall, {
      url: duplicateCheck,
      method: 'GET',
    });
    if (duplicateCheckRes && duplicateCheckRes.data === null) {
      const postResponse = yield call(httpCall, {
        url: postUrl,
        method: 'POST',
        data: bodyFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
        checkAuth: true,
      });
      if (postResponse.success) {
        yield put(setAddProtocolModal(false));
        yield put({ type: 'GET_PROTOCOL_TABLE_SAGA' });
        yield put(
          setAddProtocolErrorState({
            type: '',
            data: {},
          }),
        );
      } else {
        yield put(setAddProtocolModal(true));
        yield put(setAddprotocolError('Upload Failed'));
        const { err } = postResponse;
        if (err.status === 400) {
          yield put(
            setAddProtocolErrorState({
              type: 'inputCheck',
              data: {
                message: err.data.message,
              },
            }),
          );
        } else {
          const parsedMsgArr = JSON.parse(err.data.message);
          yield put(
            setAddProtocolErrorState({
              type: 'protocolDuplicate',
              data: {
                message: errorMessage.protocolDuplicate,
                protocolName: parsedMsgArr.duplicate_docs[0].protocol,
                docid: parsedMsgArr.duplicate_docs[0].id,
              },
            }),
          );
        }
      }
    } else {
      yield put(setAddProtocolModal(true));
      yield put(
        setAddprotocolError(
          duplicateCheckRes && duplicateCheckRes.data.Duplicate
            ? duplicateCheckRes.data.Duplicate
            : errorMessage.attributeDuplicate,
        ),
      );
    }

    yield put(setLoading(false));
  } catch (err) {
    yield put(setAddprotocolError('Upload Failed'));
    // yield put(setAddProtocolModal(false));
    yield put(setLoading(false));
  }
}

export function* toggleAddProtocol(data) {
  yield put(setAddProtocolModal(data.payload));
}
export function* resetErrorAddProtocol() {
  yield put(setAddprotocolError(''));
}
export function* resetErrorAddProtocolNew() {
  yield put(
    setAddProtocolErrorState({
      type: '',
      data: {},
    }),
  );
}

export function* saveRecentSearch(action) {
  if (action.payload) {
    const userId = yield getState();
    const url = `${BASE_URL_8000}/api/recent_search/`;
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
    targetStatus: 'QC1',
  };
  const url = `${BASE_URL_8000}/api/protocol_metadata/change_qc_status`;
  const config = {
    url,
    method: 'PUT',
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

    yield put({ type: 'GET_PROTOCOL_TABLE_SAGA' });
    if (success.length) {
      toast.info('Sent to QC Review Successfully');
    }
    if (failure.length) {
      toast.error('Something Went Wrong');
    }
  } catch (err) {
    toast.error('Something Went Wrong');
  }
}

function* handleDownload(action) {
  try {
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        action.payload,
      )}`,
      method: 'GET',
    };
    let url;
    const resp = yield call(httpCall, config);

    url = `${UI_URL}/${resp.data}`;
    const encodeUrl = encodeURI(url);
    const myWindow = window.open('about:blank', '_blank');
    myWindow.document.write(
      `<embed src=${encodeUrl}  frameborder="0" width="100%" height="100%">`,
    );
  } catch (err) {
    toast.error('Download Failed');
  }
}

export function* handleFollow(action) {
  try {
    const { data, follow } = action.payload;
    const id = yield getState();
    const state = yield select();
    console.log('SHUBHAM', id);
    const protocolData = state.dashboard.followedProtocols;
    const temp = cloneDeep(protocolData);
    const lists = temp.filter((item) => {
      return item.protocol !== data.protocol;
    });
    const config = {
      url: `${BASE_URL_8000}/api/follow_protocol/`,
      method: 'POST',
      data: {
        userId: id,
        protocol: data.protocol,
        follow,
        userRole: data.UserRole,
      },
    };
    const res = yield call(httpCall, config);

    if (res && res.data) {
      toast.info('Protocol Successfully Unfollowed');
      yield put(getFollowedProtocols(lists));
      yield put({ type: 'GET_PROTOCOL_TABLE_SAGA', payload: lists });
      yield put({ type: 'GET_OPT_IN_OUT', payload: { userID: id } });

      yield put({ type: 'GET_NOTIFICATION_SAGA', payload: id });
    }
  } catch (err) {
    toast.error('Something Went Wrong');
    console.log(err);
  }
}

export function* fetchAssociateData(action) {
  const { protocol, id } = action.payload;
  const state = yield select();
  const userId = yield getState();
  const protocolData = state.dashboard.followedProtocols;
  try {
    const config = {
      url: `${BASE_URL_8000}/api/Related_protocols/?protocol=${protocol}&userId=${userId}`,
      method: 'GET',
    };
    const resp = yield call(httpCall, config);
    const respData = resp.data;
    const data = respData.sort((a, b) => {
      return new Date(b.approvalDate) - new Date(a.approvalDate);
    });
    if (data.length > 0) {
      const temp = cloneDeep(protocolData);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp[i].associateddata = data;
          temp[i].linkEnabled = false;
        }
      }
      yield put(getFollowedProtocols(temp));
    } else {
      const temp = cloneDeep(protocolData);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp[i].linkEnabled = false;
        }
      }
      yield put(getFollowedProtocols(temp));
      toast.info(
        `The Protocol: "${protocol}" selected has no associated protocols available`,
      );
    }
  } catch (e) {
    toast.error('Something Went Wrong');
  }
}

export function* fetchWorkflowData(action) {
  const loadingData = {
    loading: true,
    error: null,
    data: [],
  };
  yield put(setworkflowData(loadingData));
  try {
    const config = {
      url: `/workflownew.json`,
      method: 'GET',
    };
    const { data } = yield call(httpCall, config);
    const successData = {
      loading: false,
      error: null,
      data: data.workflows,
    };
    yield put(setworkflowData(successData));
  } catch (e) {
    const errorData = {
      loading: true,
      error: 'API ERROR',
      data: [],
    };
    yield put(setworkflowData(errorData));
  }
}
export function* submitWorkflowData(action) {
  const loadingData = {
    loading: true,
    error: null,
    data: [],
  };
  yield put(setworkflowSubmit(loadingData));
  try {
    console.log('payload', action.payload);
    const { id, body } = action.payload;
    const config = {
      url: `/post?id=${id}`,
      method: 'POST',
      data: body,
      headers: { 'Content-Type': 'application/json' },
      checkAuth: true,
    };
    const { data } = yield call(httpCall, config);
    const successData = {
      loading: false,
      error: null,
      data: data.workflows,
    };
    yield put(setworkflowSubmit(successData));
    yield put(setAddProtocolModal(false));
    yield put({ type: 'GET_PROTOCOL_TABLE_SAGA' });
  } catch (e) {
    const errorData = {
      loading: true,
      error: 'API ERROR',
      data: [],
    };
    yield put(setworkflowSubmit(errorData));
  }
}

export function* watchDashboard() {
  yield takeLatest('GET_PROTOCOL_TABLE_SAGA', protocolAsyn);
  yield takeEvery('GET_RECENT_SEARCH_DATA', recentSearchAsyn);
  yield takeEvery('POST_ADDPROTOCOL_DATA', postAddProtocol);
  yield takeEvery('TOGGLE_ADDPROTOCOL_MODAL', toggleAddProtocol);
  yield takeEvery('GET_SAVED_SEARCH_DATA', savedSearchAsyn);
  yield takeEvery('RESET_ERROR_ADD_PROTOCOL', resetErrorAddProtocol);
  yield takeEvery('RESET_ERROR_ADD_PROTOCOL_NEW', resetErrorAddProtocolNew);
  yield takeEvery('POST_RECENT_SEARCH_DASHBOARD', saveRecentSearch);
  yield takeLatest('SEND_QC_REVIEW_SAGA', sendQcReview);
  yield takeLatest('HANDLE_DOWNLOAD_SAGA', handleDownload);
  yield takeLatest('HANDLE_FOLLOW_SAGA', handleFollow);
  yield takeLatest('FETCH_ASSOCIATE_DATA', fetchAssociateData);
  yield takeLatest('FETCH_WORKFLOW_DATA', fetchWorkflowData);
  yield takeLatest('SUBMIT_WORKFLOW_DATA', submitWorkflowData);
}

export default function* dashboardSaga() {
  yield all([watchDashboard()]);
}
