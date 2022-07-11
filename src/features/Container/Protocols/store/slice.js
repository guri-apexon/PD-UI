import { createSlice } from "@reduxjs/toolkit";

export const protocolSlice = createSlice({
  name: "protocols",
  initialState: {
    docID: "",
    pageNumber: 1,
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
    segmentUpdated: {},
    segmentInserted: {},
    wrapperDataMeta: {
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
    getSegmentUpdated: (state, action) => {
      state.segmentUpdated = action.payload;
    },
    getSegmentInserted: (state, action) => {
      state.segmentInserted = action.payload;
    },
    getWrapperDataMeta: (state, action) => {
      state.wrapperDataMeta = action.payload;
    },
    getPTData: (state, action) => {
      state.ptData = action.payload;
    },
    setDOCID: (state, action) => {
      state.docID = action.payload;
    },
    setPageNumber: (state, action) => {
      state.pageNumber = action.payload;
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
  getWrapperDataMeta,
  getSegmentUpdated,
  getSegmentInserted,
  setPageNumber,
} = protocolSlice.actions;

export default protocolSlice.reducer;

export const overviewData = (state) => state.protocol.overview;
export const protocolViewData = (state) => state.protocol.view;
export const relatedProtocol = (state) => state.protocol.associateDocs;
export const fileStream = (state) => state.protocol.fileStream;
export const wrapper = (state) => state.protocol.wrapperData;
export const wrapperMeta = (state) => state.protocol.wrapperDataMeta;
export const ptWrapper = (state) => state.protocol.ptData;
export const docID = (state) => state.protocol.docID;
export const updatedSegment = (state) => state.protocol.segmentUpdated;
export const insertedSegment = (state) => state.protocol.segmentInserted;
export const pdfPageNumber = (state) => state.protocol.pageNumber;
