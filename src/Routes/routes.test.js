import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "../store/store";

describe("Render Routes Sucessfully", () => {
  test("Routes Normal", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes userType="normal" />)
        </BrowserRouter>
      </Provider>
    );
  });
  test("Routes QC1", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes userType="QC1" />)
        </BrowserRouter>
      </Provider>
    );
  });
  test("Routes QC2", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes userType="QC2" />)
        </BrowserRouter>
      </Provider>
    );
  });
});
