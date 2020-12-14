// __tests__/fetch.test.js
import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import AddProtocol from "./AddProtocol";

import _ from "lodash";
import * as redux from "react-redux";

describe("Add Protocol Test Suite", () => {
  xtest("Should render AddProtocol Component", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByText, debug, getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      { initialState: {} }
    );
  });
  xtest("Should render AddProtocol Component without Modal", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      { initialState: {
        dashboard: {
          addProtocolData: {
              sponsor: [
                {sponsor_name: "NVT AG", sponsor_abbreviation: "NVT", id: 2, label: "NVT AG"},
              ],
              indication: [{indication_name: "indication1", indication_description: "Indication1 Description", id: 1, label: "Indication1 Description"}],
              amendmentNumber:[{label: "Y", value: "Yes"}],
              documentState:[{label: "Draft", value: "draft"}]
            },
            addProtocolModal: false,
            isLoading: false
         }
        } 
      }
    );
    fireEvent.click(getByTestId('add-protocol-button'));
   })
   xtest("Should call onModalClose Function", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      { initialState: {
        dashboard: {
          addProtocolData: {
              sponsor: [
                {sponsor_name: "NVT AG", sponsor_abbreviation: "NVT", id: 2, label: "NVT AG"},
              ],
              indication: [{indication_name: "indication1", indication_description: "Indication1 Description", id: 1, label: "Indication1 Description"}],
              amendmentNumber:[{label: "Y", value: "Yes"}],
              documentState:[{label: "Draft", value: "draft"}]
            },
            addProtocolModal: true,
            isLoading: false
         }
        } 
      }
    );
    let modal=getByTestId('add-protocol-modal').children[2].children[0].children[0].children[1].children[0].children[0];
    fireEvent.click(modal);
   })

  test("Should render AddProtocol Component with Modal", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId, get } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      { initialState: {
        dashboard: {
          addProtocolData: {
              sponsor: [
                {sponsor_name: "NVT AG", sponsor_abbreviation: "NVT", id: 2, label: "NVT AG"},
              ],
              indication: [{indication_name: "indication1", indication_description: "Indication1 Description", id: 1, label: "Indication1 Description"}],
              amendmentNumber:[{label: "Y", value: "Yes"}],
              documentState:[{label: "Draft", value: "draft"}]
            },
            addProtocolModal: true,
            isLoading: false
         }
        } 
      }
    );
    let protcolNumber= getByTestId('protocol-number-texfield');
    let versionNumber= getByTestId('version-number-texfield');
    let amendmentNumber= getByTestId('amendment-number-texfield').children[0].children[1].children[0];
    // console.log("Test Child11",amendmentNumber);
    // fireEvent.change(protcolNumber.children[1].children[0], {target:{value:'a'}});
    // expect(protcolNumber.children[1].children[0].value).toBe('a');
    // fireEvent.change(versionNumber.children[1].children[0], {target:{value:1}});
    // expect(versionNumber.children[1].children[0].value).toBe("1");
    // fireEvent.change(versionNumber.children[1].children[0], {target:{value:""}});
    // expect(versionNumber.children[1].children[0].value).toBe("");
    // fireEvent.change(versionNumber.children[1].children[0], {target:{value:1.111}});
    // expect(versionNumber.children[1].children[0].value).toBe("1.111");
    fireEvent.click(amendmentNumber);
    fireEvent.change(amendmentNumber.children[0], {target:{value:'0'}});
    fireEvent.click(amendmentNumber.children[0]);
    // fireEvent.click(screen.classList.contains('a-MuiAutocomplete-popper'))
    console.log('screen.classList.contains(\'a-MuiAutocomplete-popper\' :', screen);
    // expect(versionNumber.children[1].children[0].value).toBe("1.111");

  });
});

// test('loads and displays greeting', async () => {
//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })
