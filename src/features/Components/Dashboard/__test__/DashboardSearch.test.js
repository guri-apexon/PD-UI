/* eslint-disable */
import { render, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import DashboardSearch from '../DashboardSearch';

describe('Dashboard Search component', () => {
  const state = {
    initialState: {
      dashboard: {
        recentSearches: [],
        savedSearches: [],
      },
    },
  };
  test('Component renders correctly for saved search', () => {
    const recentData = [];
    const savedData = [
      {
        keyword: "Alzheimer's disease",
        user: '1021402',
        timeCreated: '2020-12-16T11:03:11.867000',
        lastUpdated: '2020-12-16T11:03:11.867000',
        id: 24,
      },
      {
        keyword: '',
        user: '1021402',
        timeCreated: '2020-12-16T11:03:11.867000',
        lastUpdated: '2020-12-16T11:03:11.867000',
        id: 25,
      },
    ];
    const container = render(
      <DashboardSearch recent={recentData} saved={savedData} />,
      state,
    );
    const searchbar = container.getByTestId('dashboard-search-bar').children[0]
      .children[1].children[1];
    console.log('-----------------searchbar------------', searchbar);
    // fireEvent.change(searchbar);
    // fireEvent.change(searchbar);
    fireEvent.change(searchbar);
  });
  test('Component renders correctly for recent search', () => {
    const recentData = [
      {
        keyword: 'Acute hepatitis',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 21,
      },
      {
        keyword: 'Alport syndrome',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 22,
      },
      {
        keyword: "Alzheimer's disease",
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 23,
      },
      {
        keyword: 'Arthritis',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 24,
      },
      {
        keyword: 'covid19',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 25,
      },
      {
        keyword: 'Bladder cancer',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 26,
      },
      {
        keyword: 'Acute',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 27,
      },
      {
        keyword: 'Acute ill',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 28,
      },
      {
        keyword: 'advanced HCC',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 29,
      },
      {
        keyword: 'D419BC00001',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 30,
      },
      {
        keyword: 'Protocol-2018-04-25-VER-V03-000001',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 31,
      },
      {
        keyword: 'keyword',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 32,
      },
      {
        keyword: 'D419BC00001',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 33,
      },
      {
        keyword: 'advanced',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 34,
      },
      {
        keyword: 'advanced',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 35,
      },
      {
        keyword: '',
        user: '1021402',
        timeCreated: '2020-12-16T12:34:59.460000',
        lastUpdated: '2020-12-16T12:34:59.460000',
        id: 36,
      },
    ];
    const savedData = [];
    const container = render(
      <DashboardSearch recent={recentData} saved={savedData} />,
      state,
    );
    const viewMoreBtn = container.getByTestId('view-more').children[0];
    console.log('-----------------viewMoreBtn------------', viewMoreBtn);
    fireEvent.click(viewMoreBtn);
  });
});
