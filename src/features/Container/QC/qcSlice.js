import { createSlice } from "@reduxjs/toolkit";


export const qcSlice = createSlice({
    name: "qc",
    initialState: {
      protocols: [],
      tableError: false,
    },
    reducers: {
      getProtocols: (state, action) => {
        state.protocols = action.payload;
      },
      setError: (state, action) => {
        state.tableError = action.payload;
      },
    },
  });
  
  export const {
    getProtocols,
    setError,
    
  } = qcSlice.actions;
  
  // The function below is called a selector and allows us to select a value from
  // the state. Selectors can also be defined inline where they're used instead of
  // in the slice file. For example: `useSelector((state) => state.counter.value)`
  export const qc = (state) => state.qc;
  export const qcProtocols = (state) => state.qc.protocols;
  export const qcProtocolsError = (state) => state.qc.tableError;
  
  export default qcSlice.reducer;
  