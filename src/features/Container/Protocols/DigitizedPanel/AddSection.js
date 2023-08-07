import Modal from 'apollo-react/components/Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import TextField from 'apollo-react/components/TextField';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import headerLevel from '../CustomComponents/constants';

function AddSection({
  setIsModal,
  headerList,
  setIsShown,
  isModal,
  index,
  docId,
}) {
  const dispatch = useDispatch();
  const { headerLevel1 } = headerLevel;
  const [sectionName, setSectionName] = useState('');

  const handleSave = () => {
    if (sectionName === '') {
      toast.info('Enter Required Field');
    } else {
      const headerObj = {
        ...headerLevel1,
        link_text: `<h1> ${sectionName}</h1>`,
      };

      if (index === -1) {
        headerObj.is_section_completely_new = true;
        headerObj.doc_id = docId;
        headerObj.iqv_standard_term = '';
        headerObj.uuid = uuidv4();
        delete headerObj.next_detail;
        delete headerObj.prev_detail;
      } else if (headerList[index]) {
        headerObj.next_detail.link_id = headerList[index]?.link_id;
        headerObj.prev_detail.link_id = '';
        headerObj.next_detail.link_level = '1';
      } else {
        headerObj.prev_detail.link_id = headerList[index - 1]?.link_id;
        headerObj.prev_detail.link_level = '1';
        headerObj.next_detail.link_level = '';
        headerObj.next_detail.link_id = '';
      }
      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: {
          docId,
          index: index === -1 ? 0 : index,
          refreshToc: true,
          reqBody: [headerObj],
        },
      });
      setIsModal(false);
    }
  };

  const handleClose = () => {
    if (setIsShown) setIsShown(false);
    setIsModal(false);
  };

  return (
    <Modal
      disableBackdropClick
      open={isModal}
      variant="default"
      onClose={handleClose}
      title="Add New Section "
      buttonProps={[
        { label: 'Cancel', onClick: handleClose, size: 'small' },
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
  headerList: PropTypes.isRequired,
  index: PropTypes.isRequired,
  setIsShown: PropTypes.isRequired,
  isModal: PropTypes.isRequired,
  docId: PropTypes.isRequired,
};
