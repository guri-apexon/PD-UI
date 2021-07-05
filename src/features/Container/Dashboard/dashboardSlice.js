import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    protocols: [],
    tableError: false,
    recentSearches: [],
    addProtocolData: {
      sponsor: [],
    },
    addProtocolModal: false,
    isLoading: true,
    savedSearches: [],
    apiError: false,
    followedProtocols: [],
    selectedProtocols: [],
    displayAddProtocol: true,
    tableLoading: true,
  },
  reducers: {
    getProtocols: (state, action) => {
      state.protocols = action.payload;
    },
    setError: (state, action) => {
      state.tableError = action.payload;
    },
    getRecentSearches: (state, action) => {
      state.recentSearches = action.payload;
    },
    getSponsor: (state, action) => {
      state.addProtocolData.sponsor = action.payload;
    },
    getIndication: (state, action) => {
      state.addProtocolData.indication = action.payload;
    },
    setAddprotocolError: (state, action) => {
      state.addProtocolDataError = action.payload;
    },
    setAddProtocolModal: (state, action) => {
      state.addProtocolModal = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    getSavedSearches: (state, action) => {
      state.savedSearches = action.payload;
    },
    setApiError: (state, action) => {
      state.apiError = action.payload;
    },
    getFollowedProtocols: (state, action) => {
      state.followedProtocols = action.payload;
    },
    setSelectedProtocols: (state, action) => {
      state.selectedProtocols = action.payload;
    },
    hideAddprotocol: (state, action) => {
      state.displayAddProtocol = action.payload;
    },
    setTableLoader: (state, action) => {
      state.tableLoading = action.payload;
    },
  },
});

export const {
  getProtocols,
  setError,
  getRecentSearches,
  getSponsor,
  getIndication,
  getProtocolData,
  setAddprotocolError,
  setAddProtocolModal,
  setLoading,
  getSavedSearches,
  setApiError,
  getFollowedProtocols,
  setSelectedProtocols,
  hideAddprotocol,
  setTableLoader,
} = dashboardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const dashboard = (state) => state.dashboard;
export const prtocolsList = (state) => state.dashboard.protocols;
export const prtocolsError = (state) => state.dashboard.tableError;
export const recentSearches = (state) => state.dashboard.recentSearches;
export const savedSearches = (state) => state.dashboard.savedSearches;
export const selectedProtocolsList = (state) =>
  state.dashboard.selectedProtocols;
export const followedProtocolsList = (state) =>
  state.dashboard.followedProtocols;
export const displayAddProtocol = (state) => state.dashboard.displayAddProtocol;
export const tableLoader = (state) => state.dashboard.tableLoading;
export const dashboadAPIError = (state) => state.dashboard.apiError;

export default dashboardSlice.reducer;
