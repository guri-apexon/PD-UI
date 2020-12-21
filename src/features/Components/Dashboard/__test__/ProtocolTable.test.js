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

describe("Dashboard component", () => {
  const state = {
    initialState: {
      protocol: [],
    },
  };

  test("Component renders correctly for expanded row", () => {
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
        filePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        Protocol: "EMR 200095-004",
        ProtocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        ProjectId: 123,
        Sponser: "Merck KGaA",
        Indication: "Bone necrosis",
        Molecule: "string",
        Amendment: "string",
        VersionNumber: 1.0,
        DocumentStatus: "Final",
        DraftVersion: 0.0,
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
        filePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        Protocol: "EMR 200095-004",
        ProtocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        ProjectId: 123,
        Sponser: "Merck KGaA",
        Indication: "Bone necrosis",
        Molecule: "string",
        Amendment: "string",
        VersionNumber: 1.0,
        DocumentStatus: "Final",
        DraftVersion: 0.0,
        errorCode: 0,
        errorReason: "string",
        Status: "Upload In Progress",
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
  xtest("Component renders correctly with expanded row", () => {
    const handleToggleRow = jest.fn();
    const ExpandableComponent = jest.fn();
    const protocolData = [
      {
        id: "abcd1234",
        userId: "1021402",
        fileName: "Protocol-2013-05-29-VER-V1.0-000001.pdf",
        filePath:
          "//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf",
        Protocol: "EMR 200095-004",
        ProtocolName:
          "A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function",
        ProjectId: 123,
        Sponser: "Merck KGaA",
        Indication: "Bone necrosis",
        Molecule: "string",
        Amendment: "string",
        VersionNumber: 1.0,
        DocumentStatus: "Final",
        DraftVersion: 0.0,
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
        expanded: true,
        handleToggleRow: handleToggleRow,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, "All"]}
      />,
      state
    );

    // fireEvent.change('abcd1234');
    // console.log(component);
  });
});