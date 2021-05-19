import { takeEvery, all, call, put, select } from "redux-saga/effects";

import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { getNotification, setError } from "./navbarSlice";
// function* getState() {
//   const state = yield select();
//   const type = state.user.userDetail.user_type;
//   const id = state.user.userDetail.userId;
//   return { id: id.substring(1), type: type };
// }
export function* navbarNotificationData() {
  const notificationUrl = `/notifications.json`;
  const notificationConfig = {
    url: notificationUrl,
    method: "GET",
  };
  try {
    const notificationData = yield call(httpCall, notificationConfig);

    if (notificationData.success) {
      yield put(getNotification(notificationData.data));
    } else {
      yield put(setError(notificationData.err.statusText));
    }
  } catch (err) {
    yield put(setError("Something Went Wrong"));
  }
}

// export function* setRead(action) {
//   const notificationUrl = `${BASE_URL_8000}/notification?id=${action.payload}`;
//   const notificationConfig = {
//     url: notificationUrl,
//     method: "PUT",
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
  yield takeEvery("SET_NOTIFICATION_READ_SAGA", setRead);
}

export default function* qcSaga() {
  yield all([watchNavbar()]);
}
