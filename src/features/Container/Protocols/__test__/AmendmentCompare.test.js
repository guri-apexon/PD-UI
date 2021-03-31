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

    const { getByText, getByTestId } = render(
      <AmendmentCompare prot11="" prot22="" />
    );

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

    const { getAllByText, getByTestId } = render(<AmendmentCompare />);
    getAllByText("VERSION HISTORY");

    // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
    // screen.debug();
  });
  test("Dispatch Value.", async () => {
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

    const { getAllByText, getByTestId } = render(
      <AmendmentCompare
        prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
        prot22="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
      />
    );
    // getAllByText("VERSION HISTORY");

    // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
    // screen.debug();
  });
  test("Should Trigger compare", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    // beforeEach(() => {
    //   useSelectorMock.mockClear();
    //   useDispatchMock.mockClear();
    // });
    useSelectorMock1.mockReturnValue(associateData1);
    // useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getAllByText, getByTestId } = render(
      <AmendmentCompare prot11="abc" prot22="cdf" />
    );
    const compareButton = getByTestId("compare-button");
    fireEvent.click(compareButton);
    // getAllByText("VERSION HISTORY");

    // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
    // screen.debug();
  });
  test("Should Select first Protocol to comapre", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    // beforeEach(() => {
    //   useSelectorMock.mockClear();
    //   useDispatchMock.mockClear();
    // });
    useSelectorMock1.mockReturnValue(associateData1);
    // useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getAllByText, getByTestId } = render(<AmendmentCompare />);
    const selectDiv = getByTestId("select-div1");
    const input = selectDiv.querySelector("input");
    fireEvent.change(input, {
      target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
    });
    fireEvent.keyDown(selectDiv, { key: "ArrowDown" });
    fireEvent.keyDown(selectDiv, { key: "Enter" });
    // expect(compareButton.value).toBe("0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14");
    // getAllByText("VERSION HISTORY");

    // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
    // screen.debug();
  });
  test("Should Select second Protocol to comapre", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    useSelectorMock1.mockReturnValue(associateData1);
    // useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getAllByText, getByTestId } = render(<AmendmentCompare />);
    const selectDiv = getByTestId("select-div2").children[1].children[0];
    const input = selectDiv.querySelector("input");
    fireEvent.click(selectDiv);
    // fireEvent.focus(input, { key: "Enter" });
    // fireEvent.keyDown(selectDiv, { key: "Enter" });
    // fireEvent.change(input, {
    //   target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
    // });
    // screen.debug();
    // fireEvent.keyDown(selectDiv, { key: "ArrowDown" });
    // screen.debug()
    // fireEvent.keyDown(selectDiv, { key: "Enter" });
    // screen.debug()
    // expect(compareButton.value).toBe("0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14");
    // getAllByText("VERSION HISTORY");

    // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
    // screen.debug();
  });
  test("Select Two Same Protocol to comapre", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    useSelectorMock1.mockReturnValue(associateData1);
    // useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getAllByText, getByTestId } = render(
      <AmendmentCompare
        prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
        prot22="21bab274-1b66-4c14-b0a1-5487f111fc60"
      />
    );
    const selectDiv1 = getByTestId("select-div1");
    const selectDiv2 = getByTestId("select-div2");
    const input1 = selectDiv1.querySelector("input");
    fireEvent.change(input1, {
      target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
    });
    const input2 = selectDiv2.querySelector("input");
    fireEvent.change(input2, {
      target: { value: "21bab274-1b66-4c14-b0a1-5487f111fc60" },
    });
    fireEvent.keyDown(selectDiv1, { key: "ArrowDown" });
    fireEvent.keyDown(selectDiv1, { key: "Enter" });
    fireEvent.keyDown(selectDiv2, { key: "ArrowDown" });
    fireEvent.keyDown(selectDiv2, { key: "Enter" });
    fireEvent.click(getByTestId("compare-button"));
    // screen.debug()
    // expect(screen.getByRole("alert")).toHaveTextContent(
    //   "can not comapare same version"
    // );
    // window.alert = jsdomAlert;
  });
  test("Select One Protocol to comapre", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    useSelectorMock1.mockReturnValue(associateData1);
    // useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getAllByText, getByTestId } = render(
      <AmendmentCompare
        prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
        prot22=""
      />
    );
    const selectDiv1 = getByTestId("select-div1");
    const selectDiv2 = getByTestId("select-div2");
    const input1 = selectDiv1.querySelector("input");
    fireEvent.change(input1, {
      target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
    });
    // const input2 = selectDiv2.querySelector("input");
    // fireEvent.change(input2, {
    //   target: { value: "" },
    // });
    fireEvent.keyDown(selectDiv1, { key: "ArrowDown" });
    fireEvent.keyDown(selectDiv1, { key: "Enter" });
    // fireEvent.keyDown(selectDiv2, { key: "ArrowDown" });
    // fireEvent.keyDown(selectDiv2, { key: "Enter" });
    fireEvent.click(getByTestId("compare-button"));
    // screen.debug()
    // expect(screen.getByRole("alert")).toHaveTextContent(
    //   "can not comapare same version"
    // );
    // window.alert = jsdomAlert;
  });
  test("Select One Protocol to comapre", async () => {
    const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    useSelectorMock1.mockReturnValue(associateData1);
    // useSelectorMock2.mockReturnValue(compare);

    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    const { getAllByText, getByTestId } = render(
      <AmendmentCompare
        prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
        prot22=""
      />
    );
    const selectDiv1 = getByTestId("select-div1").children[1];
    fireEvent.click(selectDiv1);
    // let selectOption = getByTestId("compare-option-1");
    // fireEvent.click(selectOption);
    // screen.getByRole("whateve")
  });
});
