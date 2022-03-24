import { takeEvery, all, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "./ActionTypes";

import { fetchOverviewData } from "./sagas/overview-saga";
import { fetchViewData } from "./sagas/view-saga";
import { fetchRelatedProtocols } from "./sagas/related-saga";
import { fetchFileStream } from "./sagas/fileStream-saga";
import { fetchProtocolViewData } from "./sagas/wrapper-saga";

function* watchProtocolAsync() {
  yield takeEvery(ActionTypes.GET_PROTOCOL_OVERVIEW, fetchOverviewData);
  yield takeLatest(ActionTypes.GET_PROTOCOL_VIEW, fetchViewData);
  yield takeLatest(ActionTypes.GET_RELATED_PROTOCOL, fetchRelatedProtocols);
  yield takeLatest(ActionTypes.GET_PROTOCOL_VIEW_NEW, fetchProtocolViewData);
  yield takeLatest(ActionTypes.GET_FILE_STREAM, fetchFileStream);
}
export default function* protocolSaga() {
  yield all([watchProtocolAsync()]);
}
