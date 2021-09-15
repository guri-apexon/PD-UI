import { all, call, takeLatest, put, select } from "redux-saga/effects";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import { getUsers, getRoles, getProtocolMap } from "./adminSlice";

export function* usersFunction() {
  const Url = `${BASE_URL_8000}/api/user/read_all_users`;

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
function* deleteUser(action) {
  // const Url = `/protocol-map.json`;

  // const Config = {
  //   url: Url,
  //   method: "GET",
  // };
  try {
    // const data = yield call(httpCall, Config);
    // console.log(data.data);
    const state = yield select();
    const userRows = state.admin.users;
    const updatedUserList = userRows.filter(
      (row) => row.username !== action.payload
    );
    yield put(getUsers(updatedUserList));
    toast.info(`User is successfully deleted`);
  } catch (err) {
    console.log(err);
    toast.error(`User is not deleted`);
  }
}

export function* watchAdmin() {
  yield takeLatest("GET_USERS_SAGA", usersFunction);
  yield takeLatest("GET_ROLES_SAGA", getRolesFunction);
  yield takeLatest("GET_PROTOCOL_MAP_SAGA", getProtocolMapData);
  yield takeLatest("DELETE_USER_SAGA", deleteUser);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
