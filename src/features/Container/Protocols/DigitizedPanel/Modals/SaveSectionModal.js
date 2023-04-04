import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';

function SaveSectionModal({
  classes,
  currentEditCard,
  showConfirm,
  setShowConfirm,
  setShowEdit,
  setSaveSection,
}) {
  return (
    <Modal
      data-testid="confirm-modal"
      disableBackdropClick
      open={showConfirm}
      variant="warning"
      onClose={() => setShowConfirm(false)}
      title="Confirm Action"
      buttonProps={[
        {
          label: 'Cancel',
          onClick: () => {
            setShowEdit(false);
            setShowConfirm(false);
          },
        },
        {
          label: 'Save',
          onClick: () => {
            setSaveSection(currentEditCard);
            setShowEdit(false);
            setShowConfirm(false);
          },
        },
        {
          label: 'Continue Editing',
          onClick: () => {
            setShowConfirm(false);
          },
        },
      ]}
      className={classes.modal}
      id="custom"
    >
      There is already another section in edit mode. Please save the section
      before continuing.
    </Modal>
  );
}

export default SaveSectionModal;

SaveSectionModal.propTypes = {
  classes: PropTypes.isRequired,
  currentEditCard: PropTypes.isRequired,
  showConfirm: PropTypes.isRequired,
  setShowConfirm: PropTypes.isRequired,
  setShowEdit: PropTypes.isRequired,
  setSaveSection: PropTypes.isRequired,
};
