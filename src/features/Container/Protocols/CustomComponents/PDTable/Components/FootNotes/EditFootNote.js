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

  const sendFooterText = (text, indexValue, id) => {
    const checkIfExist = footNoteData.find(
      (notes, index) => index === indexValue,
    );
    if (checkIfExist.length !== 0 && isEmpty(text)) {
      if (id) {
        setFootnoteData((prevState) =>
          prevState.map((item, i) => {
            if (i === indexValue) {
              return {
                ...item,
                Text: text,
                qc_change_type_footnote: 'delete',
              };
            }
            return item;
          }),
        );
      } else {
        setFootnoteData(
          footNoteData.filter((notes, index) => index !== indexValue),
        );
      }
    } else {
      setFootnoteData((prevState) =>
        prevState.map((item, i) => {
          if (i === indexValue) {
            return {
              ...item,
              Text: text,
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
    <div className="format-container">
      <ContentEditable
        className="contentEditable"
        html={footerText}
        disabled={!edit}
        onChange={handleTextChange}
        onBlur={(e) =>
          sendFooterText(
            footerText ? e.target.innerHTML : '',
            index,
            item?.AttachmentId,
          )
        }
        tagName="div"
        data-placeholder="Enter Your Text Here"
        data-testId="contentEdit"
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
