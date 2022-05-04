import { takeEvery, all, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "./ActionTypes";

import { fetchOverviewData } from "./sagas/overview-saga";
import { fetchViewData } from "./sagas/view-saga";
import { fetchRelatedProtocols } from "./sagas/related-saga";
import { fetchFileStream } from "./sagas/fileStream-saga";
import {
  fetchProtocolViewData,
  handleExpandBPO,
  updateDataStream,
  updateDataEdit,
} from "./sagas/wrapper-saga";
import { fetchProtocolViewData1, handleExpandBPO1 } from "./sagas/wrapper-meta";
import { fetchPTData } from "./sagas/pt-data";

function* watchProtocolAsync() {
  yield takeEvery(ActionTypes.GET_PROTOCOL_OVERVIEW, fetchOverviewData);
  yield takeLatest(ActionTypes.GET_PROTOCOL_VIEW, fetchViewData);
  yield takeLatest(ActionTypes.GET_RELATED_PROTOCOL, fetchRelatedProtocols);
  yield takeLatest(ActionTypes.GET_PROTOCOL_VIEW_NEW, fetchProtocolViewData);
  yield takeLatest(ActionTypes.GET_FILE_STREAM, fetchFileStream);
  yield takeLatest(ActionTypes.GET_PT_DATA, fetchPTData);
  yield takeLatest(ActionTypes.HANDLE_EXPAND_BPO, handleExpandBPO);
  yield takeLatest(ActionTypes.HANDLE_EXPAND_BPO1, handleExpandBPO1);
  yield takeLatest(ActionTypes.GET_PROTOCOL_VIEW_NEW1, fetchProtocolViewData1);
  yield takeLatest(ActionTypes.UPDATE_PROTOCOL_VIEW, updateDataStream);
  yield takeLatest(ActionTypes.UPDATE_PROTOCOL_VIEW_CHANGES, updateDataEdit);
}
export default function* protocolSaga() {
  yield all([watchProtocolAsync()]);
}
