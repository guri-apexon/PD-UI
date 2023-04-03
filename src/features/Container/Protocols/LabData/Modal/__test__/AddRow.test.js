import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../../../../../test-utils/test-utils';
import AddRow from '../AddRow';

describe('Add Row Modal', () => {
  test('should render to add row', () => {
    const screen = render(
      <AddRow
        isAdd
        setIsAdd={jest.fn()}
        handleCreate={jest.fn()}
        tableIndex="Abc"
        setTableIndex={jest.fn()}
        assessmentName="abc"
        setAssessmentName={jest.fn()}
        procedureName="Abc"
        setProcedureName={jest.fn()}
        assessmentPreferred="abc"
        setAssessmentPreferred={jest.fn()}
        procedurePreferred="abc"
        setProcedurePreferred={jest.fn()}
      />,
    );
    expect(screen.getByTestId('add-row-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    fireEvent.change(screen.getAllByRole('textbox')[0]);
    userEvent.type(screen.getAllByRole('textbox')[0], 'abc');
    userEvent.tab();
    fireEvent.change(screen.getAllByRole('textbox')[1]);
    userEvent.type(screen.getAllByRole('textbox')[1], 'abc');
    userEvent.tab();
    fireEvent.change(screen.getAllByRole('textbox')[2]);
    userEvent.type(screen.getAllByRole('textbox')[2], 'abc');
    userEvent.tab();
    fireEvent.change(screen.getAllByRole('textbox')[3]);
    userEvent.type(screen.getAllByRole('textbox')[3], 'abc');
    userEvent.tab();
    fireEvent.change(screen.getAllByRole('textbox')[4]);
    userEvent.type(screen.getAllByRole('textbox')[4], 'abc');
    userEvent.tab();
    fireEvent.change(screen.getAllByRole('textbox')[5]);
    userEvent.type(screen.getAllByRole('textbox')[5], 'abc');
    userEvent.tab();
    fireEvent.click(screen.getByText('Create'));
  });
});
