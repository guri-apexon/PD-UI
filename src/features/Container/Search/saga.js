import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { getFilters, getSearchResult } from "./searchSlice";
import { httpCall } from "../../../utils/api";

function* getFilterData(action) {
  console.log("search", action.payload);
  const url = "../../../../filters.json";
  const data = yield call(httpCall, { url, method: "GET" });
  console.log(data);
  // getSummaryData(data)
  yield put(getFilters(data));
}

function* getSearchData(action) {
    console.log("search", action.payload);
    const url = "../../../../searchResult.json";
    const data = yield call(httpCall, { url, method: "GET" });
    console.log(data);
    // getSummaryData(data)
    yield put(getSearchResult(data));
  }

function* watchIncrementAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery("GET_SEARCH_FILTER", getFilterData);
  yield takeEvery("GET_SEARCH_RESULT", getSearchData);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchIncrementAsync()]);
}
