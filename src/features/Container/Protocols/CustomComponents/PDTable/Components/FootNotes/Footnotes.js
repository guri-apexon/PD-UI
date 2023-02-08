import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import EditFootNote from './EditFootNote';

function FootNotes({ footNoteData, edit, setFootnoteData }) {
  const [activeLineID, setActiveLineID] = useState('');

  return (
    <div className="edit-container">
      {/* eslint-disable-next-line */}
      {footNoteData?.map((item, index) => {
        if (item?.qc_change_type_footnote !== 'delete') {
          return (
            // eslint-disable-next-line
            <div onClick={() => edit && setActiveLineID(index)}>
              <EditFootNote
                key={uuidv4()}
                item={item}
                index={index}
                content={item?.Text}
                edit={edit}
                footNoteData={footNoteData}
                lineID={item?.AttachmentId}
                activeLineID={activeLineID}
                setFootnoteData={setFootnoteData}
                className="line-content edit-text-con"
              />
            </div>
          );
        }
      })}
    </div>
  );
}

export default FootNotes;

FootNotes.propTypes = {
  footNoteData: PropTypes.isRequired,
  setFootnoteData: PropTypes.isRequired,
  edit: PropTypes.isRequired,
};
