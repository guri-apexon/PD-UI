import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

import PipelineModal from '../PipelineModal';
import initialStateSuccess, { wfData } from './mock__data__';
import dashboardReducer from '../../dashboardSlice';

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { dashboard: dashboardReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

const setup = (state) => {
  const fetchMoreData = jest.fn();
  const container = renderWithProviders(
    <PipelineModal
      wfData={wfData}
      fetchMoreData={fetchMoreData}
      showMore={false}
    />,
    {
      preloadedState: state,
    },
  );
  return container;
};

describe('<Pipeline/>', () => {
  test('Render pipeline screen', async () => {
    setup(initialStateSuccess);
    const status = screen.queryByText(/See More/i);
    expect(status).toBeInTheDocument();
  });
});
