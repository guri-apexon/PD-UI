
import { takeEvery, all } from 'redux-saga/effects';

const delay = (ms) => new Promise(res => setTimeout(res, ms))
function* dashboardAsync(){
    yield delay(1000)
  console.log('after delay saga dashbaord')
}
function* watchDashboard(){
    console.log("Dashboard Watch Dashboard")
    yield takeEvery('DASHBOARD_ASYNC_SAGA', dashboardAsync);
}

export default function* dashboardSaga() {
    yield all([
      watchDashboard()
    ])
  }