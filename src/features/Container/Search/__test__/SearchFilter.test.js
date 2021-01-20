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

describe("Filter test of Search", () => {
  test("Should Render Search with filter section", () => {
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
      ],
      loader: false,
      search: false,
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
          searchInput={searchInput}
          searchQuery={searchQuery}
          deleteSearchInput={mockdeleteSearchInput}
          onSearchChange={mockonSearchChange}
          onSortChange={mockonSortChange}
          onSearchQuery={mockonSearchQuery}
          searchQuery={mocksearchQuery}
          hancleClearAll={mockhancleClearAll}
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
