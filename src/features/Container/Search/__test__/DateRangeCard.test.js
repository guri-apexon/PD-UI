import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import * as redux from "react-redux";

import {dateSection} from '../Data/constants';

import {DateRangeCard} from "../CustomFilterCards";

describe("DateRangeCard container component", () => {
  const state = {
    initialState: {
      search: {
        recent: {
          from: "",
          to: "",
        },
        range: {
          from: "",
          to: "",
        },
      },
    },
  };

  test("should render DateRangeCard Recent date radio selection", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(<DateRangeCard section={dateSection} />, state);
    let radio = container.getByTestId("recent-date-wrapper")
    .children[0].children[1].children[0];
    fireEvent.click(radio);
  });

  test("should render DateRangeCard Date range date selection", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(<DateRangeCard section={dateSection} />, state);
    let inputSel = container.getByTestId("range-date-wrapper")
    .children[0].children[0].children[0].children[1].children[0]
    fireEvent.click(inputSel);
    
    let dateSel = container.getByTestId("range-date-wrapper")
    .children[0].children[1].children[0].children[0].children[1].children[0].children[5]
    fireEvent.click(dateSel);

    let dateSel2 = container.getByTestId("range-date-wrapper")
    .children[1].children[1].children[0].children[0].children[1].children[1].children[5]
    fireEvent.click(dateSel2);
  });
});
