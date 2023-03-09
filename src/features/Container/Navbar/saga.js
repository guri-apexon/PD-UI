/* eslint-disable */
import { toast } from 'react-toastify';
import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import { httpCall, BASE_URL_8000, getToken } from '../../../utils/api';
import {
  getNotification,
  setError,
  deleteNotificationData,
  navbarNotifications,
} from './navbarSlice';
import data from './__test__/alertdata.json';
import Cookies from 'universal-cookie';

const cookiesServer = new Cookies();

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
  console.log('action54', action);

  const {
    payload: { aidocId, id, protocol },
  } = action;

  const readConfig = {
    url: `${BASE_URL_8000}/api/pd_notification/update?aidocId=${aidocId}&id=${id}&protocol=${protocol}&action=${action.type}`,
    method: 'POST',
    data: {
      aidocId: aidocId,
      id: id,
      protocol: protocol,
    },
  };

  const readResp = yield call(httpCall, readConfig);
  console.log('readResp', readResp);
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
  let token = cookiesServer.get('api_token');
  if (!token) {
    getToken();
    token = cookiesServer.get('api_token');
  }
  console.log('action81', action);
  try {
    const {
      payload: { aidocId, id, protocol },
    } = action;
    const config = {
      url: `${BASE_URL_8000}/api/pd_notification/update?aidocId=${aidocId}&id=${id}&protocol=${protocol}&action=${action.type}`,
      method: 'DELETE',
      data: {
        aidocId: aidocId,
        id: id,
        protocol: protocol,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    };
    const data = yield call(httpCall, config);
    console.log('data', data);
    if (data?.success) {
      yield put(deleteNotificationData(id));
      toast.info('Notification successfully deleted');
    }
  } catch (e) {}
}

// export function* setRead(action) {
//   const notificationUrl = `${BASE_URL_8000}/api/notification_read`;
//   const notificationConfig = {
//     url: notificationUrl,
//     method: "POST",
//     data: action.payload,
//   };
//   try {
//     const notificationData = yield call(httpCall, notificationConfig);

//     if (notificationData.success) {
//       yield put(getNotification(notificationData.data));
//     } else {
//       yield put(setError(notificationData.err.statusText));
//     }
//   } catch (err) {
//     yield put(setError("Something Went Wrong"));
//   }
// }

export function* watchNavbar() {
  yield takeEvery('GET_NOTIFICATION_SAGA', navbarNotificationData);
  yield takeEvery('READ_NOTIFICATION_SAGA', handlereadNotification);
  yield takeEvery('DELETE_NOTIFICATION', handleDeleteNotification);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
