import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Modal from 'apollo-react/components/Modal';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import cloneDeep from 'lodash/cloneDeep';
import { toast } from 'react-toastify';
import DisplayTable from './Components/Table';
import { cellOperation, tableOperations } from './Components/dropdownData';
import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  swapRowElements,
  swapColumnElements,
  renderTableData,
  cellOperationData,
  getNextColIndex,
  getNextRowIndex,
  rowMergeOperation,
  checkSpanValue,
  addNewRow,
  addNewColumn,
  deleteRowData,
  deleteColData,
  checkRowLength,
  checkColLength,
  colSplit,
  rowSplit,
  checkEmptyColumn,
  checkNewRow,
  checkNewIndex,
} from './utils';
import { removeHtmlTags } from '../../../../../utils/utilFunction';
import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../../AppConstant/AppConstant';
import { useProtContext } from '../../ProtocolContext';
import PROTOCOL_CONSTANT from '../constants';

const formattableData = (data) => {
  const cloneData = [...data];
  return cloneData.map((record) => {
    return {
      ...record,
      row_indx: record.row_indx?.toString() || '',
      columns: record.columns.map((col) => {
        return {
          ...col,
          col_indx: col.col_indx?.toString() || '',
          col_render: true,
        };
      }),
    };
  });
};

const formatFootNote = (data) => {
  const cloneFootNotes = [...data];
  return cloneFootNotes.map((eachNotes) => {
    return {
      AttachmentId: eachNotes.AttachmentId,
      Text: eachNotes.Text,
      PrevousAttachmentIndex:
        eachNotes.AttachmentIndex > 0 ? eachNotes.AttachmentIndex - 1 : null,
    };
  });
};

const confirmText = 'Please confirm if you want to continue with deletion';

