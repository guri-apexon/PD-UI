import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import ContentEditable from 'react-contenteditable';
// import {
//   Editor,
//   EditorState,
//   convertFromRaw,
//   AtomicBlockUtils,
// } from 'draft-js';
import ImageIcon from 'apollo-react-icons/Image';
import Redo from 'apollo-react-icons/Redo';
import Undo from 'apollo-react-icons/Undo';
import './Digitized_edit.scss';

const sample = {
  blocks: [
    {
      key: '50d3j',
      text: 'This is an Example',
      type: 'RightAlignedBlock',
      depth: 0,
      inlineStyleRanges: [
        { offset: 0, length: 18, style: 'fontFamily-Arial Black' },
      ],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

function ActionButton(props) {
  return (
    <button
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}

function MultilineEdit({ data }) {
  const [html, setHtml] = useState('');
  const [editable, setEditable] = useState(false);

  const handleChange = (evt) => {
    setHtml(evt.target.value);
  };

  const sanitizeConf = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1'],
    allowedAttributes: { a: ['href'] },
  };

  const sanitize = () => {
    // setHtml(sanitizeHtml(html, sanitizeConf));
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const fileRef = useRef();
  const [value, setValue] = useState(null);
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  console.log({ data });

  useEffect(() => {
    let elem = '';
    if (data?.length > 0) {
      data.forEach((val) => (elem += `<p>${val.content}</p>`));
      // setEditorState(
      //   EditorState.createWithContent(
      //     convertFromRaw({ blocks: arr, entityMap: {} }),
      //   ),
      // );
      // setValue({ blocks: arr, entityMap: {} });
      setHtml(elem);
    }
  }, [data]);

  // const handleChangedRichTextEditor = (text) => {
  //   console.log({ text });
  // };

  const onFileChange = (e) => {
    console.log('fileChange', URL.createObjectURL(e.target.files[0]));
    document.execCommand(
      'insertImage',
      false,
      URL.createObjectURL(e.target.files[0]),
    );
  };

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {/* {value && ( */}
      <ContentEditable
        className="editable"
        tagName="pre"
        html={html} // innerHTML of the editable div
        disabled={editable} // use true to disable edition
        onChange={handleChange} // handle innerHTML change
        // onBlur={sanitize}
      />

      <ActionButton cmd="italic" />
      <ActionButton cmd="bold" />
      <ActionButton cmd="formatBlock" arg="h1" name="heading" />

      <ActionButton
        cmd="createLink"
        arg="https://github.com/lovasoa/react-contenteditable"
        name="hyperlink"
      />

      <ActionButton cmd="subscript" />
      <ActionButton cmd="superscript" />

      <ActionButton cmd="undo" />
      <ActionButton cmd="redo" />

      <ActionButton cmd="justifyCenter" />

      <ActionButton cmd="justifyFull" />

      <ActionButton cmd="justifyLeft" />

      <ActionButton cmd="justifyRight" />

      <ActionButton cmd="insertImage" />

      <input
        type="file"
        style={{ display: 'none' }}
        onChange={(evt) => {
          evt.preventDefault();
          onFileChange(evt);
        }}
        ref={fileRef}
      />
      <button
        className="icon-button"
        onMouseDown={(evt) => {
          evt.preventDefault();
          fileRef.current.click();
        }}
      />
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
