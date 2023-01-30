import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import ButtonGroup from 'apollo-react/components/ButtonGroup';
import Save from 'apollo-react-icons/Save';
import IconButton from 'apollo-react/components/IconButton';
import EmptyColumnCells from './Components/EmptyColumns';
import DisplayTable from './Components/Table';
import { tableOperations } from './Components/dropdownData';
import { addColumn, addRow, deleteColumn, deleteRow } from './utils';
import FootNotes from './Components/Footnotes';
import {
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
} from '../../../../../AppConstant/AppConstant';
import { useProtContext } from '../../ProtocolContext';

const getColumnID = (data, key) => {
  let column_roi_id = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i][key]) {
      column_roi_id = data[i][key].roi_id.column_roi_id;
      break;
    }
  }
  return column_roi_id;
};
const getIDs = (rows) => {
  let row_roi_id = '';
  let table_roi_id = '';
  let datacell_roi_id = '';
  const keys = Object.keys(rows);
  for (let i = 0; i < keys.length; i++) {
    if (rows[keys[i]] && rows[keys[i]].roi_id.row_roi_id) {
      row_roi_id = rows[keys[i]].roi_id.row_roi_id;
      datacell_roi_id = uuidv4();
      table_roi_id = rows[keys[i]].roi_id.table_roi_id;
      break;
    }
  }
  return { row_roi_id, table_roi_id, datacell_roi_id };
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

function PDTable({
  data,
  edit,
  onChange,
  index,
  segment,
  activeLineID,
  lineID,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  const [footNoteData, setFootnoteData] = useState([]);
  const [columnLength, setColumnLength] = useState();
  const [colWidth, setColumnWidth] = useState(100);
  const tableRef = useRef(null);
  const { dispatchSectionEvent } = useProtContext();

  useEffect(() => {
    const parsedTable = JSON.parse(data.TableProperties);
    const formatData = formattableData(parsedTable);
    setUpdatedData(formatData);
    const footnoteArr = data.AttachmentListProperties || [];
    setFootnoteData(footnoteArr);
    const colLength = Object.keys(formatData[0]).length;
    setColumnLength(colLength);
    setColumnWidth(98 / colLength);
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
      const newData = deleteRow(updatedData, index);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    }
  };
  const handleSave = () => {
    const content = {
      ...segment.content,
      TableProperties: JSON.stringify(updatedData),
      AttachmentListProperties: footNoteData,
    };
    dispatchSectionEvent('CONTENT_UPDATE', {
      type: CONTENT_TYPE.TABLE,
      lineID,
      currentLineId: activeLineID,
      content,
    });
    // onChange(content, segment.line_id);
  };
  const handleFootnoteEdit = (editedText, index) => {
    const attachmentArr = [...footNoteData];
    attachmentArr[index] = {
      ...attachmentArr[index],
      Text: editedText,
      qc_change_type: QC_CHANGE_TYPE.UPDATED,
    };
    setFootnoteData(attachmentArr);
  };
  return (
    <section className="content-table-wrapper">
      {lineID === activeLineID && (
        <div className="button-container">
          <ButtonGroup
            buttonProps={[
              {
                size: 'small',
                onClick: () => console.log('Test Default Click'),
              },
              {
                size: 'small',
                label: 'Save Table',
                // icon: <Save />,
                onClick: () => handleSave(),
              },
            ]}
          />
          {/* Save Table
          <IconButton onClick={handleSave}>
            <Save />
          </IconButton> */}
        </div>
      )}
      <div className="pd-table-container" ref={tableRef}>
        <div>
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
      </div>
      {/* <div className="footnotes-container">
        <FootNotes
          data={footNoteData}
          edit={edit}
          onChange={handleFootnoteEdit}
        />
      </div> */}
    </section>
  );
}

export default PDTable;

PDTable.propTypes = {
  data: PropTypes.isRequired,
  edit: PropTypes.isRequired,
  onChange: PropTypes.isRequired,
  index: PropTypes.isRequired,
  segment: PropTypes.isRequired,
  activeLineID: PropTypes.isRequired,
  lineID: PropTypes.isRequired,
};
