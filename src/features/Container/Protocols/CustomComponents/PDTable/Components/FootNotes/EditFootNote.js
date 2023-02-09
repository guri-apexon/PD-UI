import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

function EditFootNote({
  item,
  index,
  content,
  edit,
  footNoteData,
  setFootnoteData,
}) {
  const [footerText, setFooterText] = useState(content);

  const handleTextChange = (e) => {
    setFooterText(e.target.value);
  };

  const sendFooterText = (e) => {
    const checkIfExist = footNoteData.find((notes, i) => i === index);
    const textData = footerText ? e.target.innerHTML : '';
    if (checkIfExist.length !== 0 && isEmpty(textData)) {
      if (item?.AttachmentId) {
        setFootnoteData((prevState) =>
          prevState.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                Text: textData,
                qc_change_type_footnote: 'delete',
              };
            }
            return item;
          }),
        );
      } else {
        setFootnoteData(footNoteData.filter((notes, i) => i !== index));
      }
    } else {
      setFootnoteData((prevState) =>
        prevState.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              Text: textData,
              AttachmentId: item?.AttachmentId || '',
              qc_change_type_footnote: item?.AttachmentId ? 'modify' : 'add',
            };
          }
          return item;
        }),
      );
    }
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
};
