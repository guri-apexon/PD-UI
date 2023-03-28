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
    header: {},
    loader: false,
    protocol: '',
    sectionDetails: {
      protocol: null,
      data: [],
      sectionResponse: null,
      updated: false,
    },
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
    SOAData: {},
    isSaveEnabled: false,
    sectionIndex: -1,
    labDataApiValue: {
      data: [],
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
    setSectionDetails: (state, action) => {
      const { protocol, linkId, data } = action.payload;
      if (protocol === state.sectionDetails.protocol) {
        const existIndex = state.sectionDetails?.data?.findIndex(
          (x) => x.linkId === linkId,
        );
        if (existIndex >= 0) {
          state.sectionDetails.data[existIndex].data = data;
        } else {
          state.sectionDetails.data.push({ linkId, data });
        }
      } else {
        state.sectionDetails.protocol = protocol;
        state.sectionDetails.data = [{ linkId, data }];
      }
      state.sectionDetails.sectionResponse = null;
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
    updateSectionResp: (state, action) => {
      if (action?.payload?.response) {
        state.sectionDetails = {
          ...state.sectionDetails,
          sectionResponse: action?.payload?.response,
          updated: true,
        };
      } else {
        state.sectionDetails = {
          ...state.sectionDetails,
          updated: true,
        };
      }
    },

    resetUpdateStatus: (state) => {
      state.sectionDetails = {
        ...state.sectionDetails,
        updated: false,
      };
    },

    updateSectionData: (state, action) => {
      const { actionType, data, content, lineId, linkId } = action.payload;
      if (actionType === 'REPLACE_CONTENT' && data && linkId) {
        state.sectionDetails.data = state.sectionDetails.data.map((x) =>
          x.linkId === linkId ? { ...x, data } : x,
        );
      } else if (content && lineId) {
        state.sectionDetails.sections = state.sectionDetails.sections.map(
          (x) => {
            if (x.line_id === lineId) {
              x.qc_change_type = 'modify';
              x.content = content;
            }
            return x;
          },
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
    setSOAData: (state, action) => {
      state.SOAData = action.payload;
    },
    setSaveEnabled: (state, action) => {
      state.isSaveEnabled = action.payload;
    },
    getSectionIndex: (state, action) => {
      state.sectionIndex = action.payload;
    },
    getLabData: (state, action) => {
      state.labDataApiValue = action.payload;
    },
    updateGetLabData: (state, action) => {
      state.labDataUpdatedValue = action.payload;
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
  setSOAData,
  setSaveEnabled,
  updateSectionResp,
  getSectionIndex,
  resetUpdateStatus,
  getLabData,
  updateGetLabData,
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
export const rightBladeValue = (state) => state.protocol.rightBladeValue;
export const TOCActive = (state) => state.protocol.TOCActiveAccordion;
export const accordionMetaData = (state) => state.protocol.accordionMetaData;
export const accordianMetaParam = (state) => state.protocol.accordianMetaParam;
export const metadataApiCallValue = (state) =>
  state.protocol.metadataApiCallValue;
export const EnrichedValue = (state) => state.protocol.EnrichedApiValue;
export const isSaveEnabled = (state) => state.protocol.isSaveEnabled;
export const SectionIndex = (state) => state.protocol.sectionIndex;
export const SOAData = (state) => state.protocol.SOAData;
export const labDataApiValue = (state) => state.protocol.labDataApiValue;
export const labDataUpdatedValue = (state) =>
  state.protocol.labDataUpdatedValue;

export default protocolSlice.reducer;
