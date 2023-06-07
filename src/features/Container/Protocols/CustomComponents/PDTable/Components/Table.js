import EllipsisHorizontal from 'apollo-react-icons/EllipsisHorizontal';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import PropTypes from 'prop-types';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../../../AppConstant/AppConstant';
import { getPreferredTerms } from '../utils';
import EmptyColumns from './EmptyColumns';
import EmptyRows from './EmptyRows';
import FootNotes from './FootNotes/Footnotes';
import { tableOperations } from './dropdownData';
import './table.scss';
import SanitizeHTML from '../../../../../Components/SanitizeHtml';

function DisplayTable({
  data,
  onChange,
  handleRowOperation,
  edit,
  footNoteData,
  setFootnoteData,
  handleColumnOperation,
  handleSwap,
  preferredTerms,
  isPreferredTerm,
  clinicalTerms,
  isClinicalTerms,
  handleEnrichedClick,
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

  const handleClick = (e) =>
    handleEnrichedClick &&
    handleEnrichedClick(e, clinicalTerms, CONTENT_TYPE.TABLE);

  return (
    <div className="pd-table-wrapper">
      <div className="pd-table-inner">
        {edit && data.length && (
          <EmptyColumns
            columnIndexes={data[0]?.columns}
            handleOperation={handleColumnOperation}
          />
        )}
        {data?.map((row, rowIndex) => (
          <div
            key={uuidv4()}
            className={`pd-table-empty-cell-row ${
              row?.op_type === QC_CHANGE_TYPE.DELETED && 'invisible'
            }`}
          >
            {edit && (
              <EmptyRows
                rowIndex={rowIndex}
                handleOperation={handleRowOperation}
                index={rowIndex}
              />
            )}
            <div
              data-testid="table-row"
              className="pd-table-row"
              id={`rowID-${rowIndex}`}
              draggable={edit}
              onDragStart={handleDrag}
              onDrop={handleDrop}
              onDragOver={allowDrop}
            >
              {edit && (
                <span className="pd-drag-icon rowDrag">
                  <EllipsisVertical />
                </span>
              )}
              {row?.columns?.map((col, colIndex) => (
                <div
                  // eslint-disable-next-line
                  tabIndex={edit && '1'}
                  key={uuidv4()}
                  id={`columnID-${rowIndex}-${colIndex}`}
                  draggable={edit}
                  onDragStart={handleDrag}
                  onDrop={handleDrop}
                  onDragOver={allowDrop}
                  className={` pd-table-cell ${
                    col?.op_type === QC_CHANGE_TYPE.DELETED && 'invisible'
                  }`}
                >
                  {rowIndex === 0 && edit && (
                    <span
                      className="pd-drag-icon columnDrag"
                      data-testId="draggable"
                    >
                      <EllipsisHorizontal />
                    </span>
                  )}
                  {/* eslint-disable-next-line */}
                  <div
                    id={`columnID-${rowIndex}-${colIndex}`}
                    data-testid="span-edit"
                    className="editable-span"
                    onClick={handleClick}
                    role="textbox"
                    contentEditable={edit}
                    onBlur={(e) => handleChange(colIndex, rowIndex, e)}
                  >
                    {col.value && (
                      <SanitizeHTML
                        html={getPreferredTerms(
                          col.value,
                          isPreferredTerm,
                          preferredTerms,
                          clinicalTerms,
                          isClinicalTerms,
                        )}
                      />
                    )}
                  </div>
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
    </div>
  );
}
export default React.memo(DisplayTable);

DisplayTable.propTypes = {
  data: PropTypes.isRequired,
  onChange: PropTypes.isRequired,
  handleRowOperation: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  footNoteData: PropTypes.isRequired,
  setFootnoteData: PropTypes.isRequired,
  handleColumnOperation: PropTypes.isRequired,
  handleSwap: PropTypes.isRequired,
  preferredTerms: PropTypes.isRequired,
  isPreferredTerm: PropTypes.isRequired,
  clinicalTerms: PropTypes.isRequired,
  isClinicalTerms: PropTypes.isRequired,
  handleEnrichedClick: PropTypes.isRequired,
};
