import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import Sidebar from "../Sidebar";
import { associateData1, compare } from "./data";

afterEach(cleanup);

describe("Compare Sidebar test suit", () => {
  test("Should Render without error", () => {
    const mockHandleOpen = jest.fn();
    const mockhandleDownload = jest.fn();
    render(
      <Sidebar
        open={true}
        setOpen={mockHandleOpen}
        compare={compare}
        handleDownloadTOC={mockhandleDownload}
      />
    );
  });
  test("Trigger Download", () => {
    const mockHandleOpen = jest.fn();
    const mockhandleDownload = jest.fn();
    const { getByText, getByTestId } = render(
      <Sidebar
        open={true}
        setOpen={mockHandleOpen}
        compare={compare}
        handleDownloadTOC={mockhandleDownload}
      />
    );
    const downloadButton = getByTestId("download-div");
    fireEvent.click(downloadButton);
  });
});
