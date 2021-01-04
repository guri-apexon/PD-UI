import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import AmendmentCompare from "../AmendmentCompare";
import { associateData1, compare } from "./data";

afterEach(cleanup);

describe("Version Compare test suit", () => {
  test("Should Render without error", () => {
    render(<AmendmentCompare />);
  });
  test("Should show message if there is less that two version available for protocol", async () => {
    const { getByText } = render(<AmendmentCompare />);
    await waitForElement(() =>
      getByText("This Protocol has only one version.")
    );
    await waitForElement(() =>
      getByText("So compare option is not available for this Protocol.")
    );
  });
  test("Should render two dropdowns if there is more than one versions are available for protocol", async () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    // beforeEach(() => {
    //   useSelectorMock.mockClear();
    //   useDispatchMock.mockClear();
    // });

    useSelectorMock.mockReturnValue(associateData1);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getByText, getByTestId } = render(<AmendmentCompare />);

    await waitForElement(() => getByText("Select First Version to Compare"));
    await waitForElement(() => getByText("Select Second Version to Compare"));
  });
  test("Should render compare button if there is more than one versions are available for protocol", async () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    // beforeEach(() => {
    //   useSelectorMock.mockClear();
    //   useDispatchMock.mockClear();
    // });

    useSelectorMock.mockReturnValue(associateData1);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getByText, getByTestId } = render(<AmendmentCompare />);

    await waitForElement(() => getByText("Compare"));
  });
  test("Should render compared data div if result is available.", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    // beforeEach(() => {
    //   useSelectorMock.mockClear();
    //   useDispatchMock.mockClear();
    // });
    useSelectorMock1.mockReturnValue(associateData1);
    useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getByText, getByTestId } = render(<AmendmentCompare />);
    getByText("SIGNATURE PAGES")

    // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
    screen.debug();
  });
});
