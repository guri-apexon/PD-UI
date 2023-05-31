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
  handleCurrentLine,
  forwardedRef,
}) {
  const [text, setText] = useState(content);
  // const contentEditableRef = useRef();
  const { dispatchSectionEvent, setSaveEnabled } = useProtContext();

  const handleChange = (e) => {
    setSaveEnabled(true);
    setText(e.target.value);
    handleCurrentLine();
  };
  const handleBlur = () => {
    console.log('SHUBHAM Ref', forwardedRef.current);
    if (content !== forwardedRef.current.innerHTML) {
      const obj = {
        currentLineId: lineID,
        content: forwardedRef.current.innerHTML,
      };
      dispatchSectionEvent('CONTENT_UPDATE', obj);
    }
  };

  useEffect(() => {
    setText(content);
  }, [content]);

  return (
    <div className="format-container">
      <ContentEditable
        // innerRef={contentEditableRef}
        ref={forwardedRef}
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
  handleCurrentLine: PropTypes.isRequired,
  forwardedRef: PropTypes.isRequired,
};
