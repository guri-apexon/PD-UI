import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import Modal from 'apollo-react/components/Modal';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import Tooltip from 'apollo-react/components/Tooltip';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import cloneDeep from 'lodash/cloneDeep';
import DisplayTable from './Components/Table';
import { tableOperations } from './Components/dropdownData';
import {
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
  swapElements,
} from './utils';
import { CONTENT_TYPE } from '../../../../../AppConstant/AppConstant';
import { useProtContext } from '../../ProtocolContext';
import PROTOCOL_CONSTANT from '../constants';

const getIDs = (rows) => {
  let rowRoiId = '';
  let tableRoiId = '';
  let datacellRoiId = '';
  const keys = Object.keys(rows);
  for (let i = 0; i < keys.length; i++) {
    if (rows[keys[i]] && rows[keys[i]].roi_id.row_roi_id) {
      rowRoiId = rows[keys[i]].roi_id.row_roi_id;
      datacellRoiId = uuidv4();
      tableRoiId = rows[keys[i]].roi_id.table_roi_id;
      break;
    }
  }
  return { rowRoiId, tableRoiId, datacellRoiId };
};

const formattableData = (data) => {
  const cloneData = [...data];
  for (let i = 0; i < cloneData.length; i++) {
    const rowCells = cloneData[i].row_props;
    const keys = Object.keys(rowCells);
    let rowProps = {};
    for (let j = 0; j < keys.length; j++) {
      const emptyCell = {
        content: rowCells[keys[j]]?.content || '',
        roi_id: rowCells[keys[j]]?.roi_id || {},
      };
      rowProps = {
        ...rowProps,
        [j + 1]: emptyCell,
      };
    }
    cloneData[i].row_props = rowProps;
  }
  return cloneData;
};

const confirmText = 'Please confirm if you want to continue with deletion';

function PDTable({ data, segment, activeLineID, lineID }) {
  const [updatedData, setUpdatedData] = useState([]);
  const [footNoteData, setFootnoteData] = useState([]);
  const [colWidth, setColumnWidth] = useState(100);
  const [tableSaved, setTableSaved] = useState(false);
  const [showconfirm, setShowConfirm] = useState(false);
  const [tableId, setTableId] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const tableRef = useRef(null);
  const { dispatchSectionEvent } = useProtContext();

  useEffect(() => {
    if (data) {
      const parsedTable = JSON.parse(data.TableProperties);
      const tableIds = getIDs(parsedTable[0]?.row_props);
      const formattedData = formattableData(parsedTable);
      setTableId(tableIds?.tableRoiId);
      setUpdatedData(formattedData);
      const footnoteArr = data.AttachmentListProperties || [];
      setFootnoteData(footnoteArr);
      const colIndexes = Object.keys(parsedTable[0]?.row_props);
      setColumnWidth(98 / colIndexes.length);
    }
  }, [data]);

  const handleChange = (content, columnIndex, rowIndex) => {
    const cloneData = [...updatedData];
    cloneData[rowIndex].row_props[columnIndex].content = content;
    setUpdatedData(cloneData);
  };

  const handleColumnOperation = (operation, index) => {
    if (operation === tableOperations.addColumnLeft) {
      const newData = addColumn(updatedData, Math.max(index, 0));
      setUpdatedData(newData);
    } else if (operation === tableOperations.addColumnRight) {
      const newData = addColumn(updatedData, index + 1);
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
    if (operation === tableOperations.addRowAbove) {
      const newData = addRow(updatedData, index);
      setUpdatedData(newData);
    } else if (operation === tableOperations.addRowBelow) {
      // eslint-disable-next-line
      const newData = addRow(updatedData, parseInt(index) + 1);
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
    if (operation === tableOperations.swapRow) {
      const newList = swapElements(
        updatedData,
        indexObj.sourceIndex,
        indexObj.targetIndex,
      );
      setUpdatedData(newList);
    } else if (operation === tableOperations.swapColumn) {
      const copyUpdatedList = cloneDeep(updatedData);
      const newData = copyUpdatedList.map((list) => {
        const rowProp = list?.row_props;
        const temp = rowProp[indexObj.sourceIndex];
        rowProp[indexObj.sourceIndex] = rowProp[indexObj.targetIndex];
        rowProp[indexObj.targetIndex] = temp;

        return list;
      });
      setUpdatedData(newData);
    }
  };

  const addFootNote = () => {
    setFootnoteData([
      ...footNoteData,
      {
        ...PROTOCOL_CONSTANT.footNote,
        TableId: tableId,
      },
    ]);
  };

  const handleSave = () => {
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
      newData = deleteRow(updatedData, selectedData.index);
      setUpdatedData(newData);
    } else {
      newData = deleteColumn(updatedData, selectedData.index);
    }
    setUpdatedData(newData);
    setSelectedData({});
    setIsModal(false);
  };

  const onContainerClick = () => {
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

  return (
    // eslint-disable-next-line
    <section
      data-testId="section"
      className="content-table-wrapper"
      onClick={() => onContainerClick()}
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
                onClick: () => {
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
                // icon: <Save />,
                onClick: () => handleSave(),
              },
            ]}
          />
        </div>
      )}
      <div className="pd-table-container" ref={tableRef}>
        <DisplayTable
          data={updatedData}
          onChange={handleChange}
          handleRowOperation={handleRowOperation}
          handleSwap={handleSwap}
          edit={isEditable()}
          colWidth={colWidth}
          footNoteData={footNoteData}
          setFootnoteData={setFootnoteData}
          handleColumnOperation={handleColumnOperation}
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
    </section>
  );
}

export default PDTable;

PDTable.propTypes = {
  data: PropTypes.isRequired,
  segment: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
};
