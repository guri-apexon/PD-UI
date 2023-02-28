import Modal from 'apollo-react/components/Modal/Modal';
import TextField from 'apollo-react/components/TextField';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function AddSection({ setIsModal, hoverItem, hoverIndex }) {
  const dispatch = useDispatch();
  const [sectionName, setSectionName] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const handleSave = () => {
    if (!sectionName && !pageNumber) {
      console.log('shubham');
      toast.info('Enter Required Field');
    } else {
      console.log('data', sectionName + pageNumber);
      dispatch({
        type: 'POST_ADD_SECTION',
        payload: {
          docId: hoverItem.doc_id,
          index: hoverIndex,
          sectionName,
        },
      });
      setIsModal(false);
    }
  };
  const flag = true;
  console.log('hover Item', hoverItem);
  console.log('hover Index', hoverIndex);
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
        inputProps={{ 'data-testid': 'update-term-field' }}
        onChange={(e) => {
          setSectionName(e.target.value);
        }}
        required
        placeholder="Enter Section Name"
      />
      <TextField
        size="small"
        label="Page Number"
        fullWidth
        type="number"
        value={pageNumber}
        allowBlank="none"
        inputProps={{ 'data-testid': 'update-term-field' }}
        onChange={(e) => {
          setPageNumber(e.target.value);
        }}
        required
        placeholder="Enter Page Number"
      />
    </Modal>
  );
}

export default AddSection;

AddSection.propTypes = {
  setIsModal: PropTypes.isRequired,
  hoverItem: PropTypes.isRequired,
  hoverIndex: PropTypes.isRequired,
};
