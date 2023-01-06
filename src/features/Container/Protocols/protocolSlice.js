import { createSlice } from '@reduxjs/toolkit';

export const protocolSlice = createSlice({
  name: 'protocol',
  initialState: {
    userName: '',
    summary: {},
    view: {
      iqvdataSoa: [],
      iqvdataSummary: {},
      iqvdataToc: {
        data: [],
      },
      loader: true,
    },
    associateDocs: [],
    compare: {
      loading: false,
      called: false,
      iqvdata: '',
      error: false,
      message: '',
    },
    header: {},
    loader: false,
    protocol: '',
    sectionDetails: {},
    protocolTocData: [],
    sectionLoader: false,
    fileStream: {
      loader: false,
      success: false,
      error: '',
      data: null,
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
    getHeaderList: (state, action) => {
      state.header = action.payload;
    },
    getSectionProtocol: (state, action) => {
      state.protocol = action.payload;
    },
    getSectionDetails: (state, action) => {
      state.sectionDetails = action.payload;
    },
    getProtocolTocData: (state, action) => {
      state.protocolTocData = action.payload;
    },
    setSectionLoader: (state) => {
      state.sectionLoader = true;
    },
    resetSectionLoader: (state) => {
      state.sectionLoader = false;
    },
    resetSectionData: (state) => {
      state.sectionDetails = {};
    },
    getFileStream: (state, action) => {
      state.fileStream = action.payload;
    },
    setSectionDetails: (state, action) => {
      console.log({ action });
      state.sectionDetails.sections = action.payload;
    },
  },
});

export const {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
  getHeaderList,
  getSectionDetails,
  getSectionProtocol,
  getProtocolTocData,
  setSectionLoader,
  resetSectionLoader,
  resetSectionData,
  getFileStream,
  setSectionDetails,
} = protocolSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const protocolSummary = (state) => state.protocol.summary;
export const viewResult = (state) => state.protocol.view;
export const associateDocs = (state) => state.protocol.associateDocs;
export const compareResult = (state) => state.protocol.compare;
export const headerResult = (state) => state.protocol.header;
export const protocolResult = (state) => state.protocol.protocol;
export const sectionDetailsResult = (state) => state.protocol.sectionDetails;
export const protocolTocData = (state) => state.protocol.protocolTocData;

export const sectionLoader = (state) => state.protocol.sectionLoader;
export const getPdfData = (state) => state.protocol.fileStream;

export default protocolSlice.reducer;
