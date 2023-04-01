import React from 'react';
import './table.scss';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import EllipsisHorizontal from 'apollo-react-icons/EllipsisHorizontal';
import EmptyRows from './EmptyRows';
import FootNotes from './FootNotes/Footnotes';
import EmptyColumns from './EmptyColumns';
import { tableOperations } from './dropdownData';
import { QC_CHANGE_TYPE } from '../../../../../../AppConstant/AppConstant';

function DisplayTable({
  data,
  onChange,
  handleRowOperation,
  edit,
  colWidth,
  footNoteData,
  setFootnoteData,
  handleColumnOperation,
  handleSwap,
}) {
  const handleChange = (columnIndex, rowIndex, e) => {
    onChange(e.target.innerHTML, columnIndex, rowIndex);
  };

  const handleDrag = (e) => {
    e.dataTransfer?.setData('selectedId', e.target.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const clone = e.target.cloneNode(true);
    const draggedId = e.dataTransfer?.getData('selectedId');
    if (draggedId) {
      const checkIfRowSwap = clone.id.split('-')[0] !== draggedId.split('-')[0];
      if (clone?.id && clone?.id !== draggedId) {
        if (checkIfRowSwap) {
          handleSwap(tableOperations.swapRow, {
            sourceIndex: draggedId.split('-')[1],
            targetIndex: clone.id.split('-')[1],
          });
        } else {
          handleSwap(tableOperations.swapColumn, {
            sourceIndex: draggedId.split('-')[2],
            targetIndex: clone.id.split('-')[2],
          });
        }
      }
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pd-table-wrapper">
      <div className="pd-table-inner">
        {edit && (
          <EmptyColumns
            columnIndexes={data[0].columns}
            handleOperation={handleColumnOperation}
            colWidth={colWidth}
          />
        )}
        {data?.map((row, rowIndex) => (
          <div key={uuidv4()} className="pd-table-empty-cell-row">
            {edit && (
              <EmptyRows
                rowIndex={rowIndex}
                handleOperation={handleRowOperation}
                index={rowIndex}
              />
            )}
            <div
              className="pd-table-row"
              id={`rowID-${rowIndex}`}
              draggable
              onDragStart={handleDrag}
              onDrop={handleDrop}
              onDragOver={allowDrop}
            >
              {edit && (
                <span className="pd-drag-icon rowDrag">
                  <EllipsisVertical />
                </span>
              )}
              {row.columns.map(
                (col, colIndex) =>
                  col?.op_type !== QC_CHANGE_TYPE.DELETED && (
                    <div
                      key={uuidv4()}
                      id={`columnID-${rowIndex}-${colIndex}`}
                      draggable
                      onDragStart={handleDrag}
                      onDrop={handleDrop}
                      onDragOver={allowDrop}
                      className="pd-table-cell"
                      style={{ width: `${colWidth}%` }}
                    >
                      {rowIndex === 0 && edit && (
                        <span
                          className="pd-drag-icon columnDrag"
                          data-testId="draggable"
                        >
                          <EllipsisHorizontal />
                        </span>
                      )}
                      <span
                        id={`columnID-${rowIndex}-${colIndex}`}
                        className="editable-span"
                        // eslint-disable-next-line
                        dangerouslySetInnerHTML={{
                          __html: col.value,
                        }}
                        contentEditable={edit}
                        onBlur={(e) => handleChange(colIndex, rowIndex, e)}
                      />
                    </div>
                  ),
              )}
            </div>
          </div>
        ))}
        <FootNotes
          edit={edit}
          footNoteData={footNoteData}
          setFootnoteData={setFootnoteData}
        />
      </div>
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
  handleSwap: PropTypes.isRequired,
};
