import { cloneDeep, isEqual } from 'lodash';
import { tableOperations } from './Components/dropdownData';

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
    col_render: false,
    rowspan: 1,
    colspan: 1,
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

export const getMaxColumns = (arr) => {
  let maxColumns = 0;
  arr.forEach((item) => {
    const cols = item.columns.filter((x) => x.op_type !== 'delete');
    if (cols.length > maxColumns) {
      maxColumns = cols.length;
    }
  });
  return maxColumns;
};

export const addRow = (rows, index) => {
  const data = cloneDeep(rows);
  const emptyRow = createEmptyRow(getMaxColumns(data));
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
  if (data[index]?.op_type === QC_CHANGE_TYPE.ADDED) {
    data.splice(index, 1);
  } else {
    data[index].op_type = QC_CHANGE_TYPE.DELETED;
    const rowData = data.splice(index, 1);
    data.push(rowData[0]);
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
    if (record.op_type !== QC_CHANGE_TYPE.DELETED) {
      if (record.columns[index].op_type === QC_CHANGE_TYPE.ADDED) {
        record.columns.splice(index, 1);
      } else {
        record.op_type = record.op_type || QC_CHANGE_TYPE.UPDATED;
        record.columns[index].value = `<s>${record.columns[index].value}</s>`;
        record.columns[index].op_type = QC_CHANGE_TYPE.DELETED;
        const coldata = record.columns.splice(index, 1);
        record.columns.push(coldata[0]);
      }
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

export const updateFootNotePayload = (data) => {
  let updateFootNoteData = cloneDeep(data);
  if (updateFootNoteData.length > 0) {
    updateFootNoteData = [...updateFootNoteData].filter(
      (x) => !(x.qc_change_type_footnote === 'add' && !x.Text),
    );

    let i = 0;
    updateFootNoteData.forEach((notes) => {
      if (!notes.Text) {
        notes.qc_change_type_footnote = QC_CHANGE_TYPE.DELETED;
      }
      notes.PrevousAttachmentIndex = i > 0 ? i - 1 : null;
      if (notes.qc_change_type_footnote !== QC_CHANGE_TYPE.DELETED) {
        i += 1;
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

export const renderTableData = (data) => {
  const cloneData = [...data];
  let draggable = true;
  const handleColSpan = (value, rowIdx, colidx) => {
    let index = colidx + 1;
    while (value > 0) {
      cloneData[rowIdx].columns[index] = {
        ...cloneData[rowIdx].columns[index],
        col_render: false,
        rowspan: -1,
        colSpan: -1,
      };
      value -= 1;
      index += 1;
    }
  };

  const handleRowSpan = (value, rowIdx, colidx) => {
    let index = rowIdx + 1;
    while (value > 0) {
      cloneData[index].columns[colidx] = {
        ...cloneData[index].columns[colidx],
        col_render: false,
        rowspan: -1,
        colSpan: -1,
      };
      value -= 1;
      index += 1;
    }
  };
  data.forEach((row, rowIndex) => {
    row.columns.forEach((col, colIndex) => {
      if (col.colspan > 1) {
        draggable = false;
        handleColSpan(col.colspan - 1, rowIndex, colIndex);
      }
      if (col.rowspan > 1) {
        draggable = false;
        handleRowSpan(col.rowspan - 1, rowIndex, colIndex);
      }
    });
  });

  return { tableData: cloneData, isDraggable: draggable };
};

export const formattableData = (data) => {
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

export const checkSpanValue = (
  operationData,
  rowIndex,
  colIndex,
  nextIndex,
  ops,
) => {
  let isSpan = false;
  let currentRowSpan;
  let nextRowSpan;
  if (ops === 'mergeRight' || ops === 'mergeLeft') {
    currentRowSpan = Math.abs(
      operationData[rowIndex]?.columns[colIndex]?.rowspan,
    );
    nextRowSpan = Math.abs(
      operationData[rowIndex]?.columns[nextIndex]?.rowspan,
    );
  } else {
    currentRowSpan = Math.abs(
      operationData[rowIndex]?.columns[colIndex]?.colspan,
    );

    nextRowSpan = Math.abs(
      operationData[nextIndex]?.columns[colIndex]?.colspan,
    );
  }
  if (currentRowSpan === nextRowSpan) {
    isSpan = true;
  }
  return isSpan;
};

export const getNextColIndex = (operationData, rowIndex, colIndex, ops) => {
  let flag = true;
  let cellIdx = colIndex;
  while (flag) {
    if (ops === 'mergeRight') {
      cellIdx += 1;
    } else if (ops === 'mergeLeft') {
      cellIdx -= 1;
    }
    const cellRender = operationData[rowIndex]?.columns[cellIdx]?.col_render;
    if (cellRender) {
      flag = false;
    } else if (cellRender === undefined) {
      flag = false;
    }
  }
  return cellIdx;
};

export const cellOperationData = (
  operationData,
  rowIndex,
  colIndex,
  nextColIndex,
  ops,
) => {
  const isSpanValue = checkSpanValue(
    operationData,
    rowIndex,
    colIndex,
    nextColIndex,
    ops,
  );
  if (isSpanValue) {
    operationData[rowIndex].columns[
      colIndex
    ].value += ` ${operationData[rowIndex].columns[nextColIndex].value}`;
    operationData[rowIndex].columns[colIndex].colspan =
      Math.abs(operationData[rowIndex].columns[colIndex].colspan) +
      Math.abs(operationData[rowIndex].columns[nextColIndex].colspan);
    const rowSpan = Math.abs(operationData[rowIndex].columns[colIndex].rowspan);
    if (rowSpan > 1) {
      let rowValue = rowSpan - 1;
      while (rowValue > 0) {
        operationData[rowIndex + rowValue].columns[colIndex].colspan =
          operationData[rowIndex].columns[colIndex].colspan;
        rowValue -= 1;
      }
    }
    // payload logic
    operationData[rowIndex].op_type =
      operationData[rowIndex].op_type || QC_CHANGE_TYPE.UPDATED;
    operationData[rowIndex].columns[colIndex].op_type =
      operationData[rowIndex].columns[colIndex].op_type ||
      QC_CHANGE_TYPE.UPDATED;
    operationData[rowIndex].columns[nextColIndex] = {
      ...operationData[rowIndex].columns[nextColIndex],
      col_render: false,
      value: '',
      op_type:
        operationData[rowIndex].columns[nextColIndex].op_type ||
        QC_CHANGE_TYPE.UPDATED,
    };
  } else {
    operationData = [];
  }
  return operationData;
};

export const getNextRowIndex = (operationData, rowIndex, colIndex, ops) => {
  let flag = true;
  let cellIdx = rowIndex;
  while (flag) {
    if (ops === 'mergeBelow') {
      cellIdx += 1;
    } else if (ops === 'mergeAbove') {
      cellIdx -= 1;
    }
    const cellRender = operationData[cellIdx]?.columns[colIndex]?.col_render;
    if (cellRender) {
      flag = false;
    } else if (cellRender === undefined) {
      flag = false;
    }
  }
  return cellIdx;
};

export const rowMergeOperation = (
  operationData,
  rowIndex,
  colIndex,
  nextRowIndex,
) => {
  operationData[rowIndex].columns[
    colIndex
  ].value += ` ${operationData[nextRowIndex].columns[colIndex].value}`;
  const curRowspan = Math.abs(
    operationData[rowIndex].columns[colIndex].rowspan,
  );
  const nextRowSpan = Math.abs(
    operationData[nextRowIndex].columns[colIndex].rowspan,
  );
  operationData[rowIndex].columns[colIndex].rowspan = curRowspan + nextRowSpan;

  // logic for payload
  operationData[rowIndex].op_type =
    operationData[rowIndex].op_type || QC_CHANGE_TYPE.UPDATED;
  operationData[nextRowIndex].op_type =
    operationData[nextRowIndex].op_type || QC_CHANGE_TYPE.UPDATED;
  operationData[rowIndex].columns[colIndex].op_type = QC_CHANGE_TYPE.UPDATED;
  operationData[nextRowIndex].columns[colIndex] = {
    ...operationData[nextRowIndex].columns[colIndex],
    col_render: false,
    value: '',
    op_type:
      operationData[nextRowIndex].columns[colIndex].op_type ||
      QC_CHANGE_TYPE.UPDATED,
  };
  return operationData;
};

export const adjustRowSpan = (data, rowIndex, colIndex) => {
  let colSpancount = 0;
  const rowSpan = data[rowIndex].columns.map((item, index) => {
    let itemObj = {
      ...item,
    };
    if (index !== colIndex && item.col_render) {
      const rowSpanvalue = Math.abs(item?.rowspan);
      itemObj = {
        ...item,
        rowspan: rowSpanvalue + 1,
        op_type: item?.op_type || QC_CHANGE_TYPE.UPDATED,
      };
      if (item?.colspan > 1) {
        colSpancount = item?.colspan;
      }
    } else if (index === colIndex) {
      if (item?.colspan > 1) {
        colSpancount = item?.colspan;
      }
    } else if (!item.col_render && colSpancount === 0) {
      let rowIdx = rowIndex - 1;
      let flag = true;
      while (rowIdx >= 0 && flag) {
        if (data[rowIdx]?.columns[index]?.col_render) {
          const prevRowSpan = Math.abs(data[rowIdx].columns[index].rowspan);
          data[rowIdx].columns[index].rowspan = prevRowSpan + 1;
          data[rowIdx].op_type = data[rowIdx].op_type || QC_CHANGE_TYPE.UPDATED;
          flag = false;
        }
        rowIdx -= 1;
      }
    }
    if (colSpancount > 0) colSpancount -= 1;
    return itemObj;
  });
  data[rowIndex].columns = rowSpan;
  return data;
};

export const adjustColSpan = (data, rowIndex, colIndex) => {
  data?.forEach((item, index) => {
    if (index !== rowIndex && data[index].columns[colIndex].col_render) {
      const colSpan = Math.abs(data[index].columns[colIndex].colspan);
      data[index].columns[colIndex].colspan = colSpan + 1;
      data[index].columns[colIndex].op_type =
        data[index].columns[colIndex].op_type || QC_CHANGE_TYPE.UPDATED;
    } else if (!data[index].columns[colIndex].col_render) {
      let colIdx = colIndex - 1;
      let flag = true;
      while (colIdx >= 0 && flag) {
        if (data[index]?.columns[colIdx]?.col_render) {
          data[index].columns[colIdx].colspan += 1;
          data[index].op_type = data[index].op_type || QC_CHANGE_TYPE.UPDATED;
          flag = false;
        }
        colIdx -= 1;
      }
    }
  });
  return [...data];
};

export const formatRowData = (data, rowIdx) => {
  const newRowData = data[rowIdx].columns.map((item, index) => {
    return { ...item, colspan: data[rowIdx - 1].columns[index].colspan };
  });

  return newRowData;
};

export const addNewRow = (data, index, tableOps) => {
  if (tableOps === tableOperations.addRowAbove && index === 0) {
    const dataRow = data[index].columns.map((item) => {
      return {
        ...item,
        col_render: true,
        op_type: item.op_type || QC_CHANGE_TYPE.UPDATED,
      };
    });
    data[index].columns = dataRow;
    return data;
  }
  let colSpanValue = 0;
  const prevIndex = index - 1;
  const rowData = data[index].columns.map((item, idx) => {
    let itemObj = { ...item };
    if (
      data[prevIndex].columns[idx].col_render &&
      data[prevIndex].columns[idx].rowspan <= 1
    ) {
      itemObj = {
        ...itemObj,
        colspan: data[prevIndex].columns[idx].colspan,
        col_render: true,
        op_type: itemObj.op_type || QC_CHANGE_TYPE.UPDATED,
      };
      colSpanValue = Math.abs(data[prevIndex].columns[idx].colspan);
    } else if (
      data[prevIndex].columns[idx].col_render &&
      data[prevIndex].columns[idx].rowspan > 1
    ) {
      data[prevIndex].columns[idx].rowspan += 1;
      colSpanValue = Math.abs(data[prevIndex].columns[idx].colspan);
      data[prevIndex].columns[idx].op_type =
        data[prevIndex].columns[idx].op_type || QC_CHANGE_TYPE.UPDATED;
      itemObj = { ...item, colspan: colSpanValue };
    } else if (!data[prevIndex].columns[idx].col_render && colSpanValue === 0) {
      let rowIdx = index - 1;
      let flag = true;
      while (rowIdx >= 0 && flag) {
        if (data[rowIdx]?.columns[idx]?.col_render) {
          const prevRowSpan = Math.abs(data[rowIdx].columns[idx].rowspan);
          data[rowIdx].columns[idx].rowspan = prevRowSpan + 1;
          data[rowIdx].op_type = data[rowIdx].op_type || QC_CHANGE_TYPE.UPDATED;
          flag = false;
          colSpanValue = Math.abs(data[rowIdx].columns[idx].colspan);
          itemObj = { ...item, colspan: colSpanValue };
        }
        rowIdx -= 1;
      }
    } else if (!data[prevIndex].columns[idx]?.col_render && colSpanValue > 0) {
      let rowIdx = index - 1;
      while (rowIdx >= 0) {
        if (data[rowIdx]?.columns[idx]?.col_render) {
          break;
        }
        rowIdx -= 1;
      }
      if (data[rowIdx]?.columns[idx]?.col_render) {
        data[rowIdx + 1].columns[idx].rowspan = Math.abs(
          data[rowIdx + 1].columns[idx - 1].rowspan,
        );
        data[rowIdx + 1].columns[idx].op_type =
          data[rowIdx + 1].columns[idx].op_type || QC_CHANGE_TYPE.UPDATED;
        data[rowIdx + 1].op_type =
          data[rowIdx + 1].op_type || QC_CHANGE_TYPE.UPDATED;
      }
    }

    if (colSpanValue > 0) colSpanValue -= 1;
    return itemObj;
  });
  data[index].columns = rowData;
  return data;
};

export const addNewColumn = (data, index, tableOps) => {
  if (tableOps === tableOperations.addColumnLeft && index === 0) {
    data.forEach((item, idx) => {
      data[idx].columns[index].col_render = true;
      data[idx].columns[index].op_type =
        data[idx].columns[index].op_type || QC_CHANGE_TYPE.UPDATED;
      data[idx].op_type = data[idx].op_type || QC_CHANGE_TYPE.UPDATED;
    });

    return data;
  }
  let rowSpanValue = 0;
  data.forEach((item, idx) => {
    const colSpan = Math.abs(data[idx].columns[index - 1].colspan);
    if (data[idx].columns[index - 1].col_render && colSpan <= 1) {
      data[idx].columns[index].col_render = true;
      data[idx].columns[index].op_type =
        data[idx].columns[index].op_type || QC_CHANGE_TYPE.UPDATED;
      data[idx].op_type = data[idx].op_type || QC_CHANGE_TYPE.UPDATED;
      rowSpanValue = Math.abs(data[idx].columns[index - 1].rowspan);
      data[idx].columns[index].rowspan = rowSpanValue;
    } else if (data[idx].columns[index - 1].col_render && colSpan > 1) {
      data[idx].columns[index - 1].colspan += 1;
      data[idx].columns[index - 1].op_type =
        data[idx].columns[index - 1].op_type || QC_CHANGE_TYPE.UPDATED;
      rowSpanValue = Math.abs(data[idx].columns[index - 1].rowspan);
      data[idx].columns[index].rowspan = rowSpanValue;
    } else if (!data[idx].columns[index - 1].col_render && rowSpanValue === 0) {
      let colIdx = index - 1;
      let flag = true;
      while (colIdx >= 0 && flag) {
        if (data[idx]?.columns[colIdx]?.col_render) {
          data[idx].columns[colIdx].colspan += 1;
          data[idx].columns[colIdx].op_type =
            data[idx].columns[colIdx].op_type || QC_CHANGE_TYPE.UPDATED;
          data[idx].op_type = data[idx].op_type || QC_CHANGE_TYPE.UPDATED;
          flag = false;
          rowSpanValue = Math.abs(data[idx].columns[colIdx].rowspan);
        }
        colIdx -= 1;
      }
    } else if (!data[idx].columns[index - 1].col_render && rowSpanValue > 0) {
      let colIdx = index - 1;
      while (colIdx >= 0) {
        if (data[idx]?.columns[colIdx]?.col_render) {
          break;
        }
        colIdx -= 1;
      }
      if (data[idx].columns[colIdx + 1].colspan > 1) {
        data[idx].columns[colIdx + 1].colspan =
          Math.abs(data[idx].columns[colIdx + 1].colspan) + 1;
        data[idx].columns[colIdx + 1].op_type =
          data[idx].columns[colIdx + 1].op_type || QC_CHANGE_TYPE.UPDATED;
      }
    }
    if (rowSpanValue > 0) rowSpanValue -= 1;
  });
  return data;
};

export const deleteRowData = (data, rowIndex) => {
  const nextIndex = rowIndex + 1;
  data[rowIndex].columns.forEach((item, index) => {
    if (item?.rowspan > 1) {
      data[nextIndex].columns[index].rowspan = item.rowspan - 1;
      data[nextIndex].columns[index].col_render = true;
      data[nextIndex].columns[index].value = item.value;
      data[nextIndex].columns[index].op_type =
        data[nextIndex].columns[index].op_type || QC_CHANGE_TYPE.UPDATED;
      data[nextIndex].op_type =
        data[nextIndex].op_type || QC_CHANGE_TYPE.UPDATED;
    }
    if (!item?.col_render) {
      let flagRender = true;
      let prevIndex = rowIndex;
      while (flagRender && prevIndex >= 0) {
        prevIndex -= 1;
        if (data[prevIndex]?.columns[index]?.col_render) {
          flagRender = false;
        }
      }
      if (data[prevIndex]?.columns[index]?.rowspan > 1) {
        data[prevIndex].columns[index].rowspan -= 1;
        data[prevIndex].columns[index].op_type =
          data[prevIndex].columns[index].op_type || QC_CHANGE_TYPE.UPDATED;
        data[prevIndex].op_type =
          data[prevIndex].op_type || QC_CHANGE_TYPE.UPDATED;
      }
    }
    data[rowIndex].columns[index].col_render = false;
    data[rowIndex].columns[index].rowspan = -1;
    data[rowIndex].columns[index].colspan = -1;
  });

  return data;
};

export const deleteColData = (data, colIndex) => {
  let rowSpan;
  data.forEach((item, index) => {
    if (rowSpan > 1) {
      rowSpan -= 1;
    } else if (data[index].columns[colIndex]?.colspan > 1) {
      data[index].columns[colIndex + 1].colspan =
        data[index].columns[colIndex].colspan - 1;
      data[index].columns[colIndex + 1].col_render = true;
      data[index].columns[colIndex + 1].value =
        data[index].columns[colIndex].value;
      data[index].columns[colIndex + 1].op_type =
        data[index].columns[colIndex + 1].op_type || QC_CHANGE_TYPE.UPDATED;
      data[index].op_type = data[index].op_type || QC_CHANGE_TYPE.UPDATED;
      rowSpan = Math.abs(data[index].columns[colIndex]?.rowspan);
      let rowTemp = rowSpan - 1;
      while (rowTemp > 0) {
        data[index + rowTemp].columns[colIndex + 1].colspan =
          data[index + rowTemp].columns[colIndex + 1].colspan;
        data[index + rowTemp].columns[colIndex + 1].op_type =
          data[index + rowTemp].columns[colIndex + 1].op_type ||
          QC_CHANGE_TYPE.UPDATED;
        data[index + rowTemp].op_type =
          data[index].op_type || QC_CHANGE_TYPE.UPDATED;
        rowTemp -= 1;
      }
    } else if (!data[index].columns[colIndex]?.col_render) {
      let flagRender = true;
      let prevIndex = colIndex;

      while (flagRender && prevIndex >= 0) {
        prevIndex -= 1;
        if (data[index].columns[prevIndex]?.col_render) {
          flagRender = false;
          rowSpan = Math.abs(data[index].columns[prevIndex]?.rowspan);
        }
      }
      if (data[index]?.columns[prevIndex]?.colspan > 1) {
        data[index].columns[prevIndex].colspan -= 1;
        data[index].columns[prevIndex].op_type =
          data[index].columns[prevIndex].op_type || QC_CHANGE_TYPE.UPDATED;
        data[index].op_type = data[index].op_type || QC_CHANGE_TYPE.UPDATED;
      }
      let rowTemp = rowSpan - 1;
      while (rowTemp > 0) {
        data[index + rowTemp].columns[prevIndex].colspan -= 1;
        data[index + rowTemp].columns[prevIndex].op_type =
          data[index + rowTemp].columns[prevIndex].op_type ||
          QC_CHANGE_TYPE.UPDATED;
        data[index + rowTemp].op_type =
          data[index].op_type || QC_CHANGE_TYPE.UPDATED;
        rowTemp -= 1;
      }
    }
    data[index].columns[colIndex].col_render = false;
    data[index].columns[colIndex].rowspan = -1;
    data[index].columns[colIndex].colspan = -1;
    data[index].columns[colIndex].value = '';
  });
  return data;
};

export const checkRowLength = (data) => {
  const rowData = data.filter((x) => x.op_type !== 'delete');
  return rowData.length;
};

export const checkColLength = (data) => {
  const colData = data[0]?.columns?.filter((x) => x.op_type !== 'delete');
  return colData?.length;
};

export const colSplit = (operationData, rowIndex, colIndex) => {
  const colSpanValue = operationData[rowIndex].columns[colIndex].colspan;
  if (colSpanValue > 1) {
    operationData[rowIndex].columns[colIndex].colspan -= 1;
    operationData[rowIndex].columns[colIndex].op_type =
      operationData[rowIndex].columns[colIndex].op_type ||
      QC_CHANGE_TYPE.UPDATED;
    operationData[rowIndex].columns[
      colIndex + colSpanValue - 1
    ].col_render = true;
    operationData[rowIndex].columns[colIndex + colSpanValue - 1].rowspan =
      Math.abs(operationData[rowIndex].columns[colIndex].rowspan);
    operationData[rowIndex].op_type =
      operationData[rowIndex].op_type || QC_CHANGE_TYPE.UPDATED;
  } else {
    operationData = addColumn(operationData, colIndex + 1);
    operationData[rowIndex].columns[colIndex + 1] = {
      ...operationData[rowIndex].columns[colIndex + 1],
      col_render: true,
      rowspan: operationData[rowIndex].columns[colIndex].rowspan,
    };
    operationData = adjustColSpan(operationData, rowIndex, colIndex);
  }

  return operationData;
};

export const rowSplit = (operationData, rowIndex, colIndex) => {
  const rowSpanValue = operationData[rowIndex].columns[colIndex].rowspan;
  if (rowSpanValue > 1) {
    operationData[rowIndex].columns[colIndex].rowspan -= 1;
    operationData[rowIndex].columns[colIndex].op_type =
      operationData[rowIndex].columns[colIndex].op_type ||
      QC_CHANGE_TYPE.UPDATED;
    operationData[rowIndex].op_type =
      operationData[rowIndex].op_type || QC_CHANGE_TYPE.UPDATED;
    operationData[rowIndex + rowSpanValue - 1].columns[
      colIndex
    ].col_render = true;
    operationData[rowIndex + 1].columns[colIndex].colspan =
      operationData[rowIndex].columns[colIndex].colspan;
  } else {
    operationData = addRow(operationData, parseInt(rowIndex, 10) + 1);
    operationData[rowIndex + 1].columns = formatRowData(
      operationData,
      rowIndex + 1,
    );
    operationData[rowIndex + 1].columns[colIndex] = {
      ...operationData[rowIndex + 1].columns[colIndex],
      col_render: true,
      colspan: operationData[rowIndex].columns[colIndex].colspan,
    };
    operationData = adjustRowSpan(operationData, rowIndex, colIndex);
  }
  return operationData;
};

export const checkEmptyColumn = (data) => {
  const arr = [];
  const arrIndex = [];
  data
    .filter((row) => row.op_type !== QC_CHANGE_TYPE.DELETED)
    .forEach((row) => {
      row.columns.forEach((item, colIdx) => {
        if (item.col_render && !arr.includes(colIdx)) arr.push(colIdx);
      });
    });
  for (let n = 0; n < data[0]?.columns.length; n++) {
    if (!arr.includes(n)) arrIndex.push(n);
  }
  return arrIndex;
};

export const checkNewRow = (data) => {
  const arremty = [];
  data
    .filter((row) => row.op_type !== QC_CHANGE_TYPE.DELETED)
    .forEach((row, index) => {
      const arr = row.columns.filter((col) => col.col_render);
      if (arr.length === 0) {
        arremty.push(index);
      }
    });
  return arremty.sort();
};

export const checkNewIndex = (index, arr) => {
  let newIndex = index;
  arr?.forEach((item) => {
    if (index > item) {
      newIndex -= 1;
    }
  });
  return newIndex;
};
