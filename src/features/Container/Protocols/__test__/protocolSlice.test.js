import ProtocolReducer from './ProtocolReducer.json';
import protocolPageSlice, {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
  getHeaderList,
  getSectionProtocol,
  setSectionDetails,
  getProtocolTocData,
  setSectionLoader,
  resetSectionData,
  getFileStream,
  getMetaDataSummaryField,
  getRightBladeValue,
  getTOCActive,
  setAccordianMetaData,
  setAccordianMetaParam,
  getMetadataApiCall,
  getEnrichedValue,
  updateSectionData,
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

  test('getHeaderList slice', () => {
    const payload = {
      actionData: 'actionData',
    };
    expect(
      protocolPageSlice(initialState, {
        type: getHeaderList.type,
        payload,
      }),
    ).toEqual({ ...initialState, header: payload });
  });

  test('getHeaderList slice', () => {
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
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      fileStream: 'samplePayload',
    });
  });

  test('getMetaDataSummaryField', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getMetaDataSummaryField.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      metaDataSummaryField: 'samplePayload',
    });
  });

  test('getRightBladeValue', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getRightBladeValue.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      rightBladeValue: 'samplePayload',
    });
  });

  test('getTOCActive', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getTOCActive.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      TOCActiveAccordion: 'samplePayload',
    });
  });

  test('setAccordianMetaData', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setAccordianMetaData.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      accordionMetaData: 'samplePayload',
    });
  });

  test('setAccordianMetaParam', () => {
    expect(
      protocolPageSlice(initialState, {
        type: setAccordianMetaParam.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      accordianMetaParam: 'samplePayload',
    });
  });

  test('getMetadataApiCall', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getMetadataApiCall.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      metadataApiCallValue: 'samplePayload',
    });
  });

  test('getEnrichedValue', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getEnrichedValue.type,
        payload: 'samplePayload',
      }),
    ).toEqual({
      ...initialState,
      EnrichedApiValue: 'samplePayload',
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
});
