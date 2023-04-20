import ProtocolReducer from './ProtocolReducer.json';
import protocolPageSlice, {
  accordianMetaParam,
  accordionMetaData,
  associateDocs,
  compareResult,
  EnrichedValue,
  getAssociateDocuments,
  getCompare,
  getEnrichedValue,
  getFileStream,
  updateSectionData,
  getMetadataApiCall,
  getMetaDataSummaryField,
  getPdfData,
  getProcotoclToc,
  getProtocolTocData,
  getRightBladeValue,
  getSectionProtocol,
  getSummary,
  getTOCActive,
  metadataApiCallValue,
  protocolResult,
  protocolSummary,
  protocolTocData,
  resetSectionData,
  rightBladeValue,
  sectionDetails,
  sectionLoader,
  setAccordianMetaData,
  setAccordianMetaParam,
  viewResult,
  setSectionDetails,
  setSectionLoader,
  TOCActive,
  setLoader,
  getSectionIndex,
  getLabData,
  setLabDataLoader,
  setSOAData,
  setLabDataSuccess,
  getDiscardDeatils,
  resetProtocolTocData,
  setSectionLockDetails,
  setEnrichedWord,
  getDipaViewData,
  getAllDipaViewData,
  updateSectionResp,
} from '../protocolSlice';

const initialState = {
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
  sectionDetails: {
    protocol: null,
    data: [],
  },
  fileStream: null,
  loader: false,
  sectionIndex: -1,
  labData: {
    data: [1, 2],
    success: false,
    loading: false,
  },
  discardValue: {
    isEdited: false,
    isDiscarded: false,
    protocolTab: -1,
  },
  protocolTocData: [],
  sectionLockDetails: {},
  enrichedword: {},
};

