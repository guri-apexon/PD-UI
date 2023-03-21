import { render, fireEvent, screen } from '@testing-library/react';
import EmptyRowCells from '../CustomComponents/PDTable/Components/EmptyRows';

describe('EmptyRowCells component', () => {
  const handleOperationMock = jest.fn();

  beforeEach(() => {
    handleOperationMock.mockClear();
  });

  test('clicking more icon shows hover list', () => {
    render(
      <EmptyRowCells
        rowIndex={1}
        handleOperation={handleOperationMock}
        index={0}
      />,
    );

    const moreIcon = screen.getByTestId('more-icon-row');
    fireEvent.click(moreIcon);

    const hoverList = screen.getByTestId('table-controls');
    expect(hoverList).toBeInTheDocument();
  });

  it('renders correctly and calls handleOperation on icon click', () => {
    const { getByTestId } = render(
      <EmptyRowCells
        rowIndex={1}
        handleOperation={handleOperationMock}
        index={0}
      />,
    );
    const icon = getByTestId('more-icon');
    fireEvent.click(icon);
    const tableOperation = getByTestId('table-controls');
    fireEvent.click(tableOperation);
    const metaicon =
      getByTestId('table-controls').getElementsByClassName('pd-more-icon')[0];
    fireEvent.click(metaicon);
  });

  test('clicking operation in hover list calls handleOperation with correct arguments', () => {
    render(
      <EmptyRowCells
        rowIndex={1}
        handleOperation={handleOperationMock}
        index={0}
      />,
    );

    const moreIcon = screen.getByTestId('more-icon-row');
    fireEvent.click(moreIcon);

    const deleteButton = screen.getByText('Delete row');
    fireEvent.click(deleteButton);

    expect(handleOperationMock).toHaveBeenCalledWith('DELETE_ROW', 0);
  });
});
