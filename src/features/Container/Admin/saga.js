import { all, call, takeLatest, put, select } from "redux-saga/effects";
import moment from "moment";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000, httpCallSDA } from "../../../utils/api";
import {
  getUsers,
  getRoles,
  getProtocolMap,
  setUserRoleErr,
  setModalToggle,
  setLoader,
  setNewUserError,
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

      yield put(getUsers(userData));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getRolesFunction() {
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

function* getProtocolMapData(action) {
  const Url = `${BASE_URL_8000}/api/user_protocol/read_user_protocols_by_userId_or_protocol`;

  const Config = {
    url: Url,
    method: "GET",
    params: {
      userId: action.payload.userId,
      protocol: action.payload.protocol,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    console.log(data.data);
    if (data.success) {
      const searchData = data.data ? data.data : [];
      yield put(getProtocolMap(searchData));
    } else if (data.err && data.err.data) {
      toast.error(data.err.data.detail);
    } else {
      toast.error(`Error while searching for User or Protocol`);
    }
  } catch (err) {
    console.log(err);
    toast.error(`Error while searching for User or Protocol`);
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
export function* deleteMapping(action) {
  const Url = `${BASE_URL_8000}/api/user_protocol/delete_userprotocol`;

  const Config = {
    url: Url,
    method: "PUT",
    data: {
      userId: action.payload.userId,
      protocol: action.payload.protocol,
      isActive: false,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success) {
      const state = yield select();
      const mappingRows = state.admin.map;
      const updatedUserList = mappingRows.filter(
        (row) =>
          row.username !== action.payload.userId &&
          row.protocol !== action.payload.protocol
      );
      yield put(getUsers(updatedUserList));
      toast.info(`Protocol Mapping is successfully deleted`);
    } else {
      toast.error(`Protocol Mapping is not deleted`);
    }
  } catch (err) {
    console.log(err);
    toast.error(`Protocol Mapping is not deleted`);
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
export function* addNewUser(action) {
  yield put(setLoader(true));
  let userDetails = action.payload;
  const Url = `${BASE_URL_8000}/api/create_new_user/new_user`;
  const details = [userDetails].map((item) => {
    let data = {};
    data.username = item.userId;
    data.first_name = item.firstName;
    data.last_name = item.lastName;
    data.email = item.email;
    data.country = item.country;
    data.user_type = item.userRole;
    return data;
  });
  const Config = {
    url: Url,
    method: "POST",
    data: details[0],
  };
  try {
    yield addNewUserSDA(action);
    const data = yield call(httpCall, Config);
    yield put(setLoader(false));
    if (data.success) {
      toast.info(`User is successfully added to PD`);
      yield put(setModalToggle(false));
      yield put(setNewUserError(""));
      yield put({ type: "GET_USERS_SAGA" });
    } else if (data.err && data.err.data) {
      toast.error(data.err.data.detail);
      yield put(setNewUserError(data.err.data.detail));
    } else {
      yield put(setNewUserError("Error while adding user to PD"));
      toast.error(`Error while adding user to PD`);
    }
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
    yield put(setNewUserError("Error while adding user to PD"));
    toast.error(`Error while adding user to PD`);
  }
}
export function* addNewUserSDA(action) {
  const state = yield select();
  const userEmail = state.user.userDetail.email;
  const userDetails = action.payload;
  const Url = `${process.env.REACT_APP_SDA}/sda-rest-api/api/external/entitlement/V1/ApplicationUsers`;

  const Config = {
    url: Url,
    method: "POST",
    params: {
      roleType: "Reader",
      appKey: process.env.REACT_APP_SDA_AUTH,
      userType: "internal",
      networkId: userDetails.userId,
      updatedBy: userEmail,
    },
    // proxy: {
    //   protocol: "https",
    //   host: "dev-protocoldigitalization.work.iqvia.com",
    // },
  };
  console.log(Config);
  try {
    const data = yield call(httpCallSDA, Config);
    console.log(data);
    if (data.success) {
      toast.info(`User is successfully added to SDA`);
      // yield addNewUser([userDetails]);
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error(`Error while adding user to SDA`);
  }
}

export function* addNewRole(action) {
  yield put(setLoader(true));
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
    yield put(setLoader(false));
    if (data.success) {
      toast.info(`New User Role is successfully added`);
      yield put(setModalToggle(false));
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
    yield put(setLoader(false));
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
  yield takeLatest("ADD_NEW_USER_SAGA", addNewUser);
  yield takeLatest("DELETE_USER_PROTOCOL_MAPPING", deleteMapping);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
