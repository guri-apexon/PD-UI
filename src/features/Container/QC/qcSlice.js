import { createSlice } from '@reduxjs/toolkit';

export const qcSlice = createSlice({
  name: 'qc',
  initialState: {
    protocols: [],
    tableError: false,
    loader: false,
    tableLoading: true,
    notificationData: { id: '', protocol: '' },
  },
  reducers: {
    getProtocols: (state, action) => {
      state.protocols = action.payload;
    },
    setError: (state, action) => {
      state.tableError = action.payload;
    },
    getLoader: (state, action) => {
      state.loader = action.payload;
    },
    setTableLoader: (state, action) => {
      state.tableLoading = action.payload;
    },
    setNotification: (state, action) => {
      state.notificationData = action.payload;
    },
  },
});

export const {
  getProtocols,
  setError,
  getLoader,
  setTableLoader,
  setNotification,
} = qcSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const qc = (state) => state.qc;
export const qcProtocols = (state) => state.qc.protocols;
export const qcProtocolsError = (state) => state.qc.tableError;
export const loader = (state) => state.qc.loader;
export const tableLoader = (state) => state.qc.tableLoading;
export const qcNotification = (state) => state.qc.notificationData;

export default qcSlice.reducer;
