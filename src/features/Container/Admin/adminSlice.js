import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    roles: [],
    map: [],
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
  },
});

export const {
  getUsers,
  getRoles,
  getProtocolMap,
  setUserRole,
  setUserRoleErr,
} = adminSlice.actions;

export const usersList = (state) => state.admin.users;
export const rolesList = (state) => state.admin.roles;
export const protocolMap = (state) => state.admin.map;
export const roleValues = (state) => state.admin.roleValues;
export const roleError = (state) => state.admin.roleError;

export default adminSlice.reducer;
