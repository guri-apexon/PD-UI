import { createSlice } from '@reduxjs/toolkit';
import { updateContentWithData } from '../../../utils/utilFunction';
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
    header: {},
    loader: false,
    protocol: '',
    sectionDetails: {
      protocol: null,
      data: [],
    },
    protocolTocData: [],
    sectionLoader: false,
    fileStream: {
      loader: false,
      success: false,
      error: '',
      data: null,
    },
    metaDataVariable: [],
    rightBladeValue: PROTOCOL_RIGHT_MENU.HOME,
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
    setSectionDetails: (state, action) => {
      const { protocol, linkId, data } = action.payload;
      if (protocol === state.sectionDetails.protocol) {
        state.sectionDetails.data.push({ linkId, data });
      } else {
        state.sectionDetails.protocol = protocol;
        state.sectionDetails.data = [{ linkId, data }];
      }
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
      const { type, data } = action.payload;
      if (type === 'insert') {
        console.log('STATE UPDATED');
        // state.sectionDetails.data = data;
      } else {
        const obj = {
          type: 'modify',
          lineId: action.payload.lineId,
          content: action.payload.content,
        };
        const arr = updateContentWithData(state.sectionDetails.sections, obj);
        state.sectionDetails.sections = arr;
      }
    },
    getMetaDataSummaryField: (state, action) => {
      state.metaDataSummaryField = action.payload;
    },
    getMetaDataVariable: (state, action) => {
      state.metaDataVariable = action.payload;
    },
    getRightBladeValue: (state, action) => {
      state.rightBladeValue = action.payload;
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
  getMetaDataVariable,
  getRightBladeValue,
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
export const sectionDetails = (state) => state.protocol.sectionDetails;
export const protocolTocData = (state) => state.protocol.protocolTocData;

export const sectionLoader = (state) => state.protocol.sectionLoader;
export const getPdfData = (state) => state.protocol.fileStream;
export const metaDataVariable = (state) => state.protocol.metaDataVariable;
export const rightBladeValue = (state) => state.protocol.rightBladeValue;

export default protocolSlice.reducer;
