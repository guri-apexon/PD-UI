import { render, fireEvent } from '@testing-library/react';
import DiscardModal from '../DiscardModal';

describe('Discard Modal', () => {
  test('Discard Modal load', () => {
    const showDiscardConfirm = true;
    const setShowDiscardConfirm = jest.fn();
    const onDiscardClick = jest.fn();
    const setRequestedRoute = jest.fn();
    const component = render(
      <DiscardModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        showDiscardConfirm={showDiscardConfirm}
        setShowDiscardConfirm={setShowDiscardConfirm}
        onDiscardClick={onDiscardClick}
        setRequestedRoute={setRequestedRoute}
      />,
    );
    expect(component).toBeTruthy();
    expect(component.getByText('Cancel')).toBeInTheDocument();
    expect(component.getByText('Discard')).toBeInTheDocument();
  });

  test('Cancel Button Click', () => {
    const showDiscardConfirm = true;
    const setShowDiscardConfirm = jest.fn();
    const onDiscardClick = jest.fn();
    const setRequestedRoute = jest.fn();
    const component = render(
      <DiscardModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        showDiscardConfirm={showDiscardConfirm}
        setShowDiscardConfirm={setShowDiscardConfirm}
        onDiscardClick={onDiscardClick}
        setRequestedRoute={setRequestedRoute}
      />,
    );

    expect(component).toBeTruthy();
    const cancelBtn = component.getByText('Cancel');
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    expect(setShowDiscardConfirm).toHaveBeenCalled();
  });

  test('Discard Button Click', () => {
    const showDiscardConfirm = true;
    const setShowDiscardConfirm = jest.fn();
    const onDiscardClick = jest.fn();
    const setRequestedRoute = jest.fn();

    const component = render(
      <DiscardModal
        classes={{ modal: '' }}
        currentEditCard="123"
        showConfirm
        showDiscardConfirm={showDiscardConfirm}
        setShowDiscardConfirm={setShowDiscardConfirm}
        onDiscardClick={onDiscardClick}
        setRequestedRoute={setRequestedRoute}
      />,
    );

    expect(component).toBeTruthy();

    const discardBtn = component.getByText('Discard');
    expect(discardBtn).toBeInTheDocument();
    fireEvent.click(discardBtn);
    expect(onDiscardClick).toHaveBeenCalled();
  });
});

describe('DiscardModal', () => {
  it('calls setShowDiscardConfirm(false) when modal is closed', () => {
    const setShowDiscardConfirm = jest.fn();
    const setRequestedRoute = jest.fn();
    const { getByLabelText } = render(
      <DiscardModal
        classes={{ modal: 'test-modal' }}
        // eslint-disable-next-line react/jsx-boolean-value
        showDiscardConfirm={true}
        setShowDiscardConfirm={setShowDiscardConfirm}
        onDiscardClick={() => {}}
        setRequestedRoute={setRequestedRoute}
      />,
    );

    fireEvent.click(getByLabelText('Close'));

    expect(setShowDiscardConfirm).toHaveBeenCalledWith(false);
  });
});
