import { render, fireEvent } from '@testing-library/react';
import SaveSectionModal from '../SaveSectionModal';

describe('SaveSectionModal', () => {
  test('SavSectionModal load', () => {
    const component = render(
      <SaveSectionModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        setShowConfirm={jest.fn()}
        setShowEdit={jest.fn()}
        setSaveSection={jest.fn()}
      />,
    );
    expect(component).toBeTruthy();
    expect(component.getByText('Cancel')).toBeInTheDocument();
    expect(component.getByText('Save')).toBeInTheDocument();
    expect(component.getByText('Continue Editing')).toBeInTheDocument();
    component.debug();
  });

  test('Cancel Button Click', () => {
    const setShowConfirm = jest.fn();
    const setShowEdit = jest.fn();
    const setSaveSection = jest.fn();

    const component = render(
      <SaveSectionModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        setShowConfirm={setShowConfirm}
        setShowEdit={setShowEdit}
        setSaveSection={setSaveSection}
      />,
    );
    expect(component).toBeTruthy();
    const cancelBtn = component.getByText('Cancel');
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    expect(setShowEdit).toHaveBeenCalled();
    expect(setShowConfirm).toHaveBeenCalled();
  });

  test('Save Button Click', () => {
    const setShowConfirm = jest.fn();
    const setShowEdit = jest.fn();
    const setSaveSection = jest.fn();
    const component = render(
      <SaveSectionModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        setShowConfirm={setShowConfirm}
        setShowEdit={setShowEdit}
        setSaveSection={setSaveSection}
      />,
    );
    expect(component).toBeTruthy();
    const saveBtn = component.getByText('Save');
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    expect(setSaveSection).toHaveBeenCalled();
    expect(setShowEdit).toHaveBeenCalled();
    expect(setShowConfirm).toHaveBeenCalled();
  });

  test('Continue Button Click', () => {
    const setShowConfirm = jest.fn();
    const setShowEdit = jest.fn();
    const setSaveSection = jest.fn();
    const component = render(
      <SaveSectionModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        setShowConfirm={setShowConfirm}
        setShowEdit={setShowEdit}
        setSaveSection={setSaveSection}
      />,
    );
    expect(component).toBeTruthy();
    const cntinueBtn = component.getByText('Continue Editing');
    expect(cntinueBtn).toBeInTheDocument();
    fireEvent.click(cntinueBtn);
    expect(setShowConfirm).toHaveBeenCalled();
  });
});

describe('SaveSectionModal', () => {
  const classes = { modal: 'test-modal' };
  const currentEditCard = 'test-card';
  const setSaveSection = jest.fn();
  const setShowConfirm = jest.fn();
  const setShowEdit = jest.fn();

  it('should call onClose function when modal is closed', () => {
    const { getByTestId } = render(
      <SaveSectionModal
        classes={classes}
        currentEditCard={currentEditCard}
        // eslint-disable-next-line react/jsx-boolean-value
        showConfirm={true}
        setShowConfirm={setShowConfirm}
        setShowEdit={setShowEdit}
        setSaveSection={setSaveSection}
      />,
    );

    const modal = getByTestId('confirm-modal');
    fireEvent.click(modal.querySelector('button[aria-label="Close"]'));

    expect(setShowConfirm).toHaveBeenCalledWith(false);
  });
});
