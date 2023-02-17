import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitizedPanel/DigitalizeCard';
import ProtocolReducer from '../protocolSlice';
import { PROTOCOL_RIGHT_MENU } from '../Constant/Constants';
import * as ProtocolContext from '../ProtocolContext';

import initialState from './ProtocolReducer.json';

const sectionRef = [
  {
    current: {
      scrollIntoView: jest.fn(),
    },
  },
];

const home = PROTOCOL_RIGHT_MENU.HOME;

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

describe('DigitizeCard', () => {
  test('Display digitize panel content', () => {
    const screen = renderWithProviders(
      <DigitalizeCard
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
        rightValue={PROTOCOL_RIGHT_MENU.HOME}
      />,
      {
        preloadedState: initialState,
      },
    );

    const HeaderClose = screen.getByTestId('digitize-panel-content');
    expect(HeaderClose).toBeInTheDocument();
  });

  test('paginationpage useEffect', () => {
    const screen = renderWithProviders(
      <DigitalizeCard
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
        rightValue={PROTOCOL_RIGHT_MENU.HOME}
      />,
      { preloadedState: { ...initialState, home } },
    );

    const HeaderClose = screen.getByTestId('digitize-panel-content');
    expect(HeaderClose).toBeInTheDocument();
    screen.debug();
  });

  test('Display digitize panel content', () => {
    const screen = renderWithProviders(
      <DigitalizeCard
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
        rightValue={PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES}
      />,
      { preloadedState: { ...initialState, home } },
    );
  });
});
