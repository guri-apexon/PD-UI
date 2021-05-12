import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Search from "../Search";
import { MemoryRouter } from "react-router-dom";
import { paramsLocation, indication, sponser, searchResult } from "./data";

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
            search:{
              indications:indication,
              sponsors:sponser,
              filters:searchResult,
              searchResult:searchResult
            }
          },
        }
      );
      let searchButton= container.getByTestId('search-button');
      fireEvent.click(searchButton);
  });
})