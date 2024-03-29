import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import FollowedProtocols from '../FollowedProtocols';

describe('Followed Protocol component with Empty Data', () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
        setSelectedProtocols: [],
        followedProtocols: [],
      },
    },
  };

  test('should render ProtocolTable', () => {
    render(
      <FollowedProtocols pageRows={[5, 20, 30, 'All']} maxHeight={400} />,
      state,
    );
  });
});
describe('Followed Protocol component with Data', () => {
  const state = {
    initialState: {
      dashboard: {
        followedProtocols: [
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
            status: 'PROCESS_COMPLETED',
            uploadDate: '2021-04-08T09:51:34.077000',
            userId: '1020640',
            versionNumber: '10.1',
            qcActivity: 'QC_IN_PROGRESS',
          },
          {
            id: '01a8d886-1018-404b-b496-9555f7712a21',
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
            protocol: 'covid',
            protocolTitle:
              'A Phase 1, 2-part, Single-dose, Non-Randomized, Open-label, Parallel-group Study to Assess the Pharmacokinetics and Safety of Lenabasum in Subjects with Renal Impairment Compared with Matched Controls',
            sponsor: 'Corbus Pharmaceuticals',
            status: 'PROCESS_COMPLETED',
            uploadDate: '2021-04-08T09:51:34.077000',
            userId: '1020640',
            versionNumber: '10.1',
            qcActivity: 'QC_IN_PROGRESS',
          },
        ],
        setSelectedProtocols: [],
      },
    },
  };

  test('should render ProtocolTable', () => {
    render(
      <FollowedProtocols pageRows={[5, 20, 30, 'All']} maxHeight={400} />,
      state,
    );
  });
  test('should render ProtocolTable with Associated Protocol', () => {
    render(
      <FollowedProtocols pageRows={[5, 20, 30, 'All']} maxHeight={400} />,
      state,
    );
    const rows = screen.getByTestId('expandable-row-covid');
    fireEvent.click(rows);
  });

  test('should render ProtocolTable by unfollowing Protocol', () => {
    render(
      <FollowedProtocols pageRows={[5, 20, 30, 'All']} maxHeight={400} />,
      state,
    );
    screen.getByTestId('unfollow-button-test-covid');
    // fireEvent.click(rows);
  });
});
