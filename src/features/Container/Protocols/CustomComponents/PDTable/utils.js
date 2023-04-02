import { cloneDeep } from 'lodash';

const QC_CHANGE_TYPE = {
  ADDED: 'add',
  UPDATED: 'modify',
  DELETED: 'delete',
};
const getEmptyCell = (colIndex) => {
  return {
    col_indx: colIndex.toString(),
    op_type: QC_CHANGE_TYPE.ADDED,
    cell_id: '',
    value: '',
  };
};
const createEmptyRow = (columnLength) => {
  const row = [];
  [...Array(columnLength)].forEach((_, i) => {
    row[i] = getEmptyCell(i);
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
  const emptyRow = createEmptyRow(data[0].columns.length);
  const newEmptyRow = {
    roi_id: '',
    row_indx: rows.length.toString(),
    op_type: QC_CHANGE_TYPE.ADDED,
    columns: emptyRow,
  };
  data.splice(index, 0, newEmptyRow);
  return data;
};

export const deleteRow = (rows, index) => {
  const data = cloneDeep(rows);
  data[index].op_type = QC_CHANGE_TYPE.DELETED;
  return data;
};

export const addColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  data.forEach((record) => {
    record.columns.splice(index, 0, getEmptyCell(index));
  });
  data.forEach((record, i) => {
    data[i].op_type = QC_CHANGE_TYPE.UPDATED;
    record.columns.forEach((col, j) => {
      record.columns[j].col_indx = j.toString();
    });
  });
  return data;
};

export const deleteColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  data.forEach((record) => {
    record.columns[index].value = `<s>${record.columns[index].value}</s>`;
    record.columns[index].op_type = QC_CHANGE_TYPE.DELETED;
  });
  return data;
};

export const swapElements = (array, index1, index2) => {
  const arr = cloneDeep(array);
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

  return arr;
};
