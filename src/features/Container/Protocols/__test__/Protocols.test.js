import React from "react";
import { render, fireEvent } from "../../../../test-utils/test-utils";

import "@testing-library/jest-dom/extend-expect";
import Protocols from "../Protocols.js";

const state2 = {
    initialState: {
      protocol: {
        summary: {
          loading: false,
          success: false,
        },
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: true,
        },
        compare:{
            iqvdata:''
        }
      },
    },
  };
  const state3 = {
    initialState: {
      protocol: {
        summary: {
          loading: true,
          success: false,
        },
      },
    },
  };
  describe("Renders Protocols Component", () => {
  const state = {
    initialState: {
      protocol: {
        summary: {
          loading: false,
          success: true,
          data: {
            fileName: "Protocol-2020-03-09-DOD-1.0-000001.pdf",
            id: "3978efd6-301e-46a7-a37f-341ef9c16219",
            protocol:"Protocol-Demo3",
          },
        },
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: true,
        },
        compare:{
            iqvdata:''
        }
      },
    },
  };
  let locations = {
    search: "?protocolId=3978efd6-301e-46a7-a37f-341ef9c16219",
  };
  test("Should render Protocols Component Successful", () => {
   let container= render(<Protocols location={locations} />, state);
   let link =container.getByTestId('protocols-component-test').children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[0];
   console.log('link :', link);
   fireEvent.click(link)
//    let dashboardLink= container.getByTestId('protocols-component-test').children[0].children[0];
//    fireEvent.click(dashboardLink,{  target: { preventdefault: () => {} } });

  });
  let location2 = {
    search: "?protocolId=3978efd6-301e-46a7-a37f-341ef9c16219&protocolId2=4978efd6-301e-46a7-a37f-341ef9c16219&value",
  };
  test("Should render Protocols Component Successful iwth two ids", () => {
    render(<Protocols location={location2} />, state)
   });
   test("Should render Protocols Component Successful with No summary Data", () => {
   render(<Protocols location={locations} />, state2);
   });
   test("Should render Protocols Component Successful with No summary Data and Loading", () => {
    render(<Protocols location={locations} />, state3);
    });
});
