import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { render } from '../../../../test-utils/test-utils';
import BladeLeft from '../BladeLeft/BladeLeft';
import ProtocolReducer from '../protocolSlice';
import * as ProtocolContext from '../ProtocolContext';
import initialState from './ProtocolReducer.json';

// eslint-disable-next-line
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { protocol: ProtocolReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

describe.only('leftBlade should Opne when Click', () => {
  test('Open LeftBlade', () => {
    const screen = renderWithProviders(
      <BladeLeft
        dataSummary={{
          id: 1,
        }}
        handlePageNo={() => jest.fn()}
      />,
      {
        preloadedState: initialState,
      },
    );
    const BladeEl = screen.getByTestId('toc-component');
    userEvent.click(BladeEl.querySelector('svg'));
    const signatures = screen.getByText('Signatures');
    userEvent.click(signatures);
    const SignaturesChild = screen.getByText('Signatures_child');
    expect(SignaturesChild).toBeInTheDocument();
    userEvent.click(SignaturesChild);

    const SignaturesSub = screen.getByText('Signatures_sub');
    expect(SignaturesSub).toBeInTheDocument();
    userEvent.click(SignaturesSub);
  });
});
