import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import FontProperties from './FontProperties';

function ContentEdit({
  type,
  lineID,
  activeLineID,
  handleContentEdit,
  content,
  deleteSection,
}) {
  const [text, setText] = useState('');
  const currentEditData = useRef('');
  const currentLineID = useRef('');
  useEffect(() => {
    setText(content);
  }, [content]);

  const handleChange = (value, id) => {
    currentEditData.current = value;
    currentLineID.current = id;
    // setCurrentLineID(id);
  };
  const handleBlur = () => {
    handleContentEdit(currentEditData.current, currentLineID.current);
    currentEditData.current = '';
    currentLineID.current = '';
    // setCurrentLineID("");
  };

  const handleClickChild = (item, type) => {
    if (type === 'symbol') {
      if (currentEditData.current) {
        const newText = `${currentEditData.current} ${item.name}`;
        currentEditData.current = newText;
      } else {
        const newText = `${text} ${item.name}`;
        setText(newText);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (
      [46, 8].includes(e.keyCode) &&
      (e.target.value === '' || !e.target.value)
    ) {
      deleteSection(lineID);
    }
  };

  return (
    <div className="format-container">
      <ContentEditable
        className={`contentEditable ${
          type === 'header' ? 'content_header' : null
        }`}
        html={currentLineID.current === lineID ? currentEditData.current : text}
        disabled={lineID !== activeLineID}
        onChange={(event) => handleChange(event.target.value, lineID)}
        onBlur={handleBlur}
        tagName="div"
        // onClick={(e) => contentClick(lineID, e)}
        onKeyDown={handleKeyDown}
        data-placeholder
      />
      {lineID === activeLineID && <FontProperties onClick={handleClickChild} />}
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
};
