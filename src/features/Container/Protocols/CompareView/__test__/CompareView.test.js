import { render, screen, fireEvent } from '@testing-library/react';
import CompareView from '../CompareView';

describe('CompareView', () => {
  const mockSetIsModal = jest.fn();

  beforeEach(() => {
    const isModal = true;
    render(
      <CompareView
        isModal={isModal}
        setIsModal={mockSetIsModal}
        identifier="test-identifier"
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Modal component when isModal is true', () => {
    const modalElement = screen.getByTestId('dialog');
    expect(modalElement).toBeInTheDocument();
  });

  test('renders iframe with correct URL', () => {
    const iframeElement = screen.getByTitle('uni');
    expect(iframeElement).toBeInTheDocument();
  });

  test('calls setIsModal with false when Modal is closed', () => {
    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);
    expect(mockSetIsModal).toHaveBeenCalledWith(false);
  });
});
