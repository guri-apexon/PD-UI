import CellRenderer from './CellRenderers/CellRenderer';
import { TableConst } from './Constants';
import FirstColumn from './CellRenderers/FirstColumn';

const checkAndPush = (arr, obj) => {
  const found = arr.find(
    (item) =>
      Number(obj[TableConst.ROW_IDX]) === Number(item[TableConst.ROW_IDX]) &&
      Number(obj[TableConst.COLUMN_IDX]) ===
        Number(item[TableConst.COLUMN_IDX]),
  );
  if (!found) arr.push(obj);
};

const addColumnDefs = (item) => {
  if (item[TableConst.ROW_IDX] === 0 && item[TableConst.COLUMN_IDX] === 0) {
    item.headerClass = TableConst.headerClass;
    item.width = 150;
    item.suppressSizeToFit = true;
    item.pinned = 'left';
    item.lockPosition = 'left';
    item.lockPinned = true;
    item.cellRenderer = FirstColumn;
    item.lockPinned = true;
    item.cellClass = 'column1';
  } else {
    item.cellRenderer = CellRenderer;
    item.suppressSizeToFit = true;
  }
  item.editable = true;
  item.headerName = item[TableConst.VALUE_TEXT1];
  item.cellEditorSelector = (params) => {
    const { data, colDef } = params;
    const initialState = data[colDef.field]?.[TableConst.DATA_VALUE]
      ? data[colDef.field]?.[TableConst.DATA_VALUE]
      : '';

    return {
      component: 'agTextCellEditor',
      popup: true,

      params: {
        value: initialState,
      },
    };
  };
  item.valueSetter = (params) => {
    const newValInt = parseInt(params.newValue, 10);
    const {
      colDef: { field },
      node: { rowIndex },
    } = params;
    const valueChanged = params.data.b !== newValInt;

    if (valueChanged) {
      if (!params.oldValue) {
        params.data[field] = {
          [TableConst.ROW_IDX]: rowIndex,
          [TableConst.COLUMN_IDX]: field,
          [TableConst.DATA_VALUE]: params.newValue,
        };
      } else {
        params.data[field][TableConst.DATA_VALUE] = params.newValue;
      }
      params.data.b = params.data[field];
    }
    return valueChanged;
  };
  // item.suppressMovable = true;
  // item.field = item.data;

  item.headerClass = TableConst.headerClass;
};
const getTableColumns = (data) => {
  data.forEach((item) => {
    addColumnDefs(item);
  });

  // return res;
  return data;
};
const getValueFormRecord = (item) => {
  if (item[TableConst.DATA_NEW_VALUE]) return item[TableConst.DATA_NEW_VALUE];
  if (Number(item[TableConst.COLUMN_IDX]) === 0) {
    return item[TableConst.VALUE_TEXT1];
  }
  return item[TableConst.VALUE_TEXT1];
};

export { checkAndPush, getTableColumns, getValueFormRecord, addColumnDefs };
