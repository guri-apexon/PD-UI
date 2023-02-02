import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { toBase64 } from '../../../../utils/utilFunction';
import ProtocolContext from '../ProtocolContext';
import ImageUploader from '../CustomComponents/ImageUploader';

jest.mock('../../../../utils/utilFunction', () => ({
  toBase64: jest.fn(),
}));

describe('ImageUploader', () => {
  let mockDispatchSectionEvent;

  beforeEach(() => {
    mockDispatchSectionEvent = jest.fn();
    jest.resetAllMocks();
  });

  it('renders ImageUploader in edit mode', () => {
    const { getByTestId, getByText } = render(
      <ImageUploader lineID="1" content="" edit />,
      {
        wrapper: ({ children }) => (
          <ProtocolContext.Provider
            value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
          >
            {children}
          </ProtocolContext.Provider>
        ),
      },
    );

    expect(getByTestId('file-upload')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  it('dispatches event when delete button is clicked', () => {
    const { getByText } = render(<ImageUploader lineID="1" content="" edit />, {
      wrapper: ({ children }) => (
        <ProtocolContext.Provider
          value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
        >
          {children}
        </ProtocolContext.Provider>
      ),
    });

    fireEvent.click(getByText('Delete'));
    expect(mockDispatchSectionEvent).toHaveBeenCalledWith('CONTENT_DELETED', {
      currentLineId: '1',
    });
  });

  it('dispatches event with updated content when save button is clicked', () => {
    toBase64.mockResolvedValue('image_data');
    const { getByText, getByTestId } = render(
      <ImageUploader lineID="1" content="" edit />,
      {
        wrapper: ({ children }) => (
          <ProtocolContext.Provider
            value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
          >
            {children}
          </ProtocolContext.Provider>
        ),
      },
    );

    const fileUpload = getByTestId('file-upload');
    fireEvent.change(fileUpload, {
      target: { files: [new File([], 'file.jpg')] },
    });

    fireEvent.click(getByText('Save'));
    expect(mockDispatchSectionEvent).toHaveBeenCalledWith('CONTENT_UPDATE', {
      currentLineId: '1',
      content: 'image_data',
    });
  });
});
