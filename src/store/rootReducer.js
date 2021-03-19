import dashboardReducer from "../features/Container/Dashboard/dashboardSlice";
import protocolReducer from "../features/Container/Protocols/protocolSlice";
import searchReducer from "../features/Container/Search/searchSlice";
import userDetails from "./userDetails";
import qcReducer from "../features/Container/QC/qcSlice";

const rootReducer = {
  dashboard: dashboardReducer,
  protocol: protocolReducer,
  search: searchReducer,
  user: userDetails,
  qc:qcReducer

};
export default rootReducer;
