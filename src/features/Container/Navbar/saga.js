/* eslint-disable */
import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';
import {
  getNotification,
  setError,
  deleteNotificationData,
  navbarNotifications,
} from './navbarSlice';

export function* navbarNotificationData(action) {
  const {
    payload: { userID },
  } = action;

  const notificationUrl = `${BASE_URL_8000}/api/pd_notification/?user_id=${userID}`;

  const notificationConfig = {
    url: notificationUrl,
    method: 'GET',
  };
  try {
    const notificationData = yield call(httpCall, notificationConfig);
    console.log('notificationData', notificationData);
    if (notificationData?.success) {
      const parseData = notificationData.data.map((item) => {
        item.protocolNumber = item.protocol;
        item.aidocId = item.doc_id;
        item.read = item.readFlag;
        item.details = item.protocolTitle;
        item.header = item.protocol;

        return item;
      });
      parseData?.sort(function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });

      yield put(getNotification(parseData));
    } else {
      yield put(setError(notificationData.err.statusText));
    }
  } catch (err) {
    yield put(setError('Something Went Wrong'));
  }
}

export function* handlereadNotification(action) {
  const {
    payload: { aidocId, id, protocol },
  } = action;

  const readConfig = {
    url: `${BASE_URL_8000}/api/pd_notification/update?aidocId=${aidocId}&id=${id}&protocol=${protocol}&action=${action.type}`,
    method: 'GET',
  };

  const readResp = yield call(httpCall, readConfig);

  if (readResp?.success) {
    const readData = yield select(navbarNotifications);
    const notificationResult = readData?.map((item) => {
      if (item?.id === id) {
        return { ...item, read: true };
      }
      return item;
    });

    yield put(getNotification(notificationResult));
  }
}

export function* handleDeleteNotification(action) {
  try {
    const {
      payload: { aidocId, id, protocol },
    } = action;

    const config = {
      url: `${BASE_URL_8000}/api/pd_notification/update?aidocId=${aidocId}&id=${id}&protocol=${protocol}&action=${action.type}`,
      method: 'GET',
    };

    const data = yield call(httpCall, config);

    if (data?.success) {
      yield put(deleteNotificationData(id));
    }
  } catch (e) {}
}

export function* watchNavbar() {
  yield takeEvery('GET_NOTIFICATION_SAGA', navbarNotificationData);
  yield takeEvery('read', handlereadNotification);
  yield takeEvery('delete', handleDeleteNotification);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
