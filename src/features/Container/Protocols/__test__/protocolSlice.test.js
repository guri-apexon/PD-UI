import { render, screen } from '@testing-library/react';
import { text } from 'express';
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
  updateSectionData,
  getMetaDataSummaryField,
  getRightBladeValue,
  getTOCActive,
  setAccordianMetaData,
  setAccordianMetaParam,
  getMetadataApiCall,
  getEnrichedValue,
  protocolSummary,
  viewResult,
  associateDocs,
  compareResult,
  headerResult,
  protocolResult,
  sectionDetails,
  protocolTocData,
  sectionLoader,
  getPdfData,
  rightBladeValue,
  TOCActive,
  accordionMetaData,
  accordianMetaParam,
  metadataApiCallValue,
  EnrichedValue,
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
};

const state = {
  protocol: {
    data: null,
    loading: true,
    success: false,
  },
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

  test('getEnrichedValue', () => {
    expect(
      protocolPageSlice(initialState, {
        type: getEnrichedValue.type,
        payload: false,
      }),
    ).toEqual({ ...initialState, EnrichedApiValue: false });
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
    headerResult(state);
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
