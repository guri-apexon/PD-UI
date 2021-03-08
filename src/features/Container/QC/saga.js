import { takeEvery, all, call, put, select } from "redux-saga/effects";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { getProtocols, setError } from "./qcSlice";
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
    alert("Something Went Wrong");
  }
}

function* qcApprove() {
  const url = `${BASE_URL_8000}/api/protocol_data/qc_approve/ada`;
  const config = {
    url: url,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, config);
    console.log(data);
    toast.info("Approved Successfully");
  } catch (err) {
    console.log(err);
    toast.info("Error While Approving");
  }
}

function* sendQc2Approval() {
  const url = `${BASE_URL_8000}/api/protocol_metadata/qc1_to_qc2/ada`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    const data = yield call(httpCall, config);
    console.log(data);
    toast.info("Sent For QC2 Approval Successfully");
  } catch (err) {
    console.log(err);
    toast.info("Error While Sending");
  }
}

function* qc2Reject() {
  const url = `${BASE_URL_8000}/api/protocol_metadata/qc_reject/ada`;
  const config = {
    url: url,
    method: "PUT",
  };
  try {
    const data = yield call(httpCall, config);
    console.log(data);
    toast.info("Rejected Successfully");
  } catch (err) {
    console.log(err);
    toast.info("Error While Rejecting");
  }
}

function* downloadQc(action) {
  let url = `${BASE_URL_8000}/api/protocol_data/qc1_protocol_review_json`;
  if (action.payload === "2") {
    url = `${BASE_URL_8000}/api/protocol_data/qc1_protocol_review_xlsx`;
  }
  const config = {
    url: url,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, config);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

export function* watchqc() {
  yield takeEvery("GET_QC_PROTOCOL_TABLE_SAGA", qcProtocolsData);
  yield takeEvery("APPROVE_QC_SAGA", qcApprove);
  yield takeEvery("SEND_QC2_APPROVAL_SAGA", sendQc2Approval);
  yield takeEvery("REJECT_QC2_SAGA", qc2Reject);
  yield takeEvery("DOWNLOAD_PROTOCOL_QC_SAGA", downloadQc);
}

export default function* qcSaga() {
  yield all([watchqc()]);
}
