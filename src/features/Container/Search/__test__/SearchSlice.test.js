import searchPageSlice, {
  getFilters,
  getIndications,
  getPhaseValues,
  getRangeDate,
  getRecentDate,
  getSearchResult,
  getSponsors,
  getTotalSearchResult,
} from '../searchSlice';

const initialState = {
  search: {
    filters: {},
    searchResult: {},
    totalSearchResult: [],
    indications: {
      sectionContent: [],
    },
    sponsors: {
      sectionContent: [],
    },
    recent: {
      from: '',
      to: '',
    },
    range: {
      from: '',
      to: '',
    },
  },
};

describe(' Search Slice Test Suite', () => {
  test('getfilters actions', () => {
    expect(
      searchPageSlice(initialState, {
        type: getFilters.type,
        payload: {
          sponsors: ['3D-Medical'],
        },
      }),
    ).toEqual({
      ...initialState,
      filters: {
        sponsors: ['3D-Medical'],
      },
    });
  });
  test('getfilters actions', () => {
    const searchResul = {
      data: [],
      loader: false,
    };
    expect(
      searchPageSlice(initialState, {
        type: getSearchResult.type,
        payload: searchResul,
      }),
    ).toEqual({
      ...initialState,
      searchResult: searchResul,
    });
  });
  test('getfilters actions', () => {
    const totalSearchResul = [];
    expect(
      searchPageSlice(initialState, {
        type: getTotalSearchResult.type,
        payload: totalSearchResul,
      }),
    ).toEqual({
      ...initialState,
      totalSearchResult: totalSearchResul,
    });
  });
  test('getfilters actions', () => {
    const indication = {
      sectionContent: [],
    };
    expect(
      searchPageSlice(initialState, {
        type: getIndications.type,
        payload: indication,
      }),
    ).toEqual({
      ...initialState,
      indications: indication,
    });
  });
  test('getfilters actions', () => {
    const phase = {
      success: true,
      loader: true,
      sectionContent: [],
    };
    expect(
      searchPageSlice(initialState, {
        type: getPhaseValues.type,
        payload: phase,
      }),
    ).toEqual({
      ...initialState,
      phases: phase,
    });
  });
  test('getfilters actions', () => {
    const sponsor = {
      sectionContent: [],
    };
    expect(
      searchPageSlice(initialState, {
        type: getSponsors.type,
        payload: sponsor,
      }),
    ).toEqual({
      ...initialState,
      sponsors: sponsor,
    });
  });
  test('getfilters actions', () => {
    const recen = {
      from: '',
      to: '',
    };
    expect(
      searchPageSlice(initialState, {
        type: getRecentDate.type,
        payload: recen,
      }),
    ).toEqual({
      ...initialState,
      recent: recen,
    });
  });
  test('getfilters actions', () => {
    const rang = {
      from: '',
      to: '',
    };
    expect(
      searchPageSlice(initialState, {
        type: getRangeDate.type,
        payload: rang,
      }),
    ).toEqual({
      ...initialState,
      range: rang,
    });
  });
});
