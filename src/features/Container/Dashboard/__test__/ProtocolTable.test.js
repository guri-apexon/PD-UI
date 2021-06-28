import React from "react";
import { render, screen } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import * as redux from "react-redux";

import ProtocolTable from "../ProtocolTable";

describe("Protocol Table container component", () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
        setSelectedProtocols: [],
      },
    },
  };

  test("should render ProtocolTable", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(<ProtocolTable />, state);
  });

  xtest("should tabIndex of Followed Button to be 0", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(<ProtocolTable />, state);
    // screen.getByText(/Following Protocols/);
    // screen.getByTestId("FP");
    // fireEvent.click(screen.getByRole("tablist").children[1]);
    console.log(screen.getByRole("tablist").children[1]);
    expect(screen.getByText("Add Protocol to Library")).not.toBeInTheDocument();
  });
});
