import React from "react";
import { render, fireEvent } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import QCProtocolTable from "../QCTable/QCProtocolTable";

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
       const  handleProtocolClick= jest.fn()
      const container = render(<QCProtocolTable handleProtocolClick={handleProtocolClick} />, state);
      
    });
    
  });

  describe("Protocol Table container component", () => {
    const state = {
      initialState: {
        qc: {
          protocols: [],
          tableError: false,
          loader: false,
        },
      },
    };
    test("should render QC", () => {
       const  handleProtocolClick= jest.fn()
      const container = render(<QCProtocolTable handleProtocolClick={handleProtocolClick} />, state);
      
    });
    
  });
  