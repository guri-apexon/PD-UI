import { createSlice } from "@reduxjs/toolkit";
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    filters: {},
    searchResult: {
      data: [],
      loader:false
    },
    totalSearchResult: [],
    indications: {
      sectionContent: [],
    },
    phases: {
      success: true,
      loader: true,
      sectionContent: [],
    },
    sponsors: {
      sectionContent: [],
    },
    recent: {
      from: "",
      to: "",
    },
    range: {
      from: "",
      to: "",
    },
  },
  reducers: {
    getFilters: (state, action) => {
      state.filters = action.payload;
    },
    getSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    getTotalSearchResult: (state, action) => {
      state.totalSearchResult = action.payload;
    },
    getIndications: (state, action) => {
      state.indications = action.payload;
    },
    getSponsors: (state, action) => {
      state.sponsors = action.payload;
    },
    getRecentDate: (state, action) => {
      state.recent = action.payload;
    },
    getRangeDate: (state, action) => {
      state.range = action.payload;
    },
    getPhaseValues: (state, action) => {
      state.phases = action.payload;
    },
  },
});

export const {
  getFilters,
  getSearchResult,
  getIndications,
  getSponsors,
  getRecentDate,
  getRangeDate,
  getTotalSearchResult,
  getPhaseValues,
} = searchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const searchFilter = (state) => state.search.filters;
export const searchResult = (state) => state.search.searchResult;
export const totalSearchResult = (state) => state.search.totalSearchResult;
export const indications = (state) => state.search.indications;
export const sponsors = (state) => state.search.sponsors;
export const phases = (state) => state.search.phases;
export const recent = (state) => state.search.recent;
export const range = (state) => state.search.range;

export default searchSlice.reducer;
