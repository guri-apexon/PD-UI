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
    loader: false,
    protocol: '',
    sectionDetails: {
      protocol: null,
      data: [],
      sectionResponse: null,
      updated: false,
      undoupdated: [],
    },
    protocolTocData: [],
    sectionLoader: false,
    fileStream: {
      loader: false,
      success: false,
      error: '',
      data: null,
    },
    dipaViewData: {
      data: {},
      success: false,
      loading: false,
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
    sectionIndex: -1,
    labData: {
      data: [],
      success: false,
      loading: false,
      created: false,
    },
    sectionLockDetails: {},
    enrichedword: {},
    activeTOC: [],
  },
  dipaViewData: [],
  allDipaViewData: [],
  enrichedData: {},
  discardValue: {
    isEdited: false,
    isDiscarded: false,
    protocolTab: -1,
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
      const { actionType, data, content, lineId, linkId, undo } =
        action.payload;
      if (actionType === 'REPLACE_CONTENT' && data && linkId) {
        console.log('SHUBHAM001', data, linkId);
        state.sectionDetails.data = state.sectionDetails.data.map((x) =>
          x.linkId === linkId ? { ...x, data } : x,
        );
        // if (undo) {
        //   state.sectionDetails = {
        //     ...state.sectionDetails,
        //     sectionResponse: action?.payload?.response,
        //     undoupdated: [...state.sectionDetails.undoupdated, 1],
        //   };
        // }
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
    setActiveTOC: (state, action) => {
      state.activeTOC = action.payload;
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
    setLoader: (state, action) => {
      state.loader = action.payload;
    },

    getSectionIndex: (state, action) => {
      state.sectionIndex = action.payload;
    },
    getLabData: (state, action) => {
      state.labData.data = action.payload;
    },
    setLabDataLoader: (state, action) => {
      state.labData.loading = action.payload;
    },
    setLabDataSuccess: (state, action) => {
      state.labData.success = action.payload;
    },
    setLabDataCreated: (state, action) => {
      state.labData.data = action.payload.data;
      state.labData.created = action.payload.status;
    },
    resetLabDataCreated: (state, action) => {
      state.labData.created = action.payload;
    },
    setSectionLockDetails: (state, action) => {
      state.sectionLockDetails = action.payload;
    },
    setEnrichedWord: (state, action) => {
      state.enrichedword = action.payload;
    },
    getDipaViewData: (state, action) => {
      state.dipaViewData = action.payload;
    },
    setDipaDataLoader: (state, action) => {
      state.dipaViewData.loading = action.payload;
    },
    getAllDipaViewData: (state, action) => {
      state.allDipaViewData = action.payload;
    },
    getDiscardDeatils: (state, action) => {
      state.discardValue = action.payload;
    },
    setWorkFlowSubmitButton: (state, action) => {
      state.summary.isWorkflowDone = action.payload;
    },
    resetProtocolTocData: (state) => {
      state.protocolTocData = [];
    },
    getEnrichedData: (state, action) => {
      state.enrichedData = action.payload;
    },
    updateSectionHeader: (state, action) => {
      const index = state.protocolTocData.data.findIndex(
        (x) => x.link_id === action.payload.linkId,
      );
      state.protocolTocData.data[index].source_file_section =
        action.payload.content[0].link_text;
    },
  },
});

export const {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
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
  updateSectionResp,
  getSectionIndex,
  resetUpdateStatus,
  getLabData,
  setLabDataLoader,
  setLabDataSuccess,
  setLabDataCreated,
  resetLabDataCreated,
  setEnrichedWord,
  setLoader,
  setSectionLockDetails,
  getDipaViewData,
  getAllDipaViewData,
  getDiscardDeatils,
  setWorkFlowSubmitButton,
  resetProtocolTocData,
  setActiveTOC,
  setDipaDataLoader,
  updateSectionHeader,
  getEnrichedData,
} = protocolSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const protocolSummary = (state) => state.protocol.summary;
export const viewResult = (state) => state.protocol.view;
export const associateDocs = (state) => state.protocol.associateDocs;
export const compareResult = (state) => state.protocol.compare;
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
export const SectionIndex = (state) => state.protocol.sectionIndex;
export const Enrichedword = (state) => state.protocol.enrichedword;
export const SOAData = (state) => state.protocol.SOAData;
export const labDataSelector = (state) => state.protocol.labData;
export const sectionLockDetails = (state) => state.protocol.sectionLockDetails;
export const dipaViewData = (state) => state.protocol.dipaViewData;
export const allDipaViewData = (state) => state.protocol.allDipaViewData;
export const discardDetails = (state) => state.protocol.discardValue;
export const activeTOC = (state) => state.protocol.activeTOC;
export const getLoader = (state) => state.protocol.loader;
export const enrichedData = (state) => state.protocol.enrichedData;
export default protocolSlice.reducer;
