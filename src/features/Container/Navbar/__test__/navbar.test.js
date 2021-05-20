import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { cleanup, waitForElement } from "@testing-library/react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import { MemoryRouter } from "react-router-dom";

import Navbar from "../Navbar";
import { initialState } from "./data";

afterEach(cleanup);

describe("Should Render Alert", () => {
  const mockHistoryPush = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));
  let historymock = jest.fn();
  historymock.replace = jest.fn();
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
      initialState
    );
  });
  test("Should render navbar", () => {
    const iqviaText = screen.getByText("IQVIA");
    const pdText = screen.getByText("Protocol Library");
    expect(iqviaText).toBeInTheDocument();
    expect(pdText).toBeInTheDocument();
  });
  test("Should render list of alerts", () => {
    const testId = screen.getByTestId("navbar-test");
    const alertIcon = testId.children[0].children[0].children[1].children[0];
    fireEvent.click(alertIcon);

    const alertToClick = screen.getByText("D8850C00003");
    fireEvent.click(alertToClick);
    // screen.debug()
  });
});
