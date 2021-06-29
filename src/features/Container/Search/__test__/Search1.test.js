import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Search from "../Search";
import { MemoryRouter } from "react-router-dom";
import {
  paramsLocation,
  indication,
  sponser,
  searchResult,
  NosearchResult,
  phase,
} from "./data";

describe("Search.js Render", () => {
  test("Render Search Component successfully", () => {
    render(
      <MemoryRouter>
        <Search location={paramsLocation} />
      </MemoryRouter>,
      {
        initialState: {},
      }
    );
  });
  test("Render Search Component successfully with sponsor and indication", () => {
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
            searchResult: searchResult,
          },
        },
      }
    );
    let searchButton = container.getByTestId("search-button");
    fireEvent.click(searchButton);
  });
  test("Render Search Component successfully with sponsor and indication", () => {
    let historymock = jest.fn();
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
            searchResult: searchResult,
          },
        },
      }
    );
    let keyInput =
      container.getByTestId("key-search-input").children[1].children[1];
    fireEvent.change(keyInput, { target: { value: "advanced" } });
    let searchButton = container.getByTestId("search-button");
    fireEvent.click(searchButton);
  });

  test("Render Search Component successfully with all Filters", () => {
    let historymock = jest.fn();
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
            searchResult: searchResult,
            range: {
              from: "20201119",
              to: "20210519",
            },
            recent: {
              from: "",
              to: "",
            },
          },
        },
      }
    );
    let keyInput =
      container.getByTestId("key-search-input").children[1].children[1];
    fireEvent.change(keyInput, { target: { value: "advanced" } });
    let searchButton = container.getByTestId("search-button");
    fireEvent.click(searchButton);
    let sponsorCollapse = container.getByTestId("sponsor-checkboxes");
    fireEvent.click(sponsorCollapse.children[0].children[0]);
    fireEvent.click(
      sponsorCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0]
    );
    let indicationCollapse = container.getByTestId("indication-checkboxes");
    fireEvent.click(indicationCollapse.children[0].children[0]);
    fireEvent.click(
      indicationCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0]
    );
    let tocCollapse = container.getByTestId("toc-checkboxes");
    fireEvent.click(tocCollapse.children[0]);
    fireEvent.click(
      tocCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0]
    );
    let phaseCollapse = container.getByTestId("phase-checkboxes");
    fireEvent.click(phaseCollapse.children[0]);
    fireEvent.click(
      phaseCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0]
    );
    let documentCollapse = container.getByTestId("document-checkboxes");
    fireEvent.click(documentCollapse.children[0]);
    fireEvent.click(
      documentCollapse.children[0].children[1].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0].children[0]
    );
    fireEvent.click(screen.getByTestId("qc-activity-checkboxes").children[0]);
    fireEvent.click(screen.getByTestId("QC_NOT_STARTED"));

    let applyFilterButton = container.getByTestId("apply-filter-button");
    fireEvent.click(applyFilterButton);
  });
  test("Render Search Component successfully with all Filters and recent Date", () => {
    let historymock = jest.fn();
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
            searchResult: searchResult,
            range: {
              from: null,
              to: null,
            },
            recent: {
              from: "20201119",
              to: "20210519",
            },
          },
        },
      }
    );
    let keyInput =
      container.getByTestId("key-search-input").children[1].children[1];
    fireEvent.change(keyInput, { target: { value: "advanced" } });
    let searchButton = container.getByTestId("search-button");
    fireEvent.click(searchButton);
    let sponsorCollapse = container.getByTestId("sponsor-checkboxes");
    fireEvent.click(sponsorCollapse.children[0].children[0]);
    fireEvent.click(
      sponsorCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0]
    );
    let indicationCollapse = container.getByTestId("indication-checkboxes");
    fireEvent.click(indicationCollapse.children[0].children[0]);
    fireEvent.click(
      indicationCollapse.children[0].children[1].children[0].children[1]
        .children[0].children[0].children[0]
    );
    let tocCollapse = container.getByTestId("toc-checkboxes");
    fireEvent.click(tocCollapse.children[0]);
    fireEvent.click(
      tocCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0]
    );
    let phaseCollapse = container.getByTestId("phase-checkboxes");
    fireEvent.click(phaseCollapse.children[0]);
    fireEvent.click(
      phaseCollapse.children[0].children[1].children[0].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0]
    );
    let documentCollapse = container.getByTestId("document-checkboxes");
    fireEvent.click(documentCollapse.children[0]);
    fireEvent.click(
      documentCollapse.children[0].children[1].children[0].children[0]
        .children[0].children[0].children[0].children[0].children[0].children[0]
        .children[0].children[0]
    );
    fireEvent.click(screen.getByTestId("qc-activity-checkboxes").children[0]);
    fireEvent.click(screen.getByTestId("QC_NOT_STARTED"));

    let applyFilterButton = container.getByTestId("apply-filter-button");
    fireEvent.click(applyFilterButton);
  });
  test("Render Search Component successfully with no search Data", () => {
    let historymock = jest.fn();
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
              from: "",
              to: "",
            },
          },
        },
      }
    );
    let applyFilterButton = container.getByTestId("apply-filter-button");
    fireEvent.click(applyFilterButton);
  });
});
