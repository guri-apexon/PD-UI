import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import AddClinicalTerm from '../EnrichedContent/AddClinicalTerm';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('AddClinicalTerm component', () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);
  useSelector.mockReturnValue({});

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  test('should render the component without errors', () => {
    const { getByTestId } = render(<AddClinicalTerm docId={1} linkId={2} />);
    expect(getByTestId('add-tag')).toBeInTheDocument();
  });

  test('should open the modal when the Add tag button is clicked', () => {
    const { getByTestId } = render(<AddClinicalTerm docId={1} linkId={2} />);
    const addButton = getByTestId('add-tag');
    fireEvent.click(addButton);
    expect(addButton).not.toBeDisabled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
