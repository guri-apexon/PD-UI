/* eslint-disable */
import moment from 'moment';
import { toast } from 'react-toastify';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { BASE_URL_8000, httpCall, httpCallSDA } from '../../../utils/api';
import {
  getProtocolMap,
  getRolesOptions,
  getUserRoles,
  getUsers,
  setBulkMapError,
  setBulkMapResponse,
  setFormError,
  setLoader,
  setMapLoader,
  setModalToggle,
  setNewMappingError,
  setNewUserError,
  setNewUserValues,
  setSearch,
  setUserError,
  setUserLoader,
  setUserRoleErr,
} from './adminSlice';

export function* usersFunction() {
  const Url = `${BASE_URL_8000}/api/user/read_all_users`;

  const Config = {
    url: Url,
    method: 'GET',
  };
  try {
    yield put(setLoader(true));
    yield getRolesFunction();
    const data = yield call(httpCall, Config);
    if (data.success) {
      const userData = data.data.map((item) => {
        item.date_of_registration = moment(item.date_of_registration).format(
          'MM/DD/YYYY HH:mm:ss',
        );
        return item;
      });

      yield put(getUsers(userData));
    }
    yield put(setLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
  }
}

export function* getRolesFunction() {
  const Url = `${BASE_URL_8000}/api/roles/get_all_roles`;

  const Config = {
    url: Url,
    method: 'GET',
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success && data.data) {
      const userRole = [];
      const rolesOptions = {
        user: [],
        protocol: [],
      };
      data.data.map((item) => {
        item.key = item.id;
        if (item.roleLevel === 'user') {
          userRole.push(item);
          rolesOptions.user.push(item.roleName);
        } else if (item.roleLevel === 'protocol') {
          rolesOptions.protocol.push(item.roleName);
        }
        return item;
      });
      yield put(getUserRoles(userRole));
      yield put(getRolesOptions(rolesOptions));
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
    method: 'GET',
    params: {
      userId: action.payload.userId,
      protocol: action.payload.protocol,
    },
  };
  try {
    const data = yield call(httpCall, Config);
    if (data.success) {
      const searchData = data.data ? data.data : [];
      searchData.map((item) => {
        item.follow = item.follow ? 'Yes' : 'No';
        item.timeCreated = moment(item.timeCreated).format(
          'MM/DD/YYYY HH:mm:ss',
        );
        item.lastUpdated = moment(item.lastUpdated).format(
          'MM/DD/YYYY HH:mm:ss',
        );
        return item;
      });
      yield put(getProtocolMap(searchData));
      yield put(
        setSearch({
          userId: action.payload.userId,
          protocol: action.payload.protocol,
        }),
      );
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
    } else {
      toast.error('Error while searching for User or Protocol');
    }
    yield put(setLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
    toast.error('Error while searching for User or Protocol');
  }
}
export function* deleteUser(action) {
  const Url = `${BASE_URL_8000}/api/user_login/delete_user`;

  const Config = {
    url: Url,
    method: 'PUT',
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
        (row) => row.username !== action.payload,
      );
      yield put(getUsers(updatedUserList));
      toast.info('User is successfully deleted');
    } else {
      toast.error('User is not deleted');
    }
  } catch (err) {
    console.log(err);
    toast.error('User is not deleted');
  }
}
export function* deleteMapping(action) {
  const Url = `${BASE_URL_8000}/api/user_protocol/`;
  yield put(setLoader(true));
  const Config = {
    url: Url,
    method: 'DELETE',
    params: {
      userId: action.payload.userId,
      protocol: action.payload.protocol,
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
      toast.info('Protocol Mapping is successfully deleted');
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
    } else {
      toast.error('Protocol Mapping is not deleted');
    }
    yield put(setLoader(false));
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
    toast.error('Protocol Mapping is not deleted');
  }
}
export function* updateUser(action) {
  const editedRow = action.payload;
  const Url = `${BASE_URL_8000}/api/user_login/update_existing`;

  const Config = {
    url: Url,
    method: 'PUT',
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
        row.username === editedRow.username ? editedRow : row,
      );
      yield put(getUsers(updatedUserList));
      toast.info('User details are successfully modified');
    } else {
      toast.error('User details is not updated');
    }
  } catch (err) {
    console.log(err);
    toast.error('User details is not updated');
  }
}
export function* addNewUser() {
  const USER_ERROR =
    'Error while adding the user, please contact administrator or try after sometime.';
  yield put(setLoader(true));
  const state = yield select();
  const userDetails = state.admin.newUser;
  const Url = `${BASE_URL_8000}/api/create_new_user/new_user`;
  const details = [userDetails].map((item) => {
    const data = {};
    data.username = item.userId;
    data.first_name = item.firstName;
    data.last_name = item.lastName;
    data.email = item.email;
    data.country = item.country;
    data.user_type = item.userRole;
    data.reason_for_change = item.viaTicketNumber;
    return data;
  });
  const Config = {
    url: Url,
    method: 'POST',
    data: details[0],
  };
  try {
    /* istanbul ignore next */
    const SDA = yield addNewUserSDA(userDetails.userId);
    if (SDA) {
      const data = yield call(httpCall, Config);
      yield put(setLoader(false));
      if (data.success) {
        const userValue = {
          userId: null,
          id: '',
          firstName: null,
          lastName: null,
          email: null,
          country: null,
          userRole: '',
        };
        toast.info('User addition is successful');
        yield put(setNewUserValues(userValue));
        yield put(setModalToggle(false));
        yield put(setNewUserError(''));
        yield put({ type: 'GET_USERS_SAGA' });
      } else {
        if (data.code === 'DUPLICATE_ENTITY') {
          toast.error('User profile already exist');
        } else {
          toast.error(USER_ERROR);
        }
      }
      // else if (data.code === "DUPLICATE_ENTITY") {
      //   toast.error("User profile already exist");
      //   yield put(setNewUserError("User profile already exist"));
      // } else {
      //   yield put(
      //     setNewUserError(
      //       "Error while adding the user, please contact administrator or try after sometime."
      //     )
      //   );

      // }
      // toast.error(USER_ERROR);
    } else {
      yield put(setLoader(false));
      yield put(setNewUserError(USER_ERROR));
      toast.error(USER_ERROR);
    }
  } catch (err) {
    yield put(setLoader(false));
    if (err.code === 'DUPLICATE_ENTITY') {
      toast.error('User profile already exist');
      yield put(setNewUserError('User profile already exist'));
    } else {
      yield put(setNewUserError());
      toast.error(USER_ERROR);
    }
  }
}
/* istanbul ignore next */
export function* addNewUserSDA(userId) {
  const state = yield select();
  const userEmail = state.user.userDetail.email;
  const Url = `${process.env.REACT_APP_SDA}/sda-rest-api/api/external/entitlement/V1/ApplicationUsers`;

  const Config = {
    url: Url,
    method: 'POST',
    params: {
      roleType: 'Reader',
      appKey: process.env.REACT_APP_SDA_AUTH,
      userType: 'internal',
      networkId: userId,
      updatedBy: userEmail,
    },
  };
  try {
    const data = yield call(httpCallSDA, Config);
    if (data.success) {
      return true;
    }
    if (data.code === 'DUPLICATE_ENTITY') {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export function* addNewRole(action) {
  yield put(setLoader(true));
  const roleData = action.payload;
  const Url = `${BASE_URL_8000}/api/roles/new_role`;
  const Config = {
    url: Url,
    method: 'POST',
    data: {
      roleName: roleData.role,
      roleDescription: roleData.description,
      roleLevel: 'user',
    },
  };
  try {
    const data = yield call(httpCall, Config);
    yield put(setLoader(false));
    if (data.success) {
      toast.info('New User Role is successfully added');
      yield put(setModalToggle(false));
      yield put(setUserRoleErr(''));
      yield put({ type: 'GET_ROLES_SAGA' });
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
      yield put(setUserRoleErr(data.err.data.detail));
    } else {
      yield put(setUserRoleErr('Error while adding roles to PD'));
      toast.error('Error while adding roles to PD');
    }
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
    yield put(setUserRoleErr('Error while adding roles to PD'));
    toast.error('Error while adding roles to PD');
  }
}

export function* newMapping(action) {
  yield put(setLoader(true));
  const mapDetails = action.payload;
  const Url = `${BASE_URL_8000}/api/user_protocol/`;
  try {
    const details = [mapDetails].map((item) => {
      const data = {};
      data.userId = item.userId;
      data.protocol = item.protocol;
      data.userRole = item.role.toLowerCase();
      data.projectId = item.projectId;
      data.follow = item.following === '1';
      data.accessReason = item.viaTicketNumber;
      data.userUpdated = item.updatedByUser;
      return data;
    });
    const Config = {
      url: Url,
      method: 'POST',
      data: details[0],
    };

    const data = yield call(httpCall, Config);
    yield put(setLoader(false));
    if (data.success) {
      toast.info('Details are saved to the system.');
      yield put(setModalToggle(false));
      yield put(setNewMappingError(''));
      const data = {
        userId: mapDetails.userId,
        protocol: mapDetails.protocol,
      };
      yield put(setSearch(data));
      yield put({ type: 'GET_PROTOCOL_MAP_SAGA', payload: data });
    } else if (data.err && data.err.data && data.err.data.detail) {
      toast.error(data.err.data.detail);
      yield put(setNewMappingError(data.err.data.detail));
    } else {
      yield put(
        setNewMappingError('Error while adding User Protocol Mapping to PD'),
      );
      toast.error('Error while adding User Protocol Mapping to PD');
    }
  } catch (err) {
    console.log(err);
    yield put(setLoader(false));
    yield put(
      setNewMappingError('Error while adding User Protocol Mapping to PD'),
    );
    toast.error('Error while adding User Protocol Mapping to PD');
  }
}

export function* getUserDetails(action) {
  const Url = `${BASE_URL_8000}/api/ldap_user_details/`;
  const state = yield select();
  const userDetails = state.admin.newUser;
  const Config = {
    url: Url,
    method: 'GET',
    params: {
      userId: action.payload,
    },
  };
  const errorValue = {
    firstName: { error: false, message: '' },
    lastName: { error: false, message: '' },
    email: { error: false, message: '' },
    country: { error: false, message: '' },
    userId: { error: false, message: '' },
    userRole: { error: false, message: '' },
    viaTicketNumber: { error: false, message: '' },
  };
  const userValue = {
    firstName: null,
    lastName: null,
    email: null,
    country: null,
    viaTicketNumber: null,
  };
  try {
    yield put(setUserLoader(true));
    const userData = yield call(httpCall, Config);
    if (userData.success && userData.data) {
      const data = {};
      data.userId = userData.data.userId;
      data.id = action.payload;
      data.firstName = userData.data.first_name;
      data.lastName = userData.data.last_name;
      data.email = userData.data.email;
      data.country = userData.data.country;
      data.userRole = userDetails.userRole;
      data.viaTicketNumber = userData.accessReason;

      yield put(setNewUserValues(data));
      yield put(setUserError(''));

      yield put(setFormError(errorValue));
    } else if (userData.err && userData.err.data && userData.err.data.detail) {
      toast.error(userData.err.data.detail);
      yield put(setNewUserValues(userValue));
      yield put(setUserError(userData.err.data.detail));
    } else {
      yield put(setNewUserValues(userValue));
      yield put(
        setUserError('Error while fetching user details try again later'),
      );
      toast.error('Error while fetching user details try again later');
    }
    yield put(setNewUserError(''));
    yield put(setUserLoader(false));
  } catch (err) {
    yield put(setUserLoader(false));
    console.log(err);
    yield put(setNewUserValues(userValue));
    yield put(
      setUserError('Error while fetching user details try again later'),
    );
    yield put(setNewUserError(''));
    toast.error('Error while fetching user details try again later');
  }
}

export function* bulkUploadMapping(action) {
  yield put(setMapLoader(true));
  const bodyFormData = new FormData();
  bodyFormData.append('user_protocol_xls_file', action.payload.uploadedFile);
  const Url = `${BASE_URL_8000}/api/user_protocol/user_protocol_many?user_updated=${action.payload.userUpdated}&access_reason=${action.payload.accessReason}`;
  const Config = {
    url: Url,
    method: 'POST',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  try {
    const data = yield call(httpCall, Config);
    yield put(setMapLoader(false));
    if (data.success) {
      yield put(setBulkMapResponse(data.data));
    } else if (
      data.err &&
      data.err.data &&
      typeof data.err.data.detail === 'string'
    ) {
      toast.error(data.err.data.detail);
      yield put(setBulkMapError(data.err.data.detail));
      yield put(setBulkMapResponse([]));
    } else {
      yield put(
        setBulkMapError('Error while adding User Protocol Mapping to PD'),
      );
      yield put(setBulkMapResponse([]));
      toast.error('Error while adding User Protocol Mapping to PD');
    }
  } catch (err) {
    console.log(err);
    yield put(setMapLoader(false));
    yield put(setBulkMapResponse([]));
    yield put(
      setBulkMapError('Error while adding User Protocol Mapping to PD'),
    );
    toast.error('Error while adding User Protocol Mapping to PD');
  }
}

export function* watchAdmin() {
  yield takeLatest('GET_USERS_SAGA', usersFunction);
  yield takeLatest('GET_ROLES_SAGA', getRolesFunction);
  yield takeLatest('GET_PROTOCOL_MAP_SAGA', getProtocolMapData);
  yield takeLatest('DELETE_USER_SAGA', deleteUser);
  yield takeLatest('UPDATE_USER_SAGA', updateUser);
  yield takeLatest('ADD_NEW_ROLE_SAGA', addNewRole);
  yield takeLatest('ADD_NEW_USER_SAGA', addNewUser);
  yield takeLatest('DELETE_USER_PROTOCOL_MAPPING', deleteMapping);
  yield takeLatest('ADD_NEW_MAPPING_SAGA', newMapping);
  yield takeLatest('GET_USER_DETAILS_LDAP', getUserDetails);
  yield takeLatest('BULK_UPLOAD_MAPPING_SAGA', bulkUploadMapping);
}

export default function* adminSaga() {
  yield all([watchAdmin()]);
}
