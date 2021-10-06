import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
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

  test("should Upload BulkMap file", () => {
    render(<BulkMap />, {
      initialState: {
        admin: mockState,
      },
    });
    fireEvent.click(screen.getByText("Bulk Map"));
    fireEvent.click(screen.getByText("Upload"));
  });
});
