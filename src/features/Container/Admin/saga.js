import { all, call, takeLatest, put, select } from "redux-saga/effects";
import moment from "moment";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import {
  getUsers,
  getRoles,
  getProtocolMap,
  setUserRoleErr,
} from "./adminSlice";

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
  const Url = `${BASE_URL_8000}/api/roles/get_all_roles`;

  const Config = {
    url: Url,
    method: "GET",
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success && data.data) {
      const roles = data.data.map((item) => {
        item.role = item.roleName;
        item.description = item.roleDescription;
        return item;
      });
      yield put(getRoles(roles));
    }
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
export function* deleteUser(action) {
  const Url = `${BASE_URL_8000}/api/user_login/delete_user`;

  const Config = {
    url: Url,
    method: "PUT",
    data: {
      username: action.payload,
      active_user: false,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success) {
      const state = yield select();
      const userRows = state.admin.users;
      const updatedUserList = userRows.filter(
        (row) => row.username !== action.payload
      );
      yield put(getUsers(updatedUserList));
      toast.info(`User is successfully deleted`);
    } else {
      toast.error(`User is not deleted`);
    }
  } catch (err) {
    console.log(err);
    toast.error(`User is not deleted`);
  }
}
export function* updateUser(action) {
  const editedRow = action.payload;
  const Url = `${BASE_URL_8000}/api/user_login/update_existing`;

  const Config = {
    url: Url,
    method: "PUT",
    data: {
      username: editedRow.username,
      country: editedRow.country,
      user_type: editedRow.user_type,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success) {
      const state = yield select();
      const userRows = state.admin.users;
      const updatedUserList = userRows.map((row) =>
        row.username === editedRow.username ? editedRow : row
      );
      yield put(getUsers(updatedUserList));
      toast.info(`User details are successfully modified`);
    } else {
      toast.error(`User details is not updated`);
    }
  } catch (err) {
    console.log(err);
    toast.error(`User details is not updated`);
  }
}

export function* addNewRole(action) {
  const roleData = action.payload;
  const Url = `${BASE_URL_8000}/api/roles/new_role`;
  const Config = {
    url: Url,
    method: "POST",
    data: {
      roleName: roleData.role,
      roleDescription: roleData.description,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success) {
      toast.info(`New User Role is successfully added`);
      // yield put(setModalToggle(false));
      yield put(setUserRoleErr(""));
      yield put({ type: "GET_ROLES_SAGA" });
    } else if (data.err && data.err.data) {
      toast.error(data.err.data.detail);
      yield put(setUserRoleErr(data.err.data.detail));
    } else {
      yield put(setUserRoleErr("Error while adding roles to PD"));
      toast.error(`Error while adding roles to PD`);
    }
  } catch (err) {
    console.log(err);
    yield put(setUserRoleErr("Error while adding roles to PD"));
    toast.error(`Error while adding roles to PD`);
  }
}

export function* watchAdmin() {
  yield takeLatest("GET_USERS_SAGA", usersFunction);
  yield takeLatest("GET_ROLES_SAGA", getRolesFunction);
  yield takeLatest("GET_PROTOCOL_MAP_SAGA", getProtocolMapData);
  yield takeLatest("DELETE_USER_SAGA", deleteUser);
  yield takeLatest("UPDATE_USER_SAGA", updateUser);
  yield takeLatest("ADD_NEW_ROLE_SAGA", addNewRole);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
