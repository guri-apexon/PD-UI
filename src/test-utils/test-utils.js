/* eslint-disable */
import { render as rtlRender } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from '../store/rootReducer';

const rootReducerCombined = combineReducers(rootReducer);

function render(
  ui,
  {
    initialState,
    store = createStore(rootReducerCombined, initialState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions, store });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
