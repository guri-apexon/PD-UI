import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';

function DeleteRow(props) {
  const { isOpen, setIsOpen, onDeleteRow } = props;
  return (
    <Modal
      data-testid="delete-row-modal"
      open={isOpen}
      variant="warning"
      onClose={() => setIsOpen(false)}
      title="Alert"
      message="Please confirm if you want to continue with the delete?"
      buttonProps={[
        { label: 'Cancel' },
        { label: 'Yes', onClick: () => onDeleteRow() },
      ]}
    />
  );
}

DeleteRow.propTypes = {
  isOpen: PropTypes.isRequired,
  setIsOpen: PropTypes.isRequired,
  onDeleteRow: PropTypes.isRequired,
};
export default DeleteRow;
