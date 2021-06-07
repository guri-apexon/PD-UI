import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import SearchSection from "../SearchSection";
import SearchListing from "../SearchListingSection";
import SearchCard from "../SearchCard";

import mockedAxios from "axios";

import {
  searchResult,
  indication,
  sponser,
  searchCardData,
  searchCardData2,
} from "./data";

afterEach(cleanup);

describe("Search test suit", () => {
  test("Should Render Search Without Error", () => {
    render(<SearchSection />);
  });
  test("Should Render Search Card Without Error", () => {
    render(<SearchListing data={searchCardData} />);
  });
  test("Should Render Protocol Name Field", () => {
    const { getByText, getByTestId } = render(
      <SearchListing data={searchCardData} />
    );
    getByText("Protocol:");
    // screen.debug()
  });
  test("Should Render Protocol Name Value", () => {
    const { getByText, getByTestId } = render(
      <SearchListing data={searchCardData} />
    );
    expect(getByTestId("name-value")).toHaveTextContent("EMR 200095-004");
  });
  test("Should Render Protocol Title Value", () => {
    const { getByText, getByTestId } = render(
      <SearchListing data={searchCardData} />
    );
    expect(getByTestId("title-value")).toHaveTextContent("Paragraph");
  });
  test("Should Render Accordion", () => {
    const { getByText, getByTestId } = render(
      <SearchListing data={searchCardData} />
    );
    getByText("Protocol Data");
  });
  test("Should Render Search Card", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    // screen.debug();
  });
  test("Should Render Indication Field", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Indication :");
  });

  test("Should Render Phase Field", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Phase :");
  });
  test("Should Render Phase Value", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("phase-value")).toHaveTextContent("II");
  });
  test("Should Render Sponsor Field", () => {
    const { getByText, getByTestId } = render(
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
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Approval Date:");
  });
  test("Should Render Molecule Field", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Molecule/Device :");
  });
  test("Should Render Molecule Value", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("molecule-value")).toHaveTextContent(
      "Global Biostatistics"
    );
  });
  test("Should Render table with Version #, Draft #, Source Document, Upload Date, Document Status", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Version #");
    getByText("Draft #");
    getByText("Source Document");
    getByText("Upload Date");
    getByText("Document Status");
  });
  test("Should call for associatd protocol Value", () => {
    const mockViewAssociateProtocolClick = jest.fn();
    const { getByText, getByTestId } = render(
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
    const { getByText, getByTestId } = render(
      <SearchCard
        data={searchCardData2}
        selection={true}
        onViewAssociateProtocolClick={mockViewAssociateProtocolClick}
      />
    );
    const request = mockedAxios.get.mockResolvedValueOnce(data);
    console.log("---||---", request, mockedAxios);
    const assButton = getByTestId("source-value");
    fireEvent.click(assButton);

    setImmediate(() => {
      const newdata = "D361BC00001 Protocol-2020-03-03-VER-1.0.pdf";
      mockedAxios.get.mockResolvedValueOnce(newdata);
      // expect(getByText("mocked title"));
    });
  });
});
