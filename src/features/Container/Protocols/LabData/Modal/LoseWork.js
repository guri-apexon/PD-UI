import PropTypes from 'prop-types';
import Modal from 'apollo-react/components/Modal';

function LoseWork(props) {
  const { unSaved, setUnSaved } = props;
  return (
    <Modal
      disableBackdropClick
      data-testid="losework-row-modal"
      open={unSaved}
      variant="warning"
      onClose={() => setUnSaved(false)}
      title="Lose your work?"
      message="All unsaved changes will be lost"
      buttonProps={[
        { label: 'Keep editing', onClick: setUnSaved(false) },
        { label: 'Leave without saving' },
      ]}
    />
  );
}

LoseWork.propTypes = {
  unSaved: PropTypes.isRequired,
  setUnSaved: PropTypes.isRequired,
};
export default LoseWork;
