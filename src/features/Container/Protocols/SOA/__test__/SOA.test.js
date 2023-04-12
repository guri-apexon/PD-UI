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
    const upButton = screen.getByTestId('arrow2Up-button');
    fireEvent.click(upButton);

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
    fireEvent.click(screen.getByTestId('tab0'));
  });

  it('test   Columns ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });

    fireEvent.click(screen.getAllByTestId('header-drag-button')[0]);
    const upButton1 = screen.getByTestId('arrowLeft-button');
    fireEvent.click(upButton1);

    fireEvent.click(screen.getAllByTestId('header-drag-button')[0]);
    const downButtonLeft1 = screen.getByTestId('arrowRight-button');
    fireEvent.click(downButtonLeft1);

    let dragElement = screen.getAllByTestId('header-drag-button');
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

  it('test   input fields ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });
    fireEvent.doubleClick(screen.getByText('E28'));
    const newColumnEl = screen.getByTestId('editing-ref');
    fireEvent.change(newColumnEl, { target: { value: 'NVT' } });
    fireEvent.click(screen.getAllByTestId('cellRenderer')[0]);
  });
  it('test   empty cell  fields ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });

    const element = Array.from(
      document.querySelectorAll('span[data-testid="cellRenderer"]'),
    ).find((item) => item.innerHTML === '');
    fireEvent.doubleClick(element);
    const elementCell = screen.getByTestId('editing-cell');
    fireEvent.change(elementCell, { target: { value: 'NVT' } });
    fireEvent.click(screen.getAllByText('test-cell1')[0]);
  });

  it('test   non empty cell  fields ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });

    const element = screen.getAllByText('X')[0];
    fireEvent.doubleClick(element);
    const elementCell = screen.getByTestId('editing-cell');

    fireEvent.change(elementCell, { target: { value: 'NVT' } });

    fireEvent.click(screen.getAllByText('test-cell1')[0]);
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
    const epochTimepoint = screen.getByTestId('visit_timepoint');
    fireEvent.click(epochTimepoint);

    settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
    settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
    sideNav = screen.getByTestId('side-nav');
    expect(sideNav).toBeInTheDocument();
    studyVisit = screen.getByTestId('studyVisit');
    fireEvent.click(studyVisit);
  });
});
