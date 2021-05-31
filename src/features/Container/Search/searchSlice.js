import { createSlice } from "@reduxjs/toolkit";

export const initialPhaseValue = [
  {
    id: 1,
    title: "Phase 0",
  },
  {
    id: 2,
    title: "Phase 1a",
  },
  {
    id: 3,
    title: "Phase 1b",
  },
  {
    id: 4,
    title: "Phase 2a",
  },
  {
    id: 5,
    title: "Phase 2b",
  },
  {
    id: 6,
    title: "Phase 3a",
  },
  {
    id: 7,
    title: "Phase 3b",
  },
  {
    id: 8,
    title: "Phase 1b/2a",
  },
  {
    id: 9,
    title: "Phase 2b/3a",
  },
  {
    id: 10,
    title: "Phase 1b/2",
  },
  {
    id: 11,
    title: "Phase 2b/3",
  },
  {
    id: 12,
    title: "Phase 3b/4",
  },
];

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    filters: {},
    searchResult: {},
    totalSearchResult: [],
    indications: {
      sectionContent: [],
    },
    phases: {
      sectionContent: initialPhaseValue,
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
