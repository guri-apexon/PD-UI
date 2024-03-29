import { useState, useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { QC_CHANGE_TYPE } from '../../../../../../../AppConstant/AppConstant';
import '../../../renderContent.scss';

function EditFootNote({
  item,
  index,
  content,
  edit,
  footNoteData,
  setFootnoteData,
}) {
  const [footerText, setFooterText] = useState(content);
  const contentEditableRef = useRef();
  const getFootNoteData = (textData) =>
    [...footNoteData].map((item, i) => {
      if (i === index) {
        return {
          ...item,
          Text: textData || '',
          qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
        };
      }
      return item;
    });

  const getQCChangeFootnote = (item) => {
    return item?.AttachmentId ? QC_CHANGE_TYPE.UPDATED : QC_CHANGE_TYPE.ADDED;
  };

  const getNotEmptyData = (textData) =>
    [...footNoteData].map((item, i) => {
      if (i === index) {
        return {
          ...item,
          Text: textData,
          AttachmentId: item?.AttachmentId || '',
          qc_change_type_footnote: getQCChangeFootnote(item),
        };
      }
      return item;
    });

  const sendFooterText = () => {
    const checkIfExist = footNoteData.find((notes, i) => i === index);
    const textData = contentEditableRef.current.innerHTML || footerText;
    if (checkIfExist && isEmpty(textData)) {
      if (item?.AttachmentId) {
        setFootnoteData(getFootNoteData(textData));
      } else {
        setFootnoteData(footNoteData.filter((notes, i) => i !== index));
      }
    } else {
      setFootnoteData(getNotEmptyData(textData));
    }
  };

  const handleTextChange = (e) => {
    setFooterText(e.target.value);
  };

  return (
    <div className="format-container" data-testId="content-edit">
      <ContentEditable
        innerRef={contentEditableRef}
        className="contentEditable editable"
        data-testId="content-editable"
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
};
