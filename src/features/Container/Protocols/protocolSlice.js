import { createSlice } from '@reduxjs/toolkit';
import { PROTOCOL_RIGHT_MENU } from './Constant/Constants';

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
    headersList: {},
    loader: false,
    protocol: '',
    protocolTocData: [],
    sectionLoader: false,
    fileStream: {
      loader: false,
      success: false,
      error: '',
      data: null,
    },
    rightBladeValue: PROTOCOL_RIGHT_MENU.HOME,
    TOCActiveAccordion: [],
    accordionMetaData: {},
    accordianMetaParam: {},
    metadataApiCallValue: {
      status: false,
      name: '',
      op: '',
    },
    EnrichedApiValue: false,
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
      state.headersList = action.payload;
    },
    getSectionProtocol: (state, action) => {
      state.protocol = action.payload;
    },

    getProtocolTocData: (state, action) => {
      state.protocolTocData = action.payload;
    },
    setSectionLoader: (state, action) => {
      state.sectionLoader = action.payload;
    },
    resetSectionData: (state) => {
      state.sectionDetails = { protocol: null, data: [] };
    },
    getFileStream: (state, action) => {
      state.fileStream = action.payload;
    },
    updateSectionData: (state, action) => {
      const { actionType, data, linkId } = action.payload;

      if (actionType === 'REPLACE_CONTENT' && data && linkId) {
        state.headersList.data = state.headersList.data.map((x) =>
          x.link_id === linkId ? { ...x, sectionData: data } : x,
        );
      }
    },
    getMetaDataSummaryField: (state, action) => {
      state.metaDataSummaryField = action.payload;
    },
    getRightBladeValue: (state, action) => {
      state.rightBladeValue = action.payload;
    },
    getTOCActive: (state, action) => {
      state.TOCActiveAccordion = action.payload;
    },
    setAccordianMetaData: (state, action) => {
      state.accordionMetaData = action.payload;
    },
    setAccordianMetaParam: (state, action) => {
      state.accordianMetaParam = action.payload;
    },
    getMetadataApiCall: (state, action) => {
      state.metadataApiCallValue = action.payload;
    },
    getEnrichedValue: (state, action) => {
      state.EnrichedApiValue = action.payload;
    },
  },
});

export const {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
  getHeaderList,
  setSectionDetails,
  getSectionProtocol,
  getProtocolTocData,
  setSectionLoader,
  resetSectionData,
  getFileStream,
  updateSectionData,
  getMetaDataSummaryField,
  getRightBladeValue,
  getTOCActive,
  setAccordianMetaData,
  setAccordianMetaParam,
  getMetadataApiCall,
  getEnrichedValue,
} = protocolSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const protocolSummary = (state) => state.protocol.summary;
export const viewResult = (state) => state.protocol.view;
export const associateDocs = (state) => state.protocol.associateDocs;
export const compareResult = (state) => state.protocol.compare;
export const headerResult = (state) => state.protocol.headersList;
export const protocolResult = (state) => state.protocol.protocol;
export const protocolTocData = (state) => state.protocol.protocolTocData;

export const sectionLoader = (state) => state.protocol.sectionLoader;
export const getPdfData = (state) => state.protocol.fileStream;
export const rightBladeValue = (state) => state.protocol.rightBladeValue;
export const TOCActive = (state) => state.protocol.TOCActiveAccordion;
export const accordionMetaData = (state) => state.protocol.accordionMetaData;
export const accordianMetaParam = (state) => state.protocol.accordianMetaParam;
export const metadataApiCallValue = (state) =>
  state.protocol.metadataApiCallValue;
export const EnrichedValue = (state) => state.protocol.EnrichedApiValue;

export default protocolSlice.reducer;
