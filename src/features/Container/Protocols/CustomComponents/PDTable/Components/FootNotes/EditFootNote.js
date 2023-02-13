import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { QC_CHANGE_TYPE } from '../../../../../../../AppConstant/AppConstant';

function EditFootNote({
  item,
  index,
  content,
  edit,
  footNoteData,
  setFootnoteData,
  unitTesting,
}) {
  const [footerText, setFooterText] = useState(content);

  const itemExists = (textData) => {
    if (item?.AttachmentId) {
      setFootnoteData(
        [...footNoteData].map((item, i) => {
          return i === index
            ? {
                ...item,
                Text: textData || '',
                qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
              }
            : item;
        }),
      );
    } else {
      setFootnoteData(footNoteData.filter((notes, i) => i !== index));
    }
  };

  const itemNotExist = (textData) => {
    setFootnoteData(
      [...footNoteData].map((item, i) => {
        return i === index
          ? {
              ...item,
              Text: textData,
              AttachmentId: item?.AttachmentId || '',
              qc_change_type_footnote: item?.AttachmentId
                ? QC_CHANGE_TYPE.UPDATED
                : QC_CHANGE_TYPE.ADDED,
            }
          : item;
      }),
    );
  };

  const sendFooterText = (e) => {
    const checkIfExist = footNoteData.find((notes, i) => i === index);
    const textData = footerText ? e.target.innerHTML : '';
    if (checkIfExist && isEmpty(textData)) {
      itemExists(textData);
    } else {
      itemNotExist(textData);
    }
  };

  const handleTextChange = (e) => {
    setFooterText(e.target.value);
    if (unitTesting) sendFooterText(e);
  };

  return (
    <div className="format-container" data-testId="content-edit">
      <ContentEditable
        data-testId="content-editable"
        className="contentEditable"
        html={footerText}
        disabled={!edit}
        onChange={handleTextChange}
        onBlur={sendFooterText}
        tagName="div"
        data-placeholder="Enter Your Text Here"
      />
    </div>
  );
}
export default EditFootNote;

EditFootNote.propTypes = {
  item: PropTypes.isRequired,
  index: PropTypes.isRequired,
  content: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  footNoteData: PropTypes.isRequired,
  setFootnoteData: PropTypes.isRequired,
  unitTesting: PropTypes.isRequired,
};
