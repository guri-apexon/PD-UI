import { useContext, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import { ProtocolContext, useProtContext } from '../ProtocolContext';

function ContentEdit({ type, lineID, content, deleteSection, edit }) {
  const [text, setText] = useState(content);
  const contentEditableRef = useRef();
  const { dispatchSectionEvent } = useProtContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleBlur = () => {
    if (content !== contentEditableRef.current.innerHTML) {
      const obj = {
        currentLineId: lineID,
        content: contentEditableRef.current.innerHTML,
      };
      dispatchSectionEvent('CONTENT_UPDATE', obj);
    }
  };

  const handleKeyDown = (e) => {
    if (
      [46, 8].includes(e.keyCode) &&
      (contentEditableRef.current.innerHTML === '' ||
        !contentEditableRef.current.innerHTML)
    ) {
      deleteSection(lineID);
    }
  };

  return (
    <div className="format-container">
      <ContentEditable
        innerRef={contentEditableRef}
        className={`contentEditable ${
          type === 'header' ? 'content_header' : null
        }`}
        html={text}
        disabled={!edit}
        onChange={handleChange}
        onBlur={handleBlur}
        tagName="div"
        // onClick={(e) => contentClick(lineID, e)}
        onKeyDown={handleKeyDown}
        data-placeholder
      />
    </div>
  );
}
export default ContentEdit;

ContentEdit.propTypes = {
  type: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  content: PropTypes.isRequired,
  deleteSection: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
