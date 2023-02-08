import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import EditFootNote from './EditFootNote';

function FootNotes({ footNoteData, tableProperties, edit, setFootnoteData }) {
  const [activeLineID, setActiveLineID] = useState('');
  const tableId = tableProperties?.[0]?.['1.0']?.roi_id?.table_roi_id;

  const sendFooterText = (text, indexValue) => {
    if (footNoteData.length === 0) {
      // console.log('inside if');
      setFootnoteData([
        ...footNoteData,
        {
          Text: text,
          TableId: tableId,
          AttachmentId: '',
          qc_change_type_footnote: 'add',
        },
      ]);
    } else {
      // console.log('inside else');
      setFootnoteData((prevState) =>
        prevState.map((item, i) => {
          if (i === indexValue) {
            return {
              ...item,
              Text: text,
              TableId: tableId,
              AttachmentId: item?.AttachmentId || '',
              qc_change_type_footnote: item?.AttachmentId ? 'modify' : 'add',
            };
          }
          return item;
        }),
      );
    }
  };

  return (
    <div>
      {(edit || footNoteData.length > 0) && <h6>FootNotes: </h6>}
      {footNoteData.length === 0 && (
        <EditFootNote
          key={uuidv4()}
          content=""
          edit={edit}
          lineID=""
          activeLineID={activeLineID}
          sendFooterText={(e) => sendFooterText(e.target.innerText, 0)}
          className="line-content edit-text-con"
        />
      )}
      {footNoteData?.map((item, index) => {
        return (
          // eslint-disable-next-line
          <div onClick={() => edit && setActiveLineID(index)}>
            <EditFootNote
              key={uuidv4()}
              content={item?.Text}
              edit={edit}
              lineID={item?.AttachmentId}
              activeLineID={activeLineID}
              sendFooterText={(e) => sendFooterText(e.target.innerText, index)}
              className="line-content edit-text-con"
            />
          </div>
        );
      })}
    </div>
  );
}

export default FootNotes;

FootNotes.propTypes = {
  tableProperties: PropTypes.isRequired,
  footNoteData: PropTypes.isRequired,
  setFootnoteData: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
