/* eslint-disable */
import { toast } from 'react-toastify';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { Apis, BASE_URL_8000, httpCall } from '../../../utils/api';
import {
  deleteNotificationData,
  getNotification,
  getOptInOutData,
  navbarNotifications,
  setError,
} from './navbarSlice';

export function* navbarNotificationData(action) {
  const {
    payload: { userID },
  } = action;

  const notificationUrl = `${BASE_URL_8000}/api/user_alert/?userId=${userID}`;

  const notificationConfig = {
    url: notificationUrl,
    method: 'GET',
  };
  try {
    const notificationData = yield call(httpCall, notificationConfig);
    if (notificationData?.success) {
      const parseData = notificationData.data.map((item) => {
        item.protocolNumber = item.protocol;
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
    payload: { aidocId, id, protocol, alert_id },
  } = action;

  const readConfig = {
    url: `${BASE_URL_8000}/api/notification_read/`,
    method: 'POST',
    data: {
      id,
      protocol,
      aidocId,
      readFlag: true,
      notification_delete: false,
      alert_id,
    },
  };

  const readResp = yield call(httpCall, readConfig);

  if (readResp?.success) {
    const readData = yield select(navbarNotifications);
    const notificationResult = readData?.map((item) => {
      if (item?.alert_id === alert_id) {
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
      payload: { aidocId, id, protocol, alert_id },
    } = action;

    const config = {
      url: `${BASE_URL_8000}/api/notification_read/`,
      method: 'POST',
      data: {
        id: id,
        protocol: protocol,
        aidocId: aidocId,
        readFlag: true,
        notification_delete: true,
        alert_id,
      },
    };

    const data = yield call(httpCall, config);

    if (data?.success) {
      yield put(deleteNotificationData(alert_id));
    }
  } catch (e) {}
}

export function* postOptInOut(action) {
  const {
    payload: { data },
  } = action;
  const config = {
    url: `${BASE_URL_8000}${Apis.USER_ALERT_SETTING}/update_setting/`,
    method: 'POST',
    data: {
      data,
    },
  };
  const postData = yield call(httpCall, config);
  if (postData?.success) {
    yield put(getOptInOutData({ option: postData?.data?.options }));
    toast.info('Opt In/Out Data Updated Successfully');
  } else {
    toast.error('Error While Updation');
  }
}

export function* getOptInOut(action) {
  const {
    payload: { userID },
  } = action;
  const config = {
    url: `${BASE_URL_8000}${Apis.USER_ALERT_SETTING}/?user_id=${userID}`,
    method: 'GET',
  };
  const getData = yield call(httpCall, config);
  if (getData?.success) {
    yield put(getOptInOutData({ option: getData?.data?.options }));
  } else {
    toast.error('Error While Getting Data');
  }
}

export function* watchNavbar() {
  yield takeEvery('GET_NOTIFICATION_SAGA', navbarNotificationData);
  yield takeEvery('POST_OPT_IN_OUT', postOptInOut);
  yield takeEvery('GET_OPT_IN_OUT', getOptInOut);
  yield takeEvery('READ_NOTIFICATION', handlereadNotification);
  yield takeEvery('DELETE_NOTIFICATION', handleDeleteNotification);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
