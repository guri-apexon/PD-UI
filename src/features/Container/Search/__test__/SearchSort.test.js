import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Search from "../Search";
import { MemoryRouter } from "react-router-dom";
import * as redux from "react-redux";

let searchData = {
  filters: { data: [] },
  totalSearchResult: [
    {
      AiDocId: "a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe",
      approvalDate: "",
      followed: false,
      indication: "Adavosertib",
      isActive: 1,
      molecule: "Adavosertib",
      phase: "I",
      protocolDescription: "A Phase I, Openours",
      protocolNumber: "D601HC00008",
      rows: [],
      rowsLoading: true,
      sponsor: "AstraZeneca",
    },
  ],
  searchResult: {
    data: {
      ResponseCode: 200,
      count: 10,
      pageNo: 1,
      sortField: "score",
      total_count: 300,
      phases: [],
      sponsors: [],
      indications: [],
      data: [
        {
          AiDocId: "a35f977d-ac7d-4fe7-9974-0e3e1b4a61fe",
          approvalDate: "",
          followed: false,
          indication: "Adavosertib",
          isActive: 1,
          molecule: "Adavosertib",
          phase: "I",
          protocolDescription: "A Phase I, Openours",
          protocolNumber: "D601HC00008",
          rows: [],
          rowsLoading: true,
          sponsor: "AstraZeneca",
        },
        {
          AiDocId: "742053fb-db87-46e0-bed2-6c2ee8d94280",
          approvalDate: "",
          followed: false,
          indication: "none",
          isActive: 1,
          molecule: " Durvalumab (MEDI4736) and↵ tremelimumab",
          phase: "III",
          protocolDescription:
            "A Phase III, Randomized, Open-Label, Urothelial Cancer",
          protocolNumber: "",
          rows: [],
          rowsLoading: true,
          sponsor: "Numerics word , Countries, Country (..",
          uploadDate: "20210111023714",
        },
      ],
    },
    loader: false,
    search: true,
    success: true,
  },
  sponsors: {
    sectionContent: [{ title: "sponsor1", id: 1 }],
    success: true,
  },
  indications: {
    sectionContent: [{ title: "ind1", id: 1 }],
    success: true,
  },
  phases: {
    sectionContent: [{ title: "phase1", id: 1 }],
    success: true,
  },
  recent: { from: "", to: "" },
  range: { from: "", to: "" },
};
let location = {
  search: "?key=advanced",
};
describe("Sort of Search.js", () => {
  test("Should Render Search.js and on Sort Change", async () => {
    const container = render(<Search location={location} />, {
      initialState: {
        search: searchData,
      },
    });

    let sortby = container.getByTestId("sortby-container").children[1];
    fireEvent.click(sortby);
    let item = container.getByTestId("sortby-container2");
    await fireEvent.click(item);
    expect(item.value).toBe(2);
    let item1 = container.getByTestId("sortby-container1");
    fireEvent.click(item1);
    expect(item1.value).toBe(1);
  });
});
