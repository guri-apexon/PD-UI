import React from "react";
import { render } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import UsersRole from "../UsersRole";

describe("UsersRole Screen", () => {
  test("should render UsersRole screen", () => {
    render(<UsersRole />);
  });
});
