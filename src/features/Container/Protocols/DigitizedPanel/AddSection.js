import Modal from 'apollo-react/components/Modal/Modal';
import TextField from 'apollo-react/components/TextField';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

function AddSection({ setIsModal, hoverItem, hoverIndex, setIsShown }) {
  const dispatch = useDispatch();
  const [sectionName, setSectionName] = useState('');
  const obj = [
    {
      type: 'header',
      qc_change_type: 'add',
      link_prefix: '',
      link_text: sectionName,
      link_level: '1',
      line_id: '',
      link_record_uid: '',
      content: '',
      prev_detail: {
        link_record_uid: hoverItem.header_id,
        line_id: '',
      },
      section_locked: false,
    },
  ];

  const handleSave = () => {
    console.log(' hoverItem.doc_id', hoverItem.doc_id);
    if (sectionName === '') {
      toast.info('Enter Required Field');
    } else {
      // dispatch({
      //   type: 'ADD_SECTION_INDEX',
      //   payload: {
      //     index: hoverIndex,
      //   },
      // });
      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: {
          docId: hoverItem.doc_id,
          index: hoverIndex,
          addFlag: true,
          reqBody: obj,
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
