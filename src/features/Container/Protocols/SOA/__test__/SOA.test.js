import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProtocolReducer from '../../protocolSlice';
import * as ProtocolContext from '../../ProtocolContext';
import { fireEvent, render } from '../../../../../test-utils/test-utils';
import initialState from './mockdata';

import SOA from '../SOA';
import TabelContext from '../Context';
import ArrangePanel from '../ArrangePanel';
import SideNav from '../SideNav';

const stettingItems = {
  legend: {
    name: 'Legend',
  },
  studyVisit: {
    name: 'Study Period',
    children: [
      {
        enable: true,
        name: 'epoch_timepoint',
      },
      {
        enable: true,
        name: 'cycle_timepoint',
      },
      {
        enable: true,
        name: 'visit_timepoint',
      },
      {
        enable: false,
        name: 'year_timepoint',
      },
      {
        enable: false,
        name: 'month_timepoint',
      },
      {
        enable: false,
        name: 'week_timepoint',
      },
      {
        enable: false,
        name: 'day_timepoint',
      },
      {
        enable: false,
        name: 'window_timepoint',
      },
    ],
  },
  mappings: {
    name: 'mappings',
  },
  display: {
    name: 'Display',
  },
  references: {
    name: 'References',
  },
};

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
    let dragElement = screen.getAllByTestId('drag-button');
    fireEvent.click(dragElement[0]);

    const upButton = screen.getByTestId('arrow2Up-button');
    fireEvent.click(upButton);
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
  });

  it('test   Arrange Pannel ', () => {
    const screen = renderWithProviders(<SOA docId="test" />, {
      preloadedState: { ...initialState },
    });

    const settingsButton = screen.getByTestId('settings-button');
    fireEvent.click(settingsButton);
  });

  it('test ArrangePannel', () => {
    const propDispatch = {
      dispatch: jest.fn(),
      state: {
        openSettings: true,
        settingItems: stettingItems,
        tableData: [],
        hideGroupsColumns: [],
      },
    };
    const screen = render(
      <TabelContext.Provider value={propDispatch}>
        <ArrangePanel />
      </TabelContext.Provider>,
    );

    fireEvent.click(screen.getByText('Settings'));
  });

  it('test SideNav', () => {
    const propDispatch = {
      dispatch: jest.fn(),
      state: {
        settingItems: stettingItems,
        tableData: [],
        hideGroupsColumns: [],
      },
    };
    const screen = render(
      <TabelContext.Provider value={propDispatch}>
        <SideNav />
      </TabelContext.Provider>,
    );

    fireEvent.click(screen.getByText('Study Period'));
  });
});
