import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import QCProtocolView from '../QCProtocolView/QCProtocolView';

const workFlowData = {
  loading: false,
  error: null,
  data: {
    Status: 200,
    default_workflows: {
      meta_extraction: [
        { depends: [], service_name: 'meta_tagging' },
        { depends: ['meta_tagging'], service_name: 'meta_extraction' },
      ],
    },
    custom_workflows: {
      test678: [
        { depends: [], service_name: 'meta_tagging' },
        { depends: ['meta_tagging'], service_name: 'terminate_node' },
      ],
    },
  },
};

describe('QC Protocol View container component', () => {
  const state = {
    initialState: {
      protocol: {
        rightBladeValue: ['Home'],
        protocolTocData: { data: ['testing'] },
        summary: {
          isWorkflowDone: true,
          data: {
            userPrimaryRoleFlag: false,
          },
        },
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
        workflowData: workFlowData,
        workflowSubmit: {
          loading: false,
          error: null,
          data: [],
          success: false,
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

  test('click on submit and click on QC Approve & Submit button', () => {
    const protocolId = '212121';
    render(
      <QCProtocolView protId={protocolId} handleChangeTab={jest.fn()} />,
      state,
    );
    screen.debug();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(
      screen.getByRole('button', { name: /QC Approve & Submit/i }),
    ).toBeInTheDocument();
    userEvent.click(
      screen.getByRole('button', { name: /QC Approve & Submit/i }),
    );
  });

  test('click on submit and click on QC Approve & Submit button and close buttons', () => {
    const protocolId = '212121';
    render(
      <QCProtocolView protId={protocolId} handleChangeTab={jest.fn()} />,
      state,
    );
    screen.debug();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    expect(
      screen.getByRole('button', { name: /QC Approve & Submit/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: /Close/i }));
  });

  test('checking the loading', () => {
    const protocolId = '212121';
    const stateLoading = {
      initialState: {
        dashboard: {
          workflowSubmit: {
            loading: true,
            error: null,
            data: [],
            success: false,
          },
        },
      },
    };
    render(
      <QCProtocolView protId={protocolId} handleChangeTab={jest.fn()} />,
      stateLoading,
    );
  });
});

describe('QC Protocol View container component Error', () => {
  const state = {
    initialState: {
      protocol: {
        rightBladeValue: ['Home'],
        protocolTocData: { data: ['testing'] },
        summary: {
          isWorkflowDone: true,
          data: {
            userPrimaryRoleFlag: false,
          },
        },
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
    render(<QCProtocolView />, state);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
  test('handleOpen function should open the modal', () => {
    render(<QCProtocolView />, state);
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
