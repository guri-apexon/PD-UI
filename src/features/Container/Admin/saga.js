import { all, call, takeLatest, put } from "redux-saga/effects";
import { httpCall } from "../../../utils/api";
import { getUsers, getRoles, getProtocolMap } from "./adminSlice";

function* usersFunction() {
  const Url = `/userRows.json`;

  const Config = {
    url: Url,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, Config);
    console.log(data.data);
    yield put(getUsers(data.data));
  } catch (err) {
    console.log(err);
  }
}

function* getRolesFunction() {
  const Url = `/userRoles.json`;

  const Config = {
    url: Url,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, Config);
    console.log(data.data);
    yield put(getRoles(data.data));
  } catch (err) {
    console.log(err);
  }
}

function* getProtocolMapData() {
  const Url = `/protocol-map.json`;

  const Config = {
    url: Url,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, Config);
    console.log(data.data);
    yield put(getProtocolMap(data.data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchAdmin() {
  yield takeLatest("GET_USERS_SAGA", usersFunction);
  yield takeLatest("GET_ROLES_SAGA", getRolesFunction);
  yield takeLatest("GET_PROTOCOL_MAP_SAGA", getProtocolMapData);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
