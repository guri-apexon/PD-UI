import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
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
    render(<QC />, state);
    // let linkTag = container.getByTestId("qc-parent-component").children[0]
    //   .children[0];
    // let protocolLink = container.getByTestId("qc-parent-component").children[2]
    //   .children[0].children[0].children[0].children[0].children[0].children[1]
    //   .children[0].children[1].children[0].children[2].children[0];
    // fireEvent.click(linkTag, { target: { preventDefault: () => {} } });
    // fireEvent.click(protocolLink);
  });
  test("should switch to tab QC Protocol View", () => {
    render(<QC />, state);

    fireEvent.click(screen.getByTestId("click-link-qc"));
    expect(screen.getByText(/12344/)).toBeInTheDocument();
    // let TabLink = container.getByTestId("qc-parent-component").children[1].children[0].children[0].children[0].children[0].children[0]
    //  fireEvent.click(TabLink);
  });
  test("should breadcrumb link be clicked", () => {
    render(<QC />, state);

    fireEvent.click(screen.getByTestId("breadcrumb-click").children[0]);
    // let TabLink = container.getByTestId("qc-parent-component").children[1].children[0].children[0].children[0].children[0].children[0]
    //  fireEvent.click(TabLink);
  });
});
