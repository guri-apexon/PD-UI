/* eslint-disable react/button-has-type */
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import { BoldExtension } from 'remirror/extensions';
import {
  Remirror,
  useHelpers,
  useKeymap,
  useRemirror,
  useRemirrorContext,
} from '@remirror/react';
import { Editor } from '@tinymce/tinymce-react';

import HoverComponent from '../CustomComponents/HoverComponent';
import RenderContent from '../CustomComponents/RenderContent';
import './Digitized_edit.scss';

import {
  updateContent,
  addContent,
  markContentForDelete,
} from '../../../../utils/utilFunction';

import { setSectionDetails } from '../protocolSlice';
import SAMPLE_DOC from './data.json';

const hooks = [
  () => {
    const { getJSON } = useHelpers();

    const handleSaveShortcut = useCallback(
      ({ state }) => {
        console.log(`Save to backend: ${JSON.stringify(getJSON(state))}`);

        return true; // Prevents any further key handlers from being run.
      },
      [getJSON],
    );

    // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
    useKeymap('Mod-s', handleSaveShortcut);
  },
];

function LoadButton() {
  console.log('SAMPLE_DOC', SAMPLE_DOC);
  const { setContent } = useRemirrorContext();
  const handleClick = useCallback(() => setContent(SAMPLE_DOC), [setContent]);

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleClick}
    >
      Load
    </button>
  );
}

function SaveButton() {
  const { getJSON } = useHelpers();
  const handleClick = useCallback(() => console.log(getJSON()), [getJSON]);
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleClick}
    >
      Save
    </button>
  );
}
function MultilineEdit({ data, edit }) {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension()],
  });
  const dispatch = useDispatch();
  const [activeLineID, setActiveLineID] = useState('');

  const sectionName = null;

  const handleAddSegment = (obj, lineId) => () => {
    const arr = addContent(data, obj, lineId);
    dispatch(setSectionDetails(arr));
  };

  const handleContentEdit = (value, lineId) => {
    const obj = {
      type: 'modify',
      lineId,
      sectionName,
      content: value,
    };
    const arr = updateContent(data, obj);
    dispatch(setSectionDetails(arr));
  };

  const deleteSection = (lineId) => {
    const arr = markContentForDelete(data, lineId);
    dispatch(setSectionDetails(arr));
  };
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent({ format: 'text' }));
    }
  };
  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      <Remirror manager={manager} initialContent={state} hooks={hooks}>
        <WysiwygEditor placeholder="Enter text...">
          <SaveButton />
          <LoadButton />
        </WysiwygEditor>
      </Remirror>
      {/* <Editor
        // eslint-disable-next-line no-return-assign
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log}>Log editor content</button> */}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
