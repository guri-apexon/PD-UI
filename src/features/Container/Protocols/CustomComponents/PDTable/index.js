import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import EmptyColumnCells from './Components/EmptyColumnCells';
import DisplayTable from './Components/Table';
import { tableOperations } from './Components/dropdownData';
import { addColumn, addRow, deleteColumn, deleteRow } from './utils';
import { CONTENT_TYPE } from '../../../../../AppConstant/AppConstant';
import { useProtContext } from '../../ProtocolContext';

const getColumnID = (data, key) => {
  let roiId = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i][key]) {
      roiId = data[i][key].roi_id.column_roi_id;
      break;
    }
  }
  return roiId;
};
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
    const rowCells = cloneData[i];
    const keys = Object.keys(rowCells);
    for (let j = 0; j < keys.length; j++) {
      if (rowCells[keys[j]]) {
        console.log('No Formating');
      } else {
        const IDs = getIDs(rowCells);
        const columnID = getColumnID(data, keys[j]);
        const emptyCell = {
          entities: [],
          content: '',
          roi_id: {
            table_roi_id: IDs.table_roi_id,
            row_roi_id: IDs.row_roi_id,
            column_roi_id: columnID,
            datacell_roi_id: IDs.datacell_roi_id,
          },
          table_index: 2,
          qc_change_type: '',
        };
        rowCells[keys[j]] = emptyCell;
      }
    }
  }
  return cloneData;
};

const confirmText = 'Please confirm if you want to continue with deletion';

function PDTable({ data, segment, activeLineID, lineID }) {
  const [updatedData, setUpdatedData] = useState([]);
  const [footNoteData, setFootnoteData] = useState([]);
  const [columnLength, setColumnLength] = useState();
  const [colWidth, setColumnWidth] = useState(100);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [showconfirm, setShowConfirm] = useState(false);
  const tableRef = useRef(null);
  const { dispatchSectionEvent } = useProtContext();

  useEffect(() => {
    if (data) {
      const parsedTable = JSON.parse(data.TableProperties);
      const formatData = formattableData(parsedTable);
      setUpdatedData(formatData);
      const footnoteArr = data.AttachmentListProperties || [];
      setFootnoteData(footnoteArr);
      const colLength = Object.keys(formatData[0]).length;
      setColumnLength(colLength);
      setColumnWidth(98 / colLength);
    }
  }, [data]);

  const handleChange = (content, columnIndex, rowIndex) => {
    const cloneData = [...updatedData];
    cloneData[rowIndex][columnIndex].content = content;
    setUpdatedData(cloneData);
  };
  const handleColumnOperation = (operation, index) => {
    if (operation === tableOperations.addColumnLeft) {
      const newData = addColumn(updatedData, index);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    } else if (operation === tableOperations.addColumnRight) {
      // eslint-disable-next-line
      const newData = addColumn(updatedData, parseInt(index) + 1);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    } else if (operation === tableOperations.deleteColumn) {
      const newData = deleteColumn(updatedData, index);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    }
  };
  const handleRowOperation = (operation, index) => {
    if (operation === tableOperations.addRowAbove) {
      const newData = addRow(updatedData, index);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    } else if (operation === tableOperations.addRowBelow) {
      // eslint-disable-next-line
      const newData = addRow(updatedData, parseInt(index) + 1);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    } else if (operation === tableOperations.deleteRow) {
      // eslint-disable-next-line
      const confirmMessage = confirm(confirmText);
      if (confirmMessage) {
        const newData = deleteRow(updatedData, index);
        setUpdatedData(newData);
        setColumnLength(Object.keys(newData[0]).length);
      }
    }
  };
  const handleSave = () => {
    const content = {
      ...segment.content,
      TableProperties: JSON.stringify(updatedData),
      AttachmentListProperties: footNoteData,
    };
    setDisabledBtn(true);
    dispatchSectionEvent('CONTENT_UPDATE', {
      type: CONTENT_TYPE.TABLE,
      lineID,
      currentLineId: activeLineID,
      content,
    });
    setTimeout(() => {
      setDisabledBtn(false);
    }, 1000);
  };
  return (
    <section className="content-table-wrapper">
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
                onClick: () =>
                  dispatchSectionEvent('CONTENT_DELETED', {
                    currentLineId: activeLineID,
                  }),
              },
            ]}
          />
        </div>
      )}
      {lineID === activeLineID && (
        <div className="button-container" data-testId="button-container">
          <ButtonGroup
            buttonProps={[
              {
                size: 'small',
                disabled: disabledBtn,
                label: 'Delete',
                onClick: () => setShowConfirm(true),
              },
              {
                size: 'small',
                disabled: disabledBtn,
                label: disabledBtn ? 'Please wait' : 'Save Table',
                // icon: <Save />,
                onClick: () => handleSave(),
              },
            ]}
          />
        </div>
      )}
      <div className="pd-table-container" ref={tableRef}>
        {lineID === activeLineID && (
          <EmptyColumnCells
            columnLength={columnLength}
            handleOperation={handleColumnOperation}
            colWidth={colWidth}
          />
        )}
        <DisplayTable
          data={updatedData}
          onChange={handleChange}
          handleRowOperation={handleRowOperation}
          edit={lineID === activeLineID}
          colWidth={colWidth}
        />
      </div>
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
