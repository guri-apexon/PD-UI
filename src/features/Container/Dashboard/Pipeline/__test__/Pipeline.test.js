import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

import PipelineComponent from '../Pipeline';
import initialStateSuccess, { pipeLoadingState } from './mock__data__';
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
  const setDocIdEntered = jest.fn();
  const setWorkflow = jest.fn();
  const container = renderWithProviders(
    <PipelineComponent
      setDocId={setDocIdEntered}
      setWorkflow={setWorkflow}
      docIdError={false}
      workflowError={false}
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
    const allText = screen.queryByTestId('all-checkbox');
    expect(allText).toBeInTheDocument();
  });
  test('Render loader screen', async () => {
    setup(pipeLoadingState);
    const text = screen.queryByTestId(/Default workflows:/i);
    expect(text).not.toBeInTheDocument();
  });
  test('Should able to select all the workflow', () => {
    setup(initialStateSuccess);
    const allText = screen.queryByTestId('all-checkbox');
    fireEvent.click(allText);
    fireEvent.click(allText);
  });
  test('Should able to select one service', () => {
    setup(initialStateSuccess);
    const service = screen.queryByTestId('meta_tagging');
    fireEvent.click(service);
    // fireEvent.click(allText);
  });
  test('Should able to select one service which has dependency', () => {
    setup(initialStateSuccess);
    const service = screen.queryByTestId('digitizer2_omopupdate');
    fireEvent.click(service);
    // fireEvent.click(allText);
  });
  test('Should able to select one workflow', () => {
    setup(initialStateSuccess);
    const workFlow = screen.queryAllByTestId('document_compare');
    fireEvent.click(workFlow[0]);
    // fireEvent.click(allText);
  });
});
