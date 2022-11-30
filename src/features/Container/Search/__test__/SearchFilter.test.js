import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { render, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SearchResultSection from '../SearchResultSection';
import { filterChipObject } from './data';

describe('Filter test of Search', () => {
  const mockDispatch = jest.fn();
  jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
  }));
  test('Should Render Search with filter section with Primary User', () => {
    const mockdeleteSearchInput = jest.fn();
    const mockonSearchChange = jest.fn();
    const mockonSortChange = jest.fn();
    const mockonSearchQuery = jest.fn();
    const mockhancleClearAll = jest.fn();
    const mockHistoryPush = jest.fn();
    const mockSetDateRange = jest.fn();
    // const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // const mockDispatchFn = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    // eslint-disable-next-line no-unused-vars
    const mockCallApi = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve({ data: 1 }));
    const historymock = jest.fn();
    historymock.push = jest.fn();
    const filterList = undefined;
    const resultList = {
      data: {
        ResponseCode: 200,
        count: 10,
        pageNo: 1,
        sortField: 'score',
        total_count: 300,
        phases: [],
        sponsors: [],
        indications: [],
        data: [
          {
            AiDocId: 'a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe',
            approvalDate: '',
            followed: false,
            indication: 'Adavosertib',
            isActive: 1,
            molecule: 'Adavosertib',
            phase: 'I',
            protocolDescription: 'A Phase I, Openours',
            protocolNumber: 'D601HC00008',
            rows: [],
            rowsLoading: true,
            sponsor: 'AstraZeneca',
          },
          {
            AiDocId: '742053fb-db87-46e0-bed2-6c2ee8d94280',
            approvalDate: '',
            followed: false,
            indication: 'none',
            isActive: 1,
            molecule: ' Durvalumab (MEDI4736) and↵ tremelimumab',
            phase: 'III',
            protocolDescription:
              'A Phase III, Randomized, Open-Label, Urothelial Cancer',
            protocolNumber: '',
            rows: [],
            rowsLoading: true,
            sponsor: 'Numerics word , Countries, Country (..',
            uploadDate: '20210111023714',
          },
        ],
      },
      loader: false,
      search: true,
      success: true,
    };
    const sponsorData = {
      sectionContent: [{ title: 'sponsor1', id: 1 }],
      success: true,
    };
    const indicationData = {
      sectionContent: [{ title: 'ind1', id: 1 }],
      success: true,
    };
    const phaseData = {
      sectionContent: [
        {
          id: 8,
          title: 'Phase 1b/2a',
        },
      ],
      success: true,
    };
    const searchInput = 'advanced';
    const searchQuery = {
      documentStatus: [],
      indication: [],
      phase: [],
      sponsor: [],
      toc: [],
    };
    const container = render(
      <MemoryRouter>
        <SearchResultSection
          filterList={filterList}
          resultList={resultList}
          sponsorData={sponsorData}
          indicationData={indicationData}
          phaseData={phaseData}
          searchInput={searchInput}
          searchQuery={searchQuery}
          deleteSearchInput={mockdeleteSearchInput}
          onSearchChange={mockonSearchChange}
          onSortChange={mockonSortChange}
          onSearchQuery={mockonSearchQuery}
          hancleClearAll={mockhancleClearAll}
          totalSearchResult={[]}
          dateRangeValue={[null, null]}
          history={historymock}
          filters={filterChipObject}
          setDateRangeValue={mockSetDateRange}
        />
      </MemoryRouter>,
      {
        initialState: {},
      },
    );
    const sortby = container.getByTestId('sortby-container').children[1];
    fireEvent.click(sortby);
    const item = container.getByTestId('sortby-container2');
    // console.log("item.value", item.value);
    fireEvent.click(item);
    expect(item.value).toBe(2);
    const card1 = container.getByTestId(
      'searchListing-card-a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe',
    );
    fireEvent.click(
      card1.children[0].children[2].children[0].children[0].children[0],
    );
    // expect(mockCallApi).toHaveBeenCalledTimes(1);
    const expandIcon = card1.children[1].children[0].children[0].children[1];
    fireEvent.click(expandIcon);
    const followToggle = card1.children[0].children[3].children[0].children[0];
    fireEvent.click(followToggle);
  });

  test('Should Render Search with filter section with Non Primary User', () => {
    const mockdeleteSearchInput = jest.fn();
    const mockonSearchChange = jest.fn();
    const mockonSortChange = jest.fn();
    const mockonSearchQuery = jest.fn();
    const mockhancleClearAll = jest.fn();
    const mockHistoryPush = jest.fn();
    const mockSetDateRange = jest.fn();
    // const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // const mockDispatchFn = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    // eslint-disable-next-line no-unused-vars
    const mockCallApi = jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve({ data: 0 }));
    const historymock = jest.fn();
    historymock.push = jest.fn();
    const filterList = undefined;
    const resultList = {
      data: {
        ResponseCode: 200,
        count: 10,
        pageNo: 1,
        sortField: 'score',
        total_count: 300,
        phases: [],
        sponsors: [],
        indications: [],
        data: [
          {
            AiDocId: 'a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe',
            approvalDate: '',
            followed: false,
            indication: 'Adavosertib',
            isActive: 1,
            molecule: 'Adavosertib',
            phase: 'I',
            protocolDescription: 'A Phase I, Openours',
            protocolNumber: 'D601HC00008',
            rows: [],
            rowsLoading: true,
            sponsor: 'AstraZeneca',
          },
          {
            AiDocId: '742053fb-db87-46e0-bed2-6c2ee8d94280',
            approvalDate: '',
            followed: false,
            indication: 'none',
            isActive: 1,
            molecule: ' Durvalumab (MEDI4736) and↵ tremelimumab',
            phase: 'III',
            protocolDescription:
              'A Phase III, Randomized, Open-Label, Urothelial Cancer',
            protocolNumber: '',
            rows: [],
            rowsLoading: true,
            sponsor: 'Numerics word , Countries, Country (..',
            uploadDate: '20210111023714',
          },
        ],
      },
      loader: false,
      search: true,
      success: true,
    };
    const sponsorData = {
      sectionContent: [{ title: 'sponsor1', id: 1 }],
      success: true,
    };
    const indicationData = {
      sectionContent: [{ title: 'ind1', id: 1 }],
      success: true,
    };
    const phaseData = {
      sectionContent: [
        {
          id: 8,
          title: 'Phase 1b/2a',
        },
      ],
      success: true,
    };
    const searchInput = 'advanced';
    const searchQuery = {
      documentStatus: [],
      indication: [],
      phase: [],
      sponsor: [],
      toc: [],
    };
    const container = render(
      <MemoryRouter>
        <SearchResultSection
          filterList={filterList}
          resultList={resultList}
          sponsorData={sponsorData}
          indicationData={indicationData}
          phaseData={phaseData}
          searchInput={searchInput}
          searchQuery={searchQuery}
          deleteSearchInput={mockdeleteSearchInput}
          onSearchChange={mockonSearchChange}
          onSortChange={mockonSortChange}
          onSearchQuery={mockonSearchQuery}
          hancleClearAll={mockhancleClearAll}
          totalSearchResult={[]}
          dateRangeValue={[null, null]}
          history={historymock}
          filters={filterChipObject}
          setDateRangeValue={mockSetDateRange}
        />
      </MemoryRouter>,
      {
        initialState: {},
      },
    );
    const sortby = container.getByTestId('sortby-container').children[1];
    fireEvent.click(sortby);
    const item = container.getByTestId('sortby-container2');
    // console.log("item.value", item.value);
    fireEvent.click(item);
    expect(item.value).toBe(2);
    const card1 = container.getByTestId(
      'searchListing-card-a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe',
    );
    fireEvent.click(
      card1.children[0].children[2].children[0].children[0].children[0],
    );
    // expect(mockCallApi).toHaveBeenCalledTimes(1);
    const expandIcon = card1.children[1].children[0].children[0].children[1];
    fireEvent.click(expandIcon);
    const followToggle = card1.children[0].children[3].children[0].children[0];
    fireEvent.click(followToggle);
  });
});
