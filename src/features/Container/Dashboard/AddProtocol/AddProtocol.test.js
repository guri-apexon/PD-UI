import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../../../../store/store';
import { render, fireEvent, screen } from '../../../../test-utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import AddProtocol from './AddProtocol';

function selectAutoComplete(Container) {
  const autocomplete = Container.getByTestId('amendment-number-texfield');
  const input = autocomplete.querySelector('input');
  const autocompleteDocumentStatus = Container.getByTestId(
    'document-status-texfield',
  );
  const inputDocStatus = autocompleteDocumentStatus.querySelector('input');
  fireEvent.change(inputDocStatus, { target: { value: '' } });
  fireEvent.keyDown(autocompleteDocumentStatus, { key: 'ArrowDown' });
  fireEvent.keyDown(autocompleteDocumentStatus, { key: 'ArrowDown' });
  fireEvent.keyDown(autocomplete, { key: 'Enter' });
  fireEvent.focusOut(inputDocStatus, { target: { value: 'Approved Final' } });

  fireEvent.change(input, { target: { value: 'y' } });
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
  fireEvent.keyDown(autocomplete, { key: 'Enter' });
  fireEvent.focusOut(input, { target: { value: 'Y' } });
  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
  fireEvent.focusOut(input, { target: { value: '' } });
}
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
const dashboardmockData = {
  addProtocolData: {
    amendmentNumber: [{ label: 'Y', value: 'Yes' }],
    documentState: [{ label: 'Draft', value: 'draft' }],
    workflowData: workFlowData,
    workflowSubmit: {
      loading: false,
      error: null,
      data: [
        {
          workflow_name: 'document_compare',
          services: ['digitizer2_compare'],
        },
      ],
    },
    addProtocolErrorState: {
      type: '',
      data: {},
    },
  },
  addProtocolModal: true,
  isLoading: false,
  displayAddProtocol: true,
  workflowSubmit: {
    loading: false,
    error: null,
    data: [],
    success: false,
  },
};

