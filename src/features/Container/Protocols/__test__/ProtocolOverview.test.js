import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ProtocolOverview from "../ProtocolOverview";

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
  sponsor: "~REDACTED~",
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

describe("Protocol Overview Testsuit", () => {
  test("Should have Sponsor with Redacted value", async () => {
    const { getByTestId } = render(<ProtocolOverview data={startingState} />);
    let cardHeader = getByTestId("sponser-value");
    expect(cardHeader).toHaveTextContent("~REDACTED~");
  });
  test("Should have Activity with value", async () => {
    const { getByTestId } = render(<ProtocolOverview data={startingState} />);
    let cardHeader = getByTestId("activity-value");
    expect(cardHeader).toHaveTextContent("Upload Complete");
  });

  test("Should have Protocol Title", async () => {
    const { getByText } = render(<ProtocolOverview data={startingState} />);
    let cardHeader = getByText(/Protocol Title/);
    expect(cardHeader).toHaveTextContent("Protocol Title");
  });
});
