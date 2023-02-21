/* eslint-disable */
import { CalendarCheck } from 'apollo-react-icons';
import { takeEvery, all, call, put, select } from 'redux-saga/effects';
import { httpCall, BASE_URL_8000 } from '../../../utils/api';
import {
  getNotification,
  setError,
  deleteNotificationData,
  navbarNotifications,
} from './navbarSlice';
import data from './__test__/alertdata.json';

export function* navbarNotificationData(action) {
  const notificationUrl = `${BASE_URL_8000}/api/user_alert/?userId=${action.payload}`;
  const notificationConfig = {
    url: notificationUrl,
    method: 'GET',
  };
  try {
    const notificationData = yield call(httpCall, notificationConfig);

    if (notificationData.success) {
      const parseData = data;
      parseData.sort(function (a, b) {
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
    payload: { id },
  } = action;
  const readConfig = {
    // url: `${BASE_URL_8000}/api/notification_read/`,
    method: 'POST',
    data: {
      id: id,
    },
  };
  const readData = yield select(navbarNotifications);
  const notificationResult = readData?.map((item) => {
    if (item?.id === id) {
      return { ...item, read: true };
    }
    return item;
  });

  yield put(getNotification(notificationResult));
}

export function* handleDeleteNotification(action) {
  try {
    const {
      payload: { id, protocol, aidocId, read, details, header, timestamp },
    } = action;
    const config = {
      // url: `${BASE_URL}${Apis.METADATA}/delete_meta_data`,
      method: 'DELETE',
      data: {
        id: id,
        protocol: protocol,
        aidocId: aidocId,
        read,
        details,
        header,
        timestamp,
      },
    };
    // const data = yield call(httpCall, config);
    yield put(deleteNotificationData(id));
    toast.info('Notification successfully deleted');
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
