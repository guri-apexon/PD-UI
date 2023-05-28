import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';

function DiscardModal({
  classes,
  showDiscardConfirm,
  setShowDiscardConfirm,
  onDiscardClick,
  setRequestedRoute,
}) {
  const handleClose = () => {
    setShowDiscardConfirm(false);
    setRequestedRoute('');
  };

  return (
    <Modal
      disableBackdropClick
      open={showDiscardConfirm}
      variant="warning"
      onClose={handleClose}
      title="Confirm Action"
      buttonProps={[
        {
          label: 'Cancel',
          onClick: handleClose,
        },
        {
          label: 'Discard',
          onClick: () => onDiscardClick(),
        },
      ]}
      className={classes?.modal}
      id="custom"
      data-testid="discard-modal"
    >
      Are you sure you want to discard the changes?
    </Modal>
  );
}

export default DiscardModal;

DiscardModal.propTypes = {
  classes: PropTypes.isRequired,
  showDiscardConfirm: PropTypes.isRequired,
  setShowDiscardConfirm: PropTypes.isRequired,
  onDiscardClick: PropTypes.isRequired,
  setRequestedRoute: PropTypes.isRequired,
};
