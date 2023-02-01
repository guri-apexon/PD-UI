import { render, fireEvent } from '@testing-library/react';
import ImageUploader from '../CustomComponents/ImageUploader';
import ProtocolContext from '../ProtocolContext';

describe('ImageUploader', () => {
  let mockDispatchSectionEvent;

  beforeEach(() => {
    mockDispatchSectionEvent = jest.fn();
  });

  it('should dispatch CONTENT_UPDATE when Save button is clicked', () => {
    const { getByText } = render(
      <ProtocolContext.Provider
        value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
      >
        <ImageUploader lineID="1" content="base64string" />
      </ProtocolContext.Provider>,
    );

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    expect(mockDispatchSectionEvent).toHaveBeenCalledWith('CONTENT_UPDATE', {
      currentLineId: '1',
      content: 'base64string',
    });
  });

  it('should dispatch CONTENT_DELETED when Delete button is clicked', () => {
    const { getByText } = render(
      <ProtocolContext.Provider
        value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
      >
        <ImageUploader lineID="1" content="base64string" />
      </ProtocolContext.Provider>,
    );

    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDispatchSectionEvent).toHaveBeenCalledWith('CONTENT_DELETED', {
      currentLineId: '1',
    });
  });
});
