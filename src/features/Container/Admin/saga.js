import { all, call, takeLatest, put, select } from "redux-saga/effects";
import moment from "moment";
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
    if (data.success) {
      const userData = data.data.map((item) => {
        item.date_of_registration = moment(item.date_of_registration).format(
          "MM/DD/YYYY"
        );
        return item;
      });

      console.log(userData);
      yield put(getUsers(userData));
    }
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
function* updateUser(action) {
  // const Url = `/protocol-map.json`;
  const editedRow = action.payload;
  // const Config = {
  //   url: Url,
  //   method: "GET",
  // };
  try {
    // const data = yield call(httpCall, Config);
    // console.log(data.data);
    const state = yield select();
    const userRows = state.admin.users;
    const updatedUserList = userRows.map((row) =>
      row.username === editedRow.username ? editedRow : row
    );
    yield put(getUsers(updatedUserList));
    toast.info(`User details are successfully modified`);
  } catch (err) {
    console.log(err);
    toast.error(`User details is not updated`);
  }
}

export function* watchAdmin() {
  yield takeLatest("GET_USERS_SAGA", usersFunction);
  yield takeLatest("GET_ROLES_SAGA", getRolesFunction);
  yield takeLatest("GET_PROTOCOL_MAP_SAGA", getProtocolMapData);
  yield takeLatest("DELETE_USER_SAGA", deleteUser);
  yield takeLatest("UPDATE_USER_SAGA", updateUser);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
