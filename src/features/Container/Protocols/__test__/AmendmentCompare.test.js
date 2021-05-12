import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { cleanup, waitForElement } from "@testing-library/react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

import AmendmentCompare from "../AmendmentCompare";
import {
  initialState,
  associatedState,
  compareState,
  compareError,
} from "./data";

afterEach(cleanup);

describe("Render testing with no data", () => {
  beforeEach(() => {
    render(<AmendmentCompare />, initialState);
  });
  test("Should show warning when we pass only one protocol version", () => {
    const text = screen.getByText("This Protocol has only one version.");
    expect(text).toBeInTheDocument();
  });
});
describe("Render compare Error Message", () => {
  beforeEach(() => {
    render(<AmendmentCompare />, compareError);
  });
  test("Should show warning when we pass only one protocol version", () => {
    const text = screen.getByText("Something went Wrong");
    expect(text).toBeInTheDocument();
  });
});
describe("Testing Positive Scenarios", () => {
  test("Should show loader", () => {
    render(<AmendmentCompare />, associatedState);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
  test("Should render two dropdowns", () => {
    render(<AmendmentCompare />, compareState);
    const select1 = screen.getByTestId("select-div1");
    const select2 = screen.getByTestId("select-div2");
    expect(select1).toBeInTheDocument();
    expect(select2).toBeInTheDocument();
  });
  test("Should show warning when click compare button without any Protocol Selection", () => {
    render(<AmendmentCompare prot11="" prot22="" />, compareState);
    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
  });
  test("Should show warning when click compare button without Second Protocol Selection", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22=""
      />,
      compareState
    );
    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
  });
  test("Should show warning when click compare button with two same Protocol on Selection", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22="66350a76-ea36-4082-88ed-b9c9611786a1"
      />,
      compareState
    );
    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
  });
  test("Should show compare data when valid data passed", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22="8d68a4a3-12ef-4ed1-b9e5-38537334d94a"
      />,
      compareState
    );

    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
    const textArry = screen.getAllByText("VERSION HISTORY");
    expect(textArry[0]).toBeInTheDocument();
  });
  test("Should show compare data when valid data passed", () => {
    render(
      <AmendmentCompare
        prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
        prot22="8d68a4a3-12ef-4ed1-b9e5-38537334d94a"
      />,
      compareState
    );

    const compareButton = screen.getByTestId("compare-button");
    fireEvent.click(compareButton);
    const summaryButton = screen.getByTestId("summary-button");
    fireEvent.click(summaryButton);
  });
});

// describe("Testing Compare without data", () => {
//   test("Should render without error", () => {
//     render(<AmendmentCompare />);
//   });
// });
// describe("Testing With Mock Data", () => {
//   const state = {
//     initialState: {
//       protocol: {
//         summary: {},
//         view: {
//           iqvdataSoa: [],
//           iqvdataSummary: {},
//           iqvdataToc: {
//             data: [],
//           },
//           loader: true,
//         },
//         associateDocs: associateData1,
//         compare: compare,
//       },
//     },
//   };
//   beforeEach(() => {
//     // const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

//     // useSelectorMock.mockReturnValue(associateData1);
//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);
//   });
//   test("Should show two dropdowns", () => {
//     const { getByText } = render(<AmendmentCompare />, state);
//     const select1 = getByText("Select First Version to Compare");
//     const select2 = getByText("Select Second Version to Compare");
//     expect(select1).toBeInTheDocument();
//     expect(select2).toBeInTheDocument();
//     // await waitForElement(() => getByText("Select First Version to Compare"));
//   });
//   // ------------------------------- Not Finished ---------------------
//   test("Select First Protocol", async () => {
//     const container = render(<AmendmentCompare />, state);
//     const select1 = container.getByTestId("select-div1");
//     const clickDiv = select1.children[1].children[0];
//     fireEvent.click(select1);

