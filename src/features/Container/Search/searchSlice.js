import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    filters: {},
    searchResult: {},
    indications: {
      sectionContent:[]
    },
    sponsors: {
      sectionContent:[]
    },
  },
  reducers: {
    getFilters: (state, action) => {
      state.filters = action.payload;
    },
    getSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    getIndications: (state, action) => {
      state.indications = action.payload;
    },
    getSponsors: (state, action) => {
      state.sponsors = action.payload;
    },
  },
});

export const {
  getFilters,
  getSearchResult,
  getIndications,
  getSponsors,
} = searchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const searchFilter = (state) => state.search.filters;
export const searchResult = (state) => state.search.searchResult;
export const indications = (state) => state.search.indications;
export const sponsors = (state) => state.search.sponsors;

export default searchSlice.reducer;
