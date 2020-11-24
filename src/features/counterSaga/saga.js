import { put, takeEvery, all, call, takeLatest } from 'redux-saga/effects'
import {
    incrementByAmount,
  } from './counterSlice';
import {httpCall} from '../../utils/api'
const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* incrementAsync(data) {
  yield delay(1000)
  console.log('after delay saga')
  yield put(incrementByAmount(data.payload))
  console.log('after increment saga')
}

function* getUser() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = yield call(httpCall, {url, method:'GET'})
    console.log(data);
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC_SAGA', incrementAsync)
  yield takeLatest('GET_USER_SAGA', getUser)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* counterSaga() {
  yield all([
    watchIncrementAsync()
  ])
}