const state = {
  protocol: {
    data: null,
    loading: true,
    success: false,
  },
  SOAData: {},
  dipaViewData: [],
  allDipaViewData: [],
};
describe(' ProtocolSlice Test Suite', () => {
  test('getSummary test', () => {
    const obj = {
      loading: true,
      success: false,
      data: [],
    };
    expect(
      protocolPageSlice(initialState, {
        type: getSummary.type,
        payload: obj,
      }),
    ).toEqual({ ...initialState, summary: obj });
  });

  test('getProcotoclToc test', () => {
    const viewData = {
      iqvdataSoa: null,
      iqvdataSummary: null,
      iqvdataToc: null,
      loader: true,
      tocSections: null,
      soaSections: null,
      err: null,
    };
    expect(
      protocolPageSlice(initialState, {
        type: getProcotoclToc.type,
        payload: viewData,
      }),
    ).toEqual({ ...initialState, view: viewData });
  });

  test('getAssociateDocuments test', () => {
    const associateDocs = [{ protocol: 'JBT101-RIS-001' }];
    expect(
      protocolPageSlice(initialState, {
        type: getAssociateDocuments.type,
        payload: associateDocs,
      }),
    ).toEqual({ ...initialState, associateDocs });
  });

  test('getCompare test', () => {
    const compData = {
      iqvdata: '',
      loading: true,
      called: true,
      error: false,
      message: '',
    };
    expect(
      protocolPageSlice(initialState, {
        type: getCompare.type,
        payload: compData,
      }),
    ).toEqual({ ...initialState, compare: compData });
  });

  test('getSectionProtocol slice', () => {
    const payload = {
      actionData: 'actionData',
    };
    expect(
      protocolPageSlice(initialState, {
        type: getSectionProtocol.type,
        payload,
      }),
    ).toEqual({ ...initialState, protocol: payload });
  });

  test('getSectionProtocol slice', () => {
    const payload = {
      actionData: 'actionData',
    };
    expect(
      protocolPageSlice(initialState, {
        type: getSectionProtocol.type,
        payload,
      }),
    ).toEqual({ ...initialState, protocol: payload });
  });

  test('setSectionDetails slice', () => {
    const payload = {
      protocol: '15-06',
      data: [],
      linkId: 15,
    };
    expect(
      protocolPageSlice(initialState, {
        type: setSectionDetails.type,
        payload,
      }),
    ).toEqual({
      ...initialState,
      sectionDetails: {
        protocol: '15-06',
        data: [{ linkId: payload.linkId, data: payload.data }],
        sectionResponse: null,
      },
    });
  });

  test('getProtocolTocData slice', () => {
    const payload = {
      actionData: 'actionData',
    };
    expect(
      protocolPageSlice(initialState, {
        type: getProtocolTocData.type,
        payload,
      }),
    ).toEqual({ ...initialState, protocolTocData: payload });
  });

  test('setSectionLoader show loader', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setSectionLoader.type,
        payload: true,
      }),
    ).toEqual({ ...initialState, sectionLoader: true });
  });

  test('setSectionLoader hide Loader', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setSectionLoader.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, sectionLoader: false });
  });

  test('resetSectionData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: resetSectionData.type,
      }),
    ).toEqual({
      ...initialState,
      sectionDetails: { protocol: null, data: [] },
    });
  });

  test('getFileStream', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getFileStream.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, fileStream: false });
  });

  test('updateSectionData', () => {
    const payload = {
      protocol: '15-06',
      data: [],
      linkId: 15,
    };
    expect(
      protocolPageSlice(initialState, {
        type: updateSectionData.type,
        payload,
      }),
    );
  });
  test('updateSectionResp', () => {
    const payload = {
      protocol: '15-06',
      data: [],
      linkId: 15,
      sectionResponse: null,
    };
    expect(
      protocolPageSlice(initialState, {
        type: updateSectionResp.type,
        payload,
      }),
    );
  });

  test('getMetaDataSummaryField', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getMetaDataSummaryField.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, metaDataSummaryField: false });
  });

  test('getRightBladeValue', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getRightBladeValue.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, rightBladeValue: false });
  });

  test('getTOCActive', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getTOCActive.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, TOCActiveAccordion: false });
  });

  test('setAccordianMetaData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setAccordianMetaData.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, accordionMetaData: false });
  });

  test('getAllDipaViewData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getAllDipaViewData.type,
        payload: [],
      }),
    ).toEqual({ ...initialState, allDipaViewData: [] });
  });

  test('getDipaViewData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getDipaViewData.type,
        payload: [],
      }),
    ).toEqual({ ...initialState, dipaViewData: [] });
  });

  test('setAccordianMetaParam', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setAccordianMetaParam.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, accordianMetaParam: false });
  });

  test('getMetadataApiCall', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getMetadataApiCall.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, metadataApiCallValue: false });
  });

  test('setLoader', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setLoader.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, loader: false });
  });

  test('getSectionIndex', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getSectionIndex.type,
        payload: -1,
      }),
    ).toEqual({ ...initialState, sectionIndex: -1 });
  });

  test('getDiscardDeatils', () => {
    const discard = {
      isEdited: false,
      isDiscarded: false,
      protocolTab: -1,
    };
    expect(
      protocolPageSlice(initialState, {
        type: getDiscardDeatils.type,
        payload: discard,
      }),
    ).toEqual({ ...initialState, discardValue: discard });
  });

  test('resetProtocolTocData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: resetProtocolTocData.type,
        payload: [],
      }),
    ).toEqual({ ...initialState, protocolTocData: [] });
  });

  test('setSectionLockDetails', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setSectionLockDetails.type,
        payload: {},
      }),
    ).toEqual({ ...initialState, sectionLockDetails: {} });
  });

  test('setEnrichedWord', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setEnrichedWord.type,
        payload: {},
      }),
    ).toEqual({ ...initialState, enrichedword: {} });
  });

  test('getLabData', () => {
    const labDataTemp = {
      data: [1, 2],
      success: false,
      loading: false,
    };

    expect(
      protocolPageSlice(initialState, {
        type: getLabData.type,
        payload: labDataTemp.data,
      }),
    ).toEqual({
      ...initialState,
      labData: labDataTemp,
    });
  });

  test('setLabDataLoader', () => {
    const labDataTemp = {
      data: [1, 2],
      success: false,
      loading: false,
    };

    expect(
      protocolPageSlice(initialState, {
        type: setLabDataLoader.type,
        payload: labDataTemp.loading,
      }),
    ).toEqual({
      ...initialState,
      labData: labDataTemp,
    });
  });

  test('setLabDataSuccess', () => {
    const labDataTemp = {
      data: [1, 2],
      success: false,
      loading: false,
    };

    expect(
      protocolPageSlice(initialState, {
        type: setLabDataSuccess.type,
        payload: labDataTemp.success,
      }),
    ).toEqual({
      ...initialState,
      labData: labDataTemp,
    });
  });

  test('getEnrichedValue', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getEnrichedValue.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, EnrichedApiValue: false });
  });

  test('setSOAData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setSOAData.type,
        payload: {},
      }),
    ).toEqual({ ...initialState, SOAData: {} });
  });

  test('Test All selector', () => {
    protocolPageSlice(initialState, {
      type: getSectionProtocol.type,
      payload: false,
    });
    protocolSummary(state);
    viewResult(state);
    associateDocs(state);
    compareResult(state);
    protocolResult(state);
    sectionDetails(state);
    protocolTocData(state);
    sectionLoader(state);
    getPdfData(state);
    rightBladeValue(state);
    TOCActive(state);
    accordionMetaData(state);
    accordianMetaParam(state);
    metadataApiCallValue(state);
    EnrichedValue(state);
  });

  test('updateSectionData', () => {
    let payload = {
      data: [
        {
          section_level: '',
          CPT_section: 'Unmapped',
          type: 'text',
          content: '\n',
          font_info: {
            IsBold: false,
            font_size: -1,
            font_style: '',
            entity: [],
            roi_id: {
              para: 'bc52f1a8-8a78-11ed-8a8b-005056ab6469',
              childbox: '',
              subtext: '',
            },
          },
          level_1_CPT_section: 'Unmapped',
          file_section: 'Unmapped',
          file_section_num: '',
          file_section_level: 1,
          seq_num: 1,
          qc_change_type: '',
          line_id: 'bc52f1a8-8a78-11ed-8a8b-005056ab6469',
          aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
          synonyms_extracted_terms: '',
          semantic_extraction: '',
          section_locked: false,
        },
      ],
      actionType: 'REPLACE_CONTENT',
      linkId: 'bc4dc374-8a78-11ed-af64-005056ab6469',
    };
    expect(
      protocolPageSlice(ProtocolReducer.protocol, {
        type: updateSectionData.type,
        payload,
      }),
    ).not.toEqual({
      ...ProtocolReducer.protocol,
    });

    payload = {
      content: 'abcd',
      lineId: 'bc5080ba-8a78-11ed-8986-005056ab6469',
    };

    protocolPageSlice(ProtocolReducer.protocol, {
      type: updateSectionData.type,
      payload,
    });
  });

  test('updateSectionData', () => {
    let payload = {
      data: [
        {
          section_level: '',
          CPT_section: 'Unmapped',
          type: 'text',
          content: '\n',
          font_info: {
            IsBold: false,
            font_size: -1,
            font_style: '',
            entity: [],
            roi_id: {
              para: 'bc52f1a8-8a78-11ed-8a8b-005056ab6469',
              childbox: '',
              subtext: '',
            },
          },
          level_1_CPT_section: 'Unmapped',
          file_section: 'Unmapped',
          file_section_num: '',
          file_section_level: 1,
          seq_num: 1,
          qc_change_type: '',
          line_id: 'bc52f1a8-8a78-11ed-8a8b-005056ab6469',
          aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
          synonyms_extracted_terms: '',
          semantic_extraction: '',
          section_locked: false,
        },
      ],
      actionType: 'REPLACE_CONTENT',
      linkId: 'bc4dc374-8a78-11ed-af64-005056ab6469',
    };
    expect(
      protocolPageSlice(ProtocolReducer.protocol, {
        type: updateSectionData.type,
        payload,
      }),
    ).not.toEqual({
      ...ProtocolReducer.protocol,
    });

    payload = {
      content: 'abcd',
      lineId: 'bc5080ba-8a78-11ed-8986-005056ab6469',
    };

    protocolPageSlice(ProtocolReducer.protocol, {
      type: updateSectionData.type,
      payload,
    });
  });

  test('updateSectionData', () => {
    let payload = {
      data: [
        {
          section_level: '',
          CPT_section: 'Unmapped',
          type: 'text',
          content: '\n',
          font_info: {
            IsBold: false,
            font_size: -1,
            font_style: '',
            entity: [],
            roi_id: {
              para: 'bc52f1a8-8a78-11ed-8a8b-005056ab6469',
              childbox: '',
              subtext: '',
            },
          },
          level_1_CPT_section: 'Unmapped',
          file_section: 'Unmapped',
          file_section_num: '',
          file_section_level: 1,
          seq_num: 1,
          qc_change_type: '',
          line_id: 'bc52f1a8-8a78-11ed-8a8b-005056ab6469',
          aidocid: '78808eb2-6b1b-445f-bc89-4560ca66dd1c',
          synonyms_extracted_terms: '',
          semantic_extraction: '',
          section_locked: false,
        },
      ],
      actionType: 'REPLACE_CONTENT',
      linkId: 'bc4dc374-8a78-11ed-af64-005056ab6469',
    };
    expect(
      protocolPageSlice(ProtocolReducer.protocol, {
        type: updateSectionData.type,
        payload,
      }),
    ).not.toEqual({
      ...ProtocolReducer.protocol,
    });

    payload = {
      content: 'abcd',
      lineId: 'bc5080ba-8a78-11ed-8986-005056ab6469',
    };

    protocolPageSlice(ProtocolReducer.protocol, {
      type: updateSectionData.type,
      payload,
    });
    protocolSummary(state);
    viewResult(state);
    associateDocs(state);
    compareResult(state);
    protocolResult(state);
    sectionDetails(state);
    protocolTocData(state);
    sectionLoader(state);
    getPdfData(state);
    rightBladeValue(state);
    TOCActive(state);
    accordionMetaData(state);
    accordianMetaParam(state);
    metadataApiCallValue(state);
    EnrichedValue(state);
  });
});
