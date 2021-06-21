import React from "react";
import { render, fireEvent, wait, screen } from "@testing-library/react";
import CustomFileUpload from "./CustomFileUpload";

jest.useFakeTimers();
describe("customDropdown test", () => {
  test("Should render CustomFileUplaod", async () => {
    const container = render(<CustomFileUpload />);
    console.log("container :", container);
  });
  test("Should Delete File in Custom File", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.doc", {
      type: "application/msword",
    });
    let formFile = [file];
    const setUploadFile = jest.fn();
    const handleFileUploadError = jest.fn();
    const container = render(
      <CustomFileUpload
        formSelectedFiles={formFile}
        handleFileUploadError={handleFileUploadError}
        setUploadFile={setUploadFile}
      />
    );
    // container.children[0].children[1].children[1].children[0].children[0].children[1].children[1]
    // console.log(' container.children[0].children[1].children[1].children[0].children[0].children[1].children[1] :', container.getByTestId('custom-file-upload').children[0].children[1].children[1].children[0].children[0].children[1].children[1]);
    let button =
      container.getByTestId("custom-file-upload").children[0].children[1]
        .children[1].children[0].children[0].children[1].children[1];
    fireEvent.click(button);
    // console.log("container :", container.getByTestId('custom-file-upload').children[0].children[0]);
  });

  test("Should Upload File in Custom File", async () => {
    jest.setTimeout(1500000);
    const file = new File(["(⌐□_□)"], "chucknorris.doc", {
      type: "application/msword",
    });
    let formFile = [file];
    const setUploadFile = jest.fn();
    const handleFileUploadError = jest.fn();
    const handleUpload = jest.fn();
    const container = render(
      <CustomFileUpload
        formSelectedFiles={[]}
        handleFileUploadError={handleFileUploadError}
        setUploadFile={setUploadFile}
      />
    );
    let input =
      container.getByTestId("custom-file-upload").children[0].children[0];
    fireEvent.change(input, { target: { files: formFile } });
    jest.useFakeTimers();
    // container.instance().setTimeoutFn();
    jest.advanceTimersByTime(1000);
    jest.runAllTimers();
    // Object.defineProperty(input, "files", {
    //     value: formFile
    //   });
    // //   await wait(() => screen.getByText('111Upload limit reached'))
    // //   await wait(() => container.getByTestId('custom-file-upload').children[0].children[1].children[1].children[0].children[0].children[1].children[1]);
    //   expect(setTimeout).toHaveBeenCalledTimes(1);
    //   expect(handleUpload).toHaveBeenCalled()
    // console.log("container :", container.getByTestId('custom-file-upload').children[0].children[0]);
  });
});
