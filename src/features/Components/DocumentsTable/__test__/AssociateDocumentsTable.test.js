import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import AssociateDocumentsTable from "../AssociateDocumentsTable";
import axios from 'axios';

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
    versionNumber: 1,
    documentStatus: "Final",
    draftVersion: 1,
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
    versionNumber: "",
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
  },
];
describe("AssociateDocumentsTable Test Suite", () => {
  test("Should render AssociateDocumentsTable", async () => {
    const handleChangeTab = jest.fn();
    const mockHistoryPush = jest.fn();
    let mockwrite= jest.fn(() => Promise.resolve({}))
    window.open = jest.fn(()=>{
      let  res={
        document:{

          write:mockwrite
        }
      }
      return res
    });
    const mockCallApi = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve('protocol'));
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
    let doclink= container.getByTestId("associate-document-tab").children[0].children[0].children[1].children[0].children[1].children[0].children[2].children[0]
    fireEvent.click(doclink);
    expect(mockCallApi).toHaveBeenCalledTimes(1);
  
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
});
