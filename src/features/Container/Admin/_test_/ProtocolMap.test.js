import React from "react";
import { render } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import ProtocolMap from "../ProtocolMap";

describe("ProtocolMap Screen", () => {
  test("should render ProtocolMap screen", () => {
    render(<ProtocolMap />);
  });
});
