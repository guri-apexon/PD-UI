import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from '../features/counterSaga/saga'
const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)