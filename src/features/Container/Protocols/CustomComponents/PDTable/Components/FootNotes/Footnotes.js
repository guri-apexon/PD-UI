import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import EditFootNote from './EditFootNote';

function FootNotes({ footNoteData, edit, setFootnoteData }) {
  const [activeLineID, setActiveLineID] = useState('');

  const sendFooterText = (text, indexValue, id) => {
    const checkIfExist = footNoteData.find(
      (notes, index) => index === indexValue,
    );
    if (checkIfExist.length !== 0 && isEmpty(text)) {
      if (id) {
        setFootnoteData((prevState) =>
          prevState.map((item, i) => {
            if (i === indexValue) {
              return {
                ...item,
                Text: text,
                qc_change_type_footnote: 'delete',
              };
            }
            return item;
          }),
        );
      } else {
        setFootnoteData(
          footNoteData.filter((notes, index) => index !== indexValue),
        );
      }
    } else {
      setFootnoteData((prevState) =>
        prevState.map((item, i) => {
          if (i === indexValue) {
            return {
              ...item,
              Text: text,
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
    <div className="edit-container">
      {/* eslint-disable-next-line */}
      {footNoteData?.map((item, index) => {
        if (item?.qc_change_type_footnote !== 'delete') {
          return (
            // eslint-disable-next-line
            <div onClick={() => edit && setActiveLineID(index)}>
              <EditFootNote
                key={uuidv4()}
                content={item?.Text}
                edit={edit}
                lineID={item?.AttachmentId}
                activeLineID={activeLineID}
                sendFooterText={(e, val) =>
                  sendFooterText(
                    val ? e.target.innerText : '',
                    index,
                    item?.AttachmentId,
                  )
                }
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
