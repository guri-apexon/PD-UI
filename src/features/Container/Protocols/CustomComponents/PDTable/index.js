import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import EmptyColumnCells from './Components/EmptyColumnCells';
import DisplayTable from './Components/Table';
import { tableOperations } from './Components/dropdownData';
import {
  addColumn,
  addRow,
  dataUtilsFun,
  deleteColumn,
  deleteRow,
  handleColumnOperationUtilsFun,
  handleRowOperationUtilsFun,
} from './utils';
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
    dataUtilsFun(
      data,
      formattableData,
      setUpdatedData,
      setFootnoteData,
      setColumnLength,
      setColumnWidth,
    );
  }, [data]);

  const handleChange = (content, columnIndex, rowIndex) => {
    const cloneData = [...updatedData];
    cloneData[rowIndex][columnIndex].content = content;
    setUpdatedData(cloneData);
  };
  const handleColumnOperation = (operation, index) => {
    handleColumnOperationUtilsFun(
      operation,
      tableOperations,
      updatedData,
      index,
      setUpdatedData,
      setColumnLength,
    );
  };
  const handleRowOperation = (operation, index) => {
    handleRowOperationUtilsFun(
      operation,
      tableOperations,
      updatedData,
      index,
      setUpdatedData,
      setColumnLength,
    );
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
