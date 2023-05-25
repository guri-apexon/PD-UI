import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import { render, screen } from '../../../../../test-utils/test-utils';
import LabData from '../LabData';
import DiscardModal from '../../DigitizedPanel/Modals/DiscardModal';
import * as ProtocolContext from '../../ProtocolContext';

const docId = '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d';
const initialState = {
  protocol: {
    labData: {
      data: [
        {
          parameter_text: 'B-Haemoglobin',
          id: '0ea3f9c3-a06b-11ed-8a01-005056ab26e5',
          run_id: '',
          procedure_panel_text: 'Haematology/Haemostasis (whole blood)',
          dts: '20230130065337',
          ProcessMachineName: '',
          roi_id: '2c367d6a-6b89-4d83-b717-a26656634ce8',
          section: '',
          soft_delete: true,
          table_roi_id: '6390ad37-2904-45c5-a1b7-a6313f8cbb6c',
          parameter: '',
          doc_id: '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d',
          procedure_panel: '',
          assessment: 'Hematology',
          pname: '',
          ProcessVersion: '',
          table_link_text: 'Table 7 Laboratory Safety Variables',
          table_sequence_index: -1,
          isUpdate: true,
        },
        {
          parameter_text: 'B-Leukocyte',
          id: '0eaa62ca-a06b-11ed-af29-005056ab26e5',
          run_id: '',
          procedure_panel_text: 'Haematology/Haemostasis (whole blood)',
          dts: '20230130065337',
          ProcessMachineName: '',
          roi_id: 'b60f1686-dc43-4656-b8fa-ee9eb21d405c',
          section: '',
          soft_delete: null,
          table_roi_id: '6390ad37-2904-45c5-a1b7-a6313f8cbb6c',
          parameter: '',
          doc_id: '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d',
          procedure_panel: '',
          assessment: 'Hematology ',
          pname: '',
          ProcessVersion: '',
          table_link_text: 'Table 7 Laboratory Safety Variables',
          table_sequence_index: -1,
          isUpdate: true,
        },
        {
          parameter_text: 'B-Absolute leukocyte differential count:',
          id: '0eae8180-a06b-11ed-8ba8-005056ab26e5',
          run_id: '',
          procedure_panel_text: 'Haematology/Haemostasis (whole blood)',
          dts: '20230130065337',
          ProcessMachineName: '',
          roi_id: '840ee3b5-5447-4f1c-9a6a-2af6fa3ce6fc',
          section: '',
          soft_delete: true,
          table_roi_id: '6390ad37-2904-45c5-a1b7-a6313f8cbb6c',
          parameter: '',
          doc_id: '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d',
          procedure_panel: '',
          assessment: 'Hematology ',
          pname: '',
          ProcessVersion: '',
          table_link_text: 'Table 7 Laboratory Safety Variables',
          table_sequence_index: -1,
          isUpdate: true,
        },
        {
          parameter_text: 'B-Absolute leukocyte differential count:',
          id: '0eae8180-a06b-11ed-8ba8-005056ab26e5',
          run_id: '',
          procedure_panel_text: 'Haematology/Haemostasis (whole blood)',
          dts: '20230130065337',
          ProcessMachineName: '',
          roi_id: '840ee3b5-5447-4f1c-9a6a-2af6fa3ce6fc',
          section: '',
          isVreated: true,
          table_roi_id: '6390ad37-2904-45c5-a1b7-a6313f8cbb6c',
          parameter: '',
          doc_id: '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d',
          procedure_panel: '',
          assessment: 'Hematology ',
          pname: '',
          ProcessVersion: '',
          table_link_text: 'Table 7 Laboratory Safety Variables',
          table_sequence_index: -1,
          isUpdate: true,
        },
        {
          parameter_text: 'B-Absolute leukocyte differential count:',
          id: '0eae8180-a06b-11ed-8ba8-005056ab26e5',
          run_id: '',
          procedure_panel_text: 'Haematology/Haemostasis (whole blood)',
          dts: '20230130065337',
          ProcessMachineName: '',
          roi_id: '840ee3b5-5447-4f1c-9a6a-2af6fa3ce6fc',
          section: '',
          isVreated: true,
          table_roi_id: '6390ad37-2904-45c5-a1b7-a6313f8cbb6c',
          parameter: '',
          doc_id: '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d',
          procedure_panel: '',
          assessment: 'Hematology ',
          pname: 'ddfsdfs',
          ProcessVersion: '',
          table_link_text: 'Table 7 Laboratory Safety Variables',
          table_sequence_index: -1,
          isCreated: true,
        },
      ],
      success: false,
      loading: false,
    },
  },
};

