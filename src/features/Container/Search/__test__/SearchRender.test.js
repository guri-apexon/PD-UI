import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import SearchSection from "../SearchSection";
import SearchListing from "../SearchListingSection";
import SearchCard from "../SearchCard";

import { searchResult, indication, sponser, searchCardData } from "./data";

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
    screen.debug();
  });
  test("Should Render Indication Field", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Indication :");
  });
  test("Should Render Indication Value", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("indication-value")).toHaveTextContent(
      "ABCC6 deficiency"
    );
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
  test("Should Render Sponsor Value", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("sponsor-value")).toHaveTextContent(
      "Numerics word , Countries, Country (.."
    );
  });
  test("Should Render Recent Approval Date Field", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    getByText("Approval Date:");
  });
  test("Should Render Recent Approval Date Value", () => {
    const { getByText, getByTestId } = render(
      <SearchCard data={searchCardData} selection={true} />
    );
    expect(getByTestId("date-value")).toHaveTextContent("30-Nov-2012");
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
});
