import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import ProtocolOverview from "../ProtocolOverview";

import data from './protocolSummary.json'

import * as redux from "react-redux";


describe("Protocol Overview Testsuit", () => {
  test("Should render Protocol Overview Component", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    // container
    let cardHeader = container.getByText(/Overview Details/);
    expect(cardHeader).toHaveTextContent("Overview Details")
  });
  test("Should have project Id", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Project ID or CRM #/);
    expect(cardHeader).toHaveTextContent("Project ID or CRM #")
    
  });
//   test("Should have project Id value", async () => {
//     let container = render(
//       <ProtocolOverview data={data} />,
//       {
//         initialState: {
//           summary: {
//             data:data,
//             loading: false,
//             success:true
//           },
//         },
//       }
//     );
//     container = render(<ProtocolOverview data={data} />)
//     let cardHeader = container.getByText(/Test Sample/);
//     expect(cardHeader).toHaveTextContent("Test Sample")
    
//   });
  
  test("Should have Sponser", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Sponser/);
    expect(cardHeader).toHaveTextContent("Sponser")
    
  });

  test("Should have Indication", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Indication/);
    expect(cardHeader).toHaveTextContent("Indication")
    
  });

  test("Should have Amendment", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Amendment/);
    expect(cardHeader).toHaveTextContent("Amendment")
    
  });

  test("Should have Version", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Version/);
    expect(cardHeader).toHaveTextContent("Version")
    
  });

  test("Should have Document Status", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Document Status/);
    expect(cardHeader).toHaveTextContent("Document Status")
    
  });

  test("Should have Activity", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Activity/);
    expect(cardHeader).toHaveTextContent("Activity")
    
  });

  test("Should have Protocol Title", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Protocol Title/);
    expect(cardHeader).toHaveTextContent("Protocol Title")
    
  });

  test("Should have Digitized Confidence Interval", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Digitized Confidence Interval/);
    expect(cardHeader).toHaveTextContent("Digitized Confidence Interval")
    
  });

  test("Should have Completeness of Digitization", async () => {
    const container = render(
      <ProtocolOverview data={data} />,
      {
        initialState: {
          summary: {
            data:data,
            loading: false,
            success:true
          },
        },
      }
    );
    let cardHeader = container.getByText(/Completeness of Digitization/);
    expect(cardHeader).toHaveTextContent("Completeness of Digitization")
    
  });
  
});
