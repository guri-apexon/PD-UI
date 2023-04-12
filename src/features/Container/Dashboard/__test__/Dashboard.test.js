import { render, screen, fireEvent } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';

import Dashboard from '../Dashboard';

describe('Protocol Table container component with empty and default values', () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [],
        selectedProtocols: [],
        displayAddProtocol: false,
        workflowSubmit: {
          loading: false,
          error: null,
          data: [],
          success: false,
        },
      },
    },
  };

  test('should render Dashboard', () => {
    render(<Dashboard />, state);
  });

  test('should render Dashboard API Error', () => {
    const preloadedState = {
      initialState: {
        dashboard: {
          apiError: false,
          workflowSubmit: {
            loading: false,
            error: null,
            data: [],
            success: false,
          },
        },
      },
    };
    render(<Dashboard />, preloadedState);
    expect(screen.queryByTestId('API-Error')).not.toBeInTheDocument();
  });

  test('should the Send To QC Review button be disabled', () => {
    render(<Dashboard />, state);
    // screen.getByTestId(/Send To QC Review/);
    expect(screen.getByTestId('send-qc-review')).toBeDisabled();
  });
});
describe('Protocol Table container component with Protocol data', () => {
  const state = {
    initialState: {
      dashboard: {
        protocols: [
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
            qcActivity: 'QC_NOT_STARTED',
            wfData: [],
            showMoreCalling: false,
            showMore: false,
          },
        ],
        selectedProtocols: [],
        displayAddProtocol: false,
        workflowSubmit: {
          loading: false,
          error: null,
          data: [],
          success: false,
        },
      },
    },
  };

  test('should render Dashboard with data', () => {
    render(<Dashboard />, state);
  });

  test('should the Send To QC Review button be enabled', () => {
    render(<Dashboard />, state);
    // screen.getByTestId(/Send To QC Review/);
    // expect(
    //   screen.getByTestId("selected-row").children[0].children[0].children[0]
    // ).toBeEnabled();
    fireEvent.click(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    );
    expect(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    ).toBeChecked();
    expect(screen.getByTestId('send-qc-review')).toBeEnabled();
  });

  test('should the Send To QC Review button be clicked', () => {
    render(<Dashboard />, state);
    // screen.getByTestId(/Send To QC Review/);
    // expect(
    //   screen.getByTestId("selected-row").children[0].children[0].children[0]
    // ).toBeEnabled();
    fireEvent.click(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    );
    expect(
      screen.getByTestId('selected-row').children[0].children[0].children[0],
    ).toBeChecked();
    expect(screen.getByTestId('send-qc-review')).toBeEnabled();
    fireEvent.click(screen.getByTestId('send-qc-review'));
  });
});
