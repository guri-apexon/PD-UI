import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { getSummary, getProcotoclToc } from "./protocolSlice.js";
import { httpCall } from "../../../utils/api";

function* getSummaryData(action) {
  console.log("pay", action.payload);
  const url = "../../../../protocolSummary.json";
  const data = yield call(httpCall, { url, method: "GET" });
  console.log(data);
  // getSummaryData(data)
  yield put(getSummary(data));
}

function* getProtocolToc() {
  const URL = '/toc.json';
  const config = {
    url: URL,
    method: 'GET'
  }
  const tocData = yield call(httpCall, config)
  if(tocData.success) {
    yield put(getProcotoclToc(tocData.data.Toc))
  }
  console.log(tocData);
}

function getElement(style) {
  switch(style.font_style) {
    case 'Heading1': return 'h1';
    default: return 'p'
  }
}
function* getProtocolSummary() {
  const URL = '/summary.json';
  const config = {
    url: URL,
    method: 'GET'
  }
  const tocData = yield call(httpCall, config)
  if(tocData.success) {

    const sumData = tocData.data.data;
    // const content = sumData[0];
    // const type = sumData[1];
    // const subsectionOf = sumData[2];
    // const style = sumData[3];
    // console.log('style', style);
    // if (style.font_style === 'Heading1') {
      // const ele = document.createElement(getElement(sumData[3]));
      // const node = document.createTextNode(content);
      // ele.appendChild(node);
      // console.log('ele', ele);
    // }
    console.log('Saga sumData', sumData);
    yield put(getProcotoclToc(sumData))
  }
  console.log(tocData);
}

function* watchProtocolAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery("GET_PROTOCOL_SUMMARY", getSummaryData);
  yield takeLatest("GET_PROTOCOL_TOC_SAGA", getProtocolSummary)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchProtocolAsync()]);
}
