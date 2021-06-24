import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import ProtocolOverview from "../ProtocolOverview";
// import data from "./protocolSummary.json";

// console.log(data)
afterEach(cleanup);

const startingState = {
  id: "abcd4601",
  userId: "1021402",
  fileName: "Protocol-2015-09-08-VER-V02-000001.PDF",
  filePath: "/Protocol-2015-09-08-VER-V02-000001.pdf",
  Protocol: "2015-01",
  protocolName:
    "ACURATE neo™ Aortic Bioprosthesis for Implantation using the ACURATE neo™ TA Transapical Delivery System in Patients with Severe Aortic Stenosis ",
  projectId: 123,
  sponsor: "Symetis S.A",
  indication: "Bone necrosis",
  molecule: "string",
  amendment: "string",
  versionNumber: 2,
  documentStatus: "Final",
  draftVersion: 0,
  errorCode: 0,
  errorReason: "string",
  status: "Upload Complete",
  phase: "III",
  digitizedConfidenceInterval: "string",
  completenessOfDigitization: "string",
  protocolTitle:
    "ACURATE neo™ Aortic Bioprosthesis for Implantation using the ACURATE neo™ TA Transapical Delivery System in Patients with Severe Aortic Stenosis ",
  studyStatus: "string",
  sourceSystem: "string",
  environment: "dev",
  uploadDate: "2020-12-16T08:46:42.633000",
  timeCreated: "2020-12-16T08:46:42.633000",
  timeUpdated: "2020-12-16T08:46:42.633000",
  userCreated: "1021402",
  userModified: "string",
  approvalDate: "2015-09-08T08:46:42.633000",
  isActive: true,
  iqvxmlpath: "string",
  NctId: "0",
};
function reducer(startingState, action) {}

function renderWithRedux(
  Component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{Component}</Provider>),
  };
}

describe("Protocol Overview Testsuit", () => {
  test("Should render Protocol Overview Component", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    expect(getByText(/Overview Details/)).toHaveTextContent("Overview Details");
  });

  // test("Should have project Id", async () => {
  //   const { getByTestId, getByText } = render(
  //     <ProtocolOverview data={startingState} />
  //   );
  //   expect(getByText(/Project ID/CRM#/)).toHaveTextContent(
  //     "Project ID/CRM#"
  //   );
  // });
  it("Should have project Id with value", () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    expect(getByTestId("project-value")).toHaveTextContent(123);
  });

  test("Should have Sponsor", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    expect(getByText(/Sponsor/)).toHaveTextContent("Sponsor");
  });
  test("Should have Sponser with value", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    expect(getByTestId("sponser-value")).toHaveTextContent("Symetis S.A");
  });

  test("Should have Indication", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Indication/);
    expect(cardHeader).toHaveTextContent("Indication");
  });
  test("Should have Indication with value", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("indication-value");
    expect(cardHeader).toHaveTextContent("Bone necrosis");
  });

  test("Should have Amendment", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Amendment/);
    expect(cardHeader).toHaveTextContent("Amendment");
  });
  test("Should have Amendment with value", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("amendment-value");
    expect(cardHeader).toHaveTextContent("string");
  });

  test("Should have Version", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Version/);
    expect(cardHeader).toHaveTextContent("Version");
  });
  test("Should have Version with value", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("version-value");
    expect(cardHeader).toHaveTextContent(2);
  });

  test("Should have Document Status", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Document Status/);
    expect(cardHeader).toHaveTextContent("Document Status");
  });

  test("Should have Document Status with value", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("status-value");
    expect(cardHeader).toHaveTextContent("Final");
  });

  test("Should have Activity", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText("PD Activity");
    expect(cardHeader).toHaveTextContent("PD Activity");
  });

  test("Should have Activity with value", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("activity-value");
    expect(cardHeader).toHaveTextContent("Upload Complete");
  });

  test("Should have Protocol Title", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Protocol Title/);
    expect(cardHeader).toHaveTextContent("Protocol Title");
  });

  test("Should have Digitized Confidence Interval", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Digitized Confidence Interval/);
    expect(cardHeader).toHaveTextContent("Digitized Confidence Interval");
  });

  test("Should show Information Not available for Confidence Interval, if data is not available", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("no-data-confidense");
    expect(cardHeader).toHaveTextContent("Information Not Available");
  });
  test("Should show chart for Confidence Interval, if data is available", async () => {
    startingState.digitizedConfidenceInterval = "20";
    const { getByTestId, getByText, queryByTestId } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = queryByTestId("no-data-confidense");
    expect(cardHeader).toBeNull();
  });

  test("Should have Completeness of Digitization", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByText(/Completeness of Digitization/);
    expect(cardHeader).toHaveTextContent("Completeness of Digitization");
  });
  test("Should show Information Not available for Completeness of Digitization, if data is not available", async () => {
    const { getByTestId, getByText } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = getByTestId("no-data-digitization");
    expect(cardHeader).toHaveTextContent("Information Not Available");
  });
  test("Should show chart for Completeness of Digitization, if data is available", async () => {
    startingState.completenessOfDigitization = "20";
    const { getByTestId, getByText, queryByTestId } = render(
      <ProtocolOverview data={startingState} />
    );
    let cardHeader = queryByTestId("no-data-digitization");
    expect(cardHeader).toBeNull();
  });
});
