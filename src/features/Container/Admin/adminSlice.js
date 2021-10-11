import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    roles: [],
    map: [],
    loader: false,
    newUser: {
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      country: null,
      userRole: null,
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
  },
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
    getRoles: (state, action) => {
      state.roles = action.payload;
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
  },
});

export const {
  getUsers,
  getRoles,
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
} = adminSlice.actions;

export const usersList = (state) => state.admin.users;
export const rolesList = (state) => state.admin.roles;
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

export default adminSlice.reducer;
