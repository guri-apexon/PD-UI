import { render } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import QCProtocolTable from '../QCTable/QCProtocolTable';

describe('Protocol Table container component', () => {
  const state = {
    initialState: {
      qc: {
        protocols: [
          {
            id: 'abcd123456',
            userId: '1021402',
            fileName:
              'Protocol-2013-05-29-VER-V1.0-00000111111111111111111111111111111111.pdf',
            documentFilePath:
              '//quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf',
            protocol: 'EMR',
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
            qcActivity: 'QC In Progress',
          },
        ],
        tableError: false,
        loader: false,
      },
    },
  };
  // test("should render QC", () => {
  //   const handleProtocolClick = jest.fn();
  //   render(
  //     <QCProtocolTable handleProtocolClick={handleProtocolClick} />,
  //     state
  //   );
  // });

  test('should render QC', () => {
    const handleProtocolClick = jest.fn();
    render(
      <QCProtocolTable handleProtocolClick={handleProtocolClick} />,
      state,
    );
  });
});

describe('Protocol Table container component', () => {
  const state = {
    initialState: {
      qc: {
        protocols: [],
        tableError: false,
        loader: false,
      },
    },
  };
  test('should render QC', () => {
    const handleProtocolClick = jest.fn();
    render(
      <QCProtocolTable handleProtocolClick={handleProtocolClick} />,
      state,
    );
  });
});
