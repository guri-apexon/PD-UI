import dashboardslice, {
  setAddProtocolModal,
  prtocolsList,
  getProtocols,
  prtocolsError,
  recentSearches,
  savedSearches,
  setError,
  getRecentSearches,
  setAddprotocolError,
  setLoading,
  getSavedSearches,
  setApiError,
  setTableLoader,
  getDashboardSearchLoader,
  setIndicationLoading,
  setSponsorLoading,
  setAddProtocolErrorState,
  setworkflowData,
  dashboadSearchLoader,
  setworkflowSubmit,
  setWFData,
  addProtocolErrorData,
  selectedProtocolsList,
  followedProtocolsList,
  getFollowedProtocols,
  setSelectedProtocols,
  hideAddprotocol,
} from '../dashboardSlice';

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
  followedProtocols: [],
  selectedProtocols: [],
  displayAddProtocol: true,
  workflowData: {
    loading: false,
    error: null,
    data: {
      Status: '',
    },
  },
  workflowSubmit: {
    loading: false,
    error: null,
    data: [],
    success: false,
  },
  wfData: {
    loading: false,
    error: null,
    data: [],
    success: false,
  },
};
const state = {
  dashboard: {
    protocols: [{ id: '12' }],
    recentSearches: [{ keyword: 'Acute' }],
    savedSearches: [{ keyword: 'Acute' }],
    tableError: false,
  },
};

describe(' DashboardSlice Test Suite', () => {
  test('setAddProtocolModal', () => {
    expect(
      dashboardslice(initialState, {
        type: setAddProtocolModal.type,
        payload: true,
      }),
    ).toEqual({ ...initialState, addProtocolModal: true });
  });
  test('Test getProtocols', () => {
    expect(
      dashboardslice(initialState, {
        type: getProtocols.type,
        payload: [{ id: 'abcd' }],
      }),
    ).toEqual({ ...initialState, protocols: [{ id: 'abcd' }] });
  });
  test('Test setError', () => {
    expect(
      dashboardslice(initialState, {
        type: setError.type,
        payload: true,
      }),
    ).toEqual({ ...initialState, tableError: true });
  });

  test('Test getRecentSearches', () => {
    expect(
      dashboardslice(initialState, {
        type: getRecentSearches.type,
        payload: [{ keyword: 'Acute' }],
      }),
    ).toEqual({ ...initialState, recentSearches: [{ keyword: 'Acute' }] });
  });
  test('Test setAddprotocolError', () => {
    expect(
      dashboardslice(initialState, {
        type: setAddprotocolError.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      addProtocolDataError: true,
    });
  });

  test('Test setAddProtocolErrorState', () => {
    expect(
      dashboardslice(initialState, {
        type: setAddProtocolErrorState.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      addProtocolErrorState: true,
    });
  });

  test('Test setworkflowData', () => {
    expect(
      dashboardslice(initialState, {
        type: setworkflowData.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      workflowData: true,
    });
  });

  test('Test setworkflowSubmit', () => {
    expect(
      dashboardslice(initialState, {
        type: setworkflowSubmit.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      workflowSubmit: true,
    });
  });

  test('Test setWFData', () => {
    expect(
      dashboardslice(initialState, {
        type: setWFData.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      wfData: true,
    });
  });

  test('Test setLoading', () => {
    expect(
      dashboardslice(initialState, {
        type: setLoading.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  test('Test getSavedSearches', () => {
    expect(
      dashboardslice(initialState, {
        type: getSavedSearches.type,
        payload: [{ keyword: 'Acute' }],
      }),
    ).toEqual({
      ...initialState,
      savedSearches: [{ keyword: 'Acute' }],
    });
  });
  test('Test setApiError', () => {
    expect(
      dashboardslice(initialState, {
        type: setApiError.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      apiError: true,
    });
  });

  test('Test getFollowedProtocols', () => {
    expect(
      dashboardslice(initialState, {
        type: getFollowedProtocols.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      followedProtocols: true,
    });
  });

  test('Test setSelectedProtocols', () => {
    expect(
      dashboardslice(initialState, {
        type: setSelectedProtocols.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      selectedProtocols: true,
    });
  });

  test('Test hideAddprotocol', () => {
    expect(
      dashboardslice(initialState, {
        type: hideAddprotocol.type,
        payload: true,
      }),
    ).toEqual({
      ...initialState,
      displayAddProtocol: true,
    });
  });

  test('Test setTableLoader', () => {
    const tableLoadings = true;
    expect(
      dashboardslice(initialState, {
        type: setTableLoader.type,
        payload: tableLoadings,
      }),
    ).toEqual({
      ...initialState,
      tableLoading: tableLoadings,
    });
  });

  test('Test getDashboardSearchLoader', () => {
    const dashboardSearchLoaders = true;
    expect(
      dashboardslice(initialState, {
        type: getDashboardSearchLoader.type,
        payload: dashboardSearchLoaders,
      }),
    ).toEqual({
      ...initialState,
      dashboardSearchLoader: dashboardSearchLoaders,
    });
  });

  test('Test setIndicationLoading', () => {
    const indicationLoadings = true;
    expect(
      dashboardslice(initialState, {
        type: setIndicationLoading.type,
        payload: indicationLoadings,
      }),
    ).toEqual({
      ...initialState,
      indicationLoading: indicationLoadings,
    });
  });

  test('Test setIndicationLoading', () => {
    const sponsorLoadings = true;
    expect(
      dashboardslice(initialState, {
        type: setSponsorLoading.type,
        payload: sponsorLoadings,
      }),
    ).toEqual({
      ...initialState,
      sponsorLoading: sponsorLoadings,
    });
  });

  test('Test All selector ', () => {
    dashboardslice(initialState, {
      type: getProtocols.type,
      payload: [{ id: 'abcd' }],
    });
    prtocolsList(state);
    prtocolsError(state);
    recentSearches(state);
    savedSearches(state);
    dashboadSearchLoader(state);
    followedProtocolsList(state);
    selectedProtocolsList(state);
    addProtocolErrorData(state);
  });
});
