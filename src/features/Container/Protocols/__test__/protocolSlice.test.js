import protocolSlice, {
  getSummary,
  getProcotoclToc,
  getAssociateDocuments,
  getCompare,
} from "../protocolSlice";

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
    iqvdata: "",
    error: false,
    message: "",
  },
};

describe(" ProtocolSlice Test Suite", () => {
  test("getSummary test", () => {
    let obj = {
      loading: true,
      success: false,
      data: [],
    };
    expect(
      protocolSlice(initialState, {
        type: getSummary.type,
        payload: obj,
      })
    ).toEqual({ ...initialState, summary: obj });
  });

  test("getProcotoclToc test", () => {
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
      protocolSlice(initialState, {
        type: getProcotoclToc.type,
        payload: viewData,
      })
    ).toEqual({ ...initialState, view: viewData });
  });

  test("getAssociateDocuments test", () => {
    const associateDocs = [{ protocol: "JBT101-RIS-001" }];
    expect(
      protocolSlice(initialState, {
        type: getAssociateDocuments.type,
        payload: associateDocs,
      })
    ).toEqual({ ...initialState, associateDocs: associateDocs });
  });

  test("getCompare test", () => {
    const compData = {
      iqvdata: "",
      loading: true,
      called: true,
      error: false,
      message: "",
    };
    expect(
      protocolSlice(initialState, {
        type: getCompare.type,
        payload: compData,
      })
    ).toEqual({ ...initialState, compare: compData });
  });
});
