import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'apollo-react/components/RichTextEditor';
import './Digitized_edit.scss';

function MultilineEdit({ data }) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (data?.length > 0) {
      const arr = data.map((val, index) => ({
        key: index,
        text: val.content,
        type: 'LeftAlignedBlock',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      }));
      setValue({ blocks: arr, entityMap: {} });
    }
  }, [data]);

  const handleChangedRichTextEditor = (text) => {
    console.log({ text });
  };

  return (
    <div className="Richtextcontainer" data-testId="richTextEditor">
      {value && (
        <RichTextEditor
          defaultValue={value}
          // value={value}
          onChange={handleChangedRichTextEditor}
        />
      )}
    </div>
  );
}
export default MultilineEdit;

MultilineEdit.propTypes = {
  data: PropTypes.isRequired,
};
