import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const QC_CHANGE_TYPE = {
  ADDED: 'add',
  UPDATED: 'modify',
  DELETED: 'delete',
};
const getEmptyCell = () => {
  return {
    content: '',
    roi_id: {
      table_roi_id: uuidv4(),
      row_roi_id: uuidv4(),
      column_roi_id: uuidv4(),
      datacell_roi_id: uuidv4(),
    },
  };
};
const createEmptyRow = (columnLength) => {
  const row = {};
  [...Array(columnLength)].forEach((_, i) => {
    const index = `${parseInt(i, 10)}`;
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
  const emptyRow = createEmptyRow(Object.keys(rows[0].row_props).length);
  const newEmptyRow = {
    row_roi_id: '',
    row_idx: rows.length.toString(),
    row_props: emptyRow,
  };
  data.splice(index, 0, newEmptyRow);
  return data;
};

export const deleteRow = (rows, index) => {
  const data = cloneDeep(rows);
  Object.keys(data[index].row_props).forEach((key) => {
    data[index].row_props[
      key
    ].content = `<s>${data[index].row_props[key].content}</s>`;
    data[index].row_props[key].qc_change_type = QC_CHANGE_TYPE.DELETED;
  });
  return data;
};

export const addColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  for (let i = 0; i < data.length; i++) {
    const rowProps = data[i]?.row_props;
    const flatArray = Object.keys(rowProps).map((key) => rowProps[key]);
    flatArray.splice(index, 0, getEmptyCell());
    const obj = flatArray.reduce((acc, cur, i) => {
      acc[i + 1] = cur;
      return acc;
    }, {});
    data[i].row_props = obj;
  }
  return data;
};

export const deleteColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  for (let i = 0; i < data.length; i++) {
    Object.keys(data[i].row_props).forEach((key, j) => {
      if (j === index) {
        data[i].row_props[
          key
        ].content = `<s>${data[i].row_props[key].content}</s>`;
        data[i].row_props[key].qc_change_type = QC_CHANGE_TYPE.DELETED;
      }
    });
  }
  return data;
};

export const swapElements = (array, index1, index2) => {
  const arr = cloneDeep(array);
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

  return arr;
};
