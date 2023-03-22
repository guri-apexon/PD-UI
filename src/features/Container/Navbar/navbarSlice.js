import { createSlice } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    OptInOut: {},
    notifications: [],
    error: false,
    loader: false,
  },
  reducers: {
    getNotification: (state, action) => {
      state.notifications = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getLoader: (state, action) => {
      state.loader = action.payload;
    },
    getOptInOutData: (state, action) => {
      state.OptInOut = action.payload;
    },
  },
});

export const { getNotification, setError, getLoader, getOptInOutData } =
  navbarSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const navbar = (state) => state.navbar;
export const navbarNotifications = (state) => state.navbar.notifications;
export const navbarNotificationsError = (state) => state.navbar.error;
export const loader = (state) => state.navbar.loader;
export const OptInOutData = (state) => state.navbar.OptInOut;

export default navbarSlice.reducer;
