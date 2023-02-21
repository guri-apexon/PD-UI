import { createSlice } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
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
    deleteNotificationData: (state, action) => {
      try {
        state.notifications = state.notifications.filter(
          (item) => item?.id !== action.payload,
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { getNotification, setError, getLoader, deleteNotificationData } =
  navbarSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const navbar = (state) => state.navbar;
export const navbarNotifications = (state) => state.navbar.notifications;
export const navbarNotificationsError = (state) => state.navbar.error;
export const loader = (state) => state.navbar.loader;

export default navbarSlice.reducer;
