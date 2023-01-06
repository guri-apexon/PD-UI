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
  edit,
}) {
  const [text, setText] = useState(content);
  //   const currentEditData = useRef('');
  //   const currentLineID = useRef('');
  useEffect(() => {
    setText(content);
    // currentEditData.current = content;
    // currentLineID.current = lineID;
  }, [content]);

  const handleChange = (value, id) => {
    setText(value);
    // currentEditData.current = value;
    // currentLineID.current = id;
    // setCurrentLineID(id);
  };
  const handleBlur = () => {
    handleContentEdit(text, lineID);
    // currentEditData.current = text;
    // currentLineID.current = lineID;

    // setCurrentLineID("");
  };

  const handleClickChild = (item, type) => {
    // if (type === 'symbol') {
    //   if (currentEditData.current) {
    //     const newText = `${currentEditData.current} ${item.name}`;
    //     currentEditData.current = newText;
    //   } else {
    //     const newText = `${text} ${item.name}`;
    //     setText(newText);
    //   }
    // }
  };

  const handleKeyDown = (e) => {
    console.log({ text });
    // if (
    //   [46, 8].includes(e.keyCode) &&
    //   (e.target.value === '' || !e.target.value)
    // ) {
    //   deleteSection(lineID);
    // }
  };

  return (
    <div className="format-container">
      <ContentEditable
        className={`contentEditable ${
          type === 'header' ? 'content_header' : null
        }`}
        html={text}
        disabled={!edit}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        tagName="div"
        // onClick={(e) => contentClick(lineID, e)}
        onKeyDown={handleKeyDown}
        data-placeholder
      />
      {edit && lineID === activeLineID && (
        <FontProperties onClick={handleClickChild} />
      )}
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
