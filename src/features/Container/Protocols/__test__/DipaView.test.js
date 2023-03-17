import { render, screen } from '@testing-library/react';
import DipaView from '../DipaView/DipaView';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('DipaView', () => {
  const defaultProps = {
    docId: '123',
    handleSectionChnage: jest.fn(),
    handleExpandChange: jest.fn(),
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
    expect(selectElement).toHaveTextContent('Inclusion Criteria');
  });

  test('renders DipaViewStructure Component', () => {
    render(<DipaView {...defaultProps} />);
    const selectElement = screen.getByTestId('structure-component');
    expect(selectElement).toBeInTheDocument();
  });

  it('should render the actual and derived count elements', () => {
    render(<DipaView {...defaultProps} />);
    const actualCount = screen.getByTestId('actual-count');
    expect(actualCount).toBeInTheDocument();

    const derivedCount = screen.getByTestId('derived-count');
    expect(derivedCount).toBeInTheDocument();
  });
});
