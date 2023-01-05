import { useEffect, useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import FontProperties from './FontProperties';

function ContentEdit({
  edit,
  lineID,
  setActiveLineID,
  activeLineID,
  handleContentEdit,
  content,
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
  const contentClick = (lineID, e) => {
    currentEditData.current = text;
    setActiveLineID(lineID, e);
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
  return (
    <div className="format-container">
      <ContentEditable
        className={'contentEditable'}
        html={currentLineID.current === lineID ? currentEditData.current : text}
        disabled={lineID !== activeLineID}
        onChange={(event) => handleChange(event.target.value, lineID)}
        onBlur={handleBlur}
        tagName="div"
        onClick={(e) => contentClick(lineID, e)}
        data-placeholder
      />
      {lineID === activeLineID && <FontProperties onClick={handleClickChild} />}
    </div>
  );
}
export default ContentEdit;
