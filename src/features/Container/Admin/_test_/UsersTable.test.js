import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import UsersTable from "../UsersTable";

describe("UsersTable Screen", () => {
  const userData = [
    {
      username: "u1072231",
      first_name: "Sohan",
      last_name: "Khatawkar",
      email: "sohan.khatawkar@iqvia.com",
      country: "India",
      date_of_registration: "2021-01-29T04:09:44.277000",
      user_type: "normal",
    },
    {
      username: "q1036048",
      first_name: "Abhay",
      last_name: "K",
      email: "abhay.kumar2@quintiles.com",
      country: "India",
      date_of_registration: "2021-01-29T06:40:31.823000",
      user_type: "QC2",
    },
  ];
  const userDataOne = [
    {
      username: "u1072231",
      first_name: "Sohan",
      last_name: "Khatawkar",
      email: "sohan.khatawkar@iqvia.com",
      country: "India",
      date_of_registration: "2021-01-29T04:09:44.277000",
      user_type: "normal",
    },
  ];
  test("should render UsersTable screen with empty data", () => {
    render(<UsersTable initialRows={[]} />);
  });

  test("should render UsersTable screen with data", () => {
    render(<UsersTable initialRows={userData} />);
  });

  test("should render UsersTable screen with only one row data", () => {
    render(<UsersTable initialRows={userDataOne} />);
  });

  test("should render click Filter Button", () => {
    render(<UsersTable initialRows={userData} />);
    fireEvent.click(screen.getByTestId("user-action-buttons").children[1]);
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("first_name")).toBeInTheDocument();
    expect(screen.getByTestId("last_name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("country")).toBeInTheDocument();
  });

  test("should render click New User Button", () => {
    render(<UsersTable initialRows={userDataOne} />);
    fireEvent.click(screen.getByTestId("user-action-buttons").children[0]);
  });
});
