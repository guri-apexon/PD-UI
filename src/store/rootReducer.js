import counterReducer from "../features/counterSaga/counterSlice";
import dashboardReducer from "../features/Container/Dashboard/dashboardSlice";
import protocolReducer from "../features/Container/Protocols/protocolSlice";
import searchReducer from "../features/Container/Search/searchSlice";
import userDetails from "./userDetails";

const rootReducer = {
  counter: counterReducer,
  dashboard: dashboardReducer,
  protocol: protocolReducer,
  search: searchReducer,
  user: userDetails,

};
export default rootReducer;
