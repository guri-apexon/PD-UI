import { createSlice } from "@reduxjs/toolkit";

export const protocolSlice = createSlice({
  name: "protocol",
  initialState: {
    summary: {},
    view: {
      iqvdataSoa: [],
      iqvdataSummary: {},
      iqvdataToc: {
        data:[]
      }
    },
    associateDocs: [],
    compare: {
      loading: false,
      called: false,
      iqvdata: "",
      error: false,
      message: "",
    },
  },
  reducers: {
    getSummary: (state, action) => {
      state.summary = action.payload;
    },
    getProcotoclToc: (state, action) => {
      state.view = action.payload;
    },
    getAssociateDocuments: (state, action) => {
      state.associateDocs = action.payload;
    },
    getCompare: (state, action) => {
      state.compare = action.payload;
    },
  },
});

export const {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
} = protocolSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const protocolSummary = (state) => state.protocol.summary;
export const viewResult = (state) => state.protocol.view;
export const associateDocs = (state) => state.protocol.associateDocs;
export const compareResult = (state) => state.protocol.compare;

export default protocolSlice.reducer;
