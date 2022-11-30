import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import Search from '../Search';
import {
  paramsLocation,
  indication,
  sponser,
  searchResult,
  NosearchResult,
  phase,
} from './data';

describe('Search.js Render', () => {
  test('Render Search Component successfully', () => {
    render(
      <MemoryRouter>
        <Search location={paramsLocation} />
      </MemoryRouter>,
      {
        initialState: {},
      },
    );
  });
  test('Render Search Component successfully with sponsor and indication', () => {
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} />
      </MemoryRouter>,
      {
        initialState: {
          search: {
            indications: indication,
            sponsors: sponser,
            phases: phase,
            filters: searchResult,
            searchResult,
            range: {
              from: '',
              to: '',
            },
          },
        },
      },
    );
    const searchButton = container.getByTestId('search-button');
    fireEvent.click(searchButton);
  });
  test('Render Search Component successfully with sponsor and indication', () => {
    const historymock = jest.fn();
    historymock.replace = jest.fn();
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} history={historymock} />
      </MemoryRouter>,
      {
        initialState: {
          search: {
            indications: indication,
            sponsors: sponser,
            phases: phase,
            filters: searchResult,
            searchResult,
            range: {
              from: '',
              to: '',
            },
          },
        },
      },
    );
    const keyInput =
      container.getByTestId('key-search-input').children[1].children[1];
    fireEvent.change(keyInput, { target: { value: 'advanced' } });
    const searchButton = container.getByTestId('search-button');
    fireEvent.click(searchButton);
  });

  test('Render Search Component successfully with all Filters', () => {
    const historymock = jest.fn();
    historymock.replace = jest.fn();
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} history={historymock} />
      </MemoryRouter>,
      {
        initialState: {
          search: {
            indications: indication,
            sponsors: sponser,
            phases: phase,
            filters: searchResult,
            searchResult,
            range: {
              from: '20201119',
              to: '20210519',
            },
            recent: {
              from: '',
              to: '',
            },
          },
        },
      },
    );
    const keyInput =
      container.getByTestId('key-search-input').children[1].children[1];
    fireEvent.change(keyInput, { target: { value: 'advanced' } });
    const searchButton = container.getByTestId('search-button');
    fireEvent.click(searchButton);
    const sponsorCollapse = container.getByTestId('sponsor-checkboxes');
    fireEvent.click(sponsorCollapse.children[0].children[0]);
    fireEvent.click(
      sponsorCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0],
    );
    const indicationCollapse = container.getByTestId('indication-checkboxes');
    fireEvent.click(indicationCollapse.children[0].children[0]);
    fireEvent.click(
      indicationCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0],
    );
    const tocCollapse = container.getByTestId('toc-checkboxes');
    fireEvent.click(tocCollapse.children[0]);
    fireEvent.click(
      tocCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0],
    );
    const phaseCollapse = container.getByTestId('phase-checkboxes');
    fireEvent.click(phaseCollapse.children[0]);
    fireEvent.click(
      phaseCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0],
    );
    const documentCollapse = container.getByTestId('document-checkboxes');
    fireEvent.click(documentCollapse.children[0]);
    fireEvent.click(
      documentCollapse.children[0].children[1].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0].children[0],
    );
    fireEvent.click(screen.getByTestId('qc-activity-checkboxes').children[0]);
    fireEvent.click(screen.getByTestId('QC_NOT_STARTED'));

    const applyFilterButton = container.getByTestId('apply-filter-button');
    fireEvent.click(applyFilterButton);
  });
  test('Render Search Component successfully with all Filters and recent Date', () => {
    const historymock = jest.fn();
    historymock.replace = jest.fn();
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} history={historymock} />
      </MemoryRouter>,
      {
        initialState: {
          search: {
            indications: indication,
            sponsors: sponser,
            phases: phase,
            filters: searchResult,
            searchResult,
            range: {
              from: null,
              to: null,
            },
            recent: {
              from: '20201119',
              to: '20210519',
            },
          },
        },
      },
    );
    const keyInput =
      container.getByTestId('key-search-input').children[1].children[1];
    fireEvent.change(keyInput, { target: { value: 'advanced' } });
    const searchButton = container.getByTestId('search-button');
    fireEvent.click(searchButton);
    const sponsorCollapse = container.getByTestId('sponsor-checkboxes');
    fireEvent.click(sponsorCollapse.children[0].children[0]);
    fireEvent.click(
      sponsorCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0],
    );
    const indicationCollapse = container.getByTestId('indication-checkboxes');
    fireEvent.click(indicationCollapse.children[0].children[0]);
    fireEvent.click(
      indicationCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0],
    );
    const tocCollapse = container.getByTestId('toc-checkboxes');
    fireEvent.click(tocCollapse.children[0]);
    fireEvent.click(
      tocCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0],
    );
    const phaseCollapse = container.getByTestId('phase-checkboxes');
    fireEvent.click(phaseCollapse.children[0]);
    fireEvent.click(
      phaseCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0],
    );
    const documentCollapse = container.getByTestId('document-checkboxes');
    fireEvent.click(documentCollapse.children[0]);
    fireEvent.click(
      documentCollapse.children[0].children[1].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0].children[0],
    );
    fireEvent.click(screen.getByTestId('qc-activity-checkboxes').children[0]);
    fireEvent.click(screen.getByTestId('QC_NOT_STARTED'));

    const applyFilterButton = container.getByTestId('apply-filter-button');
    fireEvent.click(applyFilterButton);
  });
  test('Render Search Component successfully with no search Data', () => {
    const historymock = jest.fn();
    historymock.replace = jest.fn();
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} history={historymock} />
      </MemoryRouter>,
      {
        initialState: {
          search: {
            indications: indication,
            sponsors: sponser,
            phases: phase,
            filters: searchResult,
            searchResult: NosearchResult,
            range: {
              from: null,
              to: null,
            },
            recent: {
              from: '',
              to: '',
            },
          },
        },
      },
    );
    const applyFilterButton = container.getByTestId('apply-filter-button');
    fireEvent.click(applyFilterButton);
  });
});
