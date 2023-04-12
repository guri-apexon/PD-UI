import { createSlice } from '@reduxjs/toolkit';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    protocols: [],
    tableError: false,
    recentSearches: [],
    addProtocolModal: false,
    isLoading: false,
    savedSearches: [],
    apiError: false,
    followedProtocols: [],
    selectedProtocols: [],
    displayAddProtocol: true,
    tableLoading: true,
    dashboardSearchLoader: true,
    indicationLoading: true,
    sponsorLoading: true,
    workflowData: {
      loading: false,
      error: null,
      data: {
        Status: '',
      },
    },
    workflowSubmit: {
      loading: false,
      error: null,
      data: [],
      success: false,
    },
    wfData: {
      loading: false,
      error: null,
      data: [],
      success: false,
    },
    addProtocolErrorState: {
      type: '',
      data: {},
    },
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
    setAddprotocolError: (state, action) => {
      state.addProtocolDataError = action.payload;
    },
    setAddProtocolErrorState: (state, action) => {
      state.addProtocolErrorState = action.payload;
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
    getDashboardSearchLoader: (state, action) => {
      state.dashboardSearchLoader = action.payload;
    },
    setIndicationLoading: (state, action) => {
      state.indicationLoading = action.payload;
    },
    setSponsorLoading: (state, action) => {
      state.sponsorLoading = action.payload;
    },
    setworkflowData: (state, action) => {
      state.workflowData = action.payload;
    },
    setworkflowSubmit: (state, action) => {
      state.workflowSubmit = action.payload;
    },
    setWFData: (state, action) => {
      state.wfData = action.payload;
    },
  },
});

export const {
  getProtocols,
  setError,
  getRecentSearches,
  setAddprotocolError,
  setAddProtocolModal,
  setLoading,
  getSavedSearches,
  setApiError,
  getFollowedProtocols,
  setSelectedProtocols,
  hideAddprotocol,
  setTableLoader,
  getDashboardSearchLoader,
  setIndicationLoading,
  setSponsorLoading,
  setworkflowData,
  setworkflowSubmit,
  setAddProtocolErrorState,
  setWFData,
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
export const dashboadSearchLoader = (state) =>
  state.dashboard.dashboadSearchLoader;
export const workflow = (state) => state.dashboard.workflowData;
export const wfData = (state) => state.dashboard.wfData;
export const workflowSubmitData = (state) => state.dashboard.workflowSubmit;
export const addProtocolErrorData = (state) =>
  state.dashboard.addProtocolErrorState;

export default dashboardSlice.reducer;
