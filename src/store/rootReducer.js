import dashboardReducer from '../features/Container/Dashboard/dashboardSlice';
import protocolReducer from '../features/Container/Protocols/protocolSlice';
import searchReducer from '../features/Container/Search/searchSlice';
/* eslint-disable */
import userDetails from './userDetails';
/* eslint-enable */
import qcReducer from '../features/Container/QC/qcSlice';
import navbarReducer from '../features/Container/Navbar/navbarSlice';
import adminReducer from '../features/Container/Admin/adminSlice';

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
