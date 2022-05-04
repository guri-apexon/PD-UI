import { put, call } from "redux-saga/effects";
import { getOverviewData } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { getUserId } from "./utils";

export function* fetchOverviewData(action) {
  const preLoadingState = {
    success: false,
    loading: true,
    data: null,
  };
  yield put(getOverviewData(preLoadingState));
  let userId = yield getUserId();
  const url = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}&docId=${action.payload}`;

  const resp = yield call(httpCall, { url, method: "GET" });
  if (resp.success) {
    if (resp.data && resp.data.length) {
      let obj = {
        loading: false,
        success: true,
        data: resp.data[0],
      };
      yield put(getOverviewData(obj));
    } else {
      let obj = {
        loading: false,
        success: true,
        data: null,
        error: "No Data Available for this Protocol",
      };
      yield put(getOverviewData(obj));
    }
  } else {
    let obj = {
      loading: false,
      success: true,
      data: null,
      error: "Data Feching Failed",
    };
    yield put(getOverviewData(obj));
  }
}
