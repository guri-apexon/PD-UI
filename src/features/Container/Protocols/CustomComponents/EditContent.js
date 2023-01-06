import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import FontProperties from './FontProperties';

import { updateSectionData } from '../protocolSlice';

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

  const handleChange = (e) => {
    setText(e.target.value);
    // currentEditData.current = value;
    // currentLineID.current = id;
    // setCurrentLineID(id);
  };
  const handleBlur = () => {
    console.log(contentEditableRef.current.innerHTML); // Correct value
    console.log(text);
    // handleContentEdit(contentEditableRef.current.innerHTML, lineID);
    const obj = {
      type: 'modify',
      lineId: lineID,
      content: contentEditableRef.current.innerHTML,
    };
    dispatch(updateSectionData(obj));
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
