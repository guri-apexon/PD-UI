import { createSlice } from "@reduxjs/toolkit";

export const userDetails = createSlice({
  name: "user",
  initialState: {
    userDetail: {
      userId: "",
      username: "",
      email: "",
      user_type: "",
    },
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});

export const { setUserDetails } = userDetails.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const loggedUser = (state) => state.user.userDetail;
export const userId = (state) => state.user.userDetail.userId;
export const userType = (state) => state.user.userDetail.user_type;

export default userDetails.reducer;
