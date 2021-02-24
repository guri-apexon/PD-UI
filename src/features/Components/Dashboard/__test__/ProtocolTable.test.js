import React from "react";
import {
  render,
  fireEvent,
  act,
  screen,
  wait,
} from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";

import ProtocolTable from "../ProtocolTable";

describe("Dashboard table component", () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
      },
    },
  };

  xtest("Component renders correctly for expanded row", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "DIGITIZER1_STARTED",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let arrowButton = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[1].children[0];
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
  });

  test("Component renders correctly for Checked row", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "EXTRACTION_STARTED",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let selectButton1 = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0].children[0].children[0];
    fireEvent.click(selectButton1);
  });
  test("Component renders correctly for unchecked row", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: null,
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "TRIAGE_STARTED",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let selectButton1 = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0].children[0].children[0];
    fireEvent.click(selectButton1); // expanded
    fireEvent.click(selectButton1); // collpased
  });
  xtest("Component renders correctly for collpased row", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "COMPARISON_STARTED",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let arrowButton = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[1].children[0];
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
    fireEvent.click(arrowButton);
  });

  xtest("Component renders correctly for expanded row filename null", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: null,
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "ERROR",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let arrowButton = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[1].children[0];
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
  });

  xtest("Component renders correctly for status PROCESS_COMPLETED", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: null,
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "PROCESS_COMPLETED",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let arrowButton = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[1].children[0];
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
  });

  test("Component renders correctly for 2 Checked rows to compare", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: "Bone necrosis",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "EXTRACTION_STARTED",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
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
        approvalDate: "2013-06-26T08:46:42.633000",
        isActive: true,
        iqvxmlpath: "string",
        nctId: "0",
      },
      {
        id: "82f83274-bfd2-4129-8b25-51d3b81aeaa4",
        userId: "1021402",
        fileName: null,
        documentFilePath:
          "\\\\INKOCWL000200\\Users\\q1036048\\Desktop\\__pycache__\\PD\\pd-management\\82f83274-bfd2-4129-8b25-51d3b81aeaa4\\Acrobat Document.pdf",
        protocol: "PD1",
        projectId: "12345",
        sponsor: "Sponsor12",
        indication: "Ind12",
        moleculeDevice: "Mol1",
        amendment: "N",
        isProcessing: true,
        percentComplete: "45",
        compareStatus: null,
        iqvXmlPathProc: null,
        iqvXmlPathComp: null,
        shortTitle: null,
        versionNumber: "1",
        documentStatus: "active",
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        status: null,
        phase: null,
        digitizedConfidenceInterval: null,
        completenessOfDigitization: null,
        protocolTitle: null,
        studyStatus: null,
        sourceSystem: null,
        environment: null,
        uploadDate: "2020-12-28T07:04:02.593000",
        timeCreated: "2020-12-28T07:04:02.593000",
        lastUpdated: "2020-12-28T07:04:52.563000",
        userCreated: null,
        userUpdated: null,
        approvalDate: null,
        isActive: false,
        nctId: null,
      },
      {
        id: "82f83274-bfd2-4129-8b25-51d3b81aeaa5",
        userId: "1021402",
        fileName: null,
        documentFilePath:
          "\\\\INKOCWL000200\\Users\\q1036048\\Desktop\\__pycache__\\PD\\pd-management\\82f83274-bfd2-4129-8b25-51d3b81aeaa4\\Acrobat Document.pdf",
        protocol: "PD1",
        projectId: "12345",
        sponsor: "Sponsor12",
        indication: "Ind12",
        moleculeDevice: "Mol1",
        amendment: "N",
        isProcessing: true,
        percentComplete: "45",
        compareStatus: null,
        iqvXmlPathProc: null,
        iqvXmlPathComp: null,
        shortTitle: null,
        versionNumber: "1",
        documentStatus: "active",
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        status: null,
        phase: null,
        digitizedConfidenceInterval: null,
        completenessOfDigitization: null,
        protocolTitle: null,
        studyStatus: null,
        sourceSystem: null,
        environment: null,
        uploadDate: "2020-12-28T07:04:02.593000",
        timeCreated: "2020-12-28T07:04:02.593000",
        lastUpdated: "2020-12-28T07:04:52.563000",
        userCreated: null,
        userUpdated: null,
        approvalDate: null,
        isActive: false,
        nctId: null,
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let selectButton1 = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[0]
      .children[0].children[0].children[0].children[0].children[0].children[0];
    fireEvent.click(selectButton1);
    let selectButton2 = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[2]
      .children[0].children[0].children[0].children[0].children[0].children[0];
    fireEvent.click(selectButton2);
    let selectButton3 = container.getByTestId("protocol-table-wrapper")
      .children[0].children[0].children[1].children[0].children[1].children[4]
      .children[0].children[0].children[0].children[0].children[0].children[0];
    fireEvent.click(selectButton3);
  });
});
