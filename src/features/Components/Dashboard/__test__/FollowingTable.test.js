import React from "react";
import { render, fireEvent, screen } from "../../../../test-utils/test-utils";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

import ProtocolTable from "../FollowingTable";

describe("Dashboard table component", () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
      },
    },
  };
  test("Component renders correctly", () => {
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
        projectId: "123sacas",
        sponser: "Merck KGaA to be more than 25 characters long",
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
        qcActivity: "QC_NOT_STARTED",
      },
      {
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004 Testing for more than 25 characters tooltip",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: "123",
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
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
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        screen="FollowedProtocols"
      />,
      state
    );
  });

  test("Component renders correctly for empty data", () => {
    const protocolData = [];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        screen="FollowedProtocols"
      />,
      state
    );
  });

  test("Component renders correctly for QC status", () => {
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
        status: "QC2",
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
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004 Testing for more than 25 characters tooltip",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "QC1",
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
        amendment: "N",
        approvalDate: "2019-03-06T00:00:00",
        compareStatus: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\f923e3bc-8f7e-40b6-ae03-ca6dc150fae6\\Protocol - Protocol - 06-Mar-2019_202018.pdf",
        documentStatus: "final",
        draftVersion: null,
        environment: "dev-ssr4",
        errorCode: null,
        errorReason: null,
        fileName: "Protocol - Protocol - 06-Mar-2019_202018.pdf",
        id: "f923e3bc-8f7e-40b6-ae03-ca6dc150fae6",
        indication: "rheumatoid arthritis",
        iqvXmlPathComp: null,
        iqvXmlPathProc: null,
        isActive: true,
        isProcessing: false,
        lastUpdated: "2021-06-03T08:32:40.747000",
        moleculeDevice: "GSK3196165",
        nctId: null,
        percentComplete: "100",
        phase: "III",
        projectId: "testing",
        protocol: "SSR_J3_202018",
        protocolTitle:
          "Protocol Title: A 24-week, phase 3, multicentre, randomised, double-blind, efficacy and safety study, comparing GSK3196165 with placebo and with sarilumab, in combination with conventional synthetic DMARDs, in participants with moderately to severely active rheumatoid arthritis who have an inadequate response to biological DMARDs and/or Janus Kinase inhibitors.",
        shortTitle:
          "Efficacy and safety of GSK3196165 versus placebo and sarilumab in participants with moderately to severely active rheumatoid arthritis who have an inadequate response to biological DMARDs and/or Janus Kinase inhibitors.",
        sourceSystem: "dev-ssr4",
        sponsor: "GlaxoSmithKline Research & Development Limited",
        status: "QC1",
        studyStatus: "Phase 3",
        timeCreated: "2021-06-03T08:13:06.743000",
        uploadDate: "2021-06-03T08:13:06.743000",
        userCreated: null,
        userId: "1034911",
        userUpdated: null,
        versionNumber: "1",
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        screen="FollowedProtocols"
      />,
      state
    );
  });

  test("Component renders correctly for Error and Compare status", () => {
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
        projectId: "123123",
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
      {
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004 Testing for more than 25 characters tooltip",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
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
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        screen="QC"
      />,
      state
    );
  });

  test("Should handleRowProtocolClick for screen QC be clickable", () => {
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
      {
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004 Testing for more than 25 characters tooltip",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
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
    const fakeFn = jest.fn();
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        screen="QC"
        handleProtocolClick={fakeFn}
      />,
      state
    );
    fireEvent.click(screen.getByText("EMR 200095-004"));
  });

  test("Component renders correctly for expanded row", async () => {
    const protocolData = [
      {
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
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
        associateddata: [
          {
            id: "213d1901-73fb-4e9f-80c1-00a4a803f8ac",
            userId: "1072231",
            fileName: "Protocol.pdf",
            documentFilePath:
              "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\213d1901-73fb-4e9f-80c1-00a4a803f8ac\\Protocol - scp v3.0 - Sponsor Protocol - 13-Nov-2020.pdf",
            protocol: "SOHPT5",
            projectId: "SOAP6",
            sponsor: "(CKD)Chong Kun Dang Pharm",
            indication: "ABCC6 deficiency",
            moleculeDevice: "M4",
            amendment: "N",
            isProcessing: false,
            percentComplete: "100",
            compareStatus: null,
            iqvXmlPathProc: null,
            iqvXmlPathComp: null,
            shortTitle: "Post-exposure Prophylaxis of COVID-19 in Adults",
            versionNumber: "1.2",
            documentStatus: "final",
            draftVersion: null,
            errorCode: null,
            errorReason: null,
            status: "PROCESS_COMPLETED",
            qcStatus: "QC1",
            phase: "III",
            digitizedConfidenceInterval: null,
            completenessOfDigitization: null,
            protocolTitle:
              "Study in Adults to Determine the Safety and Efficacy of AZD7442, a Combination Product of Two Monoclonal Antibodies (AZD8895 and AZD1061), for Post-exposure Prophylaxis of COVID-19",
            studyStatus: null,
            sourceSystem: null,
            environment: null,
            uploadDate: "2021-07-01T10:56:53.230000",
            timeCreated: "2021-07-01T10:56:53.230000",
            lastUpdated: "2021-07-01T11:09:30.490000",
            userCreated: null,
            userUpdated: null,
            approvalDate: "2020-11-13T00:00:00",
            isActive: true,
            nctId: null,
          },
        ],
      },
    ];
    const mockOutput = {
      success: true,
      data: "abc",
    };
    const fetchAssociateData = jest.fn();
    const handleUnfollow = jest.fn();
    const mockCallApi = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve(mockOutput));
    console.log(mockCallApi);
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        fetchAssociateData={fetchAssociateData}
        handleUnfollow={handleUnfollow}
        isLoading={false}
        defaultRows={5}
        screen="FollowedProtocols"
      />,
      state
    );
    let arrowButton = container.getByTestId("expandable-row-EMR");
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);

    let link = screen.getByRole("link", {
      name: "Protocol.pdf",
    });
    await fireEvent.click(link);
    // await expect(mockCallApi).toHaveBeenCalledTimes(1);
  });

  test("Component renders correctly for expanded row", () => {
    const protocolData = [
      {
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
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
        associateddata: [
          {
            id: "abcd123456",
            userId: "1021402",
            fileName:
              "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
            documentFilePath:
              "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
            protocol: "EMR 200095-004",
            protocolName:
              "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
            projectId: 123,
            sponser: "Merck KGaA Testing for more than 25 characters tooltip",
            indication:
              "Bone necrosis Testing for more than 25 characters tooltip",
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
          {
            id: "abcd1234567",
            userId: "1021402",
            fileName:
              "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
            documentFilePath:
              "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
            protocol: "EMR 200095-005",
            protocolName:
              "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
            projectId: 123,
            sponser: "Merck KGaA Testing for more than 25 characters tooltip",
            indication:
              "Bone necrosis Testing for more than 25 characters tooltip",
            molecule: "string",
            amendment: "string",
            versionNumber: 1.0,
            documentStatus: "",
            draftVersion: "",
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
            approvalDate: "",
            isActive: true,
            iqvxmlpath: "string",
            nctId: "0",
          },
        ],
      },
    ];
    let container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );
    let arrowButton = container.getByTestId("expandable-row-EMR 200095-004");

    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
    // let viewAssociated = container.getByTestId("dashboard_view_associated_protocol");
    // fireEvent.click(viewAssociated);
  });

  test("Component renders correctly for expanda and collpase row", () => {
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
    let arrowButton = container.getByTestId("expandable-row-EMR 200095-004");
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
    fireEvent.click(arrowButton);
  });

  test("Component renders correctly for expanded row filename null", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA",
        indication: null,
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
    let arrowButton = container.getByTestId("expandable-row-EMR 200095-004");
    // console.log("-----------------arrow------------", arrowButton);
    fireEvent.click(arrowButton);
    // fireEvent.click(screen.getByTestId("download-EMR 200095-004"));
  });

  test("Should Component render correctly for FollowedProtocols tab", () => {
    const protocolData = [
      {
        id: "2a5111a6-5465-46f5-b133-a85724bae4ef",
        amendment: "Y",
        amendmentNumber: null,
        approvalDate: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          "\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf",
        documentStatus: "final",
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        fileName: "Protocol-2020-04-09-VER-000001.pdf",
        indication: "ABCC6 deficiency",
        moleculeDevice: "test",
        percentComplete: "100",
        phase: "I",
        projectId: "",
        protocol: "JBT101-RIS-001 to be longer thant 25 characters to test",
        protocolTitle:
          "A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls",
        sponsor: "Corbus Pharmaceuticals",
        status: "PROCESS_COMPLETED",
        uploadDate: "2021-04-08T09:51:34.077000",
        userId: "1020640",
        versionNumber: "10.1",
        qcActivity: "QC_IN_PROGRESS",
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        screen="FollowedProtocols"
      />,
      state
    );
  });
});

describe("Dashboard table component Redaction", () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
      },
    },
  };
  test("Component renders correctly with Redacted Information", () => {
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
        sponser: "Merck KGaA to be more than 25 characters long",
        indication: "Bone necrosis",
        moleculeDevice: "~REDACTED~",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "Digitization In Progress",
        phase: "Ib/II",
        digitizedConfidenceInterval: "string",
        completenessOfDigitization: "string",
        protocolTitle:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of ~REDACTED~ as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
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
        qcActivity: "QC Not Started",
      },
      {
        id: "abcd123456",
        userId: "1021402",
        fileName:
          "Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf",
        documentFilePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        protocol: "EMR 200095-004 Testing for more than 25 characters tooltip",
        protocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        projectId: 123,
        sponser: "Merck KGaA Testing for more than 25 characters tooltip",
        indication: "Bone necrosis Testing for more than 25 characters tooltip",
        molecule: "string",
        amendment: "string",
        versionNumber: 1.0,
        documentStatus: "Final",
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        status: "Digitization Complete",
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
        qcActivity: "QC Not Started",
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
        isLoading={false}
        screen="FollowedProtocols"
      />,
      state
    );
  });
});
