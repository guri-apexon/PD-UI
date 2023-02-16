import React from 'react';
import './table.scss';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import EmptyRowCells from './EmptyRows';
import FootNotes from './FootNotes/Footnotes';
import { tableOperations } from './dropdownData';

function DisplayTable({
  data,
  onChange,
  handleRowOperation,
  edit,
  colWidth,
  footNoteData,
  setFootnoteData,
  handleSwap,
}) {
  const handleChange = (columnIndex, rowIndex, e) => {
    onChange(e.target.innerHTML, columnIndex, rowIndex);
  };

  const handleDrag = (e) => {
    e.dataTransfer.setData('selectedId', e.target.id);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const clone = e.target.cloneNode(true);
    const draggedId = e.dataTransfer.getData('selectedId');
    const checkIfRowSwap = clone.id.split('-')[1] !== draggedId.split('-')[1];
    if (clone.id !== draggedId) {
      if (checkIfRowSwap) {
        handleSwap(tableOperations.swapRow, {
          sourceIndex: parseInt(draggedId.split('-')[1], 10),
          targetIndex: parseInt(clone.id.split('-')[1], 10),
        });
      } else {
        handleSwap(tableOperations.swapColumn, {
          sourceIndex: parseFloat(draggedId.split('-')[2]).toFixed(1),
          targetIndex: parseFloat(clone.id.split('-')[2]).toFixed(1),
        });
      }
    }
  };
  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pd-table-inner">
      {data.map((row, rowIndex) => (
        <div key={uuidv4()} className="pd-table-empty-cell-row">
          {edit && (
            <EmptyRowCells
              rowIndex={rowIndex}
              handleOperation={handleRowOperation}
              index={rowIndex}
            />
          )}
          <div
            id={`divId-${rowIndex}`}
            className="pd-table-row"
            draggable
            onDragStart={handleDrag}
            onDrop={handleDrop}
            onDragOver={allowDrop}
          >
            {Object.keys(row).map((key) => (
              <div
                id={`divId-${rowIndex}-${key}`}
                draggable
                onDragStart={handleDrag}
                onDrop={handleDrop}
                onDragOver={allowDrop}
                key={uuidv4()}
                className="pd-table-cell"
                style={{ width: `${colWidth}%` }}
              >
                <span
                  id={`divId-${rowIndex}-${key}`}
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
  handleSwap: PropTypes.isRequired,
};