function PDTable({
  data,
  segment,
  activeLineID,
  lineID,
  edit,
  setShowAlert,
  setAlertMsg,
  containerRef,
}) {
  const wrapperRef = useRef(null);
  const [updatedData, setUpdatedData] = useState([]);
  const [footNoteData, setFootnoteData] = useState([]);
  const [tableSaved, setTableSaved] = useState(true);
  const [showconfirm, setShowConfirm] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [showBlankRowModal, setShowBlankRowModal] = useState(false);
  const [isDraggable, setIsDraggable] = useState();
  const [selectedData, setSelectedData] = useState({});
  const tableRef = useRef(null);
  const { dispatchSectionEvent } = useProtContext();

  useEffect(() => {
    if (data) {
      const parsedTable = Array.isArray(data?.TableProperties)
        ? data?.TableProperties
        : JSON.parse(data?.TableProperties);
      const formattedData = formattableData(parsedTable);
      const renderData = renderTableData(formattedData);
      setIsDraggable(renderData?.isDraggable);
      setUpdatedData(renderData?.tableData);
      const footnoteArr = formatFootNote(
        data?.AttachmentListProperties?.filter(
          (x) => x.qc_change_type_footnote !== 'delete',
        ) || [],
      );
      setFootnoteData(footnoteArr);
    }
    // eslint-disable-next-line
  }, []);

  const handleMergeOperation = (rowIndex, colIndex, ops) => {
    setIsDraggable(false);
    let operationData = [...updatedData];
    const rowlen = checkRowLength(operationData);
    const collen = checkColLength(operationData);
    if (ops === cellOperation.mergeRight || ops === cellOperation.mergeLeft) {
      const cellIdx = getNextColIndex(operationData, rowIndex, colIndex, ops);
      const curColSpan = Math.abs(
        operationData[rowIndex]?.columns[colIndex]?.colspan,
      );
      const cellColSpan = Math.abs(
        operationData[rowIndex]?.columns[cellIdx]?.colspan,
      );
      if (cellIdx < 0 || cellIdx > collen) {
        toast.error('Invalid Operation');
        return;
      }
      const isSpanValue = checkSpanValue(
        operationData,
        rowIndex,
        colIndex,
        cellIdx,
        ops,
      );

      if (isSpanValue) {
        if (
          ops === cellOperation.mergeRight &&
          curColSpan + colIndex === cellIdx
        ) {
          operationData = cellOperationData(
            operationData,
            rowIndex,
            colIndex,
            cellIdx,
            ops,
          );
        } else if (
          ops === cellOperation.mergeLeft &&
          cellIdx + cellColSpan === colIndex &&
          colIndex !== 0
        ) {
          operationData = cellOperationData(
            operationData,
            rowIndex,
            cellIdx,
            colIndex,
            ops,
          );
        } else {
          toast.error('please do same Rowspan operation');
        }
        setUpdatedData([...operationData]);
      } else {
        toast.error('please do same Rowspan operation');
      }
    } else if (
      ops === cellOperation.mergeBelow ||
      ops === cellOperation.mergeAbove
    ) {
      const cellIdx = getNextRowIndex(operationData, rowIndex, colIndex, ops);
      const curRowSpan = Math.abs(
        operationData[rowIndex]?.columns[colIndex]?.rowspan,
      );
      const cellRowSpan = Math.abs(
        operationData[cellIdx]?.columns[colIndex]?.rowspan,
      );
      if (cellIdx < 0 || cellIdx > rowlen) {
        toast.error('please do same Colspan operation');
        return;
      }
      const isSpanValue = checkSpanValue(
        operationData,
        rowIndex,
        colIndex,
        cellIdx,
        ops,
      );
      if (isSpanValue) {
        if (
          ops === cellOperation.mergeBelow &&
          rowIndex + curRowSpan === cellIdx
        ) {
          operationData = rowMergeOperation(
            operationData,
            rowIndex,
            colIndex,
            cellIdx,
          );
        } else if (
          ops === cellOperation.mergeAbove &&
          cellIdx + cellRowSpan === rowIndex
        ) {
          operationData = rowMergeOperation(
            operationData,
            cellIdx,
            colIndex,
            rowIndex,
          );
        }
        setUpdatedData([...operationData]);
      } else {
        toast.error('please do same Colspan operation');
      }
    }
    if (ops === cellOperation.rowSplit) {
      operationData = rowSplit(operationData, rowIndex, colIndex);
      setUpdatedData([...operationData]);
    } else if (ops === cellOperation.colSplit) {
      operationData = colSplit(operationData, rowIndex, colIndex);
      setUpdatedData([...operationData]);
    }
  };

  console.log('shubham', updatedData);
  const handleChange = (content, columnIndex, rowIndex) => {
    const cloneData = [...updatedData];
    cloneData.forEach((record, i) => {
      if (i === rowIndex) {
        record.columns.forEach((_col, j) => {
          if (j === columnIndex) {
            record.columns[j].value = content;
            record.columns[columnIndex].op_type =
              record.columns[columnIndex].op_type || QC_CHANGE_TYPE.UPDATED;
          }
        });
        if (record?.roi_id) {
          cloneData[i].op_type = QC_CHANGE_TYPE.UPDATED;
        }
      }
      return record;
    });
    setUpdatedData(cloneData);
  };

  const handleColumnOperation = (operation, index) => {
    let data = [...updatedData];
    if (operation === tableOperations.addColumnLeft) {
      const arr = checkEmptyColumn(data);
      index = checkNewIndex(index, arr);
      while (arr.length > 0) {
        const idxempty = arr.pop();
        data = deleteColData(data, idxempty);
        data = deleteColumn(data, idxempty);
      }
      let newData = addColumn(data, Math.max(index, 0));
      newData = addNewColumn(newData, Math.max(index, 0), operation);
      setUpdatedData(newData);
    } else if (operation === tableOperations.addColumnRight) {
      const arr = checkEmptyColumn(data);
      index = checkNewIndex(index, arr);
      while (arr.length > 0) {
        const idxempty = arr.pop();
        data = deleteColData(data, idxempty);
        data = deleteColumn(data, idxempty);
      }
      let newData = addColumn(data, index + 1);
      newData = addNewColumn(newData, Math.max(index, 0) + 1, operation);
      setUpdatedData(newData);
    } else if (operation === tableOperations.deleteColumn) {
      setIsModal(true);
      setSelectedData({
        operation,
        index,
      });
    }
  };

  const handleRowOperation = (operation, index) => {
    let data = [...updatedData];
    if (operation === tableOperations.addRowAbove) {
      const arr = checkNewRow(data);
      index = checkNewIndex(index, arr);
      while (arr.length > 0) {
        const idxempty = arr.pop();
        data = deleteRowData(data, idxempty);
        data = deleteRow(data, idxempty);
      }
      let newData = addRow(data, index);
      newData = addNewRow(newData, index, operation);
      setUpdatedData(newData);
    } else if (operation === tableOperations.addRowBelow) {
      const arr = checkNewRow(data);
      index = checkNewIndex(index, arr);
      while (arr.length > 0) {
        const idxempty = arr.pop();
        data = deleteRowData(data, idxempty);
        data = deleteRow(data, idxempty);
      }
      // eslint-disable-next-line
      let newData = addRow(data, parseInt(index) + 1);
      newData = addNewRow(newData, parseInt(index, 10) + 1, operation);
      setUpdatedData(newData);
    } else if (operation === tableOperations.deleteRow) {
      setIsModal(true);
      setSelectedData({
        operation,
        index,
      });
    }
  };

  const handleSwap = (operation, indexObj) => {
    if (indexObj.sourceIndex) {
      if (operation === tableOperations.swapRow) {
        const newList = swapRowElements(
          updatedData,
          indexObj.sourceIndex,
          indexObj.targetIndex,
        );
        setUpdatedData(newList);
      } else if (operation === tableOperations.swapColumn) {
        const newList = swapColumnElements(
          cloneDeep(updatedData),
          indexObj.sourceIndex,
          indexObj.targetIndex,
        );
        setUpdatedData(newList);
      }
    }
  };

  const addFootNote = () => {
    setFootnoteData([
      ...footNoteData,
      {
        ...PROTOCOL_CONSTANT.footNote,
        PrevousAttachmentIndex:
          footNoteData.length === 0 ? 0 : footNoteData.length - 1,
      },
    ]);
  };

  const checkBlankRows = () => {
    let newData = [...updatedData];
    let bool = false;
    let colbool = false;
    const delArr = [];
    newData
      .filter((row) => row.op_type !== QC_CHANGE_TYPE.DELETED)
      .forEach((row, index) => {
        const arr = row.columns.filter((col) => col.col_render);
        if (arr.length === newData[0].columns.length) {
          colbool = true;
        }
        if (arr.length === 0) {
          delArr.push(index);
        }
      });

    while (delArr.length > 0) {
      const popIndex = delArr.pop();
      newData = deleteRowData(newData, popIndex);
      newData = deleteRow(newData, popIndex);
    }
    if (!colbool) {
      const arr = checkEmptyColumn(newData);
      while (arr.length > 0) {
        const popIndex = arr.pop();
        newData = deleteColData(newData, popIndex);
        newData = deleteColumn(newData, popIndex);
      }
    }
    newData
      .filter((row) => row.op_type !== QC_CHANGE_TYPE.DELETED)
      .forEach((row) => {
        const arr = row.columns.filter(
          (col) => removeHtmlTags(col.value) !== '',
        );
        if (arr.length === 0) {
          bool = true;
        }
      });
    setUpdatedData(newData);
    return bool;
  };

  const handleSave = () => {
    if (checkBlankRows()) {
      setShowBlankRowModal(true);
      return;
    }
    const content = {
      ...segment.content,
      TableProperties: updatedData,
      AttachmentListProperties: footNoteData,
    };

    setTableSaved(true);
    dispatchSectionEvent('CONTENT_UPDATE', {
      type: CONTENT_TYPE.TABLE,
      lineID,
      currentLineId: activeLineID,
      content,
      isSaved: true,
    });
  };

  const isEditable = () => {
    return lineID === activeLineID && !tableSaved;
  };

  const deleteTableData = () => {
    let newData = [];
    if (selectedData.operation === tableOperations.deleteRow) {
      newData = deleteRowData(updatedData, selectedData.index);
      newData = deleteRow(newData, selectedData.index);
      setUpdatedData(newData);
    } else {
      newData = deleteColData(updatedData, selectedData.index);
      newData = deleteColumn(newData, selectedData.index);
    }
    setUpdatedData(newData);
    setSelectedData({});
    setIsModal(false);
  };

  const onContainerClick = () => {
    if (tableSaved) {
      setTableSaved(false);
      dispatchSectionEvent('CONTENT_UPDATE', {
        type: CONTENT_TYPE.TABLE,
        lineID,
        currentLineId: lineID,
        content: { ...segment.content },
        isSaved: false,
      });
    }
    if (activeLineID !== lineID && !tableSaved) {
      const content = {
        ...segment.content,
      };
      dispatchSectionEvent('CONTENT_UPDATE', {
        type: CONTENT_TYPE.TABLE,
        lineID,
        currentLineId: lineID,
        content,
        isSaved: false,
      });
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !tableSaved &&
        containerRef.current &&
        containerRef.current.contains(event.target)
      ) {
        event.preventDefault();
        setShowAlert(true);
        setAlertMsg('Please save the table.');
      }
    }
    if (tableSaved) {
      document.removeEventListener('mousedown', handleClickOutside);
    } else {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [tableSaved]);

  return (
    //  eslint-disable-next-line
    <section
      data-testId="section"
      className="content-table-wrapper"
      ref={wrapperRef}
      onClick={() => {
        onContainerClick();
      }}
    >
      {showconfirm && (
        <div className="confirmation-popup" data-testId="confirmPopup">
          <p>{confirmText}</p>
          <ButtonGroup
            buttonProps={[
              {
                label: 'Cancel',
                onClick: () => setShowConfirm(false),
              },
              {
                label: 'Delete',
                onClick: (e) => {
                  e.stopPropagation();
                  dispatchSectionEvent('CONTENT_DELETED', {
                    currentLineId: activeLineID,
                  });
                },
              },
            ]}
          />
        </div>
      )}
      {isEditable() && (
        <div className="table-button-container">
          <Tooltip title="Add Footnote" placement="right">
            <IconButton
              color="primary"
              size="small"
              data-testId="button-container"
              onClick={addFootNote}
            >
              <Plus className="plus-icon" size="small" />
            </IconButton>
          </Tooltip>
          <ButtonGroup
            buttonProps={[
              {
                size: 'small',
                label: 'Delete',
                onClick: () => setShowConfirm(true),
              },
              {
                size: 'small',
                label: 'Save Table',
                onClick: handleSave,
              },
            ]}
          />
        </div>
      )}
      <div
        className={`pd-table-container ${edit && 'scrollable'} ${
          isEditable() && 'edit-mode'
        }`}
        ref={tableRef}
      >
        <DisplayTable
          data={updatedData}
          onChange={handleChange}
          handleRowOperation={handleRowOperation}
          handleSwap={handleSwap}
          edit={isEditable()}
          // colWidth={colWidth}
          footNoteData={footNoteData}
          setFootnoteData={setFootnoteData}
          handleColumnOperation={handleColumnOperation}
          handleMergeOperation={handleMergeOperation}
          isDraggable={isDraggable}
          lineID={lineID}
        />
      </div>
      <Modal
        className="modal delete-modal"
        data-testId="modal-close-button"
        open={isModal}
        variant="secondary"
        onClose={() => setIsModal(false)}
        title="Please confirm if you want to continue with deletion"
        buttonProps={[
          {
            label: 'No',
            size: 'small',
          },
          {
            label: 'Yes',
            size: 'small',
            onClick: deleteTableData,
          },
        ]}
        id="neutral"
      />

      <Modal
        className="modal delete-modal"
        data-testId="modal-blankRow-warning"
        open={showBlankRowModal}
        variant="warning"
        onClose={() => setShowBlankRowModal(false)}
        title="Warning"
        message="Please enter values in every rows to save the table."
        buttonProps={[
          {
            label: 'Ok',
            size: 'small',
            onClick: () => setShowBlankRowModal(false),
          },
        ]}
      />
    </section>
  );
}

export default PDTable;

PDTable.propTypes = {
  data: PropTypes.isRequired,
  segment: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  setShowAlert: PropTypes.isRequired,
  setAlertMsg: PropTypes.isRequired,
  containerRef: PropTypes.isRequired,
};
