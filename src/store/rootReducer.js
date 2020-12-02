import counterReducer from "../features/counterSaga/counterSlice";
import dashboardReducer from "../features/Container/Dashboard/dashboardSlice";
import protocolReducer from "../features/Container/Protocols/protocolSlice";

const rootReducer = {
  counter: counterReducer,
  dashboard: dashboardReducer,
  protocol: protocolReducer,
};
export default rootReducer;
