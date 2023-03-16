import { render, screen, fireEvent } from '@testing-library/react';
import DipaView from '../DipaView';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('DipaView', () => {
  const defaultProps = {
    docId: '123',
  };

  it('renders without crashing', () => {
    render(<DipaView {...defaultProps} />);
  });

  it('renders the DipaView header with the title "DIPA View"', () => {
    const { getByText } = render(<DipaView {...defaultProps} />);
    expect(getByText('DIPA View')).toBeInTheDocument();
  });

  test('renders Select Box', () => {
    render(<DipaView {...defaultProps} />);
    const selectElement = screen.getByTestId('select-box');
    expect(selectElement).toBeInTheDocument();
  });

  test('renders DipaViewStructure Component', () => {
    render(<DipaView {...defaultProps} />);
    const selectElement = screen.getByTestId('structure-component');
    expect(selectElement).toBeInTheDocument();
  });

  test('renders dropdown with correct values', () => {
    render(<DipaView {...defaultProps} />);
    const dropdownElement = screen.getByTestId('select-box');
    fireEvent.change(dropdownElement);
    const inclusionCriteriaElement = screen.getByText('Inclusion Criteria');
    expect(inclusionCriteriaElement).toBeInTheDocument();
  });
});
