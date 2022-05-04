import { takeEvery, all, call, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";

import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { iconStatus } from "../../../utils/utilFunction";
import { getProtocols, setError, getLoader, setTableLoader } from "./qcSlice";
import { getViewdata } from "../Protocols/store/slice";

function* getState() {
  const state = yield select();
  const type = state.user.userDetail.user_type;
  const id = state.user.userDetail.userId;
  return { id: id.substring(1), type: type };
}

export function* qcProtocolsData() {
  yield put(setTableLoader(true));
  let user = yield getState();
  const protocolUrl = `${BASE_URL_8000}/api/protocol_metadata/?userId=${user.type}`;
  const protocolConfig = {
    url: protocolUrl,
    method: "GET",
  };
  try {
    const protocolData = yield call(httpCall, protocolConfig);

    if (protocolData.success) {
      let data = protocolData.data.map((item) => {
        item.protocolTitle = !item.protocolTitle ? "" : item.protocolTitle;
        item.protocol = !item.protocol ? "" : item.protocol;
        item.projectId = !item.projectId ? "" : item.projectId;
        item.sponsor = !item.sponsor ? "" : item.sponsor;
        item.uploadDate = !item.uploadDate ? "" : new Date(item.uploadDate);
        item.status = iconStatus(item.status);
        return item;
      });
      yield put(getProtocols(data));
      yield put(setTableLoader(false));
    } else {
      yield put(setTableLoader(false));
      yield put(setError(protocolData.err.statusText));
    }
  } catch (err) {
    yield put(setTableLoader(false));
    yield put(setError("Something Went Wrong"));
    toast.error("Something Went Wrong");
  }
}

function wait() {
  /* istanbul ignore next */
  setTimeout(function () {
    window.location.href = "/qc";
  }, 3000);
}

export function* qcApprove(action) {
  let user = yield getState();
  const url = `${BASE_URL_8000}/api/protocol_metadata/qc_approve?aidoc_id=${action.payload}&approvedBy=${user.id}`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    yield put(getLoader(true));
    const data = yield call(httpCall, config);
    console.log(data);
    if (data.success) {
      toast.info("Approved Successfully");
      wait();
    } else {
      toast.error("Error While Approving");
    }
    yield put(getLoader(false));
  } catch (err) {
    console.log(err);
    yield put(getLoader(false));
    toast.error("Something Went Wrong");
  }
}

export function* sendQc2Approval(action) {
  const url = `${BASE_URL_8000}/api/protocol_metadata/change_qc_status`;
  const obj = {
    docIdArray: [action.payload],
    targetStatus: "QC2",
  };
  const config = {
    url: url,
    method: "PUT",
    data: obj,
  };
  try {
    yield put(getLoader(true));
    const data = yield call(httpCall, config);
    if (data.success) {
      toast.info("Sent For QC2 Approval Successfully");
      // window.location.href = "/qc";
      wait();
    } else {
      toast.error("Error While Sending");
    }
    yield put(getLoader(false));
    console.log(data);
  } catch (err) {
    yield put(getLoader(false));
    console.log(err);
    toast.error("Something Went Wrong");
  }
}

export function* qc2Reject(action) {
  const url = `${BASE_URL_8000}/api/protocol_metadata/change_qc_status`;
  const obj = {
    docIdArray: [action.payload],
    targetStatus: "QC1",
  };
  const config = {
    url: url,
    method: "PUT",
    data: obj,
  };
  try {
    yield put(getLoader(true));
    const data = yield call(httpCall, config);
    console.log(data);
    if (data.success) {
      toast.info("Rejected Successfully");
      // window.location.href = "/qc";
      wait();
    } else {
      toast.error("Error While Rejecting");
    }
    yield put(getLoader(false));
  } catch (err) {
    yield put(getLoader(false));
    console.log(err);
    toast.error("Something Went Wrong");
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
    return item;
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
    return item;
    // sectionList.push(CPT_section);
  });
  return list;
}
export function* uploadQc(action) {
  let bodyFormData = new FormData();
  bodyFormData.append("uploaded_json_file", action.payload.data);
  const postUrl = `${BASE_URL_8000}/api/protocol_qcdata/qc1_protocol_upload?aidoc_id=${action.payload.id}`;
  try {
    yield put(getLoader(true));
    const postUploadQc = yield call(httpCall, {
      url: postUrl,
      method: "POST",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (postUploadQc.success) {
      toast.info("Upload Successful");
      // yield put(getProcotoclToc(viewData));
      if (postUploadQc.data) {
        const toc = parsedData(postUploadQc.data.iqvdataToc);
        const soa = parsedData(postUploadQc.data.iqvdataSoa);
        const viewData = {
          iqvdataSoa: soa,
          iqvdataSummary: parsedData(postUploadQc.data.iqvdataSummary),
          iqvdataToc: toc,
          loader: false,
          tocSections: getTocSections(toc),
          soaSections: getSoaSections(soa),
          err: null,
          download: postUploadQc.data,
        };
        yield put(getViewdata(viewData));
      }
      // yield put({
      //   type: "GET_PROTOCOL_TOC_SAGA",
      //   payload: {
      //     endPoint: "protocol_data/",
      //     id: action.payload.id,
      //     user: "qc",
      //   },
      // });
    } else {
      toast.error("Something Went Wrong");
    }
    yield put(getLoader(false));
  } catch (err) {
    console.log(err);
    yield put(getLoader(false));
    toast.error("Something Went Wrong");
  }
}

export function* watchqc() {
  yield takeEvery("GET_QC_PROTOCOL_TABLE_SAGA", qcProtocolsData);
  yield takeEvery("APPROVE_QC_SAGA", qcApprove);
  yield takeEvery("SEND_QC2_APPROVAL_SAGA", sendQc2Approval);
  yield takeEvery("REJECT_QC2_SAGA", qc2Reject);
  yield takeEvery("UPLOAD_PROTOCOL_QC_SAGA", uploadQc);
}

export default function* qcSaga() {
  yield all([watchqc()]);
}
