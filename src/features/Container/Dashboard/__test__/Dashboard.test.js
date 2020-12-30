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

import Dashboard from "../Dashboard";

describe("Protocol Table container component", () => {
    const state = {
      initialState: {
        dashboard: {
          protocols: [],
        },
      },
    };

    test("should render Dashboard", () => {
        render(
          <Dashboard />,
          state
        );
      });

});