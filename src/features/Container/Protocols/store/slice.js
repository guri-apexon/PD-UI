import { createSlice } from "@reduxjs/toolkit";

export const protocolSlice = createSlice({
  name: "protocols",
  initialState: {
    docID: "",
    overview: {
      success: false,
      loading: false,
      data: null,
      error: "",
    },
    view: {
      iqvdataSoa: [],
      iqvdataSummary: {},
      iqvdataToc: {
        data: [],
      },
      loader: true,
    },
    associateDocs: {
      success: false,
      loading: false,
      data: [],
      error: "",
    },
    fileStream: {
      loader: false,
      success: false,
      error: "",
      data: null,
    },
    wrapperData: {
      loader: false,
      success: false,
      error: "",
      data: null,
    },
    ptData: {
      loader: false,
      success: false,
      error: "",
      data: null,
      detail: null,
    },
  },
  reducers: {
    getOverviewData: (state, action) => {
      state.overview = action.payload;
    },
    getViewdata: (state, action) => {
      state.view = action.payload;
    },
    getAssociateDocuments: (state, action) => {
      state.associateDocs = action.payload;
    },
    getFileStream: (state, action) => {
      state.pdfStream = action.payload;
    },
    getWrapperData: (state, action) => {
      state.wrapperData = action.payload;
    },
    getPTData: (state, action) => {
      state.ptData = action.payload;
    },
    setDOCID: (state, action) => {
      state.docID = action.payload;
    },
  },
});

export const {
  getOverviewData,
  getViewdata,
  getAssociateDocuments,
  getFileStream,
  getWrapperData,
  getPTData,
  setDOCID,
} = protocolSlice.actions;

export default protocolSlice.reducer;

export const overviewData = (state) => state.protocol.overview;
export const protocolViewData = (state) => state.protocol.view;
export const relatedProtocol = (state) => state.protocol.associateDocs;
export const fileStream = (state) => state.protocol.fileStream;
export const wrapper = (state) => state.protocol.wrapperData;
export const ptWrapper = (state) => state.protocol.ptData;
export const docID = (state) => state.protocol.docID;
