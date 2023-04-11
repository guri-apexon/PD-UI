import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import dashboardReducer from '../../dashboardSlice';
import userReducer from '../../../../../store/userDetails';
import AddProtocol from '../AddProtocol';
import {
  initialStateSuccess,
  errorInputState,
  errorWorkflowState,
} from './__mock__data';

function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { dashboard: dashboardReducer, user: userReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

const setup = (state) => {
  const container = renderWithProviders(<AddProtocol />, {
    preloadedState: state,
  });
  return container;
};

describe('<AddProtocol/>', () => {
  it('Should Render Admin Workflow', () => {
    setup(initialStateSuccess);
  });
  it.only('Should render workflow-orchestration Component', async () => {
    const container = setup(initialStateSuccess);
    const modalOpen = screen.getByText(/Add Protocol to Library/i);
    fireEvent.click(modalOpen);

    const tab2 = screen.queryByText(/Workflow Orchestration/i);
    // console.log(JSON.stringify(tab2));
    // screen.getByTestId('add-protocol-modal')[0].children[2].children[0]
    //   .children[1].children[0].children[0].children[0].children[1];
    // fireEvent.click(tab2);
  });
  it('Should render input error', async () => {
    setup(errorInputState);
  });
  it('Should render workflow error', async () => {
    setup(errorWorkflowState);
    const prot = screen.queryByText('ABCD-Prot-1234');
    fireEvent.click(prot);
  });
});
