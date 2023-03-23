/* eslint-disable */
import { toast } from 'react-toastify';
import { takeEvery, all, call, put } from 'redux-saga/effects';
import { httpCall, BASE_URL_8000, Apis } from '../../../utils/api';
import { settingOptInOut } from '../../../utils/utilFunction';
import { getNotification, getOptInOutData, setError } from './navbarSlice';

export function* navbarNotificationData(action) {
  const notificationUrl = `${BASE_URL_8000}/api/user_alert/?userId=${action.payload}`;
  const notificationConfig = {
    url: notificationUrl,
    method: 'GET',
  };
  try {
    const notificationData = yield call(httpCall, notificationConfig);

    if (notificationData.success) {
      const parseData = notificationData.data.map((item) => {
        item.read = item.readFlag;
        item.header = item.protocol;
        item.details = item.protocolTitle;
        item.timestamp = item.timeCreated;
        item.protocolNumber = item.protocol;
        return item;
      });
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

export function* readNotification(action) {
  const data = action.payload;
  const readConfig = {
    url: `${BASE_URL_8000}/api/notification_read/`,
    method: 'POST',
    data: {
      id: data.id,
      protocol: data.protocol,
      aidocId: data.aidocId,
      readFlag: true,
    },
  };
  try {
    const readResp = yield call(httpCall, readConfig);
    if (readResp.success) {
      window.location.href = `/protocols?protocolId=${data.aidocId}&tab=2`;
    }
  } catch (err) {
    /* istanbul ignore next */
    console.log(err);
  }
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
  yield takeEvery('READ_NOTIFICATION_SAGA', readNotification);
  yield takeEvery('POST_OPT_IN_OUT', postOptInOut);
  yield takeEvery('GET_OPT_IN_OUT', getOptInOut);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
