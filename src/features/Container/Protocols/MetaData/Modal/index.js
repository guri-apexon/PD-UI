/* eslint-disable */
import React from 'react';
import Modal from 'apollo-react/components/Modal';

const RestricModal = ({
  open,
  setOpen,
  title,
  buttonOne,
  buttonTwo,
  buttonOneHandler,
  buttonTwoHandler,
}) => {
  return (
    <Modal
      className="modal"
      data-testid="meta-modal-popover"
      open={open}
      onClose={() => setOpen(false)}
      title={title}
      buttonProps={[
        {
          label: buttonOne,
          'data-testid': 'update-term-field',
          onClick: buttonOneHandler,
        },
        {
          label: buttonTwo,
          'data-testid': 'discard-term-field',
          onClick: buttonTwoHandler,
        },
      ]}
      id="neutral"
    />
  );
};
export default RestricModal;
