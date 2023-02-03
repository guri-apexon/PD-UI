import { render, fireEvent } from '@testing-library/react';
import EmptyColumnCells from '../CustomComponents/PDTable/Components/EmptyColumns';

describe('EmptyColumnCells', () => {
  const mockHandleOperation = jest.fn();
  const columnLength = 1;
  const colWidth = 33;

  it('renders correctly with the given props', () => {
    const { getByTestId, getAllByTestId } = render(
      <EmptyColumnCells
        columnLength={columnLength}
        handleOperation={mockHandleOperation}
        colWidth={colWidth}
      />,
    );
    expect(getAllByTestId('empty-cell-column').length).toBe(columnLength);
    expect(getByTestId('more-icon')).toBeInTheDocument();
  });

  it('opens and closes the hover list when the more icon is clicked', () => {
    const { getByTestId } = render(
      <EmptyColumnCells
        columnLength={columnLength}
        handleOperation={mockHandleOperation}
        colWidth={colWidth}
      />,
    );
    const moreIcon = getByTestId('more-icon');
    fireEvent.click(moreIcon);
    expect(getByTestId('hover-list')).toBeInTheDocument();

    fireEvent.click(moreIcon);
  });

  it('calls handleOperation with the correct arguments when an item in the hover list is clicked', () => {
    const { getByTestId, getAllByTestId } = render(
      <EmptyColumnCells
        columnLength={columnLength}
        handleOperation={mockHandleOperation}
        colWidth={colWidth}
      />,
    );
    const moreIcon = getByTestId('more-icon');
    fireEvent.click(moreIcon);
    const hoverListItem = getAllByTestId('hover-list')[0];
    fireEvent.click(hoverListItem);
  });
});
