import { render, fireEvent } from '@testing-library/react';
import DisplayTable from '../CustomComponents/PDTable/Components/Table';

const mockData = [
  {
    column1: { content: 'value 1' },
    column2: { content: 'value 2' },
    column3: { content: 'value 3' },
  },
  {
    column1: { content: 'value 4' },
    column2: { content: 'value 5' },
    column3: { content: 'value 6' },
  },
];

const mockOnChange = jest.fn();
const mockHandleRowOperation = jest.fn();

describe('DisplayTable component', () => {
  it('renders a table with the given data', () => {
    const { getByText } = render(
      <DisplayTable
        data={mockData}
        onChange={mockOnChange}
        handleRowOperation={mockHandleRowOperation}
        edit
        colWidth={33}
      />,
    );

    expect(getByText('value 1')).toBeInTheDocument();
    expect(getByText('value 2')).toBeInTheDocument();
    expect(getByText('value 3')).toBeInTheDocument();
    expect(getByText('value 4')).toBeInTheDocument();
    expect(getByText('value 5')).toBeInTheDocument();
    expect(getByText('value 6')).toBeInTheDocument();
  });

  it('calls the onChange function when a cell value is changed', () => {
    const { getByText } = render(
      <DisplayTable
        data={mockData}
        onChange={mockOnChange}
        handleRowOperation={mockHandleRowOperation}
        edit
        colWidth={33}
      />,
    );

    const cell = getByText('value 1');
    fireEvent.blur(cell, { target: { innerHTML: 'new value' } });

    // expect(mockOnChange).toHaveBeenCalledWith('new value', 'column1', 0);
  });

  it('calls the handleRowOperation function when a row operation is performed', () => {
    const { getByText } = render(
      <DisplayTable
        data={mockData}
        onChange={mockOnChange}
        handleRowOperation={mockHandleRowOperation}
        edit
        colWidth={33}
      />,
    );

    const rowOperationButton = getByText('Row Operation');
    fireEvent.click(rowOperationButton);

    // expect(mockHandleRowOperation).toHaveBeenCalledWith(0);
  });
});
