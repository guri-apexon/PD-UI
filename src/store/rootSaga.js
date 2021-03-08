import { fork, all } from "redux-saga/effects";
import counterSaga from "../features/counterSaga/saga";
import dashboardSaga from "../features/Container/Dashboard/saga";
import protocolSaga from "../features/Container/Protocols/saga";
import searchSaga from "../features/Container/Search/saga";
import qcSaga from "../features/Container/QC/saga";

export default function* rootSaga() {
  yield all([
    fork(dashboardSaga),
    fork(counterSaga),
    fork(protocolSaga),
    fork(searchSaga),
    fork(qcSaga)
  ]);
}
