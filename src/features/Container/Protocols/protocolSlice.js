import { createSlice } from '@reduxjs/toolkit';

export const protocolSlice = createSlice({
  name: 'protocol',
  initialState: {
      summary:{},
      toc: [],
      associateDocs:[]
  },
  reducers: {
    getSummary: (state, action) => {
      state.summary = action.payload;
    },
    getProcotoclToc: (state, action) => {
      state.toc = action.payload;
    },
    getAssociateDocuments: (state, action) => {
      state.associateDocs = action.payload;
    }
  },
});

export const { getSummary, getProcotoclToc, getAssociateDocuments } = protocolSlice.actions;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const protocolSummary = state => state.protocol.summary;
export const tocData = state => state.protocol.toc;
export const associateDocs = state => state.protocol.associateDocs

export default protocolSlice.reducer;
