import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';

function DiscardModal({
  classes,
  showDiscardConfirm,
  setShowDiscardConfirm,
  onDiscardClick,
}) {
  return (
    <Modal
      disableBackdropClick
      open={showDiscardConfirm}
      variant="warning"
      onClose={() => setShowDiscardConfirm(false)}
      title="Confirm Action"
      buttonProps={[
        {
          label: 'Cancel',
          onClick: () => setShowDiscardConfirm(false),
        },
        {
          label: 'Discard',
          onClick: () => onDiscardClick(),
        },
      ]}
      className={classes.modal}
      id="custom"
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
};
