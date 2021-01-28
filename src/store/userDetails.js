import { createSlice } from '@reduxjs/toolkit';

export const userDetails = createSlice({
  name: 'user',
  initialState: {
      userDetail: {
        userId: 'qbulk_upload_uat',
        username: 'Test User',
        email: 'test.user@iqvia.com'
      }
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
export const loggedUser = state => state.user.userDetail;
export const userId = state => state.user.userDetail.userId;

export default userDetails.reducer;
