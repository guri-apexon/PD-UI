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
});
