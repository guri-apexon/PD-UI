import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { getSummary } from "./protocolSlice.js";
import { httpCall } from "../../../utils/api";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// function* incrementAsync(data) {
//   yield delay(1000)
//   console.log('after delay saga')
//   yield put(incrementByAmount(data.payload))
//   console.log('after increment saga')
// }

function* getSummaryData(action) {
  console.log("pay", action.payload);
  const url = "../../../../protocolSummary.json";
  const data = yield call(httpCall, { url, method: "GET" });
  console.log(data);
  // getSummaryData(data)
  yield put(getSummary(data));
}

function* watchIncrementAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery("GET_PROTOCOL_SUMMARY", getSummaryData);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchIncrementAsync()]);
}
