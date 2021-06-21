import qcSlice, {
  getProtocols,
  setError,
  getLoader,
  qc,
  qcProtocols,
  qcProtocolsError,
  loader,
} from "../qcSlice";

const initialState = {
  protocols: [],
  tableError: false,
  loader: false,
};

const state = {
  qc: {
    protocols: [],
    tableError: false,
    loader: false,
  },
};

describe(" QCSlice Test Suite", () => {
  test("Set Protocols For QC", () => {
    expect(
      qcSlice(initialState, {
        type: getProtocols.type,
        payload: [
          {
            protocolTitle: "",
            protocol: "",
            projectId: "",
            sponsor: "",
            uploadDate: "",
            id: 1,
          },
        ],
      })
    ).toEqual({
      ...initialState,
      protocols: [
        {
          protocolTitle: "",
          protocol: "",
          projectId: "",
          sponsor: "",
          uploadDate: "",
          id: 1,
        },
      ],
    });
  });

  test("Set Error For QC", () => {
    expect(
      qcSlice(initialState, {
        type: setError.type,
        payload: false,
      })
    ).toEqual({ ...initialState, tableError: false });
  });
  test("Set Loader For QC", () => {
    expect(
      qcSlice(initialState, {
        type: getLoader.type,
        payload: false,
      })
    ).toEqual({ ...initialState, loader: false });
  });
  test("Test All selector ", () => {
    qcSlice(initialState, {
      type: getProtocols.type,
      payload: [{ id: "abcd" }],
    });
    qc(state);
    qcProtocols(state);
    qcProtocolsError(state);
    loader(state);
  });
});
