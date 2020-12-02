import { fork, all } from "redux-saga/effects";
import counterSaga from "../features/counterSaga/saga";
import dashboardSaga from "../features/Container/Dashboard/saga";
import protocolSaga from "../features/Container/Protocols/saga";

export default function* rootSaga() {
  yield all([fork(dashboardSaga), fork(counterSaga), fork(protocolSaga)]);
}
