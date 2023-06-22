import { render, fireEvent, screen } from '@testing-library/react';
import EmptyColumnCells from '../CustomComponents/PDTable/Components/EmptyColumns';

describe('EmptyColumnCells', () => {
  const handleOperation = jest.fn();
  const columnIndexes = [0];
  const colWidth = 33;

  it('renders correctly with the given props', () => {
    const { getByTestId, getAllByTestId } = render(
      <EmptyColumnCells
        columnIndexes={columnIndexes}
        handleOperation={handleOperation}
        colWidth={colWidth}
      />,
    );
    expect(getAllByTestId('empty-cell-column').length).toBe(
      columnIndexes.length,
    );
    expect(getByTestId('more-icon')).toBeInTheDocument();
  });

  it('opens and closes the hover list when the more icon is clicked', () => {
    const { getByTestId } = render(
      <EmptyColumnCells
        columnIndexes={columnIndexes}
        handleOperation={handleOperation}
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
        columnIndexes={columnIndexes}
        handleOperation={handleOperation}
        colWidth={colWidth}
      />,
    );
    const moreIcon = getByTestId('more-icon');
    fireEvent.click(moreIcon);
    const hoverListItem = getAllByTestId('hover-list')[0];
    fireEvent.click(hoverListItem);
    const hoverList = screen.getByText('Delete Column');
    fireEvent.click(hoverList);
    expect(handleOperation).toHaveBeenCalledWith('DELETE_COLUMN', 0);
  });
});

describe('handleClickOutside', () => {
  it('should close the dropdown when a click occurs outside the dropdown container', () => {
    const handleOperationMock = jest.fn();
    const { container } = render(
      <EmptyColumnCells
        columnIndexes={[0, 1]}
        handleOperation={handleOperationMock}
      />,
    );
    const moreIcon = container.querySelector('[data-testId="more-icon"]');
    const hoverList = container.querySelector('[data-testId="hover-list"]');

    fireEvent.click(moreIcon);

    fireEvent.mouseDown(document);

    expect(hoverList).not.toHaveClass('open');
  });
});
describe('handleClickOutside', () => {
  it('should close the dropdown when a click occurs outside the dropdown container', () => {
    const handleOperationMock = jest.fn();
    const { container } = render(
      <EmptyColumnCells
        columnIndexes={[0, 1]}
        handleOperation={handleOperationMock}
      />,
    );
    const moreIcon = container.querySelector('[data-testId="more-icon"]');
    const hoverList = container.querySelector('[data-testId="hover-list"]');

    fireEvent.click(moreIcon);

    fireEvent.mouseUp(document);

    expect(hoverList).not.toHaveClass('open');
  });
});
