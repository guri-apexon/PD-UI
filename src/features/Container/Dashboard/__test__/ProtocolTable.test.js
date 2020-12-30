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

import ProtocolTable from "../ProtocolTable";

describe("Protocol Table container component", () => {
    const state = {
      initialState: {
        dashboard: {
          protocols: [],
        },
      },
    };

    test("should render ProtocolTable", () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
        render(
          <ProtocolTable />,
          state
        );
      });

});