//     // let menuItem = container.getByTestId("compare-option-10");
//     // console.log(menuItem);
//     // fireEvent.click(menuItem);
//   });
//   test("Should show Alert when passing same protocol version", () => {
//     const container = render(
//       <AmendmentCompare
//         prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
//         prot22="66350a76-ea36-4082-88ed-b9c9611786a1"
//       />,
//       state
//     );
//     const compareButton = container.getByTestId("compare-button");
//     fireEvent.click(compareButton);
//     // expect(screen.getByRole('alert')).toHaveTextContent('can not comapare same version')
//     // screen.debug();
//   });
//   test("Should show Alert when passing one protocol version", () => {
//     const container = render(
//       <AmendmentCompare
//         prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
//         prot22=""
//       />,
//       state
//     );
//     const compareButton = container.getByTestId("compare-button");
//     fireEvent.click(compareButton);
//     // expect(screen.getByRole('alert')).toHaveTextContent('can not comapare same version')
//     // screen.debug();
//   });
//   test("Should show compare result", () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     useSelectorMock1.mockReturnValue(compare);
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);
//     const container = render(
//       <AmendmentCompare
//         prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
//         prot22="8d68a4a3-12ef-4ed1-b9e5-38537334d94a"
//       />,
//       state
//     );
//     // screen.debug();
//     const textSeen = container.getAllByText("VERSION HISTORY");
//     // console.log(textSeen);
//     // expect(textSeen).toBeInTheDocument();
//     // const compareButton = container.getByTestId("compare-button");
//     // fireEvent.click(compareButton);
//   });
//   test("Should click summary button", () => {
//     // const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     // useSelectorMock1.mockReturnValue(compare);
//     // const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
//     // useSelectorMock.mockReturnValue(associateData1);
//     const container = render(
//       <AmendmentCompare
//         prot11="66350a76-ea36-4082-88ed-b9c9611786a1"
//         prot22="8d68a4a3-12ef-4ed1-b9e5-38537334d94a"
//       />,
//       state
//     );
//     // screen.debug();
//     // const textSeen = container.getAllByText("VERSION HISTORY");
//     // console.log(textSeen);
//     // expect(textSeen).toBeInTheDocument();
//     const summaryButton = container.getByTestId("summary-button-div");
//     console.log('ssssss' ,summaryButton)
//     // fireEvent.click(summaryButton);
//   });
// });

// import React from "react";
// import * as reactRedux from "react-redux";
// import { cleanup, waitForElement } from "@testing-library/react";
// // import { fireEvent } from "@testing-library/user-event";
// import "@testing-library/jest-dom/extend-expect";

// import { render, fireEvent, screen } from "../../../../test-utils/test-utils";

// import AmendmentCompare from "../AmendmentCompare";
// import { associateData1, compare } from "./data";

// afterEach(cleanup);

// describe("Version Compare test suit", () => {
//   test("Should Render without error", () => {
//     render(<AmendmentCompare />);
//   });
//   test("Should show message if there is less that two version available for protocol", async () => {
//     const { getByText } = render(<AmendmentCompare />);
//     await waitForElement(() =>
//       getByText("This Protocol has only one version.")
//     );
//     await waitForElement(() =>
//       getByText("So compare option is not available for this Protocol.")
//     );
//   });
//   test("Should render two dropdowns if there is more than one versions are available for protocol", async () => {
// const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
// const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     // beforeEach(() => {
//     //   useSelectorMock.mockClear();
//     //   useDispatchMock.mockClear();
//     // });

//     useSelectorMock.mockReturnValue(associateData1);

// const dummyDispatch = jest.fn();
// useDispatchMock.mockReturnValue(dummyDispatch);

// const { getByText, getByTestId } = render(
//   <AmendmentCompare prot11="" prot22="" />
// );

//     await waitForElement(() => getByText("Select First Version to Compare"));
//     await waitForElement(() => getByText("Select Second Version to Compare"));
//   });
//   test("Should render compare button if there is more than one versions are available for protocol", async () => {
//     const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     // beforeEach(() => {
//     //   useSelectorMock.mockClear();
//     //   useDispatchMock.mockClear();
//     // });

//     useSelectorMock.mockReturnValue(associateData1);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getByText, getByTestId } = render(<AmendmentCompare />);

//     await waitForElement(() => getByText("Compare"));
//   });
//   test("Should render compared data div if result is available.", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     // beforeEach(() => {
//     //   useSelectorMock.mockClear();
//     //   useDispatchMock.mockClear();
//     // });
//     useSelectorMock1.mockReturnValue(associateData1);
//     useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(<AmendmentCompare />);
//     getAllByText("VERSION HISTORY");

//     // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
//     // screen.debug();
//   });
//   test("Dispatch Value.", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     // beforeEach(() => {
//     //   useSelectorMock.mockClear();
//     //   useDispatchMock.mockClear();
//     // });
//     useSelectorMock1.mockReturnValue(associateData1);
//     useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(
//       <AmendmentCompare
//         prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
//         prot22="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
//       />
//     );
//     // getAllByText("VERSION HISTORY");

//     // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
//     // screen.debug();
//   });
//   test("Should Trigger compare", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     // beforeEach(() => {
//     //   useSelectorMock.mockClear();
//     //   useDispatchMock.mockClear();
//     // });
//     useSelectorMock1.mockReturnValue(associateData1);
//     // useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(
//       <AmendmentCompare prot11="abc" prot22="cdf" />
//     );
//     const compareButton = getByTestId("compare-button");
//     fireEvent.click(compareButton);
//     // getAllByText("VERSION HISTORY");

