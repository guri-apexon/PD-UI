import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    roles: [],
    map: [],
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
  },
});

export const { getUsers, getRoles, getProtocolMap } = adminSlice.actions;

export const usersList = (state) => state.admin.users;
export const rolesList = (state) => state.admin.roles;
export const protocolMap = (state) => state.admin.map;

export default adminSlice.reducer;