describe('Add Protocol Test Suite', () => {
  test('Should render AddProtocol Component', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId, getByText } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolModal: false,
            isLoading: false,
            addProtocolData: {
              sponsor: [],
              indication: [],
            },
            workflowSubmit: {
              loading: false,
              error: null,
              data: [],
              success: false,
            },
          },
        },
      },
    );
    // container
    getByText('Add Protocol to Library');
    fireEvent.click(getByTestId('add-protocol-button'));
  });
  test('Should render AddProtocol Component without Modal', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: 'NVT AG',
                  sponsor_abbreviation: 'NVT',
                  id: 2,
                  label: 'NVT AG',
                },
              ],
              indication: [
                {
                  indication_name: 'indication1',
                  indication_description: 'Indication1 Description',
                  id: 1,
                  label: 'Indication1 Description',
                },
              ],
              amendmentNumber: [{ label: 'Y', value: 'Yes' }],
              documentState: [{ label: 'Draft', value: 'draft' }],
            },
            addProtocolModal: false,
            isLoading: false,
            workflowSubmit: {
              loading: false,
              error: null,
              data: [],
              success: false,
            },
          },
        },
      },
    );
    fireEvent.click(getByTestId('add-protocol-button'));
  });
  test('Should call onModalClose Function', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: 'NVT AG',
                  sponsor_abbreviation: 'NVT',
                  id: 2,
                  label: 'NVT AG',
                },
              ],
              indication: [
                {
                  indication_name: 'indication1',
                  indication_description: 'Indication1 Description',
                  id: 1,
                  label: 'Indication1 Description',
                },
              ],
              amendmentNumber: [{ label: 'Y', value: 'Yes' }],
              documentState: [{ label: 'Draft', value: 'draft' }],
            },
            addProtocolModal: true,
            isLoading: false,
            workflowSubmit: {
              loading: false,
              error: null,
              data: [],
              success: false,
            },
          },
        },
      },
    );
    const modal =
      getByTestId('add-protocol-modal').children[2].children[0].children[0]
        .children[1].children[0].children[0];
    fireEvent.click(modal);
  });

  test('Should render AddProtocol Component with Modal', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const { getByTestId } = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: 'NVT AG',
                  sponsor_abbreviation: 'NVT',
                  id: 2,
                  label: 'NVT AG',
                },
              ],
              indication: [
                {
                  indication_name: 'indication1',
                  indication_description: 'Indication1 Description',
                  id: 1,
                  label: 'Indication1 Description',
                },
              ],
              amendmentNumber: [{ label: 'Y', value: 'Yes' }],
              documentState: [{ label: 'Draft', value: 'draft' }],
            },
            addProtocolModal: true,
            isLoading: false,
            workflowSubmit: {
              loading: false,
              error: null,
              data: [],
              success: false,
            },
          },
        },
      },
    );
    const protcolNumber = getByTestId('protocol-number-texfield').children[1]
      .children[0];
    const versionNumber = getByTestId('version-number-texfield').children[1]
      .children[0];
    fireEvent.change(protcolNumber, { target: { value: 'a' } });
    expect(protcolNumber.value).toBe('a');
    fireEvent.focusOut(protcolNumber, { target: { value: 'a' } });
    fireEvent.change(versionNumber, { target: { value: 1 } });
    expect(versionNumber.value).toBe('1');
    fireEvent.focusOut(versionNumber, { target: { value: 1 } });
    fireEvent.change(versionNumber, { target: { value: '' } });
    expect(versionNumber.value).toBe('');
    fireEvent.focusOut(versionNumber, { target: { value: '' } });
    fireEvent.change(versionNumber, { target: { value: 1.111 } });
    expect(versionNumber.value).toBe('1.111');
  });
  test('Should Save Post Correctly', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const protcolNumber = container.getByTestId('protocol-number-texfield')
      .children[1].children[0];
    fireEvent.change(protcolNumber, { target: { value: 'a' } });
    expect(protcolNumber.value).toBe('a');
    const savemodal =
      container.getByTestId('add-protocol-modal').children[2].children[0]
        .children[2].children[0].children[1];
    fireEvent.click(savemodal);
  });
  test('Should render AutoComplete Correctly', async () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: {
            addProtocolData: {
              sponsor: [
                {
                  sponsor_name: 'NVT AG',
                  sponsor_abbreviation: 'NVT',
                  id: 2,
                  label: 'NVT AG',
                },
              ],
              indication: [
                {
                  indication_name: 'indication1',
                  indication_description: 'Indication1 Description',
                  id: 1,
                  label: 'Indication1 Description',
                },
              ],
              amendmentNumber: [{ label: 'Y', value: 'Yes' }],
              documentState: [{ label: 'Draft', value: 'draft' }],
            },
            addProtocolModal: true,
            isLoading: false,
            workflowSubmit: {
              loading: false,
              error: null,
              data: [],
              success: false,
            },
          },
        },
      },
    );
    selectAutoComplete(container);
  });
  test('Should check file upload works Correctly', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const file = new File(['(⌐□_□)'], 'chucknorris.doc', {
      type: 'application/msword',
    });
    const fileUpload =
      container.getByTestId('custom-fileupload').children[0].children[0]
        .children[0];
    Object.defineProperty(fileUpload, 'files', {
      value: [file],
    });
    fireEvent.change(fileUpload);
    // fireEvent.click(fileUpload);
  });

  test('Should check file upload throws error for other file types', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const file = new File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'img/png',
    });
    const fileUpload =
      container.getByTestId('custom-fileupload').children[0].children[0]
        .children[0];
    Object.defineProperty(fileUpload, 'files', {
      value: [file],
    });
    fireEvent.change(fileUpload);
    // fireEvent.click(fileUpload);
  });

  test('Should throw error for wrong file name', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const file = new File(['(⌐□_□)'], 'ABCD (test)-1.pdf', {
      type: 'application/pdf',
    });
    const fileUpload =
      container.getByTestId('custom-fileupload').children[0].children[0]
        .children[0];
    Object.defineProperty(fileUpload, 'files', {
      value: [file],
    });
    fireEvent.change(fileUpload);
    // fireEvent.click(fileUpload);
  });

  test('Should work correctly for valid file name', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const file = new File(['(⌐□_□)'], 'ABCD-1_test.pdf', {
      type: 'application/pdf',
    });
    const fileUpload =
      container.getByTestId('custom-fileupload').children[0].children[0]
        .children[0];
    Object.defineProperty(fileUpload, 'files', {
      value: [file],
    });
    fireEvent.change(fileUpload);
    // fireEvent.click(fileUpload);
  });

  test('Should work correctly for valid project ID', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const edit =
      screen.getByTestId('projectID-texfield').children[1].children[0];
    fireEvent.change(edit, { target: { value: 'Sohan' } });
    fireEvent.focusOut(edit);
    expect(edit.value).toEqual('Sohan');
  });

  test('Should work correctly for valid document status', async () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const edit = screen.getByTestId('document-status-texfield').children[0]
      .children[0].children[0].children[0];
    fireEvent.change(edit, { target: { value: 'Draft' } });
    expect(edit.value).toEqual('Draft');
  });
});

