import { render, fireEvent, screen } from '@testing-library/react';
import LabData from '../LabData';

describe('LabData', () => {
  test('should render the component', () => {
    render(<LabData />);
    expect(screen.getByTestId('lab-data')).toBeInTheDocument();
    screen.debug();
  });
  test('should render to click on edit and save icon', () => {
    render(<LabData />);
    fireEvent.click(screen.getByTestId('editall'));
    expect(screen.getByTestId('saveall')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('saveall'));
    expect(screen.getByTestId('editall')).toBeInTheDocument();
  });
  test('should render to click on filter button', () => {
    render(<LabData />);
    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));
  });
  test('should render to click on ellipsis and Edit button', () => {
    render(<LabData />);
    fireEvent.click(screen.getByTestId('editall'));
    expect(screen.getAllByTestId('ellipsis-icon')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('ellipsis-icon')[0]);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByTestId('saveCancelButtonGroup')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
  });
  test('should render to click on ellipsis and delete button', () => {
    render(<LabData />);
    fireEvent.click(screen.getByTestId('editall'));
    expect(screen.getAllByTestId('ellipsis-icon')[0]).toBeInTheDocument();
    fireEvent.click(screen.getAllByTestId('ellipsis-icon')[0]);
    expect(screen.getByText('Delete')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Delete'));
    expect(screen.getByTestId('delete-row-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Yes'));
  });
});
