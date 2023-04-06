import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../../../test-utils/test-utils';
import LabData from '../LabData';

const docId = '3b44c1d5-f5f7-44ab-901a-3f53c2ba751d';
const initialState = {
  protocol: {
    labDataApiValue: {
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
          assessment: 'Hematology ',
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
      ],
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
});
