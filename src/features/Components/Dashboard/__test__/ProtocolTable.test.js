import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import ProtocolTable from '../ProtocolTable';

describe('Dashboard table component', () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
      },
    },
  };
  test('Component renders correctly', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA to be more than 25 characters long',
        indication: 'Bone necrosis',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [
          {
            id: '02cb4d51-273c-4d85-b2d4-495454133b36',
            wfId: '0013956f-b5cb-40ed-af22-47b6b9af29a3',
            wfStatus: 'COMPLETED',
            wfAllServices: [
              'triage',
              'digitizer1',
              'digitizer2',
              'extraction',
              'digitizer2_omopgenerate',
              'i2e_omop_update',
              'digitizer2_omopupdate',
              'digitizer2_compare',
            ],
            wfName: 'full_flow',
            wfRunningServices: [],
            wfErrorMessageDetails: '',
            wfFinishedServices: [
              'triage',
              'digitizer1',
              'digitizer2',
              'extraction',
              'digitizer2_omopgenerate',
              'i2e_omop_update',
              'digitizer2_omopupdate',
              'digitizer2_compare',
            ],
            wfPercentComplete: 100,
            timeCreated: '05-Jan-2023',
          },
        ],
        showMoreCalling: false,
        showMore: false,
      },
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA Testing for more than 25 characters tooltip',
        indication: 'Bone necrosis Testing for more than 25 characters tooltip',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization Complete',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [
          {
            id: '02cb4d51-273c-4d85-b2d4-495454133b36',
            wfId: '0013956f-b5cb-40ed-af22-47b6b9af29a3',
            wfStatus: 'COMPLETED',
            wfAllServices: [
              'triage',
              'digitizer1',
              'digitizer2',
              'extraction',
              'digitizer2_omopgenerate',
              'i2e_omop_update',
              'digitizer2_omopupdate',
              'digitizer2_compare',
            ],
            wfName: 'full_flow',
            wfRunningServices: [],
            wfErrorMessageDetails: '',
            wfFinishedServices: [
              'triage',
              'digitizer1',
              'digitizer2',
              'extraction',
              'digitizer2_omopgenerate',
              'i2e_omop_update',
              'digitizer2_omopupdate',
              'digitizer2_compare',
            ],
            wfPercentComplete: 100,
            timeCreated: '05-Jan-2023',
          },
        ],
        showMoreCalling: false,
        showMore: true,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
        isLoading={false}
      />,
      state,
    );
  });

  test('Component renders correctly for empty data', () => {
    const protocolData = [];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );
  });

  test('Component renders correctly for QC status', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA',
        indication: 'Bone necrosis',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'QC Review',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: true,
        showMore: false,
      },
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA Testing for more than 25 characters tooltip',
        indication: 'Bone necrosis Testing for more than 25 characters tooltip',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'QC Review',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
      {
        amendment: 'N',
        approvalDate: '2019-03-06T00:00:00',
        compareStatus: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\f923e3bc-8f7e-40b6-ae03-ca6dc150fae6\\Protocol - Protocol - 06-Mar-2019_202018.pdf',
        documentStatus: 'final',
        draftVersion: null,
        environment: 'dev-ssr4',
        errorCode: null,
        errorReason: null,
        fileName: 'Protocol - Protocol - 06-Mar-2019_202018.pdf',
        id: 'f923e3bc-8f7e-40b6-ae03-ca6dc150fae6',
        indication: 'rheumatoid arthritis',
        iqvXmlPathComp: null,
        iqvXmlPathProc: null,
        isActive: true,
        isProcessing: false,
        lastUpdated: '2021-06-03T08:32:40.747000',
        moleculeDevice: 'GSK3196165',
        nctId: null,
        percentComplete: '100',
        phase: 'III',
        projectId: 'testing',
        protocol: 'SSR_J3_202018',
        protocolTitle:
          'Protocol Title: A 24-week, phase 3, multicentre, randomised, double-blind, efficacy and safety study, comparing GSK3196165 with placebo and with sarilumab, in combination with conventional synthetic DMARDs, in participants with moderately to severely active rheumatoid arthritis who have an inadequate response to biological DMARDs and/or Janus Kinase inhibitors.',
        shortTitle:
          'Efficacy and safety of GSK3196165 versus placebo and sarilumab in participants with moderately to severely active rheumatoid arthritis who have an inadequate response to biological DMARDs and/or Janus Kinase inhibitors.',
        sourceSystem: 'dev-ssr4',
        sponsor: 'GlaxoSmithKline Research & Development Limited',
        status: 'QC Review',
        studyStatus: 'Phase 3',
        timeCreated: '2021-06-03T08:13:06.743000',
        uploadDate: '2021-06-03T08:13:06.743000',
        userCreated: null,
        userId: '1034911',
        userUpdated: null,
        versionNumber: '1',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );
  });

  test('Component renders correctly for Error and Compare status', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA',
        indication: 'Bone necrosis',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization Error',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA Testing for more than 25 characters tooltip',
        indication: 'Bone necrosis Testing for more than 25 characters tooltip',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Comparison In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
        screen="QC"
      />,
      state,
    );
  });

  test('Should handleRowProtocolClick for screen QC be clickable', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA',
        indication: 'Bone necrosis',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization Error',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA Testing for more than 25 characters tooltip',
        indication: 'Bone necrosis Testing for more than 25 characters tooltip',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Comparison In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    const fakeFn = jest.fn();
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
        screen="QC"
        handleProtocolClick={fakeFn}
      />,
      state,
    );
    fireEvent.click(screen.getByText('EMR 200095-004'));
  });

  test('Component renders correctly for expanded row', () => {
    const protocolData = [
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA Testing for more than 25 characters tooltip',
        indication: 'Bone necrosis Testing for more than 25 characters tooltip',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Comparison In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    const container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );
    const arrowButton = container.getByTestId('expandable-row');
    fireEvent.click(arrowButton);
    fireEvent.click(screen.getByTestId('handle-download').children[0]);
  });

  test('Component renders correctly for expanded row', () => {
    const protocolData = [
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA Testing for more than 25 characters tooltip',
        indication: 'Bone necrosis Testing for more than 25 characters tooltip',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Comparison In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    const container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );
    const arrowButton = container.getByTestId('expandable-row');

    fireEvent.click(arrowButton);
    const download = container.getByTestId('handle-download');
    fireEvent.click(download);
  });

  test('Component renders correctly for expanda and collpase row', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA',
        indication: 'Bone necrosis',
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Extraction In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    const container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );
    const arrowButton = container.getByTestId('expandable-row');
    fireEvent.click(arrowButton);
    fireEvent.click(arrowButton);
  });

  test('Component renders correctly for expanded row filename null', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: null,
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA',
        indication: null,
        molecule: 'string',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Extraction In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    const container = render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );
    const arrowButton = container.getByTestId('expandable-row');
    fireEvent.click(arrowButton);
  });

  test('Should checkbox be disabled if Activity and Qc Activity are completed', () => {
    const protocolData = [
      {
        id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
        amendment: 'Y',
        amendmentNumber: null,
        approvalDate: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
        documentStatus: 'final',
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        fileName: 'Protocol-2020-04-09-VER-000001.pdf',
        indication: 'ABCC6 deficiency',
        moleculeDevice: 'test',
        percentComplete: '100',
        phase: 'I',
        projectId: '',
        protocol: 'JBT101-RIS-001',
        protocolTitle:
          'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
        sponsor: 'Corbus Pharmaceuticals',
        status: 'Upload Complete',
        uploadDate: '2021-04-08T09:51:34.077000',
        userId: '1020640',
        versionNumber: '10.1',
        qcActivity: 'QC Completed',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );

    expect(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    ).toBeDisabled();
  });

  test('Should check for checkbox to be disabled if Activity is PROCESS_COMPLETED and Qc Activity is QC_IN_PROGRESS', () => {
    const protocolData = [
      {
        id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
        amendment: 'Y',
        amendmentNumber: null,
        approvalDate: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
        documentStatus: 'final',
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        fileName: 'Protocol-2020-04-09-VER-000001.pdf',
        indication: 'ABCC6 deficiency',
        moleculeDevice: 'test',
        percentComplete: '100',
        phase: 'I',
        projectId: '',
        protocol: 'JBT101-RIS-001',
        protocolTitle:
          'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
        sponsor: 'Corbus Pharmaceuticals',
        status: 'Upload Complete',
        uploadDate: '2021-04-08T09:51:34.077000',
        userId: '1020640',
        versionNumber: '10.1',
        qcActivity: 'QC In Progress',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );

    expect(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    ).toBeDisabled();
  });

  test('Should check for checkbox be enabled and checked', () => {
    const protocolData = [
      {
        id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
        amendment: 'Y',
        amendmentNumber: null,
        approvalDate: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
        documentStatus: 'final',
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        fileName: 'Protocol-2020-04-09-VER-000001.pdf',
        indication: 'ABCC6 deficiency',
        moleculeDevice: 'test',
        percentComplete: '100',
        phase: 'I',
        projectId: '',
        protocol: 'JBT101-RIS-001',
        protocolTitle:
          'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
        sponsor: 'Corbus Pharmaceuticals',
        status: 'Upload Complete',
        uploadDate: '2021-04-08T09:51:34.077000',
        userId: '1020640',
        versionNumber: '10.1',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
      />,
      state,
    );

    // expect(
    //   screen.getByTestId("selected-row").children[0].children[0].children[0]
    // ).toBeEnabled();
    fireEvent.click(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    );
    expect(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    ).toBeChecked();
  });

  test('Should Component render correctly for FollowedProtocols tab', () => {
    const protocolData = [
      {
        id: '2a5111a6-5465-46f5-b133-a85724bae4ef',
        amendment: 'Y',
        amendmentNumber: null,
        approvalDate: null,
        completenessOfDigitization: null,
        digitizedConfidenceInterval: null,
        documentFilePath:
          '\\\\quintiles.net\\enterprise\\Services\\protdigtest\\pilot_iqvxml\\2a5111a6-5465-46f5-b133-a85724bae4ef\\Protocol-2020-04-09-VER-000001.pdf',
        documentStatus: 'final',
        draftVersion: null,
        errorCode: null,
        errorReason: null,
        fileName: 'Protocol-2020-04-09-VER-000001.pdf',
        indication: 'ABCC6 deficiency',
        moleculeDevice: 'test',
        percentComplete: '100',
        phase: 'I',
        projectId: '',
        protocol: 'JBT101-RIS-001',
        protocolTitle:
          'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
        sponsor: 'Corbus Pharmaceuticals',
        status: 'Upload Complete',
        uploadDate: '2021-04-08T09:51:34.077000',
        userId: '1020640',
        versionNumber: '10.1',
        qcActivity: 'QC In Progress',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
        screen="FollowedProtocols"
      />,
      state,
    );
  });
});

describe('Dashboard table component Redaction', () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
      },
    },
  };
  test('Component renders correctly with Redacted Information', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA to be more than 25 characters long',
        indication: 'Bone necrosis',
        moleculeDevice: '~REDACTED~',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of ~REDACTED~ as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: '~REDACTED~',
        indication: '~REDACTED~',
        molecule: '~REDACTED~',
        amendment: '~REDACTED~',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization Complete',
        phase: '~REDACTED~',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
        isLoading={false}
        screen="QC"
      />,
      state,
    );
  });

  test('Component renders correctly with Redacted Information', () => {
    const protocolData = [
      {
        id: 'abcd1234',
        userId: '1021402',
        fileName: 'Protocol-2013-05-29-VER-V1.0-000001.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: 'Merck KGaA to be more than 25 characters long',
        indication: 'Bone necrosis',
        moleculeDevice: '~REDACTED~',
        amendment: 'string',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization In Progress',
        phase: 'Ib/II',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of ~REDACTED~ as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
      {
        id: 'abcd123456',
        userId: '1021402',
        fileName:
          'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
        documentFilePath:
          '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
        protocol: 'EMR 200095-004 Testing for more than 25 characters tooltip',
        protocolName:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        projectId: 123,
        sponser: '~REDACTED~',
        indication: '~REDACTED~',
        molecule: '~REDACTED~',
        amendment: '~REDACTED~',
        versionNumber: 1.0,
        documentStatus: 'Final',
        draftVersion: 0.0,
        errorCode: 0,
        errorReason: 'string',
        status: 'Digitization Complete',
        phase: '~REDACTED~',
        digitizedConfidenceInterval: 'string',
        completenessOfDigitization: 'string',
        protocolTitle:
          'A Multicenter, Randomized, Phase IB / II Trial to evaluate the efficacy, safety, and Pharmacokinetics of MSC2156119J as Monotherapy versus Sorafenib in Asian Subjects with MET+ Advanced Hepatocellular Carcinoma and Child-Pugh Class A Liver Function',
        studyStatus: 'string',
        sourceSystem: 'string',
        environment: 'dev',
        uploadDate: '2020-12-16T08:46:42.633000',
        timeCreated: '2020-12-16T08:46:42.633000',
        timeUpdated: '2020-12-16T08:46:42.633000',
        userCreated: '1021402',
        userModified: 'string',
        approvalDate: '2013-06-26T08:46:42.633000',
        isActive: true,
        iqvxmlpath: 'string',
        nctId: '0',
        qcActivity: 'QC Not Started',
        wfData: [],
        showMoreCalling: false,
        showMore: false,
      },
    ];
    render(
      <ProtocolTable
        initialRows={protocolData}
        pageRows={[5, 20, 30, 'All']}
        isLoading={false}
      />,
      state,
    );
  });
});
