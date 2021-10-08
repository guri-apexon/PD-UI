import { all, call, takeLatest, put, select } from "redux-saga/effects";
import moment from "moment";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import {
  getUsers,
  getRoles,
  getProtocolMap,
  setUserRoleErr,
  setModalToggle,
  setLoader,
  setNewUserError,
  setNewMappingError,
  setNewUserValues,
  setUserError,
  setUserLoader,
  setFormError,
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
          "MM/DD/YYYY HH:mm:ss"
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

export function* getProtocolMapData(action) {
  const Url = `${BASE_URL_8000}/api/user_protocol/read_user_protocols_by_userId_or_protocol`;
  yield put(setLoader(true));
  const Config = {
    url: Url,
    method: "GET",
    params: {
      userId: action.payload.userId.substring(1),
      protocol: action.payload.protocol,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success) {
      const searchData = data.data ? data.data : [];
      searchData.map((item, index) => {
        item.uid = index + 1;
        item.timeCreated = moment(item.timeCreated).format(
          "MM/DD/YYYY HH:mm:ss"
        );
        item.lastUpdated = moment(item.lastUpdated).format(
          "MM/DD/YYYY HH:mm:ss"
        );
        return item;
      });
      yield put(getProtocolMap(searchData));
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
    } else {
      toast.error(`Error while searching for User or Protocol`);
    }
    yield put(setLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
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
  yield put(setLoader(true));
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
      const updatedMappingList = mappingRows.filter((row) => {
        if (
          row.userId === action.payload.userId &&
          row.protocol === action.payload.protocol
        )
          return false;
        return true;
      });
      yield put(getProtocolMap(updatedMappingList));
      toast.info(`Protocol Mapping is successfully deleted`);
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
    } else {
      toast.error(`Protocol Mapping is not deleted`);
    }
    yield put(setLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
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
    const data = yield call(httpCall, Config);
    yield put(setLoader(false));
    if (data.success) {
      toast.info(`User is successfully added to PD`);
      yield put(setModalToggle(false));
      yield put(setNewUserError(""));
      yield put({ type: "GET_USERS_SAGA" });
    } else if (data.err && data.err.data && data.err.data.detail) {
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
// export function* addNewUserSDA(action) {
//   const state = yield select();
//   const userEmail = state.user.userDetail.email;
//   const userDetails = action.payload;
//   const Url = `${process.env.REACT_APP_SDA}/sda-rest-api/api/external/entitlement/V1/ApplicationUsers`;

//   const Config = {
//     url: Url,
//     method: "POST",
//     params: {
//       roleType: "Reader",
//       appKey: process.env.REACT_APP_SDA_AUTH,
//       userType: "internal",
//       networkId: userDetails.userId,
//       updatedBy: userEmail,
//     },
//     // proxy: {
//     //   protocol: "https",
//     //   host: "dev-protocoldigitalization.work.iqvia.com",
//     // },
//   };
//   console.log(Config);
//   try {
//     const data = yield call(httpCallSDA, Config);
//     console.log(data);
//     if (data.success) {
//       toast.info(`User is successfully added to SDA`);
//       // yield addNewUser([userDetails]);
//     } else {
//       toast.error(data.message);
//     }
//   } catch (err) {
//     console.log(err);
//     toast.error(`Error while adding user to SDA`);
//   }
// }

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
    } else if (data.err && data.err.data && data.err.data.detail) {
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

export function* newMapping(action) {
  yield put(setLoader(true));
  let mapDetails = action.payload;
  const Url = `${BASE_URL_8000}/api/user_protocol/`;
  try {
    const details = [mapDetails].map((item) => {
      let data = {};
      data.userId = item.userId.substring(1);
      data.protocol = item.protocol;
      data.userRole = item.role.toLowerCase();
      data.projectId = item.projectId;
      data.follow = item.following === "1" ? true : false;
      return data;
    });
    const Config = {
      url: Url,
      method: "POST",
      data: details[0],
    };

    const data = yield call(httpCall, Config);
    yield put(setLoader(false));
    if (data.success) {
      toast.info(`Details are saved to the system.`);
      yield put(setModalToggle(false));
      yield put(setNewMappingError(""));
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
      yield put(setNewMappingError(data.err.data.detail));
    } else {
      yield put(
        setNewMappingError("Error while adding User Protocol Mapping to PD")
      );
      toast.error(`Error while adding User Protocol Mapping to PD`);
    }
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
    yield put(
      setNewMappingError("Error while adding User Protocol Mapping to PD")
    );
    toast.error(`Error while adding User Protocol Mapping to PD`);
  }
}

export function* getUserDetails(action) {
  const Url = `${BASE_URL_8000}/api/ldap_user_details/`;

  const Config = {
    url: Url,
    method: "GET",
    params: {
      userId: action.payload,
    },
  };
  const errorValue = {
    firstName: { error: false, message: "" },
    lastName: { error: false, message: "" },
    email: { error: false, message: "" },
    country: { error: false, message: "" },
    userId: { error: false, message: "" },
    userRole: { error: false, message: "" },
  };
  const userValue = {
    firstName: null,
    lastName: null,
    email: null,
    country: null,
  };
  try {
    yield put(setUserLoader(true));
    const userData = yield call(httpCall, Config);
    if (userData.success && userData.data) {
      let data = {};
      data.userId = userData.data.userId;
      data.firstName = userData.data.first_name;
      data.lastName = userData.data.last_name;
      data.email = userData.data.email;
      data.country = userData.data.country;

      yield put(setNewUserValues(data));
      yield put(setUserError(""));

      yield put(setFormError(errorValue));
    } else if (userData.err && userData.err.data && userData.err.data.detail) {
      toast.error(userData.err.data.detail);
      yield put(setNewUserValues(userValue));
      yield put(setUserError(userData.err.data.detail));
    } else {
      yield put(setNewUserValues(userValue));
      yield put(
        setUserError("Error while fetching user details try again later")
      );
      toast.error(`Error while fetching user details try again later`);
    }
    yield put(setNewUserError(""));
    yield put(setUserLoader(false));
  } catch (err) {
    yield put(setUserLoader(false));
    console.log(err);
    yield put(setNewUserValues(userValue));
    yield put(
      setUserError("Error while fetching user details try again later")
    );
    yield put(setNewUserError(""));
    toast.error(`Error while fetching user details try again later`);
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
  yield takeLatest("ADD_NEW_MAPPING_SAGA", newMapping);
  yield takeLatest("GET_USER_DETAILS_LDAP", getUserDetails);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
