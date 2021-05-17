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
  test("Render Search Component successfully with sponsor and indication", () => {
    let historymock = jest.fn();
    historymock.replace= jest.fn()
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} history={historymock} />
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
    let keyInput= container.getByTestId('key-search-input').children[1].children[1];
    fireEvent.change(keyInput, {target:{value:'advanced'}});
    let searchButton= container.getByTestId('search-button');
    fireEvent.click(searchButton);
  });

  test.only("Render Search Component successfully with sponsor and indication", () => {
    let historymock = jest.fn();
    historymock.replace= jest.fn()
    const container = render(
      <MemoryRouter>
        <Search location={paramsLocation} history={historymock} />
      </MemoryRouter>,
      {
        initialState: {
          search:{
            indications:indication,
            sponsors:sponser,
            filters:searchResult,
            searchResult:searchResult,
            range:{
              from:null,
              to:null
            },
            recent:{
              from:"",
              to:""
            }
          }
        },
      }
    );
    let keyInput= container.getByTestId('key-search-input').children[1].children[1];
    fireEvent.change(keyInput, {target:{value:'advanced'}});
    let searchButton= container.getByTestId('search-button');
    fireEvent.click(searchButton);
    let sponsorCollapse= container.getByTestId('sponsor-checkboxes');
    fireEvent.click(sponsorCollapse.children[0].children[0]);
    fireEvent.click(sponsorCollapse.children[0].children[1].children[0].children[0].children[0].children[0].children[0]);
    let indicationCollapse= container.getByTestId('indication-checkboxes');
    fireEvent.click(indicationCollapse.children[0].children[0]);
    fireEvent.click(indicationCollapse.children[0].children[1].children[0].children[0].children[0].children[0].children[0]);
   
    console.log('sponsorCollapse.children[0].children[1].children[0].children[0] :', sponsorCollapse.children[0].children[1].children[0].children[0].children[0].children[0].children[0]);
    let applyFilterButton= container.getByTestId('apply-filter-button');
    fireEvent.click(applyFilterButton);
  });
})