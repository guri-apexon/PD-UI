import { render, screen, fireEvent } from '@testing-library/react';
import DipaViewStructure from '../DipaView/DipaViewStructure';

describe('DipaViewStructure component', () => {
  const defaultProps = {
    ID: 1,
    actualText: 'Test',
    segments: [
      { ID: 1, derive_seg: 'Segment 1' },
      { ID: 2, derive_seg: 'Segment 2' },
    ],
    childs: [],
    open: false,
    handleExpandChange: jest.fn(),
    handleAdd: jest.fn(),
    handleUpdate: jest.fn(),
    handleDelete: jest.fn(),
    openTooltip: jest.fn(() => {
      return true;
    }),
  };

  it('should render the component', () => {
    render(<DipaViewStructure {...defaultProps} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should call handleUpdate when the Save icon is clicked', () => {
    render(<DipaViewStructure {...defaultProps} open />);
    const saveIcon = screen.getByTestId('save');
    fireEvent.click(saveIcon);
    expect(defaultProps.handleUpdate).toHaveBeenCalledTimes(1);
  });

  it('should call handleDelete when the Trash icon is clicked', () => {
    render(<DipaViewStructure {...defaultProps} />);
    const trashIcon = screen.getByTestId('delete-icon');
    fireEvent.click(trashIcon);
    expect(defaultProps.handleDelete).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleDelete).toHaveBeenCalledWith(1);
  });

  it('should open popover when Plus icon is clicked', () => {
    const { getByTestId } = render(<DipaViewStructure {...defaultProps} />);
    const plusIcon = getByTestId('plus-icon');
    fireEvent.click(plusIcon);
    const popover = getByTestId('popover-card');
    expect(popover).toBeInTheDocument();
  });

  it('opens the tooltip when the eye icon is clicked', () => {
    const { getByTestId } = render(<DipaViewStructure {...defaultProps} />);

    fireEvent.click(getByTestId('show-icon'));
    expect(getByTestId('tooltip-icon')).toHaveAttribute('aria-describedby');
  });

  it('expands the accordion when clicked', () => {
    const { getByTestId } = render(<DipaViewStructure {...defaultProps} />);
    fireEvent.click(getByTestId('summary-expand'));
    expect(defaultProps.handleExpandChange).toHaveBeenCalledTimes(1);
  });

  it('should render accordion summary', () => {
    const { getByTestId } = render(<DipaViewStructure {...defaultProps} />);
    expect(getByTestId('accord-summary')).toBeInTheDocument();
  });
});
