import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import { useProtContext } from '../ProtocolContext';

function ContentEdit({
  type,
  lineID,
  content,
  edit,
  activeLineID,
  handleCurrentContent,
}) {
  const [text, setText] = useState(content);
  const contentEditableRef = useRef();
  const { dispatchSectionEvent, setSaveEnabled } = useProtContext();

  const handleChange = (e) => {
    setSaveEnabled(true);
    setText(e.target.value);
  };
  const handleBlur = () => {
    if (content !== contentEditableRef.current.innerHTML) {
      const obj = {
        currentLineId: lineID,
        content: contentEditableRef.current.innerHTML,
      };
      handleCurrentContent(contentEditableRef);
      dispatchSectionEvent('CONTENT_UPDATE', obj);
    }
  };

  useEffect(() => {
    setText(content);
  }, [content]);

  return (
    <div className="format-container">
      <ContentEditable
        innerRef={contentEditableRef}
        className={`contentEditable ${
          type === 'header' ? 'content_header' : 'editable'
        }`}
        html={text}
        disabled={!edit}
        onChange={handleChange}
        onBlur={handleBlur}
        tagName="div"
        data-placeholder={activeLineID ? 'Edit Your Text Here' : ''}
        data-testId="contentEdit"
      />
    </div>
  );
}
export default ContentEdit;

ContentEdit.propTypes = {
  type: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  content: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  handleCurrentContent: PropTypes.isRequired,
};
