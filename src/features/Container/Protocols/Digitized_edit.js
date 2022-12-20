import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField';
import './Digitized_edit.scss';

const Edit =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

function MultilineEdit({ value, setValue, getedited }) {
  const [editingValue, setEditingValue] = useState(value);
  const [text, setText] = useState(Edit);

  const onChange = (event) => {
    setText(event.target.value);
  };

  const onInput = useCallback((target) => {
    if (target.scrollHeight > 33) {
      target.style.height = '5px';
      target.style.height = `${target.scrollHeight - 16}px`;
    }
  });

  const textareaRef = useRef();

  useEffect(() => {
    onInput(textareaRef.current);
  }, [onInput, textareaRef]);

  return (
    <div className="edited-text">
      <TextField
        rows={1}
        value={text}
        onChange={(e) => {
          onChange(e);
        }}
        onInput={(event) => onInput(event.target)}
        ref={textareaRef}
        sizeAdjustable
        minWidth={600}
        minHeight={180}
        fullWidth
        overflow-y="Scroll"
      />
      {/* <Check onClick={() => getedited(false)} /> */}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  value: PropTypes.isRequired,
  setValue: PropTypes.isRequired,
  getedited: PropTypes.isRequired,
};
