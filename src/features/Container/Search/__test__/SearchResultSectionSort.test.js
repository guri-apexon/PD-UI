import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import SearchResultSection from "../SearchResultSection";
import { MemoryRouter } from "react-router-dom";
import * as redux from "react-redux";

describe("Sort of SearchResultSection", () => {
  test("Should Render SearchResultSection", () => {
    const mockdeleteSearchInput = jest.fn();
    const mockonSearchChange = jest.fn();
    const mockonSortChange = jest.fn();
    const mockonSearchQuery = jest.fn();
    const mocksearchQuery = jest.fn();
    const mockhancleClearAll = jest.fn();
    const mockHistoryPush = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    let filterList = undefined;
    let resultList = {
      data: {
        ResponseCode: 200,
        count: 10,
        pageNo: 1,
        sortField: "score",
        total_count: 300,
        phases: [],
        sponsors: [],
        indications: [],
        data: [
          {
            AiDocId: "a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe",
            approvalDate: "",
            followed: false,
            indication: "Adavosertib",
            isActive: 1,
            molecule: "Adavosertib",
            phase: "I",
            protocolDescription: "A Phase I, Openours",
            protocolNumber: "D601HC00008",
            rows: [],
            rowsLoading: true,
            sponsor: "AstraZeneca",
          },
          {
            AiDocId: "742053fb-db87-46e0-bed2-6c2ee8d94280",
            approvalDate: "",
            followed: false,
            indication: "none",
            isActive: 1,
            molecule: " Durvalumab (MEDI4736) and↵ tremelimumab",
            phase: "III",
            protocolDescription:
              "A Phase III, Randomized, Open-Label, Urothelial Cancer",
            protocolNumber: "",
            rows: [],
            rowsLoading: true,
            sponsor: "Numerics word , Countries, Country (..",
            uploadDate: "20210111023714",
          },
        ],
      },
      loader: false,
      search: true,
      success: true,
    };
    let sponsorData = {
      sectionContent: [{ title: "sponsor1", id: 1 }],
      success: true,
    };
    let indicationData = {
      sectionContent: [{ title: "ind1", id: 1 }],
      success: true,
    };
    let phaseData = {
      sectionContent: [
        {
          id: 8,
          title: "Phase 1b/2a",
        },
      ],
      success: true,
    };
    let searchInput = "advanced";
    let searchQuery = {
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
          searchQuery={mocksearchQuery}
          hancleClearAll={mockhancleClearAll}
          totalSearchResult={[]}
          dateRangeValue={[null, null]}
        />
      </MemoryRouter>,
      {
        initialState: {},
      }
    );
    let sortby = container.getByTestId("sortby-container").children[1];
    fireEvent.click(sortby);
    let item = container.getByTestId("sortby-container2");
    console.log("item.value", item.value);
    fireEvent.click(item);
    expect(item.value).toBe(2);
  });
});
