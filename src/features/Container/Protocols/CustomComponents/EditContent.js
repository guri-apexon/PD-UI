import { useContext, useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import FontProperties from './FontProperties/FontProperties';

import { updateSectionData } from '../protocolSlice';
import ProtocolContext from '../ProtocolContext';

function ContentEdit({
  type,
  lineID,
  activeLineID,
  handleContentEdit,
  content,
  deleteSection,
  edit,
}) {
  const dispatch = useDispatch();
  const [text, setText] = useState(content);
  const contentEditableRef = useRef();
  const { selectedSection, dispatchSectionEvent } = useContext(ProtocolContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleBlur = () => {
    const obj = {
      type: 'modify',
      lineId: lineID,
      content: contentEditableRef.current.innerHTML,
    };
    dispatchSectionEvent('CONTENT_UPDATE', obj);
    // currentEditData.current = text;
    // currentLineID.current = lineID;

    // setCurrentLineID("");
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
  activeLineID: PropTypes.isRequired,
  content: PropTypes.isRequired,
  handleContentEdit: PropTypes.isRequired,
  deleteSection: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
