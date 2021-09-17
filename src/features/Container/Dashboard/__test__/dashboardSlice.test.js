import dashboardslice, {
  setAddProtocolModal,
  prtocolsList,
  getProtocols,
  prtocolsError,
  recentSearches,
  savedSearches,
  setError,
  getRecentSearches,
  getSponsor,
  getIndication,
  setAddprotocolError,
  setLoading,
  getSavedSearches,
  setApiError,
} from "../dashboardSlice";

const initialState = {
  protocols: [{ id: 1 }],
  tableError: false,
  recentSearches: [],
  addProtocolData: {
    sponsor: [],
  },
  addProtocolModal: false,
  isLoading: true,
  savedSearches: [],
  apiError: false,
};
const state = {
  dashboard: {
    protocols: [{ id: "12" }],
    recentSearches: [{ keyword: "Acute" }],
    savedSearches: [{ keyword: "Acute" }],
    tableError: false,
  },
};

describe(" DashboardSlice Test Suite", () => {
  test("setAddProtocolModal", () => {
    expect(
      dashboardslice(initialState, {
        type: setAddProtocolModal.type,
        payload: true,
      })
    ).toEqual({ ...initialState, addProtocolModal: true });
  });
  test("Test getProtocols", () => {
    expect(
      dashboardslice(initialState, {
        type: getProtocols.type,
        payload: [{ id: "abcd" }],
      })
    ).toEqual({ ...initialState, protocols: [{ id: "abcd" }] });
  });
  test("Test setError", () => {
    expect(
      dashboardslice(initialState, {
        type: setError.type,
        payload: true,
      })
    ).toEqual({ ...initialState, tableError: true });
  });

  test("Test getRecentSearches", () => {
    expect(
      dashboardslice(initialState, {
        type: getRecentSearches.type,
        payload: [{ keyword: "Acute" }],
      })
    ).toEqual({ ...initialState, recentSearches: [{ keyword: "Acute" }] });
  });
  test("Test getSponsor", () => {
    expect(
      dashboardslice(initialState, {
        type: getSponsor.type,
        payload: [{ id: 1, sponsor_name: "Astellas Pharma Inc" }],
      })
    ).toEqual({
      ...initialState,
      addProtocolData: {
        sponsor: [{ id: 1, sponsor_name: "Astellas Pharma Inc" }],
      },
    });
  });
  test("Test getIndication", () => {
    expect(
      dashboardslice(initialState, {
        type: getIndication.type,
        payload: [{ id: 4, indication_name: "ABCC6 deficiency" }],
      })
    ).toEqual({
      ...initialState,
      addProtocolData: {
        indication: [{ id: 4, indication_name: "ABCC6 deficiency" }],
        sponsor: [],
      },
    });
  });
  test("Test setAddprotocolError", () => {
    expect(
      dashboardslice(initialState, {
        type: setAddprotocolError.type,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      addProtocolDataError: true,
    });
  });

  test("Test setLoading", () => {
    expect(
      dashboardslice(initialState, {
        type: setLoading.type,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  test("Test getSavedSearches", () => {
    expect(
      dashboardslice(initialState, {
        type: getSavedSearches.type,
        payload: [{ keyword: "Acute" }],
      })
    ).toEqual({
      ...initialState,
      savedSearches: [{ keyword: "Acute" }],
    });
  });
  test("Test setApiError", () => {
    expect(
      dashboardslice(initialState, {
        type: setApiError.type,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      apiError: true,
    });
  });

  test("Test All selector ", () => {
    dashboardslice(initialState, {
      type: getProtocols.type,
      payload: [{ id: "abcd" }],
    });
    prtocolsList(state);
    prtocolsError(state);
    recentSearches(state);
    savedSearches(state);

    console.log("prtocolsList (initialState) :", prtocolsList(state));
  });
});
