import Modal from 'apollo-react/components/Modal/Modal';
import TextField from 'apollo-react/components/TextField';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function AddSection({ setIsModal, hoverItem, hoverIndex, setIsShown }) {
  const dispatch = useDispatch();
  const [sectionName, setSectionName] = useState('');
  const handleSave = () => {
    if (sectionName === '') {
      toast.info('Enter Required Field');
    } else {
      dispatch({
        type: 'POST_ADD_SECTION',
        payload: {
          docId: hoverItem.doc_id,
          index: hoverIndex,
          sectionName,
        },
      });
      setIsModal(false);
      setIsShown(false);
    }
  };
  const flag = true;

  return (
    <Modal
      disableBackdropClick
      open={flag}
      variant="default"
      onClose={() => setIsModal(false)}
      title="Add New Section "
      buttonProps={[
        { size: 'small' },
        { label: 'Add Section', onClick: handleSave, size: 'small' },
      ]}
      id="renameTermsModal"
    >
      <TextField
        size="small"
        label="Section Name"
        fullWidth
        value={sectionName}
        allowBlank="none"
        inputProps={{ 'data-testid': 'update-term-field1' }}
        onChange={(e) => {
          setSectionName(e.target.value);
        }}
        required
        placeholder="Enter Section Name"
      />
    </Modal>
  );
}

export default AddSection;

AddSection.propTypes = {
  setIsModal: PropTypes.isRequired,
  hoverItem: PropTypes.isRequired,
  hoverIndex: PropTypes.isRequired,
  setIsShown: PropTypes.isRequired,
};
