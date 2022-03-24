import dashboardReducer from "../features/Container/Dashboard/dashboardSlice";
import protocolReducer from "../features/Container/Protocols/store/slice";
import searchReducer from "../features/Container/Search/searchSlice";
import userDetails from "./userDetails";
import qcReducer from "../features/Container/QC/qcSlice";
import navbarReducer from "../features/Container/Navbar/navbarSlice";
import adminReducer from "../features/Container/Admin/adminSlice";

const rootReducer = {
  dashboard: dashboardReducer,
  protocol: protocolReducer,
  search: searchReducer,
  user: userDetails,
  qc: qcReducer,
  navbar: navbarReducer,
  admin: adminReducer,
};
export default rootReducer;
