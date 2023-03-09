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
      content: '',
      uuid: '',
      prev_detail: {
        line_id: '',
        link_id: hoverItem.link_id,
        link_id_level2: '',
        link_id_level3: '',
        link_id_level4: '',
        link_id_level5: '',
        link_id_level6: '',
        link_id_subsection1: '',
        link_id_subsection2: '',
        link_id_subsection3: '',
      },
      section_locked: false,
    },
  ];

  const handleSave = () => {
    if (sectionName === '') {
      toast.info('Enter Required Field');
    } else {
      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: {
          docId: hoverItem.doc_id,
          index: hoverIndex + 1,
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
