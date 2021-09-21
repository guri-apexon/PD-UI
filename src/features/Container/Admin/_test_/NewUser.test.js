import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import NewUser from "../NewUser";

describe("NewUser Screen", () => {
  test("should render NewUser screen", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
  });

  test("should create user with all values", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let editFirstName = screen.getByTestId("first-name-texfield").children[1]
      .children[0];
    let editLastName =
      screen.getByTestId("last-name-texfield").children[1].children[0];
    let editEmail =
      screen.getByTestId("email-texfield").children[1].children[0];
    let editCountry =
      screen.getByTestId("Country-texfield").children[1].children[0];
    let editUserId =
      screen.getByTestId("user-id-texfield").children[1].children[0];
    let editRole =
      screen.getByTestId("user-role-select").children[1].children[1];
    fireEvent.change(editFirstName, { target: { value: "Sohan" } });
    expect(editFirstName.value).toEqual("Sohan");
    fireEvent.change(editLastName, { target: { value: "Khatawkar" } });
    expect(editLastName.value).toEqual("Khatawkar");
    fireEvent.change(editEmail, {
      target: { value: "sohan.khatawkar@iqvia.com" },
    });
    expect(editEmail.value).toEqual("sohan.khatawkar@iqvia.com");
    fireEvent.change(editCountry, { target: { value: "India" } });
    expect(editCountry.value).toEqual("India");
    fireEvent.change(editUserId, { target: { value: "u1072231" } });
    expect(editUserId.value).toEqual("u1072231");
    fireEvent.change(editRole, { target: { value: "admin" } });
    expect(editRole.value).toEqual("admin");
    fireEvent.click(screen.getByText("Create"));
  });

  test("should change the First Name", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("first-name-texfield").children[1]
      .children[0];
    fireEvent.change(edit, { target: { value: "Sohan" } });
    expect(edit.value).toEqual("Sohan");
  });
  test("should change the last Name", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("last-name-texfield").children[1].children[0];
    fireEvent.change(edit, { target: { value: "Khatawkar" } });
    expect(edit.value).toEqual("Khatawkar");
  });
  test("should change the email", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("email-texfield").children[1].children[0];
    fireEvent.change(edit, { target: { value: "sohan.khatawkar@iqvia.com" } });
    expect(edit.value).toEqual("sohan.khatawkar@iqvia.com");
  });
  test("should change the country", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("Country-texfield").children[1].children[0];
    fireEvent.change(edit, { target: { value: "India" } });
    expect(edit.value).toEqual("India");
  });
  test("should change the userID", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("user-id-texfield").children[1].children[0];
    fireEvent.change(edit, { target: { value: "u1072231" } });
    expect(edit.value).toEqual("u1072231");
  });
  test("should change the user role", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("user-role-select").children[1].children[1];
    fireEvent.change(edit, { target: { value: "admin" } });
    expect(edit.value).toEqual("admin");
  });
  test("should focus the first name show required message", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("first-name-texfield");
    fireEvent.change(edit.children[1].children[0], { target: { value: "" } });
    fireEvent.focusOut(edit.children[1].children[0]);
    let create = screen.getByText("Create");
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test("should focus the last name show required message", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("last-name-texfield");
    edit.children[1].children[0].focus();
    let create = screen.getByText("Create");
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test("should focus the email show required message", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("email-texfield");
    edit.children[1].children[0].focus();
    let create = screen.getByText("Create");
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test("should focus the country show required message", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("Country-texfield");
    edit.children[1].children[0].focus();
    let create = screen.getByText("Create");
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test("should focus the user id show required message", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("user-id-texfield");
    edit.children[1].children[0].focus();
    let create = screen.getByText("Create");
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test("should focus the user id show required message", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    let edit = screen.getByTestId("user-role-select");
    edit.children[1].children[1].focus();
    let create = screen.getByText("Create");
    fireEvent.click(create);
    expect(edit.children[2]).toBeInTheDocument();
  });

  test("should close the modal", () => {
    render(<NewUser isOpen={true} setIsOpen={() => {}} />);
    fireEvent.click(screen.getByText("Cancel"));
  });
});
