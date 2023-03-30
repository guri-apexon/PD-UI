import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, fireEvent } from '../../../../test-utils/test-utils';
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
const handlePageRight = jest.fn();

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
    const contextValues = {
      dispatchSectionEvent: jest.fn(),
      unsavedImgs: [],
      setUnsavedImgs: jest.fn(),
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
      />,
      { preloadedState: { ...initialState, home } },
    );

    const header1 = screen.getByText('Signatures');
    fireEvent.click(header1);
    const pencil1 = screen.getAllByTestId('pencilIcon')[0];
    const pencil2 = screen.getAllByTestId('pencilIcon')[1];
    fireEvent.click(pencil1);

    const header2 = screen.getByText('GENERAL INFORMATION');
    fireEvent.click(header2);

    fireEvent.click(pencil2);

    const confirmModal = screen.getByText('Save');
    expect(confirmModal).toBeInTheDocument();
  });
});
