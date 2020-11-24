import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer from '../features/counterSaga/counterSlice';
import rootSaga from './rootSaga'
const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)