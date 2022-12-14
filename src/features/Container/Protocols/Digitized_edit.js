import { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

function MultilineEdit({ value, setValue }) {
  const [editingValue, setEditingValue] = useState(value);

  const onChange = (event) => setEditingValue(event.target.value);

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.target.blur();
    }
  };

  const onBlur = (event) => {
    if (event.target.value.trim() === '') {
      setEditingValue(value);
    } else {
      setValue(event.target.value);
    }
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
    <textarea
      rows={1}
      aria-label="Field name"
      value={editingValue}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onInput={(event) => onInput(event.target)}
      ref={textareaRef}
    />
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  value: PropTypes.isRequired,
  setValue: PropTypes.isRequired,
};
