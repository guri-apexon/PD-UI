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
  return data.map((record) => {
    return {
      ...record,
      op_type: QC_CHANGE_TYPE.UPDATED,
      columns: record.columns.map((col, j) => {
        return {
          ...col,
          col_indx: j.toString(),
        };
      }),
    };
  });
};

export const deleteColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  data.forEach((record) => {
    record.columns[index].value = `<s>${record.columns[index].value}</s>`;
    record.columns[index].op_type = QC_CHANGE_TYPE.DELETED;
  });
  return data;
};

export const swapRowElements = (array, index1, index2) => {
  const arr = cloneDeep(array);
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

  return arr;
};

export const swapColumnElements = (array, index1, index2) => {
  array.forEach((list) => {
    const temp = list.columns[index1];
    temp.col_indx = index1.toString();
    list.columns[index1] = list?.columns[index2];
    list.columns[index1].col_indx = index2.toString();
    list.columns[index2] = temp;
  });
  return array;
};

const nextChar = (c) => {
  const i = (parseInt(c, 36) + 1) % 36;
  return (!i * 10 + i).toString(36);
};

export const updateFootNotePayload = (data) => {
  const updateFootNoteData = cloneDeep(data);
  if (updateFootNoteData.length > 0) {
    updateFootNoteData.forEach((notes, index) => {
      const indicatorValue =
        index !== 0
          ? nextChar(updateFootNoteData[index - 1].footnote_indicator)
          : 'a';
      updateFootNoteData[index].previous_sequnce_index =
        index === 0 ? null : index - 1;
      updateFootNoteData[index].footnote_indicator = indicatorValue;
      updateFootNoteData[
        index
      ].footnote_text = `${indicatorValue}. ${updateFootNoteData[index].footnote_text}`;
    });
  }

  return updateFootNoteData;
};

export const filterTableProperties = (data) => {
  let filterUpdatedData =
    typeof data === 'string' ? cloneDeep(JSON.parse(data)) : cloneDeep(data);
  filterUpdatedData = filterUpdatedData.filter((list) => list?.op_type);
  filterUpdatedData.forEach((record) => {
    record.columns = record.columns.filter((op) => op?.op_type);
  });
  return filterUpdatedData;
};
