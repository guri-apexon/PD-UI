import Modal from 'apollo-react/components/Modal/Modal';
import TextField from 'apollo-react/components/TextField';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import headerLevel from '../CustomComponents/constants';

function AddSection({ setIsModal, hoverItem, hoverIndex, setIsShown }) {
  const dispatch = useDispatch();
  const { headerLevel1 } = headerLevel;
  const [sectionName, setSectionName] = useState('');
  const handleSave = () => {
    if (sectionName === '') {
      toast.info('Enter Required Field');
    } else {
      const obj = [
        {
          ...headerLevel1,
          link_text: sectionName,
          next_detail: {
            ...headerLevel1.next_detail,
            link_id: hoverItem.link_id,
          },
        },
      ];

      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: {
          docId: hoverItem.doc_id,
          index: hoverIndex + 1,
          refreshToc: true,
          reqBody: obj,
        },
      });
      setIsModal(false);
      setIsShown(false);
    }
  };

  return (
    <Modal
      disableBackdropClick
      open
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
