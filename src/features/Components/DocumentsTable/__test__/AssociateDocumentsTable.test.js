import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AssociateDocumentsTable from "../AssociateDocumentsTable";

const AssociateDocs = [
  {
    id: "abcd1234",
    userId: "1021402",
    fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
    filePath: "/Protocol-2015-09-08-VER-V02-000001.pdf",
    Protocol: "EMR 200095-004",
    ProtocolName:
      "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
    ProjectId: 123,
    Sponser: "Merck KGaA",
    Indication: "Bone necrosis",
    Molecule: "string",
    Amendment: "string",
    VersionNumber: 1,
    DocumentStatus: "Final",
    DraftVersion: 0,
    errorCode: 0,
    errorReason: "string",
    Status: "Digitization Complete",
    phase: "Ib/II",
    DigitizedConfidenceInterval: "string",
    CompletenessOfDigitization: "string",
    protocolTitle:
      "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
    studyStatus: "string",
    sourceSystem: "string",
    environment: "dev",
    uploadDate: "2020-12-16T08:46:42.633000",
    timeCreated: "2020-12-16T08:46:42.633000",
    timeUpdated: "2020-12-16T08:46:42.633000",
    userCreated: "1021402",
    userModified: "string",
    ApprovalDate: "2013-06-26T08:46:42.633000",
    isActive: true,
    iqvxmlpath: "string",
    NctId: "0",
  },
];
describe("AssociateDocumentsTable Test Suite", () => {
  xtest("Should render AssociateDocumentsTable", async () => {
    const handleChangeTab = jest.fn();
    const mockHistoryPush = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    const container = render(
      <MemoryRouter>
        <AssociateDocumentsTable
          handleChangeTab={handleChangeTab}
          initialsRow={AssociateDocs}
        />
      </MemoryRouter>
    );
    // console.log(
    //   "container :",
    //   container.getByTestId("associate-document-tab").children[0].children[0]
    //     .children[1].children[0].children[1].children[0].children[0].children[0]
    // );
    let link = container.getByTestId("associate-document-tab").children[0]
      .children[0].children[1].children[0].children[1].children[0].children[0]
      .children[0];
    fireEvent.click(link);
  });
});
