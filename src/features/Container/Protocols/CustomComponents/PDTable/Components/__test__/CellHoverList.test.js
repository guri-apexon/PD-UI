import { render, screen, fireEvent } from '@testing-library/react';
import CellHoverList from '../CellHoverList';

const mockHandleDropdownOptionClick = jest.fn();

describe('CellHoverList', () => {
  test('renders without any errors', () => {
    render(
      <CellHoverList
        handleDropdownOptionClick={mockHandleDropdownOptionClick}
        dropdownPosition={{ x: 100, y: 100 }}
        setIsCellOperation={jest.fn()}
      />,
    );
    expect(screen.getByText('Above Merge')).toBeInTheDocument();
  });

  test('calls handleDropdownOptionClick when clicking on a list item', () => {
    render(
      <CellHoverList
        handleDropdownOptionClick={mockHandleDropdownOptionClick}
        dropdownPosition={{ x: 100, y: 100 }}
        setIsCellOperation={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText('Right Merge'));

    // Assert that the handleDropdownOptionClick function is called with the correct argument
    expect(mockHandleDropdownOptionClick).toHaveBeenCalledWith('mergeRight');
  });

  test('sets isCellOperation to false when clicking outside the list', () => {
    const mockSetIsCellOperation = jest.fn();

    render(
      <CellHoverList
        handleDropdownOptionClick={mockHandleDropdownOptionClick}
        dropdownPosition={{ x: 100, y: 100 }}
        setIsCellOperation={mockSetIsCellOperation}
      />,
    );
    fireEvent.mouseDown(document);
    expect(mockSetIsCellOperation).toHaveBeenCalledWith(false);
  });

  test('renders list items with correct data from cellMerge array', () => {
    const mockCellMergeData = [
      { id: 1, image: '<svg>Mock Icon 1</svg>', text: 'Right Merge' },
      { id: 2, image: '<svg>Mock Icon 2</svg>', text: 'Left Merge' },
    ];

    render(
      <CellHoverList
        handleDropdownOptionClick={mockHandleDropdownOptionClick}
        dropdownPosition={{ x: 100, y: 100 }}
        setIsCellOperation={jest.fn()}
      />,
    );

    // Assert that the list items are rendered with the correct data
    mockCellMergeData.forEach((item) => {
      const listItem = screen.getByText(item.text);
      expect(listItem).toBeInTheDocument();
    });
  });
});
