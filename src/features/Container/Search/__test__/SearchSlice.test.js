import searchPageSlice, { getFilters } from '../searchSlice';

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
});