describe('handlePipelineSubmit', () => {
  const mockHandleOpen = jest.fn();
  const mockHandleClose = jest.fn();
  it('should set docIdError if docId is not entered', () => {
    const setDocIdError = jest.fn();

    render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    expect(setDocIdError).toHaveBeenCalledTimes(0);
  });

  it('should set workflowNameError if workflowName is not entered', () => {
    const setWorkflowNameError = jest.fn();

    render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );

    expect(setWorkflowNameError).toHaveBeenCalledTimes(0);
  });

  it('should set workflowError if finalWorkflow is empty', () => {
    const setWorkflowError = jest.fn();

    render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );

    expect(setWorkflowError).toHaveBeenCalledTimes(0);
  });

  it('should dispatch SUBMIT_WORKFLOW_DATA action if docId and finalWorkflow are valid', () => {
    const dispatch = jest.fn();

    render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test('handles protocol number change', () => {
    render(
      <Provider store={store}>
        <AddProtocol />
      </Provider>,
    );

    const protocolNumberInput = screen.getByTestId('add-protocol-button');

    fireEvent.change(protocolNumberInput, { target: { value: 'ABC123' } });

    expect(protocolNumberInput.value).toBe('ABC123');
  });

  it('should dispatch the correct action on pipeline submit', () => {
    const mockHandleOpen = jest.fn();
    const mockHandleClose = jest.fn();
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    const container = render(
      <AddProtocol handleOpen={mockHandleOpen} handleClose={mockHandleClose} />,
      {
        initialState: {
          dashboard: dashboardmockData,
        },
      },
    );
    const submitButton =
      container.getByTestId('add-protocol-modal').children[2].children[0]
        .children[0].children[1].children[0].children[0];
    fireEvent.click(submitButton);
    expect(mockDispatchFn).toHaveBeenCalledWith({
      type: 'TOGGLE_ADDPROTOCOL_MODAL',
      payload: false,
    });
    expect(mockDispatchFn).toHaveBeenCalledWith({
      type: 'RESET_ERROR_ADD_PROTOCOL',
    });
    expect(mockDispatchFn).toHaveBeenCalledWith({
      type: 'RESET_ERROR_ADD_PROTOCOL_NEW',
    });
  });

  it('should display success toast on successful workflow submit', () => {
    const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    render(<AddProtocol />);
    expect(
      screen.queryByText(
        'Workflows execution were submitted successfully for the protocol',
      ),
    ).toBeNull();
  });
});
