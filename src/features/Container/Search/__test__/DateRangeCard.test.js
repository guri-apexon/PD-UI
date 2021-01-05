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

  test("should render ProtocolViewClass section dropdown click open", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(<DateRangeCard section={dateSection} />, state);
  });
});
