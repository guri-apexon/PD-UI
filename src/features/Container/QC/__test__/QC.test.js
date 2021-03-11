import React from "react";
import { render, fireEvent } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import QC from "../QC";

describe("Protocol Table container component", () => {
  const state = {
    initialState: {
      qc: {
        protocols: [
          {
            protocolTitle: "Title",
            protocol: "12344",
            projectId: "Project1",
            sponsor: "Astella",
            uploadDate: "aa",
            id: 1,
          },
        ],
        tableError: false,
        loader: false,
      },
    },
  };
  test("should render QC", () => {
    const container = render(<QC />, state);
    let linkTag = container.getByTestId("qc-parent-component").children[0]
      .children[0];
    let protocolLink = container.getByTestId("qc-parent-component").children[2]
      .children[0].children[0].children[0].children[0].children[0].children[1]
      .children[0].children[1].children[0].children[2].children[0];
    fireEvent.click(linkTag, { target: { preventDefault: () => {} } });
    fireEvent.click(protocolLink);
  });
  test("should render QC Tab click", () => {
    const container = render(<QC />, state);
    let TabLink = container.getByTestId("qc-parent-component").children[1].children[0].children[0].children[0].children[0].children[0]
     fireEvent.click(TabLink);
  });
});
