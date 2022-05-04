import { put, call } from "redux-saga/effects";
import { getAssociateDocuments } from "../slice";
import { httpCall, BASE_URL_8000 } from "../../../../../utils/api";
import { getUserId } from "./utils";

export function* fetchRelatedProtocols(action) {
  const preLoadingState = {
    success: false,
    loading: true,
    data: null,
  };
  yield put(getAssociateDocuments(preLoadingState));
  let userId = yield getUserId();
  const URL = `${BASE_URL_8000}/api/Related_protocols/?protocol=${action.payload}&userId=${userId}`;
  //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
  const config = {
    url: URL,
    method: "GET",
  };
  const associateDocs = yield call(httpCall, config);
  if (associateDocs.success) {
    yield put(getAssociateDocuments(associateDocs.data));
  } else {
    yield put(getAssociateDocuments([]));
  }
}
