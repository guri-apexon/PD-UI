import React from "react";
import {
  render,
  fireEvent,
  screen,
  // waitFor,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import BulkMap from "../BulkMap";

describe("BulkMap Screen", () => {
  const mockState = {
    users: [],
    roles: [],
    map: [],
    loader: false,
    newUser: {
      userId: null,
      firstName: null,
      lastName: null,
      email: null,
      country: null,
      userRole: null,
    },
    modalToggle: true,
    newUserError: "",
    bulkMapResponse: [],
    bulkMapError: "",
  };

  test("should Open the model", () => {
    const data = { ...mockState };
    data.modalToggle = false;
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
  });

  test("should close BulkMap screen", () => {
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
    fireEvent.click(screen.getByText("Cancel"));
  });

  test("should throw error when try to upload files other than excel ", () => {
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
    fireEvent.click(screen.getByText("Upload"));
  });

  test("should upload BulkMap screen Error", async () => {
    const file = new File(["(⌐□_□)"], "hello.pdf", {
      type: "image/pdf",
    });
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
    // get the upload button
    let uploader = screen.getByTestId("file-upload").children[0].children[0];
    // simulate ulpoad event and wait until finish
    // await waitFor(() =>
    //   fireEvent.change(uploader, {
    //     target: { files: [file] },
    //   })
    // );
    fireEvent.change(uploader, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByText("Upload"));
  });

  test("should upload BulkMap screen", async () => {
    const file = new File(["(⌐□_□)"], "hello.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
    // get the upload button
    let uploader = screen.getByTestId("file-upload").children[0].children[0];
    // simulate ulpoad event and wait until finish
    // await waitFor(() =>
    //   fireEvent.change(uploader, {
    //     target: { files: [file] },
    //   })
    // );
    fireEvent.change(uploader, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByText("Upload"));
  });

  test("should Open the model and show resp error", () => {
    const data = { ...mockState };
    data.bulkMapResponse = ["Uploaded with some success"];
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
  });
});
