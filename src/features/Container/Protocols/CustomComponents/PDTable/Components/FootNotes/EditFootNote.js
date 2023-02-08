import { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';

function EditFootNote({ content, edit, sendFooterText }) {
  const [footerText, setFooterText] = useState(content);

  const handleTextChange = (e) => {
    setFooterText(e.target.value);
  };

  return (
    <div className="format-container">
      <ContentEditable
        className="contentEditable"
        html={footerText}
        disabled={!edit}
        onChange={handleTextChange}
        onBlur={(e) => sendFooterText(e, footerText)}
        tagName="div"
        data-placeholder
        data-testId="contentEdit"
      />
    </div>
  );
}
export default EditFootNote;

EditFootNote.propTypes = {
  content: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  sendFooterText: PropTypes.isRequired,
};
