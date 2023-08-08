import EllipsisHorizontal from 'apollo-react-icons/EllipsisHorizontal';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../../../AppConstant/AppConstant';
import { formattableData, renderTableData } from '../utils';
import EmptyColumns from './EmptyColumns';
import EmptyRows from './EmptyRows';
import FootNotes from './FootNotes/Footnotes';
import { tableOperations } from './dropdownData';
import './table.scss';
import SanitizeHTML from '../../../../../Components/SanitizeHtml';
import CellHoverList from './CellHoverList';

function DisplayTable({
  data,
  onChange,
  handleRowOperation,
  edit,
  footNoteData,
  setFootnoteData,
  handleColumnOperation,
  handleSwap,
  clinicalTerms,
  handleEnrichedClick,
  handleMergeOperation,
  isDraggable,
  lineID,
  getEnrichedText,
  readMode,
}) {
  const [tableData, setTableData] = useState();
  const [isCellOperation, setIsCellOperation] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
  });
  const [rowIdx, setRowIdx] = useState(0);
  const [colIdx, setColIdx] = useState(0);

  useEffect(() => {
    if (data) {
      const formattedData = formattableData(data);
      const renderData = renderTableData(formattedData);
      setTableData(renderData?.tableData);
    }
  }, [data]);

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

  const handleContextMenu = (e, rowIndex, colIndex) => {
    if (edit) {
      setRowIdx(rowIndex);
      setColIdx(colIndex);
      let yValue = e.pageY;
      if (e.pageY + 200 > window.innerHeight) {
        yValue = e.pageY - 195;
      }
      setDropdownPosition({ x: e.pageX, y: yValue });
      setIsCellOperation(true);
    }
  };

  const handleChange = (columnIndex, rowIndex, e) => {
    onChange(e.target.innerHTML, columnIndex, rowIndex);
  };

  const handleDropdownOptionClick = (operation) => {
    setIsCellOperation(false);
    handleMergeOperation(rowIdx, colIdx, operation);
  };

  const handleClick = (e) =>
    handleEnrichedClick &&
    handleEnrichedClick(e, clinicalTerms, CONTENT_TYPE.TABLE);

  const getCellValue = (value) => {
    if (!value) return '';
    return !readMode ? value : getEnrichedText(value, CONTENT_TYPE.TABLE);
  };

  return (
    <div className="pd-table-wrapper">
      <div className="pd-table-inner">
        {edit && data.length && (
          <EmptyColumns
            columnIndexes={data[0]?.columns}
            handleOperation={handleColumnOperation}
          />
        )}
        <table>
          {tableData?.map((row, rowIndex) => {
            return (
              <tr
                key={uuidv4()}
                className={` pd-table-row pd-table-empty-cell-row ${
                  row?.op_type === QC_CHANGE_TYPE.DELETED && 'invisible'
                }`}
                data-testid="table-row"
                id={`rowID-${rowIndex}`}
                draggable={edit && isDraggable}
                onDragStart={handleDrag}
                onDrop={handleDrop}
                onDragOver={allowDrop}
              >
                {edit && (
                  <EmptyRows
                    rowIndex={rowIndex}
                    handleOperation={handleRowOperation}
                    index={rowIndex}
                  />
                )}
                {edit && isDraggable && (
                  <span className="pd-drag-icon rowDrag">
                    <EllipsisVertical />
                  </span>
                )}
                {row?.columns?.map((col, colIndex) => {
                  return (
                    col?.col_render && (
                      // eslint-disable-next-line
                      <td
                        key={uuidv4()}
                        rowSpan={col.rowspan > -1 ? col.rowspan : 1}
                        colSpan={col.colspan > -1 ? col.colspan : 1}
                        // eslint-disable-next-line
                        tabIndex={edit && '1'}
                        id={`columnID-${rowIndex}-${colIndex}-${lineID}`}
                        data-testid="span-edit"
                        onClick={handleClick}
                        draggable={edit && isDraggable}
                        onDragStart={handleDrag}
                        onDrop={handleDrop}
                        onDragOver={allowDrop}
                        className={` pd-table-cell ${
                          col?.op_type === QC_CHANGE_TYPE.DELETED && 'invisible'
                        }`}
                      >
                        <div
                          contentEditable={edit}
                          onBlur={(e) => handleChange(colIndex, rowIndex, e)}
                          className="editable-div"
                        >
                          {col?.value ? (
                            <SanitizeHTML
                              className="content-filter"
                              html={getCellValue(col?.value)}
                            />
                          ) : (
                            ''
                          )}
                        </div>
                        {edit && (
                          <EllipsisHorizontal
                            className="merge-option"
                            data-testid="span-merge"
                            onClick={(e) =>
                              handleContextMenu(e, rowIndex, colIndex)
                            }
                          />
                        )}
                        {rowIndex === 0 && edit && isDraggable && (
                          <span
                            className="pd-drag-icon columnDrag"
                            data-testId="draggable"
                          >
                            <EllipsisHorizontal />
                          </span>
                        )}
                      </td>
                    )
                  );
                })}
              </tr>
            );
          })}
        </table>
        <FootNotes
          edit={edit}
          footNoteData={footNoteData}
          setFootnoteData={setFootnoteData}
        />
      </div>
      {isCellOperation && (
        <CellHoverList
          handleDropdownOptionClick={handleDropdownOptionClick}
          dropdownPosition={dropdownPosition}
          setIsCellOperation={setIsCellOperation}
        />
      )}
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
  clinicalTerms: PropTypes.isRequired,
  handleEnrichedClick: PropTypes.isRequired,
  handleMergeOperation: PropTypes.isRequired,
  isDraggable: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  getEnrichedText: PropTypes.isRequired,
  readMode: PropTypes.isRequired,
};
