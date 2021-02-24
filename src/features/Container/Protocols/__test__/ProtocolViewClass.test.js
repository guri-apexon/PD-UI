import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import * as redux from "react-redux";

import ProtocolViewClass from "../ProtocolViewClass";

let view= {
  tocSections:[],
  soaSections:[]
}
describe("Protocol View container component", () => {
    const state = {
      initialState: {
        protocol: {
          view: {
            tocSections:[],
            soaSections:[]
          }
        },
      },
    };

    xtest("should render ProtocolViewClass section dropdown click open", () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(
          <ProtocolViewClass view={view} />,
          state
        );
        let section = container.getByTestId("dropdown-wrapper-test")
      .children[0];
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(section);
      });

      xtest("should render ProtocolViewClass section dropdown click subsection", () => {
        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    let container = render(
          <ProtocolViewClass />,
          state
        );
        let section = container.getByTestId("dropdown-wrapper-test")
      .children[1];
       
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(section);
    let subSection = container.getByTestId("dropdown-menu-test")
    .children[0].children[0];
    fireEvent.click(subSection);
      });

});