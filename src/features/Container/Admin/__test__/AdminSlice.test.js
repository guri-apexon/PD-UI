/* eslint-disable */
import adminSlice, {
  getUsers,
  getUserRoles,
  getProtocolMap,
  getRolesOptions,
  setLoader,
  setUserLoader,
  setSearch,
  setMapLoader,
} from '../adminSlice';

const initialState = {
  users: [],
  roles: [],
  map: [],
  roleOptions: {
    user: [],
    protocol: [],
  },
  loader: false,
  getUserLoader: false,
  searchedData: {},
  mapLoader: false,
};

const userData = [
  {
    username: 'u1072231',
    first_name: 'Sohan',
    last_name: 'Khatawkar',
    email: 'sohan.khatawkar@iqvia.com',
    country: 'India',
    date_of_registration: '2021-01-29T04:09:44.277000',
    user_type: 'normal',
  },
  {
    username: 'q1036048',
    first_name: 'Abhay',
    last_name: 'K',
    email: 'abhay.kumar2@quintiles.com',
    country: 'India',
    date_of_registration: '2021-01-29T06:40:31.823000',
    user_type: 'QC2',
  },
];

describe(' adminSlice Test Suite', () => {
  test('getUsers', () => {
    expect(
      adminSlice(initialState, {
        type: getUsers.type,
        payload: userData,
      }),
    ).toEqual({ ...initialState, users: userData });
  });

  test('getUserRoles', () => {
    expect(
      adminSlice(initialState, {
        type: getUserRoles.type,
        payload: [],
      }),
    ).toEqual({ ...initialState, userRoles: [] });
  });
  test('getProtocolMap', () => {
    expect(
      adminSlice(initialState, {
        type: getProtocolMap.type,
        payload: [],
      }),
    ).toEqual({ ...initialState, users: [] });
  });
  test('getProtocolMap', () => {
    const roleOption = {
      user: [],
      protocol: [],
    };
    expect(
      adminSlice(initialState, {
        type: getRolesOptions.type,
        payload: roleOption,
      }),
    ).toEqual({ ...initialState, roleOptions: roleOption });
  });
  test('setLoader', () => {
    const loaders = false;
    expect(
      adminSlice(initialState, {
        type: setLoader.type,
        payload: loaders,
      }),
    ).toEqual({ ...initialState, loader: loaders });
  });
  test('setLoader', () => {
    const getUserLoaders = false;
    expect(
      adminSlice(initialState, {
        type: setUserLoader.type,
        payload: getUserLoaders,
      }),
    ).toEqual({ ...initialState, getUserLoader: getUserLoaders });
  });
  test('setSearch', () => {
    const searchedDat = {};
    expect(
      adminSlice(initialState, {
        type: setSearch.type,
        payload: searchedDat,
      }),
    ).toEqual({ ...initialState, searchedData: searchedDat });
  });
  test('setSearch', () => {
    const mapLoaders = false;
    expect(
      adminSlice(initialState, {
        type: setMapLoader.type,
        payload: mapLoaders,
      }),
    ).toEqual({ ...initialState, mapLoader: mapLoaders });
  });
});
