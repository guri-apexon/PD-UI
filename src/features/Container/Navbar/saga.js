import { takeEvery, all, call, put, select } from "redux-saga/effects";

import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { getNotification, setError } from "./navbarSlice";
// function* getState() {
//   const state = yield select();
//   const type = state.user.userDetail.user_type;
//   const id = state.user.userDetail.userId;
//   return { id: id.substring(1), type: type };
// }

export function* navbarNotificationData(action) {
  const notificationUrl = `${BASE_URL_8000}/api/user_alert/?userId=${action.payload}`;
  const notificationConfig = {
    url: notificationUrl,
    method: "GET",
  };
  try {
    const notificationData = yield call(httpCall, notificationConfig);

    if (notificationData.success) {
      const parseData = notificationData.data.map((item, index) => {
        item.read = item.readFlag;
        if (index === 1) {
          item.read = false;
        }
        // item.read = false;
        // item.read = item.readFlag;
        item.header = item.protocol;
        // item.details = item.shortTitle;
        item.details =
          "A Phase I, Open-label Study to Assess the Safety, Tolerability, Pharmacokinetics and Anti-Tumour Activity of Adavosertib (AZD1775) in Japanese Patients with Advanced Solid Tumours";
        item.timestamp = item.timeCreated;
        item.protocolNumber = item.protocol;
        return item;
      });
      yield put(getNotification(parseData));
    } else {
      yield put(setError(notificationData.err.statusText));
    }
  } catch (err) {
    yield put(setError("Something Went Wrong"));
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
  // yield takeEvery("SET_NOTIFICATION_READ_SAGA", setRead);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
