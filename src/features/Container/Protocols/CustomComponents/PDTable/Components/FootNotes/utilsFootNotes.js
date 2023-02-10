/* eslint-disable import/prefer-default-export */
export const setFootnoteDataUtilsFun = ({
  item,
  setFootnoteData,
  footNoteData,
  index,
  textData,
  QC_CHANGE_TYPE,
}) => {
  if (item?.AttachmentId) {
    setFootnoteData(
      [...footNoteData].map((item, i) => {
        if (i === index) {
          return {
            ...item,
            Text: textData || '',
            qc_change_type_footnote: QC_CHANGE_TYPE.DELETED,
          };
        }
        return item;
      }),
    );
  } else {
    setFootnoteData(footNoteData.filter((notes, i) => i !== index));
  }
};
