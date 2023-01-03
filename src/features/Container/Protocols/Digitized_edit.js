import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import {
  Editor,
  EditorState,
  convertFromRaw,
  AtomicBlockUtils,
} from 'draft-js';
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

function MultilineEdit({ data }) {
  const fileRef = useRef();
  const [value, setValue] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  console.log({ data });

  useEffect(() => {
    if (data?.length > 0) {
      const arr = data.map((val, index) => ({
        key: index.toString(),
        text: val.content,
        type: 'LeftAlignedBlock',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      }));
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw({ blocks: arr, entityMap: {} }),
        ),
      );
      // setValue({ blocks: arr, entityMap: {} });
    }
  }, [data]);

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const handleChangedRichTextEditor = (text) => {
    console.log({ text });
  };

  const onFileChange = (e) => {
    console.log('fileChange', URL.createObjectURL(e.target.files[0]));
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: URL.createObjectURL(e.target.files[0]) },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {value && (
        <Editor
          // defaultValue={value}
          editorState={editorState}
          // value={value}
          onChange={handleChangedRichTextEditor}
          // eslint-disable-next-line
          customControllers={(editorState, onChange) => (
            <>
              <div className="style-button-group">
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onFileChange}
                  ref={fileRef}
                />
                <ImageIcon
                  className="icon-button"
                  onClick={() => {
                    fileRef.current.click();
                    // const undoState = EditorState.undo(editorState);
                    // onChange(undoState);
                  }}
                />
              </div>
              <div className="style-button-group">
                <Undo
                  className="icon-button"
                  onClick={() => {
                    const undoState = EditorState.undo(editorState);
                    onChange(undoState);
                  }}
                />
              </div>
              <div className="style-button-group">
                <Redo
                  className="icon-button"
                  onClick={() => {
                    const redoState = EditorState.redo(editorState);
                    onChange(redoState);
                  }}
                />
              </div>
            </>
          )}
        />
      )}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
