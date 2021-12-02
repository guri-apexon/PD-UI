import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    userRoles: [],
    protocolRoles: [],
    map: [],
    loader: false,
    newUser: {
      userId: null,
      id: "",
      firstName: null,
      lastName: null,
      email: null,
      country: null,
      userRole: "",
    },
    modalToggle: false,
    newUserError: "",
    roleError: "",
    roleValues: {
      role: "",
      description: "",
    },
    newMapping: {
      userId: null,
      protocol: null,
      role: null,
      following: null,
    },
    newMappingError: "",
    getUserError: "",
    getUserLoader: false,
    formErrorValues: {
      firstName: { error: false, message: "" },
      lastName: { error: false, message: "" },
      email: { error: false, message: "" },
      country: { error: false, message: "" },
      userId: { error: false, message: "" },
      userRole: { error: false, message: "" },
    },
    bulkMapResponse: [],
    bulkMapError: "",
    searchedData: {},
    roleOptions: {
      user: [],
      protocol: [],
    },
    mapLoader: false,
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getUserRoles: (state, action) => {
      state.userRoles = action.payload;
    },
    getRolesOptions: (state, action) => {
      state.roleOptions = action.payload;
    },
    getProtocolMap: (state, action) => {
      state.map = action.payload;
    },
    setUserRole: (state, action) => {
      state.roleValues = action.payload;
    },
    setUserRoleErr: (state, action) => {
      state.roleError = action.payload;
    },
    setNewUserValues: (state, action) => {
      state.newUser = action.payload;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setModalToggle: (state, action) => {
      state.modalToggle = action.payload;
    },
    setNewUserError: (state, action) => {
      state.newUserError = action.payload;
    },
    setNewMappingValues: (state, action) => {
      state.newMapping = action.payload;
    },
    setNewMappingError: (state, action) => {
      state.newMappingError = action.payload;
    },
    setUserError: (state, action) => {
      state.getUserError = action.payload;
    },
    setUserLoader: (state, action) => {
      state.getUserLoader = action.payload;
    },
    setFormError: (state, action) => {
      state.formErrorValues = action.payload;
    },
    setBulkMapResponse: (state, action) => {
      state.bulkMapResponse = action.payload;
    },
    setBulkMapError: (state, action) => {
      state.bulkMapError = action.payload;
    },
    setSearch: (state, action) => {
      state.searchedData = action.payload;
    },
    setMapLoader: (state, action) => {
      state.mapLoader = action.payload;
    },
  },
});

export const {
  getUsers,
  getUserRoles,
  getRolesOptions,
  getProtocolMap,
  setUserRole,
  setUserRoleErr,
  setLoader,
  setModalToggle,
  setNewUserValues,
  setNewUserError,
  setNewMappingValues,
  setNewMappingError,
  setUserError,
  setUserLoader,
  setFormError,
  setBulkMapError,
  setBulkMapResponse,
  setSearch,
  setMapLoader,
} = adminSlice.actions;

export const usersList = (state) => state.admin.users;
export const userRolesList = (state) => state.admin.userRoles;
export const rolesOptionsList = (state) => state.admin.roleOptions;
export const protocolMap = (state) => state.admin.map;
export const roleValues = (state) => state.admin.roleValues;
export const roleError = (state) => state.admin.roleError;
export const newUser = (state) => state.admin.newUser;
export const loader = (state) => state.admin.loader;
export const modalToggle = (state) => state.admin.modalToggle;
export const newUserError = (state) => state.admin.newUserError;
export const newMapping = (state) => state.admin.newMapping;
export const newMappingError = (state) => state.admin.newMappingError;
export const getUserError = (state) => state.admin.getUserError;
export const getUserLoader = (state) => state.admin.getUserLoader;
export const formErrorValues = (state) => state.admin.formErrorValues;
export const bulkMapError = (state) => state.admin.bulkMapError;
export const bulkMapResponse = (state) => state.admin.bulkMapResponse;
export const searchedData = (state) => state.admin.searchedData;
export const mappingLoader = (state) => state.admin.mapLoader;

export default adminSlice.reducer;
