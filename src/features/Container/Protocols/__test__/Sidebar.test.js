import React from "react";
import { cleanup, waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import Sidebar from "../Sidebar";
import { compare, compareState } from "./data";

afterEach(cleanup);

describe("Compare Sidebar test suit", () => {
  beforeEach(() => {
    const mockHandleOpen = jest.fn();
    const mockhandleDownload = jest.fn();
    render(
      <Sidebar
        open={true}
        setOpen={mockHandleOpen}
        compare={compare}
        handleDownloadTOC={mockhandleDownload}
      />,
      compareState
    );
  });
  test("Should Close modal", () => {
    const closeButton = screen.getByTestId("sidebar-div").children[0].children[0];
    screen.debug();
    fireEvent.click(closeButton);
    screen.debug();
  });
  test("Should Trigger Download", () => {
    const downloadButton = screen.getByTestId("download-div");
    fireEvent.click(downloadButton);
  });
});
