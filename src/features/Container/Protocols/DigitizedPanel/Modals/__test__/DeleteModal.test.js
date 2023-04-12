import { render, fireEvent } from '@testing-library/react';
import DeleteModal from '../DeleteModal';

describe('DeleteModal', () => {
  const handleDeleteSection = jest.fn();
  const setShowDeleteConfirm = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the modal', () => {
    const { getByText } = render(
      <DeleteModal
        handleDeleteSection={handleDeleteSection}
        // eslint-disable-next-line react/jsx-boolean-value
        showDeleteConfirm={true}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />,
    );

    expect(
      getByText('Do you want to delete entire section?'),
    ).toBeInTheDocument();
  });

  it('should call the handleClose function when the Cancel button is clicked', () => {
    const { getByTestId } = render(
      <DeleteModal
        handleDeleteSection={handleDeleteSection}
        // eslint-disable-next-line react/jsx-boolean-value
        showDeleteConfirm={true}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />,
    );

    fireEvent.click(getByTestId('update-term-field-cancel'));

    expect(setShowDeleteConfirm).toHaveBeenCalledWith(false);
  });

  it('should call the handleDeleteSection function when the Delete button is clicked', () => {
    const { getByTestId } = render(
      <DeleteModal
        handleDeleteSection={handleDeleteSection}
        // eslint-disable-next-line react/jsx-boolean-value
        showDeleteConfirm={true}
        setShowDeleteConfirm={setShowDeleteConfirm}
      />,
    );

    fireEvent.click(getByTestId('update-term-field'));

    expect(handleDeleteSection).toHaveBeenCalled();
  });
});
