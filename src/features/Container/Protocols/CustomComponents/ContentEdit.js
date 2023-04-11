import { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useProtContext } from '../ProtocolContext';
import { setSaveEnabled } from '../protocolSlice';

function ContentEdit({ type, lineID, content, edit, activeLineID }) {
  const dispatch = useDispatch();
  const [text, setText] = useState(content);
  const contentEditableRef = useRef();
  const { dispatchSectionEvent } = useProtContext();

  const handleChange = (e) => {
    dispatch(setSaveEnabled(true));
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
};
