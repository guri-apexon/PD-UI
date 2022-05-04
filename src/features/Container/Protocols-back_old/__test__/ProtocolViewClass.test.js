import React from "react";
import { render, fireEvent } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import * as redux from "react-redux";

import ProtocolViewClass from "../ProtocolViewClass";

let view = {
  iqvdataToc: {
    data: [
      [
        "",
        "Unmapped",
        "text",
        "Clinical Study Protocol",
        { IsBold: true },
        "Unmapped",
        "TITLE",
        "",
        1,
        1,
      ],
      [
        "",
        "Unmapped",
        "header",
        "A Phase III Randomized, Double-blind, Placebo-controlled, Multi-center",
        { IsBold: false },
        "Unmapped",
        "TITLE",
        "",
        1,
        2,
      ],
      [
        "",
        "TITLE",
        "text",
        "A Phase III Randomized, Double-blind, Placebo-controlled, Multi-center",
        { IsBold: false },
        "Unmapped",
        "TITLE",
        "",
        1,
        3,
      ],
      [
        "",
        "TITLE",
        "text",
        "",
        { IsBold: false },
        "Unmapped",
        "TITLE",
        "",
        1,
        4,
      ],
      [
        "",
        "Unmapped",
        "table",
        {
          FootnoteText_0:
            "The allowance after Cycle 2 is based on Day 1 of previous cycle.",
          Header: [1],
          Table: "",
          TableIndex: "4",
          TableName: "Study of Assessments(Schedule of Assessment)",
        },
        { IsBold: false },
        "Unmapped",
        "TITLE",
        "",
        1,
        5,
      ],
      [
        "",
        "TITLE",
        "table",
        {
          FootnoteText_0:
            "The allowance after Cycle 2 is based on Day 1 of previous cycle.",
          Header: [1],
          Table: "",
          TableIndex: "5",
          TableName: "Study of Assessments(Schedule of Assessment)",
        },
        { IsBold: false },
        "Unmapped",
        "TITLE",
        "",
        1,
        6,
      ],
    ],
    index: [1, 2, 3, 4, 5, 6],
  },
  iqvdataSoa: [
    {
      FootnoteText_0:
        "The allowance after Cycle 2 is based on Day 1 of previous cycle.",
      Header: [1],
      Table: "",
      TableIndex: "4",
      TableName: "Study of Assessments(Schedule of Assessment)",
    },
  ],
  tocSections: [{ section: " Title", id: "TOC-1" }],
  soaSections: [
    { section: "Study of Assessments(Schedule of Assessment)", id: "SOA-4" },
  ],
  iqvdataSummary: {
    data: [["protocol_name", "", "Protocol Name"]],
    index: [1],
  },
};
const subSections = {
  TOC: [{ section: " Title", id: "TOC-1" }],
  SOA: [
    { section: "Study of Assessments(Schedule of Assessment)", id: "SOA-4" },
  ],
};
let listData = [];
describe("Protocol View container component", () => {
  const state = {
    initialState: {
      protocol: {
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: true,
        },
      },
    },
  };
  test("should render ProtocolViewClass TOC ", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    listData.push({
      section: "Table of Contents",
      id: "TOC",
      subSections: true,
    });
    render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
  });

  test("should render ProtocolViewClass SOA ", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    listData.push({
      section: "Schedule of Assessments",
      id: "SOA",
      subSections: true,
    });
    render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
  });

  test("should render ProtocolViewClass Summary ", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    listData.push({ section: "Summary", id: "SUM", subSections: false });
    render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
  });

  test("should render ProtocolViewClass err ", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    view.err = "Something Went Wrong";
    render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
  });

  test("should render ProtocolViewClass section dropdown click open", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    view.err = null;
    let container = render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
    let section = container.getByTestId("dropdown-wrapper-test").children[0];
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(section);
  });

  test("should render ProtocolViewClass section dropdown click subsection", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
    let section = container.getByTestId("dropdown-wrapper-test").children[0];

    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(section);
    let subSection =
      container.getByTestId("dropdown-menu-test").children[0].children[0];
    fireEvent.click(subSection);
  });
  test("should render ProtocolViewClass section dropdown click outside", () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(
      <ProtocolViewClass view={view} data={subSections} listData={listData} />,
      state
    );
    let section = container.getByTestId("dropdown-wrapper-test").children[1];

    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(section);
    let outsideDiv = container.getByTestId("protocol-column-wrapper");
    fireEvent.click(outsideDiv);
  });
});
