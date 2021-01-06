import React from "react";
import * as reactRedux from "react-redux";
import { cleanup, waitForElement } from "@testing-library/react";
// import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import SearchSection from "../SearchSection";
import SearchPanel from "../SearchResultSection";

import { searchResult, indication, sponser } from "./data";

afterEach(cleanup);

describe("Search test suit", () => {
  test("Should Render without error", () => {
    render(<SearchSection />);
    render(
      <SearchPanel
        resultList={searchResult}
        sponsorData={sponser}
        indicationData={indication}
      />
    );
    screen.debug()
  });
});
