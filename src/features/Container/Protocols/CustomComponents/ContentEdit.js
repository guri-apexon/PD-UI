import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import { useProtContext } from '../ProtocolContext';
import { CONTENT_TYPE } from '../../../../AppConstant/AppConstant';

function ContentEdit({ type, lineID, content, edit, activeLineID, setRef }) {
  const [text, setText] = useState(content);
  const contentEditableRef = useRef();
  const { dispatchSectionEvent, setSaveEnabled } = useProtContext();

  const handleHeader = (val) => {
    if (type === CONTENT_TYPE.HEADER && val === '') {
      val = '<h2></h2>';
      const obj = {
        currentLineId: lineID,
        content: '<h2></h2>',
      };
      dispatchSectionEvent('CONTENT_UPDATE', obj);
    }
    return val;
  };

  const handleChange = (e) => {
    const content = handleHeader(e.target.value);
    setText(content);
    setSaveEnabled(true);
  };

  const handleFocus = (e) => {
    handleHeader(e.target.innerText);
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

  useEffect(() => {
    setText(content);
  }, [content]);

  return (
    <div className="format-container">
      <ContentEditable
        innerRef={contentEditableRef}
        ref={setRef(lineID)}
        className={`contentEditable ${
          type === 'header' ? 'content_header' : 'editable'
        }`}
        html={text}
        disabled={!edit}
        onChange={handleChange}
        onFocus={handleFocus}
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
  setRef: PropTypes.isRequired,
};
