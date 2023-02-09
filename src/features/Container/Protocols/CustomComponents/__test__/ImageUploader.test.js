import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProtocolContext } from '../../ProtocolContext';
import ImageUploader from '../ImageUploader';

const dispatchSectionEvent = jest.fn();

const testLineID = '1';
const testEdit = true;
const testContent = '';
const mockedProtocolContextValue = { dispatchSectionEvent };

const renderImageUploader = (
  lineID = testLineID,
  content = testContent,
  edit = testEdit,
) => {
  return render(
    <ProtocolContext.Provider value={mockedProtocolContextValue}>
      <ImageUploader lineID={lineID} content={content} edit={edit} />{' '}
    </ProtocolContext.Provider>,
  );
};

jest.mock('../../../../../utils/utilFunction', () => ({
  toBase64: jest.fn(),
}));

describe('ImageUploader', () => {
  let mockDispatchSectionEvent;
  beforeEach(() => {
    mockDispatchSectionEvent = jest.fn();
    jest.resetAllMocks();
  });

  test('render ImageUploader in edit mode', () => {
    const { getByTestId, getByText } = render(
      <ProtocolContext.Provider
        value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
      >
        <ImageUploader lineID="1" content="" edit />
      </ProtocolContext.Provider>,
    );

    expect(getByTestId('file-upload')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Save')).toBeInTheDocument();
  });

  test('render image in readmode if image value is present ', () => {
    const { getByTestId } = render(
      <ProtocolContext.Provider
        value={{ dispatchSectionEvent: mockDispatchSectionEvent }}
      >
        <ImageUploader lineID="1" content="sample.jpg" edit={false} />
      </ProtocolContext.Provider>,
    );

    expect(getByTestId('readmode-img')).toBeInTheDocument();
  });

  it('should call handleCancel when Cancel button is clicked', () => {
    const { getByText } = renderImageUploader();
    fireEvent.click(getByText('Cancel'));
    expect(dispatchSectionEvent).toHaveBeenCalledWith('CONTENT_DELETED', {
      currentLineId: testLineID,
    });
  });

  it('should render image uploader when edit prop is true', () => {
    const { getByTestId } = renderImageUploader();
    expect(getByTestId('file-upload')).toBeInTheDocument();
  });

  it('should call handleSave when Save button is clicked ', () => {
    const { container, getByText } = render(
      <ProtocolContext.Provider value={mockedProtocolContextValue}>
        <ImageUploader lineID="1" content="" edit={testEdit} />
      </ProtocolContext.Provider>,
    );
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    const file = new File(['file content'], 'file.jpeg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input).toHaveProperty('files', [file]);
    fireEvent.click(getByText('Save'));
    expect(dispatchSectionEvent).toHaveBeenCalled();
  });

  it('should handle the cancel save after file select', () => {
    const { container, getByText, getByTestId } = render(
      <ProtocolContext.Provider value={mockedProtocolContextValue}>
        <ImageUploader lineID="1" content="" edit={testEdit} />
      </ProtocolContext.Provider>,
    );
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    const file = new File(['file content'], 'file.jpeg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input).toHaveProperty('files', [file]);
    fireEvent.click(getByText('Save'));
    expect(dispatchSectionEvent).toHaveBeenCalled();

    const editReadModeImg = getByTestId('edit-readmode-img');
    expect(editReadModeImg).toBeInTheDocument();
    fireEvent.mouseEnter(editReadModeImg);
    const editImg = getByTestId('edit_img');
    expect(editImg).toBeInTheDocument();
    fireEvent.click(editImg);
  });

  it('should handle the delete image', () => {
    const { container, getByText, getByTestId } = render(
      <ProtocolContext.Provider value={mockedProtocolContextValue}>
        <ImageUploader lineID="1" content="" edit={testEdit} />
      </ProtocolContext.Provider>,
    );
    const input = container.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    const file = new File(['file content'], 'file.jpeg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [file] } });
    expect(input).toHaveProperty('files', [file]);
    fireEvent.click(getByText('Save'));
    expect(dispatchSectionEvent).toHaveBeenCalled();

    const editReadModeImg = getByTestId('edit-readmode-img');
    expect(editReadModeImg).toBeInTheDocument();
    fireEvent.mouseEnter(editReadModeImg);
    const dltImg = getByTestId('delete_img');
    expect(dltImg).toBeInTheDocument();
    fireEvent.click(dltImg);

    const deleteConfirmBox = getByTestId('deleteConfirmBox');
    expect(deleteConfirmBox).toBeInTheDocument();

    const confirmDelete = getByTestId('confirmDelete');
    expect(confirmDelete).toBeInTheDocument();
    fireEvent.click(confirmDelete);
    expect(dispatchSectionEvent).toHaveBeenCalledWith('CONTENT_DELETED', {
      currentLineId: testLineID,
    });
  });
});