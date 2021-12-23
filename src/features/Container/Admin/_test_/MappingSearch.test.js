import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import MappingSearch from "../MappingSearch";

describe("MappingSearch Screen", () => {
  test("should render ProtocolMap screen", () => {
    render(<MappingSearch />);
  });

  test("should click Search button with empty values", () => {
    render(<MappingSearch />);
    fireEvent.click(screen.getByText("Search"));
  });

  test("should click Search button with values", () => {
    render(<MappingSearch />);
    let editUserId = screen.getByTestId("admin-search-user-id").children[1]
      .children[1];
    fireEvent.change(editUserId, { target: { value: "u1072231" } });
    expect(editUserId.value).toEqual("u1072231");
    let editProtocol = screen.getByTestId("admin-search-protocol-number")
      .children[1].children[1];
    fireEvent.change(editProtocol, { target: { value: "SOHPT7" } });
    expect(editProtocol.value).toEqual("SOHPT7");
    fireEvent.click(screen.getByText("Search"));
  });

  test("should throw error for invalid user id", () => {
    render(<MappingSearch />);
    let editUserId = screen.getByTestId("admin-search-user-id").children[1]
      .children[1];
    fireEvent.change(editUserId, { target: { value: "w1072231" } });
    expect(editUserId.value).toEqual("w1072231");
    fireEvent.focusOut(editUserId);
    expect(
      screen.getByTestId("admin-search-user-id").children[2]
    ).toBeInTheDocument();
  });
  test("should not throw error for invalid protocol number", () => {
    render(<MappingSearch />);
    let editProtocol = screen.getByTestId("admin-search-protocol-number")
      .children[1].children[1];
    fireEvent.change(editProtocol, { target: { value: "abcd$31%" } });
    expect(editProtocol.value).toEqual("abcd$31%");
    fireEvent.focusOut(editProtocol);

    expect(
      screen.getByTestId("admin-search-protocol-number").children[2]
    ).toBeUndefined();
  });

  test("should not throw error if user id is empty", () => {
    render(<MappingSearch />);
    let editUserId = screen.getByTestId("admin-search-user-id").children[1]
      .children[1];
    fireEvent.change(editUserId, { target: { value: "" } });
    expect(editUserId.value).toEqual("");
    fireEvent.focusOut(editUserId);
    expect(
      screen.getByTestId("admin-search-user-id").children[2]
    ).toBeUndefined();
  });

  test("should not throw error for empty protocol number", () => {
    render(<MappingSearch />);
    let editProtocol = screen.getByTestId("admin-search-protocol-number")
      .children[1].children[1];
    fireEvent.change(editProtocol, { target: { value: "" } });
    expect(editProtocol.value).toEqual("");
    fireEvent.focusOut(editProtocol);
    expect(
      screen.getByTestId("admin-search-protocol-number").children[2]
    ).toBeUndefined();
  });
});
