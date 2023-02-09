import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const QC_CHANGE_TYPE = {
  ADDED: 'add',
  UPDATED: 'modify',
  DELETED: 'delete',
};
const getEmptyCell = () => {
  return {
    entities: [],
    content: '',
    roi_id: {
      table_roi_id: uuidv4(),
      row_roi_id: uuidv4(),
      column_roi_id: uuidv4(),
      datacell_roi_id: uuidv4(),
    },
    table_index: 2,
    qc_change_type: QC_CHANGE_TYPE.ADDED,
  };
};
const createEmptyRow = (columnLength) => {
  const row = {};
  [...Array(columnLength)].forEach((_, i) => {
    const index = `${parseInt(i + 1, 10)}.0`;
    row[index] = getEmptyCell();
  });
  return row;
};

export const updateTable = (data, content, rowIndex, columnIndex) => {
  const cloneData = cloneDeep(data);
  cloneData[rowIndex][columnIndex].content = content;
  return cloneData;
};

export const addRow = (rows, index) => {
  const data = cloneDeep(rows);
  const emptyRow = createEmptyRow(Object.keys(rows[0]).length);
  data.splice(index, 0, emptyRow);
  return data;
};

export const deleteRow = (rows, index) => {
  const data = cloneDeep(rows);
  Object.keys(data[index]).forEach((key) => {
    data[index][key].content = `<s>${data[index][key].content}</s>`;
    data[index][key].qc_change_type = QC_CHANGE_TYPE.DELETED;
  });
  return data;
};

export const addColumn = (tabledata, index) => {
  console.log(JSON.stringify(tabledata));
  const data = cloneDeep(tabledata);
  for (let i = 0; i < data.length; i++) {
    Object.keys(data[i]).forEach((key, j) => {
      if (j === index) {
        data[i][key] = getEmptyCell();
        const newKey = `${parseInt(j + 2, 10)}.0`;
        data[i][newKey] = tabledata[i][key];
      } else if (j > index) {
        const newKey = `${parseInt(j + 2, 10)}.0`;
        data[i][newKey] = tabledata[i][key];
      }
    });
  }
  return data;
};

export const deleteColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  for (let i = 0; i < data.length; i++) {
    Object.keys(data[i]).forEach((key, j) => {
      if (j === index) {
        data[i][key].content = `<s>${data[i][key].content}</s>`;
        data[i][key].qc_change_type = QC_CHANGE_TYPE.DELETED;
      }
    });
  }
  return data;
};

export const dataUtilsFun = (
  data,
  formattableData,
  setUpdatedData,
  setFootnoteData,
  setColumnLength,
  setColumnWidth,
) => {
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
};

export const handleColumnOperationUtilsFun = (
  operation,
  tableOperations,
  updatedData,
  index,
  setUpdatedData,
  setColumnLength,
) => {
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

export const handleRowOperationUtilsFun = (
  operation,
  tableOperations,
  updatedData,
  index,
  setUpdatedData,
  setColumnLength,
) => {
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
    if (confirm(confirmText)) {
      const newData = deleteRow(updatedData, index);
      setUpdatedData(newData);
      setColumnLength(Object.keys(newData[0]).length);
    }
  }
};
