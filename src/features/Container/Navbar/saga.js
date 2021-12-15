import { takeEvery, all, call, put } from "redux-saga/effects";

import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { getNotification, setError } from "./navbarSlice";

export function* navbarNotificationData(action) {
  const notificationUrl = `${BASE_URL_8000}/api/user_alert/?userId=${action.payload}`;
  const notificationConfig = {
    url: notificationUrl,
    method: "GET",
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
    yield put(setError("Something Went Wrong"));
  }
}

export function* readNotification(action) {
  const data = action.payload;
  const readConfig = {
    url: `${BASE_URL_8000}/api/notification_read/`,
    method: "POST",
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
  yield takeEvery("GET_NOTIFICATION_SAGA", navbarNotificationData);
  yield takeEvery("READ_NOTIFICATION_SAGA", readNotification);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
