import React from "react";
import { cleanup } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "../../../../test-utils/test-utils";

import SearchSection from "../SearchSection";
import SearchListing from "../SearchListingSection";
import SearchCard from "../SearchCard";

import axios from "axios";

import { searchCardData, searchCardData2 } from "./data";

afterEach(cleanup);

describe("Search test suit", () => {
  test("Should Render Search Without Error", () => {
    render(<SearchSection />);
  });
  xtest("Should Render Search Card Without Error", () => {
    render(<SearchListing data={searchCardData} />);
  });
  test("Should Render Protocol Name Field", () => {
    const { getByText } = render(<SearchListing data={searchCardData} />);
    getByText("Protocol:");
    // screen.debug()
  });
  test("Should Render Protocol Name Value", () => {
    const { getByTestId } = render(<SearchListing data={searchCardData} />);
    expect(getByTestId("name-value")).toHaveTextContent("EMR 200095-004");
  });
  test("Should Render Protocol Title Value", () => {
    const { getByTestId } = render(<SearchListing data={searchCardData} />);
    expect(getByTestId("title-value")).toHaveTextContent("Paragraph");
  });
  test("Should Render Accordion", () => {
    const { getByText } = render(<SearchListing data={searchCardData} />);
    getByText("Protocol Data");
  });
  test("Should Render Search Card", () => {
    render(<SearchCard data={searchCardData} selection={true} />);
    // screen.debug();
  });
  test("Should Render Indication Field", () => {
    const { getByText } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Indication :");
  });

  test("Should Render Phase Field", () => {
    const { getByText } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Phase :");
  });
  test("Should Render Phase Value", () => {
    const { getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("phase-value")).toHaveTextContent("II");
  });
  test("Should Render Sponsor Field", () => {
    const { getByText } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Sponsor :");
  });
  // test("Should Render Sponsor Value", () => {
  //   const { getByText, getByTestId } = render(
  //     <SearchCard data={searchCardData} selection={true} />
  //   );
  //   // expect(getByTestId("sponsor-value")).toHaveTextContent(
  //   //   "Numerics word , Countries, Country (.."
  //   // );
  // });
  test("Should Render Recent Approval Date Field", () => {
    const { getByText } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Approval Date:");
  });
  test("Should Render Molecule Field", () => {
    const { getByText } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Molecule/Device :");
  });
  test("Should Render Molecule Value", () => {
    const { getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("molecule-value")).toHaveTextContent(
      "Global Biostatistics"
    );
  });
  test("Should Render table with Version #, Source Document, Upload Date, Document Status", () => {
    const { getByText } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Version #");
    // getByText("Draft #");
    getByText("Source Document");
    getByText("Upload Date");
    getByText("Document Status");
  });
  test("Should call for associatd protocol Value", () => {
    const mockViewAssociateProtocolClick = jest.fn();
    const { getByTestId } = render(
      <SearchCard
        data={searchCardData}
        selection={true}
        onViewAssociateProtocolClick={mockViewAssociateProtocolClick}
      />
    );
    const assButton = getByTestId("view_associated_protocol");
    fireEvent.click(assButton);
  });
  test("Should call for download protocol", async () => {
    const mockViewAssociateProtocolClick = jest.fn();

    const data = 1;
    const { getByTestId } = render(
      <SearchCard
        data={searchCardData2}
        selection={true}
        onViewAssociateProtocolClick={mockViewAssociateProtocolClick}
      />
    );
    const mockCallApi = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(data));
    console.log(mockCallApi);
    const assButton = getByTestId("source-value");
    fireEvent.click(assButton);
    // expect(mockCallApi).toHaveBeenCalledTimes(1);

    setImmediate(() => {
      const newdata = "D361BC00001 Protocol-2020-03-03-VER-1.0.pdf";
      const mockCallApi2 = jest
        .spyOn(axios, "get")
        .mockImplementation(() => Promise.resolve(newdata));
      console.log(mockCallApi2);
      // expect(mockCallApi2).toHaveBeenCalledTimes(1);
      // expect(getByText("mocked title"));
    });
  });
});
