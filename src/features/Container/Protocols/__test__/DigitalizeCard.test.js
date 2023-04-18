import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import DigitalizeCard from '../DigitizedPanel/DigitalizeCard';
import ProtocolReducer from '../protocolSlice';
import UserReducer from '../../../../store/userDetails';
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
const handlePageRight = jest.fn();
const mockHandleRightFullScreen = jest.fn();

const home = PROTOCOL_RIGHT_MENU.HOME;

// eslint-disable-next-line
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { protocol: ProtocolReducer, user: UserReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  // eslint-disable-next-line
  function Wrapper({ children }) {
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
    };
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
        handlePageRight={handlePageRight}
        handleRightFullScreen={mockHandleRightFullScreen}
        showExpandIcon={false}
        fullRightScreen={false}
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
        handlePageRight={handlePageRight}
        handleRightFullScreen={mockHandleRightFullScreen}
        showExpandIcon={false}
        fullRightScreen={false}
      />,
      { preloadedState: { ...initialState, home } },
    );

    const HeaderClose = screen.getByTestId('digitize-panel-content');
    expect(HeaderClose).toBeInTheDocument();
  });

  test('Display digitize panel content', () => {
    renderWithProviders(
      <DigitalizeCard
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123 }}
        paginationPage={2}
        handlePageRight={handlePageRight}
        rightValue={PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES}
        handleRightFullScreen={mockHandleRightFullScreen}
        showExpandIcon={false}
        fullRightScreen={false}
      />,
      { preloadedState: { ...initialState, home } },
    );
  });
});

describe('digitizeAccordion Integration', () => {
  test('load all the accordions', () => {
    const screen = renderWithProviders(
      <DigitalizeCard
        handlePageRight={handlePageRight}
        sectionNumber={1}
        sectionRef={sectionRef}
        data={{ id: 123, userPrimaryRoleFlag: true }}
        paginationPage={2}
        rightValue={PROTOCOL_RIGHT_MENU.PROTOCOL_ATTRIBUTES}
        handleRightFullScreen={mockHandleRightFullScreen}
        showExpandIcon={false}
        fullRightScreen={false}
      />,
      { preloadedState: { ...initialState, home } },
    );

    const header1 = screen.getByText('Signatures');
    fireEvent.click(header1);

    const header2 = screen.getByText('GENERAL INFORMATION');
    fireEvent.click(header2);
  });
});
