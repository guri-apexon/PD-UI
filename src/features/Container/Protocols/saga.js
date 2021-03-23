import { put, takeEvery, all, call, takeLatest } from "redux-saga/effects";
import {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
} from "./protocolSlice.js";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import _ from "lodash";

export function* getSummaryData(action) {
  let obj = {
    loading: true,
    success: false,
    data: null,
  };
  yield put(getSummary(obj));
  const url = `${BASE_URL_8000}/api/protocol_attributes/?id=${action.payload}`;
  const resp = yield call(httpCall, { url, method: "GET" });
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

export function parsedData(data) {
  return JSON.parse(JSON.parse(data));
}

export function captalize(data) {
  return data
    .trim()
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

export function getTocSections(toc) {
  const sectionList = [];
  const list = [];
  toc.data.map((item) => {
    let file_section_level = item[8].toString();
    let type = item[2];
    // let heading = item[4].font_style;
    if (!file_section_level && type === "header") {
      file_section_level = "1";
    }
    let level_1_CPT_section = captalize(item[6]);
    let section_num = item[7];

    if (
      section_num &&
      file_section_level === "1" &&
      level_1_CPT_section !== "Unmapped" &&
      !sectionList.includes(level_1_CPT_section)
    ) {
      list.push({
        section: `${section_num} ${level_1_CPT_section}`,
        id: `TOC-${item[9]}`,
      });
      sectionList.push(level_1_CPT_section);
    } else if (
      type === "header" &&
      file_section_level === "1" &&
      level_1_CPT_section !== "Unmapped" &&
      !sectionList.includes(level_1_CPT_section)
    ) {
      list.push({
        section: `${section_num} ${level_1_CPT_section}`,
        id: `TOC-${item[9]}`,
      });
      sectionList.push(level_1_CPT_section);
    }
  });
  return list;
}

export function getSoaSections(soa) {
  // const sectionList = [];
  const list = [];
  soa.map((item) => {
    let TableIndex = item.TableIndex;
    let TableName = item.TableName;
    list.push({
      section: `${TableName}`,
      id: `SOA-${TableIndex}`,
    });
    // sectionList.push(CPT_section);
  });
  return list;
}

export function* getProtocolToc(action) {
  const viewData = {
    iqvdataSoa: null,
    iqvdataSummary: null,
    iqvdataToc: null,
    loader: true,
    tocSections: null,
    soaSections: null,
    err: null,
  };
  yield put(getProcotoclToc(viewData));
  const URL = `${BASE_URL_8000}/api/${action.payload.endPoint}?id=${action.payload.id}`;
  const config = {
    url: URL,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, config);
    if (data.success && data.data) {
      const toc = parsedData(data.data.iqvdataToc);
      const soa = parsedData(data.data.iqvdataSoa);
      const viewData = {
        iqvdataSoa: soa,
        iqvdataSummary: parsedData(data.data.iqvdataSummary),
        iqvdataToc: toc,
        loader: false,
        tocSections: getTocSections(toc),
        soaSections: getSoaSections(soa),
        err: null,
        download: data.data,
      };
      yield put(getProcotoclToc(viewData));
    } else {
      const viewData = {
        iqvdataSoa: null,
        iqvdataSummary: null,
        iqvdataToc: null,
        loader: false,
        tocSections: null,
        soaSections: null,
        err: "No data found",
      };
      yield put(getProcotoclToc(viewData));
    }
  } catch (err) {
    console.log(err);
    const viewData = {
      iqvdataSoa: null,
      iqvdataSummary: null,
      iqvdataToc: null,
      loader: false,
      tocSections: null,
      soaSections: null,
      err: "No data found",
    };
    yield put(getProcotoclToc(viewData));
  }
}

export function* fetchAssociateProtocol(action) {
  const URL = `${BASE_URL_8000}/api/Related_protocols/?protocol=${action.payload}`;
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

export function* getCompareResult(action) {
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
    // const url = `${BASE_URL_8000}/api/document_compare/?id1=${action.payload.docID}&id2=${action.payload.docID2}`;
    const url = `/compareWithSection.json`;
    const resp = yield call(httpCall, { url, method: "GET" });

    if (resp.data) {
      // debugger;
      let temp = _.cloneDeep(resp.data);
      temp.loading = false;
      temp.called = true;
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
