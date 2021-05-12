import React from "react";
import { render } from "../../../../test-utils/test-utils";
import ProtocolView from "../ProtocolView";
let initialState = {
  protocol: {
    view: {
      iqvdataSoa: [{ Table: "<table> sss</table>" }],
      iqvdataSummary: {
        index: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        columns: ["field_name", "field_value", "field_header"],
        data: [["protocol_name", "", "<b>Protocol Name</b>"]],
      },
      iqvdataToc: {
        data: [],
      },
      loader: true,
      tocSections: [{ section: " Version History", id: "TOC-24" }],
      soaSections: [
        {
          section: "Study of Assessments(Schedule of Assessment)",
          id: "SOA-4",
        },
      ],
    },
  },
};
describe("ProtocolView", () => {
  test("ProtocolView Component", () => {
    render(<ProtocolView />, {
      initialState,
    });
  });
});
