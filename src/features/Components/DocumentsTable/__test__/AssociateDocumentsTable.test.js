import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import AssociateDocumentsTable from "../AssociateDocumentsTable";
import axios from "axios";

const AssociateDocs = [
  {
    id: "23abcc3f-9bef-4c57-a860-019c6d831ae2",
    userId: "1019814",
    fileName: "Protocol-2020-04-09-VER-000001.pdf",
    documentFilePath:
      "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\23abcc3f-9bef-4c57-a860-019c6d831ae2\\Protocol-2020-04-09-VER-000001.pdf",
    protocol: "JBT101-RIS-001",
    projectId: null,
    sponsor: "Corbus Pharmaceuticals",
    indication: "Renal Impairment Compared with Matched Controls",
    moleculeDevice: "Lenabasum (JBT-101)",
    amendment: "1",
    isProcessing: false,
    percentComplete: "100",
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle: null,
    versionNumber: "",
    documentStatus: "final",
    draftVersion: null,
    errorCode: null,
    errorReason: null,
    status: "PROCESS_COMPLETED",
    phase: "I",
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      "A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls",
    studyStatus: "1",
    sourceSystem: "Dev",
    environment: "dev",
    uploadDate: "2021-01-18T16:45:30.923000",
    timeCreated: "2021-01-18T16:45:30.923000",
    lastUpdated: "2021-01-18T18:37:26.343000",
    userCreated: null,
    userUpdated: null,
    approvalDate: null,
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
  {
    id: "2a5111a6-5465-46f5-b133-a85724bae4ef",
    userId: "1020640",
    fileName: "Protocol-2020-04-09-VER-000001.pdf",
    documentFilePath:
      "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf",
    protocol: "JBT101-RIS-001",
    projectId: "",
    sponsor: "Corbus Pharmaceuticals",
    indication: "ABCC6 deficiency",
    moleculeDevice: "test",
    amendment: "Y",
    isProcessing: false,
    percentComplete: "100",
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle:
      "A 2-Part Study of the Pharmacokinetics and Safety of a Single Dose of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls Rationale:",
    versionNumber: "10.1",
    documentStatus: "final",
    draftVersion: "1",
    errorCode: null,
    errorReason: null,
    status: "PROCESS_COMPLETED",
    phase: "I",
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      "A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls",
    studyStatus: null,
    sourceSystem: null,
    environment: null,
    uploadDate: "2021-04-08T09:51:34.077000",
    timeCreated: "2021-04-08T09:51:34.077000",
    lastUpdated: "2021-04-08T10:01:40.243000",
    userCreated: null,
    userUpdated: null,
    approvalDate: "2020-04-09T00:00:00",
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
  {
    id: "ca88a438-b426-45fb-b5b7-4b5752901f30",
    userId: "1019814",
    fileName: "Protocol-2020-04-14-DOD-000001.pdf",
    documentFilePath:
      "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\ca88a438-b426-45fb-b5b7-4b5752901f30\\Protocol-2020-04-14-DOD-000001.pdf",
    protocol: "JBT101-RIS-001",
    projectId: null,
    sponsor: "Corbus Pharmaceuticals",
    indication: "Renal Impairment Compared with Matched Controls",
    moleculeDevice: "Lenabasum (JBT-101)",
    amendment: "Y",
    isProcessing: false,
    percentComplete: "100",
    compareStatus: null,
    iqvXmlPathProc: null,
    iqvXmlPathComp: null,
    shortTitle: null,
    versionNumber: "1",
    documentStatus: "final",
    draftVersion: null,
    errorCode: null,
    errorReason: null,
    status: "PROCESS_COMPLETED",
    phase: "I",
    digitizedConfidenceInterval: null,
    completenessOfDigitization: null,
    protocolTitle:
      "A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls",
    studyStatus: "1",
    sourceSystem: "Dev",
    environment: "dev",
    uploadDate: "2021-01-18T16:45:30.723000",
    timeCreated: "2021-01-18T16:45:30.723000",
    lastUpdated: "2021-01-18T18:43:34.983000",
    userCreated: null,
    userUpdated: null,
    approvalDate: "2020-04-14T17:38:34.887000",
    isActive: true,
    nctId: null,
    protocolSelected: [],
  },
];
const AssociateDocs1 = [
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
    versionNumber: "1",
    documentStatus: "",
    draftVersion: "",
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
    protocolSelected: [],
  },
];
describe("AssociateDocumentsTable Test Suite", () => {
  test("Should render AssociateDocumentsTable", async () => {
    const handleChangeTab = jest.fn();
    const mockHistoryPush = jest.fn();
    let mockwrite = jest.fn(() => Promise.resolve({}));
    window.open = jest.fn(() => {
      let res = {
        document: {
          write: mockwrite,
        },
      };
      return res;
    });
    const mockCallApi = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve("protocol"));
    console.log(mockCallApi);
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
          showCheckbox={true}
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
    let doclink = container.getByTestId("associate-document-tab").children[0]
      .children[0].children[1].children[0].children[1].children[0].children[2]
      .children[0];
    fireEvent.click(doclink);
    // expect(mockCallApi).toHaveBeenCalledTimes(1);
  });
  test("Should render AssociateDocumentsTable with no version number", async () => {
    const handleChangeTab = jest.fn();
    const mockHistoryPush = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }));
    render(
      <MemoryRouter>
        <AssociateDocumentsTable
          handleChangeTab={handleChangeTab}
          initialsRow={AssociateDocs1}
        />
      </MemoryRouter>
    );
  });

  test("Should click version number", async () => {
    const handleChangeTab = jest.fn();
    render(
      <AssociateDocumentsTable
        handleChangeTab={handleChangeTab}
        initialsRow={AssociateDocs1}
      />
    );

    fireEvent.click(screen.getByTestId("version-1"));
  });
});
