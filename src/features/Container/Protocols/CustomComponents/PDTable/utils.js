import { cloneDeep, isEqual } from 'lodash';

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
  const emptyRow = createEmptyRow(
    data[0].columns.filter((x) => x.op_type !== QC_CHANGE_TYPE.DELETED).length,
  );
  const newEmptyRow = {
    row_indx: index.toString(),
    roi_id: '',
    op_type: QC_CHANGE_TYPE.ADDED,
    columns: emptyRow,
  };
  data.splice(index, 0, newEmptyRow);
  return data;
};

export const deleteRow = (rows, index) => {
  const data = cloneDeep(rows);
  if (data[index].op_type === QC_CHANGE_TYPE.ADDED) {
    data.splice(index, 1);
  } else {
    data[index].op_type = QC_CHANGE_TYPE.DELETED;
  }

  return data;
};

export const addColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  data.forEach((record) => {
    if (record.op_type !== QC_CHANGE_TYPE.DELETED) {
      record.op_type = record.op_type || QC_CHANGE_TYPE.UPDATED;
      record.columns.splice(index, 0, getEmptyCell(index));
      if (record.op_type === QC_CHANGE_TYPE.ADDED) {
        record.columns.forEach((col, i) => {
          col.col_indx = i.toString();
        });
      }
    }
  });
  return data;
};

export const deleteColumn = (tabledata, index) => {
  const data = cloneDeep(tabledata);
  data.forEach((record) => {
    if (record.columns[index].op_type === QC_CHANGE_TYPE.ADDED) {
      record.columns.splice(index, 1);
    } else {
      record.op_type = record.op_type || QC_CHANGE_TYPE.UPDATED;
      record.columns[index].value = `<s>${record.columns[index].value}</s>`;
      record.columns[index].op_type = QC_CHANGE_TYPE.DELETED;
    }
  });
  return data;
};

export const swapRowElements = (array, index1, index2) => {
  const arr = cloneDeep(array);
  const len = arr[index1].columns.length;
  const x = [...Array(len).keys()];
  try {
    x.forEach((i) => {
      const temp1 = arr[index1].columns[i].value;
      arr[index1].columns[i].value = arr[index2].columns[i].value;
      arr[index2].columns[i].value = temp1;
      arr[index1].columns[i].op_type =
        arr[index1].columns[i].op_type || QC_CHANGE_TYPE.UPDATED;
      arr[index2].columns[i].op_type =
        arr[index2].columns[i].op_type || QC_CHANGE_TYPE.UPDATED;
    });
    arr[index1].op_type = arr[index1].op_type || QC_CHANGE_TYPE.UPDATED;
    arr[index2].op_type = arr[index2].op_type || QC_CHANGE_TYPE.UPDATED;
    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const swapColumnElements = (array, index1, index2) => {
  const arr = cloneDeep(array);
  arr.forEach((list) => {
    const temp = list.columns[index1].value;
    list.columns[index1].value = list.columns[index2].value;
    list.columns[index2].value = temp;
    list.columns[index1].op_type =
      list.columns[index1].op_type || QC_CHANGE_TYPE.UPDATED;
    list.columns[index2].op_type =
      list.columns[index2].op_type || QC_CHANGE_TYPE.UPDATED;
    list.op_type = list.op_type || QC_CHANGE_TYPE.UPDATED;
  });
  return arr;
};

const nextChar = (c) => {
  const i = (parseInt(c, 36) + 1) % 36;
  return (!i * 10 + i).toString(36);
};

export const updateFootNotePayload = (data) => {
  const updateFootNoteData = cloneDeep(data);
  if (updateFootNoteData.length > 0) {
    updateFootNoteData.forEach((notes, index) => {
      if (!notes?.Text?.includes('.')) {
        const indicatorValue =
          index > 0
            ? nextChar(updateFootNoteData[index - 1]?.Text?.split('.')[0]) || ''
            : 'a';
        updateFootNoteData[
          index
        ].Text = `${indicatorValue}. ${updateFootNoteData[index].Text}`;
        if (!updateFootNoteData?.[index]?.PrevousAttachmentIndex) {
          updateFootNoteData[index].PrevousAttachmentIndex =
            index > 0 ? index - 1 : null;
        }
      }
    });
  }

  return updateFootNoteData;
};

export const getColumns = (record) => {
  if (record?.op_type === QC_CHANGE_TYPE.DELETED) {
    return [];
  }
  if (record?.op_type === QC_CHANGE_TYPE.ADDED) {
    return record.columns
      .filter((op) => op?.op_type !== QC_CHANGE_TYPE.DELETED)
      .map((x, i) => {
        x.col_indx = i.toString();
        return x;
      });
  }
  return record.columns.filter((op) => op?.op_type);
};

export const updateRowIndex = (data) => {
  const updatedRows = cloneDeep(data);
  updatedRows.forEach((row, idx) => {
    row.row_indx = idx.toString();
    row.columns = getColumns(row);
  });
  return updatedRows;
};

export const filterFootNotes = (data) => {
  const updatedFootNoteData = updateFootNotePayload(data);
  return updatedFootNoteData.filter((notes) => notes?.qc_change_type_footnote);
};

export const buildRowColumnIndex = (data) => {
  let i = 0;

  data.forEach((row) => {
    if (row.op_type !== QC_CHANGE_TYPE.DELETED) {
      row.row_indx = i.toString();
      i++;
    }
    let j = 0;
    row.columns.forEach((col) => {
      if (col.op_type !== QC_CHANGE_TYPE.DELETED) {
        col.col_indx = j.toString();
        j++;
      }
    });
  });
  return data;
};

export const filterTableProperties = (data) => {
  let filterUpdatedData =
    typeof data === 'string' ? cloneDeep(JSON.parse(data)) : cloneDeep(data);
  filterUpdatedData = buildRowColumnIndex(filterUpdatedData);
  filterUpdatedData = filterUpdatedData.filter((list) => list?.op_type);
  filterUpdatedData.forEach((record) => {
    record.columns = getColumns(record);
  });
  return filterUpdatedData;
};

export const getHtmlString = (str, isPreTerm) => {
  if (!str) return str;
  return {
    __html:
      isPreTerm && str
        ? `<b class="Preferred-txt">${str
            .replace(/[_]/g, ' ')
            .replace('cpt', '')
            .trim()}</b>`
        : `${str}`,
  };
};

export const getPreferredTerms = (
  val,
  isPreferredTerm,
  preferredTerms,
  clinicalTerms,
  isClinicalTerms,
) => {
  if (isPreferredTerm && preferredTerms) {
    const preArr = Object.entries(preferredTerms);
    const arrVal = preArr.find(
      (x) => x[0].trim().toLowerCase() === val.trim().toLowerCase(),
    );

    if (arrVal) {
      return getHtmlString(val, true);
    }
  }

  if (isClinicalTerms && clinicalTerms) {
    const clinicalArr = Object.keys(clinicalTerms);
    let text = val;
    if (!text) return text;
    clinicalArr.forEach((term) => {
      const pattern = new RegExp(`\\b${term}\\b`, 'g');
      text = text.replaceAll(
        pattern,
        `<b class="enriched-txt">${term}</b>`,
        text,
      );
    });
    return { __html: `${text}` };
  }

  return getHtmlString(val, false);
};

export const getHierarchyName = (type) => {
  if (isEqual(type, 'text')) {
    return 'paragraph';
  }
  if (isEqual(type, 'header')) {
    return 'header';
  }
  if (isEqual(type, 'table')) {
    return 'table';
  }
  return '';
};