describe('LabData', () => {
  test('should render the component', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    expect(screen.getByTestId('lab-data')).toBeInTheDocument();
  });

  test('should render to click on edit and save icon', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    fireEvent.click(screen.getByTestId('editall'));
    expect(screen.getByTestId('saveall')).toBeInTheDocument();
  });

  test('should render to click on filter button', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
    fireEvent.click(screen.getByTestId('clearFilter'));
  });

  test('should render to click on ellipsis and Edit button', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    fireEvent.click(screen.getByTestId('editall'));
    expect(screen.getAllByTestId('ellipsis-icon')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('ellipsis-icon')[0]);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));
    fireEvent.click(screen.getAllByTestId('ellipsis-icon')[0]);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.change(screen.getAllByRole('textbox')[0]);
    userEvent.type(screen.getAllByRole('textbox')[0], 'abc');
    fireEvent.click(screen.getByText('Save'));
  });

  test('should render to click on ellipsis and delete button', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    fireEvent.click(screen.getByTestId('editall'));
    expect(screen.getAllByTestId('ellipsis-icon')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('ellipsis-icon')[0]);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    fireEvent.click(screen.getByText('Yes'));
  });

  test('edit and save action', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    const editAll = screen.getByTestId('editall');
    expect(editAll).toBeInTheDocument();
    fireEvent.click(editAll);
    const saveall = screen.getByTestId('saveall');
    expect(saveall).toBeInTheDocument();
    fireEvent.click(saveall);
  });

  test('handleAdd function', () => {
    const screen = render(<LabData docId={docId} />, {
      initialState,
    });
    const editAll = screen.getByTestId('editall');
    expect(editAll).toBeInTheDocument();
    fireEvent.click(editAll);
    fireEvent.mouseEnter(screen.getAllByText('Hematology')[0]);
    const addItem = screen.getAllByTestId('add-item')[0];
    expect(addItem).toBeInTheDocument();
    fireEvent.click(addItem);
  });

  test('should dispatch CREATE_LABDATA_TABLE action when createLabDataTable is called', () => {
    render(<LabData docId={123} />);

    const editAll = screen.getByTestId('editall');
    expect(editAll).toBeInTheDocument();
    fireEvent.click(editAll);

    const addRow = screen.getByTestId('add-row');
    fireEvent.click(addRow);
    expect(addRow).toBeInTheDocument();
  });

  it('should call handleAdd when rowData is not empty', () => {
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');
    const dispatchMock = jest.fn();
    useDispatchMock.mockReturnValue(dispatchMock);
    const handleAdd = jest.fn();
    render(<LabData docId="doc123" />);

    const editAll = screen.getByTestId('editall');
    expect(editAll).toBeInTheDocument();
    fireEvent.click(editAll);

    const addRowButton = screen.getByTestId('add-row');
    fireEvent.click(addRowButton);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'CREATE_LABDATA_TABLE',
      payload: {
        docId: 'doc123',
      },
    });
    expect(handleAdd).toHaveBeenCalledTimes(0);
  });
});

describe('handleClickOutside', () => {
  it('should close the dropdown when a click occurs outside the dropdown container', () => {
    const showDiscardConfirm = true;
    const setShowDiscardConfirm = jest.fn();
    const onDiscardClick = jest.fn();
    const setRequestedRoute = jest.fn();
    const contextValues = { dispatchSectionEvent: jest.fn() };
    jest
      .spyOn(ProtocolContext, 'useProtContext')
      .mockImplementation(() => contextValues);

    const screen = render(
      <DiscardModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        showDiscardConfirm={showDiscardConfirm}
        setShowDiscardConfirm={setShowDiscardConfirm}
        onDiscardClick={onDiscardClick}
        setRequestedRoute={setRequestedRoute}
      />,
    );

    fireEvent.mouseDown(document);

    const discardBtn = screen.getByText('Discard');
    expect(discardBtn).toBeInTheDocument();
    fireEvent.click(discardBtn);
    expect(onDiscardClick).toHaveBeenCalled();
  });
});
