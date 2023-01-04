import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ImageTool from '@editorjs/image';
import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS, defaultValue } from './constants';
// or if you inject ImageTool via standalone script
import './Digitized_edit.scss';

const ReactEditorJS = createReactEditorJS();

const tools = {
  ...EDITOR_JS_TOOLS,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
        byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      },
    },
  },
};

function MultilineEdit({ data }) {
  const editorRef = useRef(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const blocks = data.map((val) => ({
        id: val.line_id,
        type: val?.font_info?.font_style.includes('Heading')
          ? 'header'
          : 'paragraph',
        data: {
          text: val.content,
        },
      }));

      setValue({ blocks });
    }
  }, [data]);

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const handleInitialize = (instance) => {
    editorRef.current = instance;
  };

  console.log(editorRef?.current);

  const handleSave = async () => {
    try {
      const savedData = await editorRef?.current?.save();
      console.log({ savedData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      <button onClick={handleSave}>Save</button>
      {value && (
        <ReactEditorJS
          tools={tools}
          // defaultValue={value}
          data={value}
          onInitialize={handleInitialize}
        />
      )}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
