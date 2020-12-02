import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    protocols: [],
    tableError: false,
    compareSelected: false,
    recentSearches: [],
  },
  reducers: {
    getProtocols: (state, action) => {
      state.protocols = action.payload
    },
    setError: (state, action) => {
      state.tableError = action.payload
    },
    setCompareSelected: (state, action) => {
      state.compareSelected = action.payload
    },
    getRecentSearches: (state, action) => {
      state.recentSearches = action.payload
    }
  },
});

export const { getProtocols, setError, setCompareSelected, getRecentSearches } = dashboardSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const dashboard = state => state.dashboard;
export const prtocolsList = state => state.dashboard.protocols;
export const prtocolsError = state => state.dashboard.tableError;
export const protocolCompare = state => state.dashboard.compareSelected;
export const recentSearches = state => state.dashboard.recentSearches;

export default dashboardSlice.reducer;
