import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProtocolReducer from '../../protocolSlice';
import * as ProtocolContext from '../../ProtocolContext';
import {
  fireEvent,
  render,
  cleanup,
} from '../../../../../test-utils/test-utils';
import initialState from './mockdata';
import SOA from '../SOA';

const CELL1 = 'test-cell1';
const CELL2 = 'test-cell2';

afterEach(cleanup);
beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});
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

describe.only('SOA Component testing', () => {
  it('test SOA', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });
    let dragElement;
    dragElement = screen.getAllByTestId('drag-button');
    fireEvent.click(dragElement[0]);
    const downButton = screen.getByTestId('arrow2Down-button');
    fireEvent.click(downButton);
    dragElement = screen.getAllByTestId('drag-button');
    fireEvent.click(dragElement[0]);

    let trashButton = screen.getByTestId('trash-button');
    fireEvent.click(trashButton);
    const deleteNoButton = screen.getByTestId('delete-no-button');
    fireEvent.click(deleteNoButton);
    dragElement = screen.getAllByTestId('drag-button');
    trashButton = screen.getByTestId('trash-button');
    fireEvent.click(trashButton);
    const deleteYesButton = screen.getByTestId('delete-yes-button');
    fireEvent.click(deleteYesButton);

    const tab1Button = screen.getByTestId('tab1');
    fireEvent.click(tab1Button);

    dragElement = screen.getAllByTestId('drag-button');
    fireEvent.click(dragElement[0]);
    const upButton = screen.getByTestId('arrow2Up-button');
    fireEvent.click(upButton);
  });

  it('test Columns', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });
    let dragElement = screen.getAllByTestId('header-drag-button');
    fireEvent.click(dragElement[0]);
    const upButton = screen.getByTestId('arrowLeft-button');
    fireEvent.click(upButton);
    dragElement = screen.getAllByTestId('header-drag-button');
    fireEvent.click(dragElement[0]);
    const downButton = screen.getByTestId('arrowRight-button');
    fireEvent.click(downButton);
    dragElement = screen.getAllByTestId('header-drag-button');
    fireEvent.click(dragElement[0]);

    let trashButton = screen.getAllByTestId('trash-button')[0];
    fireEvent.click(trashButton);
    const deleteNoButton = screen.getByTestId('delete-no-button');
    fireEvent.click(deleteNoButton);
    dragElement = screen.getAllByTestId('drag-button');
    trashButton = screen.getByTestId('trash-button');
    fireEvent.click(trashButton);
    const deleteYesButton = screen.getByTestId('delete-yes-button');
    fireEvent.click(deleteYesButton);
  });

  it('test   Arrange Pannel ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });
    let settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
    let sideNav = screen.getByTestId('side-nav');
    expect(sideNav).toBeInTheDocument();
    let studyVisit = screen.getByTestId('studyVisit');
    fireEvent.click(studyVisit);
    const epochTimepoint = screen.getByTestId('epoch_timepoint');
    fireEvent.click(epochTimepoint);
    const cycleTimepoint = screen.getByTestId('cycle_timepoint');
    fireEvent.click(cycleTimepoint);
    const visitTimepoint = screen.getByTestId('visit_timepoint');
    fireEvent.click(visitTimepoint);
    const testCell = screen.getAllByText(CELL1);

    fireEvent.dblClick(testCell[0]);

    const testCell2 = screen.getAllByText(CELL2)[0];

    fireEvent.input(testCell2, { target: { innerHTML: 'NVT' } });
    const testCell3 = screen.getAllByText(CELL1);
    fireEvent.click(testCell3[0]);
    settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
    settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
    sideNav = screen.getByTestId('side-nav');
    expect(sideNav).toBeInTheDocument();
    studyVisit = screen.getByTestId('studyVisit');
    fireEvent.click(studyVisit);
  });

  it('test   cell values update ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });
    const testCell = screen.getAllByTestId('cellRenderer');

    fireEvent.doubleClick(testCell[0]);
    const container = document.querySelector('[ref="eInput"]');

    fireEvent.input(container, { target: { value: 'NVT' } });
  });
});
