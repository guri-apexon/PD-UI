import { takeEvery, all, call, put } from "redux-saga/effects";
import { httpCall } from "../../../utils/api";
import { getProtocols, setError, setCompareSelected, getRecentSearches } from "./dashboardSlice";
function* protocolAsyn() {
  const url = "./rows.json";
  const config = {
    url,
    method: "GET",
  };
  try {
    const protocolData = yield call(httpCall, config);
    if (protocolData.success) {
      yield put(getProtocols(protocolData.data));
    }
    yield put(setError(protocolData.err.statusText));
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

function* compareSelectedAsyn(action) {
  console.log(action.payload === 2);
  if (action.payload === 2) {
    yield put(setCompareSelected(true));
  } else {
    yield put(setCompareSelected(false));
  }
}

function* recentSearchAsyn() {
  const url = "./recentSearches.json";
  const config = {
    url,
    method: "GET",
  };
  try {
    const searchData = yield call(httpCall, config);
    if (searchData.success) {
      yield put(getRecentSearches(searchData.data));
    }
    yield put(setError(searchData.err.statusText));
  } catch (err) {
    yield put(setError(err.statusText));
  }
}

function* watchDashboard() {
  yield takeEvery("GET_PROTOCOL_TABLE_SAGA", protocolAsyn);
  yield takeEvery("CHECK_COMPARE_SAGA", compareSelectedAsyn);
  yield takeEvery("GET_RECENT_SEARCH_DATA", recentSearchAsyn);
}

export default function* dashboardSaga() {
  yield all([watchDashboard()]);
}
