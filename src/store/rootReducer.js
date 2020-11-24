import counterReducer from '../features/counterSaga/counterSlice';
import dashboardReducer from '../features/Container/Dashboard/dashboardSlice'

const rootReducer = {
    counter: counterReducer,
    dashboard: dashboardReducer
  }
export default rootReducer;