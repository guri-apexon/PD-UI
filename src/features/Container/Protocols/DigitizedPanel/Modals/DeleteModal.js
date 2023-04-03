import Modal from 'apollo-react/components/Modal/Modal';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

const styles = {
  modal: {
    maxWidth: 500,
  },
};

const useStyles = makeStyles(styles);
function DeleteModal({
  handleDeleteSection,
  showDeleteConfirm,
  setShowDeleteConfirm,
}) {
  const classes = useStyles();
  const handleClose = () => {
    setShowDeleteConfirm(false);
  };
  return (
    <Modal
      disableBackdropClick
      open={showDeleteConfirm}
      variant="warning"
      onClose={handleClose}
      title="Confirm Action"
      buttonProps={[
        {
          label: 'Cancel',
          onClick: handleClose,
          'data-testid': 'update-term-field-cancel',
        },
        {
          label: 'Delete',
          onClick: () => handleDeleteSection(),
          'data-testid': 'update-term-field',
        },
      ]}
      className={classes.modal}
      id="custom"
    >
      Do you want to delete entire section?
    </Modal>
  );
}

export default DeleteModal;

DeleteModal.propTypes = {
  handleDeleteSection: PropTypes.isRequired,
  showDeleteConfirm: PropTypes.isRequired,
  setShowDeleteConfirm: PropTypes.isRequired,
};
