import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import RichTextEditor from 'apollo-react/components/RichTextEditor';
import TextField from 'apollo-react/components/TextField';
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
    {
      key: 'ehjdh',
      text: 'Lorem ipsum dolor sit amet,',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: '4blls',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis sem et.',
      type: 'LeftAlignedBlock',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
};

function MultilineEdit({ data }) {
  const [value, setValue] = useState(sample);

  console.log({ data });

  useEffect(() => {
    if (data?.length > 0) {
      console.log('if');
      const arr = data.map((val, index) => {
        return {
          key: index,
          text: val.content,
          type: 'RightAlignedBlock',
          depth: 0,
          inlineStyleRanges: [
            { offset: 0, length: 18, style: 'fontFamily-Arial Black' },
          ],
          entityRanges: [],
          data: {},
        };
      });
      setValue({ blocks: arr, entityMap: {} });
    }
  }, [data]);

  useEffect(() => {
    console.log({ value });
  }, [value]);

  // const onInput = useCallback((target) => {
  //   if (target.scrollHeight > 33) {
  //     target.style.height = '5px';
  //     target.style.height = `${target.scrollHeight - 16}px`;
  //   }
  // }, []);

  const textareaRef = useRef();

  // useEffect(() => {
  //   onInput(textareaRef.current);
  // }, [onInput, textareaRef]);

  const handleChangedRichTextEditor = (text) => {
    console.log({ text });
  };

  return (
    <div className="Richtextcontainer">
      <RichTextEditor
        // placeholder="Start typing your story..."
        // variant={editor}
        defaultValue={sample}
        // value={value}
        onChange={handleChangedRichTextEditor}
      />
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
