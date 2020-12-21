import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import { getSummary, getProcotoclToc, getAssociateDocuments } from "./protocolSlice.js";
import { httpCall } from "../../../utils/api";

function* getSummaryData(action) {
  let obj = {
    loading: true,
    success: false,
    data: null,
  };
  yield put(getSummary(obj));
  console.log("pay abcd4578", action.payload);
  const url = `http://ca2spdml01q:8000/api/protocol_attributes/?id=${action.payload}`;
  const resp = yield call(httpCall, { url, method: "GET" });
  console.log("summary data", resp);
  // getSummaryData(data)
  if (resp.data) {
    let obj = {
      loading: false,
      success: true,
      data: resp.data,
    };
    yield put(getSummary(obj));
    yield put({type:'FETCH_ASSOCIATE_PROTOCOLS', payload: resp.data.Protocol});
  } else {
    let obj = {
      loading: false,
      success: true,
      data: null,
    };
    yield put(getSummary(obj));
  }
}

function* getProtocolToc() {
  const URL = "/toc-doc.json";
  const config = {
    url: URL,
    method: "GET",
  };
  const tocData = yield call(httpCall, config);
  if (tocData.success) {
    const parsedData = JSON.parse(tocData.data);
    console.log(parsedData.data);
    yield put(getProcotoclToc(parsedData.data));
  }
  // console.log(tocData);
}

function getElement(style) {
  switch (style.font_style) {
    case "Heading1":
      return "h1";
    default:
      return "p";
  }
}
function* getProtocolSummary() {
  const URL = "/summary.json";
  const config = {
    url: URL,
    method: "GET",
  };
  const tocData = yield call(httpCall, config);
  if (tocData.success) {
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
    console.log("Saga sumData", sumData);
    yield put(getProcotoclToc(sumData));
  }
  console.log(tocData);
}

function* fetchAssociateProtocol(action){
   const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=${action.payload}`;
  //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
   const config = {
    url: URL,
    method: "GET",
  };
   const associateDocs = yield call(httpCall, config);
  //  console.log('associateDocs :', associateDocs.data);
   if(associateDocs.success){
    yield put(getAssociateDocuments(associateDocs.data));
   } else {
    yield put(getAssociateDocuments([]));
   }

}

function* watchProtocolAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery("GET_PROTOCOL_SUMMARY", getSummaryData);
  yield takeLatest("GET_PROTOCOL_TOC_SAGA", getProtocolToc);
  yield takeLatest('FETCH_ASSOCIATE_PROTOCOLS', fetchAssociateProtocol)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchProtocolAsync()]);
}
