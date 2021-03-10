import { takeEvery, all, call, put, select } from "redux-saga/effects";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { getProtocols, setError, getLoader } from "./qcSlice";
import { toast } from "react-toastify";
function* getState() {
  const state = yield select();
  const type = state.user.userDetail.user_type;
  const id = state.user.userDetail.userId;
  return { id: id.substring(1), type: type };
}
export function* qcProtocolsData() {
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
        item.uploadDate = !item.uploadDate ? "" : item.uploadDate;
        return item;
      });
      yield put(getProtocols(data));
    } else {
      yield put(setError(protocolData.err.statusText));
    }
  } catch (err) {
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
  const url = `${BASE_URL_8000}/api/protocol_data/qc_approve?aidoc_id=${action.payload}`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    getLoader(true);
    const data = yield call(httpCall, config);
    console.log(data);
    if (data.success) {
      getLoader(false);
      toast.info("Approved Successfully");
      wait();
    } else {
      getLoader(false);
      toast.error("Error While Approving");
    }
  } catch (err) {
    console.log(err);
    getLoader(false);
    toast.error("Something Went Wrong");
  }
}

export function* sendQc2Approval(action) {
  const url = `${BASE_URL_8000}/api/protocol_metadata/qc1_to_qc2?aidoc_id=${action.payload}`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    getLoader(true);
    const data = yield call(httpCall, config);
    if (data.success) {
      getLoader(false);
      toast.info("Sent For QC2 Approval Successfully");
      // window.location.href = "/qc";
      wait();
    } else {
      getLoader(false);
      toast.error("Error While Sending");
    }
    console.log(data);
  } catch (err) {
    getLoader(false);
    console.log(err);
    toast.error("Something Went Wrong");
  }
}

export function* qc2Reject(action) {
  const url = `${BASE_URL_8000}/api/protocol_metadata/qc_reject?aidoc_id=${action.payload}`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    getLoader(true);
    const data = yield call(httpCall, config);
    console.log(data);
    if (data.success) {
      getLoader(false);
      toast.info("Rejected Successfully");
      // window.location.href = "/qc";
      wait();
    } else {
      getLoader(false);
      toast.error("Error While Rejecting");
    }
  } catch (err) {
    getLoader(false);
    console.log(err);
    toast.error("Something Went Wrong");
  }
}

export function* uploadQc(action) {
  let bodyFormData = new FormData();
  bodyFormData.append("iqvdata_xls_file", action.payload.data);
  const postUrl = `${BASE_URL_8000}/api/protocol_data/qc1_protocol_upload?aidoc_id=${action.payload.id}`;
  getLoader(true);
  const postUploadQc = yield call(httpCall, {
    url: postUrl,
    method: "POST",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (postUploadQc.success) {
    getLoader(false);
    toast.info("Upload Successful");
    yield put({
      type: "GET_PROTOCOL_TOC_SAGA",
      payload: { endPoint: "protocol_data/qc", id: action.payload.id },
    });
  } else {
    getLoader(false);
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
