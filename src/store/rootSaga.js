import { fork, all } from "redux-saga/effects";
import dashboardSaga from "../features/Container/Dashboard/saga";
import protocolSaga from "../features/Container/Protocols/saga";
import searchSaga from "../features/Container/Search/saga";
import qcSaga from "../features/Container/QC/saga";
import navbarSaga from "../features/Container/Navbar/saga";
import adminSaga from "../features/Container/Admin/saga";

export default function* rootSaga() {
  yield all([
    fork(dashboardSaga),
    fork(protocolSaga),
    fork(searchSaga),
    fork(qcSaga),
    fork(navbarSaga),
    fork(adminSaga),
  ]);
}
