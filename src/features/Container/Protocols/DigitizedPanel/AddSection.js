import Modal from 'apollo-react/components/Modal/Modal';
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
  beforeAddSectionFlag,
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
        link_text: sectionName,
      };

      if (headerList[index] && beforeAddSectionFlag) {
        headerObj.next_detail.link_id = headerList[index]?.link_id;
      } else {
        // eslint-disable-next-line
        if (headerList[index + 1]) {
          headerObj.next_detail.link_id = headerList[index + 1]?.link_id;
          headerObj.prev_detail.link_id = '';
          headerObj.next_detail.link_level = '1';
        } else {
          headerObj.prev_detail.link_id = headerList[index]?.link_id;
          headerObj.prev_detail.link_level = '1';
          headerObj.next_detail.link_level = '';
        }
      }

      dispatch({
        type: 'UPDATE_SECTION_DATA',
        payload: {
          docId: headerList[index]?.doc_id,
          index: beforeAddSectionFlag ? index : index + 1,
          refreshToc: true,
          reqBody: [headerObj],
        },
      });
      setIsModal(false);
    }
  };

  const handleClose = () => {
    setIsShown(false);
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
  beforeAddSectionFlag: PropTypes.isRequired,
};
