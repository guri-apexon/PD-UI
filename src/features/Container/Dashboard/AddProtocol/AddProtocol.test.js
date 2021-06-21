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

import * as redux from "react-redux";

const dashboardmockData = {
  addProtocolData: {
    sponsor: [
      {
        sponsor_name: "NVT AG",
        sponsor_abbreviation: "NVT",
        id: 2,
        label: "NVT AG",
      },
    ],
    indication: [
      {
        indication_name: "indication1",
        indication_description: "Indication1 Description",
        id: 1,
        label: "Indication1 Description",
      },
    ],
    amendmentNumber: [{ label: "Y", value: "Yes" }],
    documentState: [{ label: "Draft", value: "draft" }],
  },
  addProtocolModal: true,
  isLoading: false,
};

describe("Add Protocol Test Suite", () => {
  test("Should render AddProtocol Component", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolModal: false,
            isLoading: false,
          },
        },
      }
    );
    // container
    container.getByText("Add Protocol to Library");
  });
  test("Should render AddProtocol Component without Modal", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: "NVT AG",
                  sponsor_abbreviation: "NVT",
                  id: 2,
                  label: "NVT AG",
                },
              ],
              indication: [
                {
                  indication_name: "indication1",
                  indication_description: "Indication1 Description",
                  id: 1,
                  label: "Indication1 Description",
                },
              ],
              amendmentNumber: [{ label: "Y", value: "Yes" }],
              documentState: [{ label: "Draft", value: "draft" }],
            },
            addProtocolModal: false,
            isLoading: false,
          },
        },
      }
    );
    fireEvent.click(getByTestId("add-protocol-button"));
  });
  test("Should call onModalClose Function", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: "NVT AG",
                  sponsor_abbreviation: "NVT",
                  id: 2,
                  label: "NVT AG",
                },
              ],
              indication: [
                {
                  indication_name: "indication1",
                  indication_description: "Indication1 Description",
                  id: 1,
                  label: "Indication1 Description",
                },
              ],
              amendmentNumber: [{ label: "Y", value: "Yes" }],
              documentState: [{ label: "Draft", value: "draft" }],
            },
            addProtocolModal: true,
            isLoading: false,
          },
        },
      }
    );
    let modal =
      getByTestId("add-protocol-modal").children[2].children[0].children[0]
        .children[1].children[0].children[0];
    fireEvent.click(modal);
  });

  test("Should render AddProtocol Component with Modal", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: "NVT AG",
                  sponsor_abbreviation: "NVT",
                  id: 2,
                  label: "NVT AG",
                },
              ],
              indication: [
                {
                  indication_name: "indication1",
                  indication_description: "Indication1 Description",
                  id: 1,
                  label: "Indication1 Description",
                },
              ],
              amendmentNumber: [{ label: "Y", value: "Yes" }],
              documentState: [{ label: "Draft", value: "draft" }],
            },
            addProtocolModal: true,
            isLoading: false,
          },
        },
      }
    );
    let protcolNumber = getByTestId("protocol-number-texfield").children[1]
      .children[0];
    let versionNumber = getByTestId("version-number-texfield").children[1]
      .children[0];
    fireEvent.change(protcolNumber, { target: { value: "a" } });
    expect(protcolNumber.value).toBe("a");
    fireEvent.focusOut(protcolNumber, { target: { value: "a" } });
    fireEvent.change(versionNumber, { target: { value: 1 } });
    expect(versionNumber.value).toBe("1");
    fireEvent.focusOut(versionNumber, { target: { value: 1 } });
    fireEvent.change(versionNumber, { target: { value: "" } });
    expect(versionNumber.value).toBe("");
    fireEvent.focusOut(versionNumber, { target: { value: "" } });
    fireEvent.change(versionNumber, { target: { value: 1.111 } });
    expect(versionNumber.value).toBe("1.111");
    // console.log('onblur below with focus');
    // fireEvent.focus(protcolNumber);
    // fireEvent.blur(protcolNumber, {target:{value:'aa'}});
  });
  test("Should Save Post Correctly", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      }
    );
    let protcolNumber = container.getByTestId("protocol-number-texfield")
      .children[1].children[0];
    fireEvent.change(protcolNumber, { target: { value: "a" } });
    expect(protcolNumber.value).toBe("a");
    let savemodal =
      container.getByTestId("add-protocol-modal").children[2].children[0]
        .children[2].children[0].children[1];
    fireEvent.click(savemodal);
  });
  test("Should render AutoComplete Correctly", async () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: "NVT AG",
                  sponsor_abbreviation: "NVT",
                  id: 2,
                  label: "NVT AG",
                },
              ],
              indication: [
                {
                  indication_name: "indication1",
                  indication_description: "Indication1 Description",
                  id: 1,
                  label: "Indication1 Description",
                },
              ],
              amendmentNumber: [{ label: "Y", value: "Yes" }],
              documentState: [{ label: "Draft", value: "draft" }],
            },
            addProtocolModal: true,
            isLoading: false,
          },
        },
      }
    );
    selectAutoComplete(container);
  });
  test("Should check file upload works Correctly", async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      }
    );
    const file = new File(["(⌐□_□)"], "chucknorris.doc", {
      type: "application/msword",
    });
    let fileUpload =
      container.getByTestId("custom-fileupload").children[0].children[0]
        .children[0];
    // console.log('fileUpload :', fileUpload);
    // fireEvent.change(fileUpload, {target:{value:'a'}});
    Object.defineProperty(fileUpload, "files", {
      value: [file],
    });
    fireEvent.change(fileUpload);
    // fireEvent.click(fileUpload);
  });
});

function selectAutoComplete(Container) {
  const autocomplete = Container.getByTestId("amendment-number-texfield");
  const input = autocomplete.querySelector("input");
  const autocompleteDocumentStatus = Container.getByTestId(
    "document-status-texfield"
  );
  const inputDocStatus = autocompleteDocumentStatus.querySelector("input");
  fireEvent.change(inputDocStatus, { target: { value: "" } });
  fireEvent.keyDown(autocompleteDocumentStatus, { key: "ArrowDown" });
  fireEvent.keyDown(autocompleteDocumentStatus, { key: "ArrowDown" });
  fireEvent.keyDown(autocomplete, { key: "Enter" });
  // console.log('inputDocStatus :', inputDocStatus);
  fireEvent.focusOut(inputDocStatus, { target: { value: "Approved Final" } });

  fireEvent.change(input, { target: { value: "y" } });
  fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
  fireEvent.keyDown(autocomplete, { key: "Enter" });
  fireEvent.focusOut(input, { target: { value: "Y" } });
  // console.log('test input value', input.value)
  fireEvent.change(input, { target: { value: "" } });
  expect(input.value).toBe("");
  fireEvent.focusOut(input, { target: { value: "" } });
}
// test('loads and displays greeting', async () => {
//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })
