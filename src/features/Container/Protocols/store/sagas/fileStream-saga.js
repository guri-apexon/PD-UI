import { put, call } from "redux-saga/effects";
import { getFileStream } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { getUserId } from "./utils";

export function* fetchFileStream(action) {
  const preLoadingState = {
    loader: true,
    success: false,
    error: "",
    data: null,
  };
  yield put(getFileStream(preLoadingState));

  let userId = yield getUserId();
  const { name, dfsPath } = action.payload;
  const config = {
    url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
      dfsPath
    )}&userId=${userId}&protocol=${name}`,
    method: "GET",
    responseType: "blob",
  };
  const { data, success } = yield call(httpCall, config);
  if (success) {
    const file = new Blob([data], { type: "application/pdf" });
    const successState = {
      loader: false,
      success: true,
      error: "",
      data: file,
    };
    yield put(getFileStream(successState));
  } else {
    const errorState = {
      loader: false,
      success: false,
      error: "Error",
      data: data,
    };
    yield put(getFileStream(errorState));
  }
}
