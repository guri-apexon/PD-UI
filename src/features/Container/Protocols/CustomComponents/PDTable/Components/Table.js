import React from 'react';
import './table.scss';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import EmptyRowCells from './EmptyRows';
import FootNotes from './FootNotes/Footnotes';
import EmptyColumnCells from './EmptyColumns';

function DisplayTable({
  data,
  onChange,
  handleRowOperation,
  edit,
  colWidth,
  footNoteData,
  setFootnoteData,
  handleColumnOperation,
  columnLength,
}) {
  const handleChange = (columnIndex, rowIndex, e) => {
    onChange(e.target.innerHTML, columnIndex, rowIndex);
  };

  return (
    <div className="pd-table-inner">
      {data.map((row, rowIndex) => (
        <div key={uuidv4()} className="pd-table-empty-cell-row">
          {edit && (
            <EmptyColumnCells
              columnLength={columnLength}
              handleOperation={handleColumnOperation}
              colWidth={colWidth}
            />
          )}
          {edit && (
            <EmptyRowCells
              rowIndex={rowIndex}
              handleOperation={handleRowOperation}
              index={rowIndex}
            />
          )}
          <div className="pd-table-row">
            {Object.keys(row).map((key) => (
              <div
                key={uuidv4()}
                className="pd-table-cell"
                style={{ width: `${colWidth}%` }}
              >
                <span
                  // eslint-disable-next-line
                  dangerouslySetInnerHTML={{ __html: row[key].content }}
                  contentEditable={edit}
                  onBlur={(e) => handleChange(key, rowIndex, e)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <FootNotes
        edit={edit}
        footNoteData={footNoteData}
        setFootnoteData={setFootnoteData}
      />
    </div>
  );
}
export default React.memo(DisplayTable);

DisplayTable.propTypes = {
  data: PropTypes.isRequired,
  onChange: PropTypes.isRequired,
  handleRowOperation: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  colWidth: PropTypes.isRequired,
  footNoteData: PropTypes.isRequired,
  setFootnoteData: PropTypes.isRequired,
  handleColumnOperation: PropTypes.isRequired,
  columnLength: PropTypes.isRequired,
};
