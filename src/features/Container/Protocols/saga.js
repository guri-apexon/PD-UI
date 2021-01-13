import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
} from "./protocolSlice.js";
import { httpCall } from "../../../utils/api";
import _ from "lodash";

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
    yield put({
      type: "FETCH_ASSOCIATE_PROTOCOLS",
      payload: resp.data.protocol,
    });
  } else {
    let obj = {
      loading: false,
      success: true,
      data: null,
    };
    yield put(getSummary(obj));
  }
}

function parsedData(data) {
  return JSON.parse(JSON.parse(data));
}

function getTocSections(toc) {
  const sectionList = [];
  const list = [];
  toc.data.map((item) => {
    let section_level = item[0];
    let CPT_section = item[1];
    if (
      section_level === "1" &&
      CPT_section !== "Unmapped" &&
      !sectionList.includes(CPT_section)
    ) {
      list.push({ section: `${CPT_section}`, id: `TOC-${item[5]}` });
      sectionList.push(CPT_section);
    }
  });
  return list;
}

function getSoaSections(soa) {
  // const sectionList = [];
  const list = [];
  soa.map((item) => {
    let TableIndex = item.TableIndex;
    let TableName = item.TableName;
      list.push({ section: `${TableName}`, id: `SOA-${TableIndex}` });
      // sectionList.push(CPT_section);
  });
  return list;
}

function* getProtocolToc(action) {
  console.log(action.payload);
  const URL =
    "http://ca2spdml01q:8000/api/protocol_data/?id=e5c6a06d-166f-478f-b5de-73543a46261e";
  const config = {
    url: URL,
    method: "GET",
  };
  const data = yield call(httpCall, config);
  console.log(data);
  if (data.success) {
    const toc = parsedData(data.data.iqvdataToc);
    const soa = parsedData(data.data.iqvdataSoa);
    const viewData = {
      iqvdataSoa: soa,
      iqvdataSummary: parsedData(data.data.iqvdataSummary),
      iqvdataToc: toc,
      loader: false,
      tocSections: getTocSections(toc),
      soaSections: getSoaSections(soa),
    };
    yield put(getProcotoclToc(viewData));
  }
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
  yield getProtocolToc();
}

function* fetchAssociateProtocol(action) {
  const URL = `http://ca2spdml01q:8000/api/Related_protocols/?protocol=${action.payload}`;
  //  const URL=`http://ca2spdml01q:8000/api/Related_protocols/?Protocol=EMR 200095-004`;
  const config = {
    url: URL,
    method: "GET",
  };
  const associateDocs = yield call(httpCall, config);
  //  console.log('associateDocs :', associateDocs.data);
  if (associateDocs.success) {
    yield put(getAssociateDocuments(associateDocs.data));
  } else {
    yield put(getAssociateDocuments([]));
  }
}

function* getCompareResult(action) {
  if (action.payload) {
    // debugger;
    yield put(
      getCompare({
        iqvdata: "",
        loading: true,
        called: true,
        error: false,
        message: "",
      })
    );
    console.log("Payload", action.payload);
    // const URL = `http://ca2spdml01q:8000/api/document_compare/?id1=${action.payload.docID}&id2=${action.payload.docID2}`
    // debugger
    const url = `http://ca2spdml01q:8000/api/document_compare/?id1=${action.payload.docID}&id2=${action.payload.docID2}`;
    // const url = `/compare.json`;
    const resp = yield call(httpCall, { url, method: "GET" });
    // console.log("summary data", JSON.parse(resp.data.iqvdata));

    if (resp.data) {
      // debugger;
      let temp = _.cloneDeep(resp.data);
      temp.loading = false;
      temp.called = true;
      console.log("summary data........", temp);
      yield put(getCompare(temp));
    } else {
      // debugger;
      let temp = {
        iqvdata: "",
        loading: false,
        called: false,
        error: true,
        message: "Comparison is Under Process.",
      };
      yield put(getCompare(temp));
    }
  } else {
    yield put(
      getCompare({
        iqvdata: "",
        loading: false,
        called: false,
        error: false,
        message: "",
      })
    );
  }
}

function* watchProtocolAsync() {
  //   yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeEvery("GET_PROTOCOL_SUMMARY", getSummaryData);
  yield takeLatest("GET_PROTOCOL_TOC_SAGA", getProtocolToc);
  yield takeLatest("FETCH_ASSOCIATE_PROTOCOLS", fetchAssociateProtocol);
  yield takeEvery("POST_COMPARE_PROTOCOL", getCompareResult);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* protocolSaga() {
  yield all([watchProtocolAsync()]);
}
