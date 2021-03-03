import { takeEvery, all, call, put, select } from "redux-saga/effects";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import {
    getProtocols,
    setError
  } from "./qcSlice";
function* getState() {
    const state = yield select();
    const id = state.user.userDetail.userId;
    return id.substring(1);
  }
export function* qcProtocolsData() {
    let userId = yield getState();
    const protocolUrl = `${BASE_URL_8000}/api/protocol_metadata/?userId=${userId}`;
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
      alert("Something Went Wrong")
    }
  }
  

export function* watchqc() {
    yield takeEvery("GET_QC_PROTOCOL_TABLE_SAGA", qcProtocolsData);
}

export default function* qcSaga() {
    yield all([watchqc()]);
  }