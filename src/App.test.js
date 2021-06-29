import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

test("renders learn react link", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  // expect(getByText(/Dashboard/i)).toBeInTheDocument();
  // expect(getByText(/protocol/i)).toBeInTheDocument();
  // expect(getByText(/search/i)).toBeInTheDocument();
  // fireEvent.click(getByText(/Dashboard/i));
  // await waitFor();
});
