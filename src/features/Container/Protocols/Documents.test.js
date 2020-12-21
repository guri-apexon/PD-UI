import React from "react";
import {
  render
} from "../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import Documents from "./Documents";
import * as redux from "react-redux";
// import routeData from "react-router";

const protocolMockData = {
  protocol: {
    summary: {
      loading: false,
      success: true,
      data: {
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
    },
    associateDocs: [
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
      {
        id: "abcd4578",
        userId: "1021402",
        fileName: "Protocol-2013-07-26-VER-000002.pdf",
        filePath: "/Protocol-2015-09-08-VER-V02-000001.pdf",
        Protocol: "EMR 200095-004",
        ProtocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        ProjectId: 102,
        Sponser: "Merck KGaA",
        Indication: "Bone necrosis",
        Molecule: "string",
        Amendment: "Y",
        VersionNumber: 1,
        DocumentStatus: "Final",
        DraftVersion: 1.2,
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
        ApprovalDate: "2013-07-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "iqv_xml_path",
        NctId: "0",
      },
    ],
  },
  dashboard: {
    protocols: [
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
      {
        id: "abcd4578",
        userId: "1021402",
        fileName: "Protocol-2013-07-26-VER-000002.pdf",
        filePath: "/Protocol-2015-09-08-VER-V02-000001.pdf",
        Protocol: "EMR 200095-004",
        ProtocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        ProjectId: 102,
        Sponser: "Merck KGaA",
        Indication: "Bone necrosis",
        Molecule: "string",
        Amendment: "Y",
        VersionNumber: 1,
        DocumentStatus: "Final",
        DraftVersion: 1.2,
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
        ApprovalDate: "2013-07-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "iqv_xml_path",
        NctId: "0",
      },
      {
        id: "abcd4602",
        userId: "1021402",
        fileName: "Protocol-2015-10-15-VER-V1.0-000004.pdf",
        filePath: "/Protocol-2015-09-08-VER-V02-000001.pdf",
        Protocol: "AKB-6548-CI-0014",
        ProtocolName:
          "PHASE 3, RANDOMIZED, OPEN-LABEL, ACTIVE-CONTROLLED STUDY EVALUATINGTHEEFFICACY ANDSAFETY OF ORAL VADADUSTATFOR THE CORRECTION OF ANEMIAIN SUBJECTS WITH NON-DIALYSIS-DEPENDENT CHRONIC KIDNEY DISEASE (NDD-CKD)(PRO2TECT –CORRECTION)",
        ProjectId: 123,
        Sponser: "Akebia Therapeutics",
        Indication: "Bone necrosis",
        Molecule: "string",
        Amendment: "string",
        VersionNumber: 1,
        DocumentStatus: "Final",
        DraftVersion: 0,
        errorCode: 0,
        errorReason: "string",
        Status: "Upload In Progress",
        phase: "III",
        DigitizedConfidenceInterval: "string",
        CompletenessOfDigitization: "string",
        protocolTitle:
          "PHASE 3, RANDOMIZED, OPEN-LABEL, ACTIVE-CONTROLLED STUDY EVALUATINGTHEEFFICACY ANDSAFETY OF ORAL VADADUSTATFOR THE CORRECTION OF ANEMIAIN SUBJECTS WITH NON-DIALYSIS-DEPENDENT CHRONIC KIDNEY DISEASE (NDD-CKD)(PRO2TECT –CORRECTION)",
        studyStatus: "string",
        sourceSystem: "string",
        environment: "dev",
        uploadDate: "2020-12-16T08:46:42.633000",
        timeCreated: "2020-12-16T08:46:42.633000",
        timeUpdated: "2020-12-16T08:46:42.633000",
        userCreated: "1021402",
        userModified: "string",
        ApprovalDate: "2015-10-15T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        NctId: "0",
      },
    ],
  },
};
// const mockLocation = {
//   pathname: "/welcome",
//   hash: "hash",
//   search: "?protocolId=abcd4600",
//   state: "yy",
// };
// beforeEach(() => {
//   jest.spyOn(routeData, "useLocation").mockReturnValue(mockLocation);
// });
describe("Should Render Document success", () => {
  const useDispatchSpy = jest.spyOn(redux, "useDispatch");
  const mockDispatchFn = jest.fn();
  useDispatchSpy.mockReturnValue(mockDispatchFn);
  test("should mount the Document successfully", () => {
    const container = render(<Documents />, { initialState: protocolMockData });
    // console.log('container.getByTestId(\'source-document-tab\')[0].children[0].children[0].children[0].children[0].children[0].textContent :', container.getByTestId('source-document-tab').children[0].children[0].children[0].children[0].children[0].textContent);

    expect(
      container.getByTestId("source-document-tab").children[0].children[0]
        .children[0].children[0].children[0].textContent
    ).toBe("Source Document");
  });
});
