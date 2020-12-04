import counterReducer from "../features/counterSaga/counterSlice";
import dashboardReducer from "../features/Container/Dashboard/dashboardSlice";
import protocolReducer from "../features/Container/Protocols/protocolSlice";
import searchReducer from "../features/Container/Search/searchSlice";

const rootReducer = {
  counter: counterReducer,
  dashboard: dashboardReducer,
  protocol: protocolReducer,
  search: searchReducer,
};
export default rootReducer;
