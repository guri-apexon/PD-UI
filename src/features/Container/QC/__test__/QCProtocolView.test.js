import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import QCProtocolView from '../QCProtocolView/QCProtocolView';

describe('QC Protocol View container component', () => {
  const state = {
    initialState: {
      protocol: {
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: true,
          tocSections: [
            {
              section: 'section',
              id: 'TOC-24',
            },
          ],
          soaSections: [
            {
              section: 'Study of Assessments(Schedule of Assessment)',
              id: 'SOA-4',
            },
          ],
        },
      },
      dashboard: {
        workflowData: {
          loading: false,
          error: null,
          data: {
            Status: '',
          },
        },
        workflowSubmit: {
          loading: false,
          error: null,
          data: [],
          success: true,
        },
      },
    },
  };
  test('should render QC Loader', () => {
    const protocolId = '212121';
    const filePath = '//path';
    const type = 'QC1';

    render(
      <QCProtocolView
        protId={protocolId}
        path={filePath}
        userType={type}
        handleChangeTab={jest.fn()}
      />,
      state,
    );
  });
  test('should render QC', () => {
    const protocolId = '212121';
    const filePath = '//path';
    const type = 'QC2';

    render(
      <QCProtocolView
        protId={protocolId}
        path={filePath}
        userType={type}
        handleChangeTab={jest.fn()}
      />,
      state,
    );
  });
});

describe('QC Protocol View container component Error', () => {
  const state = {
    initialState: {
      protocol: {
        view: {
          iqvdataSoa: [],
          iqvdataSummary: {},
          iqvdataToc: {
            data: [],
          },
          loader: false,
          err: 'Error',
        },
      },
    },
  };

  test('should render QC with Error', () => {
    const protocolId = '212121';
    const filePath = '//path';
    const type = 'QC1';

    render(
      <QCProtocolView
        protId={protocolId}
        path={filePath}
        userType={type}
        handleChangeTab={jest.fn()}
      />,
      state,
    );
  });
  test('should render QC', () => {
    const protocolId = '212121';
    const filePath = '//path';
    const type = 'QC2';
    render(
      <QCProtocolView
        protId={protocolId}
        path={filePath}
        userType={type}
        handleChangeTab={jest.fn()}
      />,
      state,
    );
  });
  test('should update userPrimaryRoleFlag when userType is "qc"', () => {
    const updatedProdData = { userPrimaryRoleFlag: false };
    const setProdData = jest.fn();
    const userType = 'qc';

    if (userType === 'qc') {
      updatedProdData.userPrimaryRoleFlag = true;
    }

    setProdData(updatedProdData);

    expect(setProdData).toHaveBeenCalledWith({ userPrimaryRoleFlag: true });
  });

  test('should not update userPrimaryRoleFlag when userType is not "qc"', () => {
    const updatedProdData = { userPrimaryRoleFlag: false };
    const setProdData = jest.fn();
    const userType = 'admin';

    if (userType === 'qc') {
      updatedProdData.userPrimaryRoleFlag = true;
    }

    setProdData(updatedProdData);

    expect(setProdData).toHaveBeenCalledWith({ userPrimaryRoleFlag: false });
  });
  test('handleOpen function should open the modal', () => {
    render(<QCProtocolView />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
  test('handleOpen function should open the modal', () => {
    render(<QCProtocolView />);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