//     // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
//     // screen.debug();
//   });
//   test("Should Select first Protocol to comapre", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useSelectorMock2 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     // beforeEach(() => {
//     //   useSelectorMock.mockClear();
//     //   useDispatchMock.mockClear();
//     // });
//     useSelectorMock1.mockReturnValue(associateData1);
//     // useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(<AmendmentCompare />);
//     const selectDiv = getByTestId("select-div1");
//     const input = selectDiv.querySelector("input");
//     fireEvent.change(input, {
//       target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
//     });
//     fireEvent.keyDown(selectDiv, { key: "ArrowDown" });
//     fireEvent.keyDown(selectDiv, { key: "Enter" });
//     // expect(compareButton.value).toBe("0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14");
//     // getAllByText("VERSION HISTORY");

//     // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
//     // screen.debug();
//   });
//   test("Should Select second Protocol to comapre", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     useSelectorMock1.mockReturnValue(associateData1);
//     // useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(<AmendmentCompare />);
//     const selectDiv = getByTestId("select-div2").children[1].children[0];
//     const input = selectDiv.querySelector("input");
//     fireEvent.click(selectDiv);
//     // fireEvent.focus(input, { key: "Enter" });
//     // fireEvent.keyDown(selectDiv, { key: "Enter" });
//     // fireEvent.change(input, {
//     //   target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
//     // });
//     // screen.debug();
//     // fireEvent.keyDown(selectDiv, { key: "ArrowDown" });
//     // screen.debug()
//     // fireEvent.keyDown(selectDiv, { key: "Enter" });
//     // screen.debug()
//     // expect(compareButton.value).toBe("0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14");
//     // getAllByText("VERSION HISTORY");

//     // await waitForElement(() => fireEvent.click(getByTestId("compare-button")));
//     // screen.debug();
//   });
//   test("Select Two Same Protocol to comapre", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     useSelectorMock1.mockReturnValue(associateData1);
//     // useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(
//       <AmendmentCompare
//         prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
//         prot22="21bab274-1b66-4c14-b0a1-5487f111fc60"
//       />
//     );
//     const selectDiv1 = getByTestId("select-div1");
//     const selectDiv2 = getByTestId("select-div2");
//     const input1 = selectDiv1.querySelector("input");
//     fireEvent.change(input1, {
//       target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
//     });
//     const input2 = selectDiv2.querySelector("input");
//     fireEvent.change(input2, {
//       target: { value: "21bab274-1b66-4c14-b0a1-5487f111fc60" },
//     });
//     fireEvent.keyDown(selectDiv1, { key: "ArrowDown" });
//     fireEvent.keyDown(selectDiv1, { key: "Enter" });
//     fireEvent.keyDown(selectDiv2, { key: "ArrowDown" });
//     fireEvent.keyDown(selectDiv2, { key: "Enter" });
//     fireEvent.click(getByTestId("compare-button"));
//     // screen.debug()
//     // expect(screen.getByRole("alert")).toHaveTextContent(
//     //   "can not comapare same version"
//     // );
//     // window.alert = jsdomAlert;
//   });
//   test("Select One Protocol to comapre", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     useSelectorMock1.mockReturnValue(associateData1);
//     // useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(
//       <AmendmentCompare
//         prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
//         prot22=""
//       />
//     );
//     const selectDiv1 = getByTestId("select-div1");
//     const selectDiv2 = getByTestId("select-div2");
//     const input1 = selectDiv1.querySelector("input");
//     fireEvent.change(input1, {
//       target: { value: "0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14" },
//     });
//     // const input2 = selectDiv2.querySelector("input");
//     // fireEvent.change(input2, {
//     //   target: { value: "" },
//     // });
//     fireEvent.keyDown(selectDiv1, { key: "ArrowDown" });
//     fireEvent.keyDown(selectDiv1, { key: "Enter" });
//     // fireEvent.keyDown(selectDiv2, { key: "ArrowDown" });
//     // fireEvent.keyDown(selectDiv2, { key: "Enter" });
//     fireEvent.click(getByTestId("compare-button"));
//     // screen.debug()
//     // expect(screen.getByRole("alert")).toHaveTextContent(
//     //   "can not comapare same version"
//     // );
//     // window.alert = jsdomAlert;
//   });
//   test("Select One Protocol to comapre", async () => {
//     const useSelectorMock1 = jest.spyOn(reactRedux, "useSelector");
//     const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
//     useSelectorMock1.mockReturnValue(associateData1);
//     // useSelectorMock2.mockReturnValue(compare);

//     const dummyDispatch = jest.fn();
//     useDispatchMock.mockReturnValue(dummyDispatch);

//     const { getAllByText, getByTestId } = render(
//       <AmendmentCompare
//         prot11="0bd85f42-fa69-42c1-ac4b-b1b6d3b25e14"
//         prot22=""
//       />
//     );
//     const selectDiv1 = getByTestId("select-div1").children[1];
//     fireEvent.click(selectDiv1);
//     // let selectOption = getByTestId("compare-option-1");
//     // fireEvent.click(selectOption);
//     // screen.getByRole("whateve")
//   });
// });
