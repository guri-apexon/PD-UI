import React from "react";
import FilterChip from "../FilterChips";
import { render, fireEvent } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import {
  filterChipObject,
  defaultFilterChipObject,
  indication,
  sponser,
  searchResult,
  phase,
} from "./data";

describe("Filter Chip Test Suit", () => {
  test("Should Render Filter Chip without error", () => {
    const mockonSearchChange = jest.fn();
    const mockSetDateRange = jest.fn();
    render(
      <FilterChip
        filters={filterChipObject}
        onSearchQuery={mockonSearchChange}
        setDateRangeValue={mockSetDateRange}
      />
    );
  });
  test("Should not render without any filter", () => {
    const mockonSearchChange = jest.fn();
    const mockSetDateRange = jest.fn();
    render(
      <FilterChip
        filters={defaultFilterChipObject}
        onSearchQuery={mockonSearchChange}
        setDateRangeValue={mockSetDateRange}
      />,
      {
        initialState: {
          search: {
            indications: indication,
            sponsors: sponser,
            phases: phase,
            filters: searchResult,
            searchResult: searchResult,
            range: {
              from: "",
              to: "",
            },
            recent: {
              from: "",
              to: "",
            },
          },
        },
      }
    );
  });
  test("Should Handle Delete", () => {
    const mockonSearchChange = jest.fn();
    const mockSetDateRange = jest.fn();
    const container = render(
      <FilterChip
        filters={filterChipObject}
        onSearchQuery={mockonSearchChange}
        setDateRangeValue={mockSetDateRange}
      />,
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
    const closeButtonTOC =
      container.getByTestId("chip-toc").children[0].children[1];
    fireEvent.click(closeButtonTOC);

    const closeButtonSponsor =
      container.getByTestId("chip-sponsor").children[0].children[1];
    fireEvent.click(closeButtonSponsor);

    const closeButtonIndication =
      container.getByTestId("chip-indication").children[0].children[1];
    fireEvent.click(closeButtonIndication);

    const closeButtonPhase =
      container.getByTestId("chip-phase").children[0].children[1];
    fireEvent.click(closeButtonPhase);

    const closeButtonDocument =
      container.getByTestId("chip-document").children[0].children[1];
    fireEvent.click(closeButtonDocument);

    const closeButtonQC =
      container.getByTestId("chip-qc").children[0].children[1];
    fireEvent.click(closeButtonQC);

    const closeButtonDateType =
      container.getByTestId("date-type").children[0].children[1];
    fireEvent.click(closeButtonDateType);

    const closeButtonDaterange =
      container.getByTestId("date-range-section").children[0].children[1];
    fireEvent.click(closeButtonDaterange);
  });
});
