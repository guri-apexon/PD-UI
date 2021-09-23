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

export default adminSlice.reducer;
