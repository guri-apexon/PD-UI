import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { cleanup } from "@testing-library/react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import AmendmentCompare from "../AmendmentCompare";
import {
  initialState,
  associatedState,
  compareState,
  compareError,
} from "./data";

afterEach(cleanup);

describe("Render testing with no data", () => {
  beforeEach(() => {
    render(<AmendmentCompare />, initialState);
  });
  test("Should show warning when we pass only one protocol version", () => {
    const text = screen.getByText("This Protocol has only one version.");
    expect(text).toBeInTheDocument();
  });
});
describe("Render compare Error Message", () => {
  beforeEach(() => {
    render(<AmendmentCompare />, compareError);
  });
  test("Should show warning when we pass only one protocol version", () => {
    const text = screen.getByText("Something went Wrong");
    expect(text).toBeInTheDocument();
  });
});
describe("Testing Positive Scenarios", () => {
  test("Should show loader", () => {
    render(<AmendmentCompare />, associatedState);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
  test("Should render two dropdowns", () => {
    render(<AmendmentCompare />, compareState);
    const select1 = screen.getByTestId("select-div1");
    const select2 = screen.getByTestId("select-div2");
    expect(select1).toBeInTheDocument();
    expect(select2).toBeInTheDocument();
  });
  test("Should show warning when click compare button without any Protocol Selection", () => {
    render(<AmendmentCompare prot11="" prot22="" />, compareState);
    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
  });
  test("Should show warning when click compare button without Second Protocol Selection", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22=""
      />,
      compareState
    );
    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
  });
  test("Should show warning when click compare button with two same Protocol on Selection", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22="66350a76-ea36-4082-88ed-b9c9611786a1"
      />,
      compareState
    );
    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
  });
  test("Should show compare data when valid data passed", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22="8d68a4a3-12ef-4ed1-b9e5-38537334d94a"
      />,
      compareState
    );

    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
    // const textArry = screen.getAllByText("VERSION HISTORY");
    // expect(textArry[0]).toBeInTheDocument();
  });
  test("Should show compare data when valid data passed", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22="8d68a4a3-12ef-4ed1-b9e5-38537334d94a"
      />,
      compareState
    );

    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
    // const summaryButton = screen.getByTestId("summary-button");
    // fireEvent.click(summaryButton);
  });
});
