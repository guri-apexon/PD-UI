import CellRenderer from './CellRenderers/CellRenderer';
import { TableConst } from './Constants';
import FirstColumn from './CellRenderers/FirstColumn';
import HeaderComponent from './CellRenderers/HeaderComponent';
import TextEditor from './CellRenderers/TextEditor';

const addColumnDefs = (item) => {
  if (item.isFirstColumn) {
    item.cellRenderer = FirstColumn;
    item.cellClass = 'column1';
    item.minWidth = 200;
  } else {
    item.cellRenderer = CellRenderer;
    item.minWidth = 150;
  }
  item.headerClass = TableConst.headerClass;
  item.suppressSizeToFit = true;
  item.headerComponent = HeaderComponent;
  item.headerGroupComponent = HeaderComponent;
  item.editable = true;
  item.headerName = item[TableConst.UID];
  item.suppressMovable = true;
  item.cellEditor = TextEditor;
  item.cellEditorSelector = (params) => {
    const { data, colDef } = params;
    const initialState = data[colDef.field]?.[TableConst.DATA_VALUE]
      ? data[colDef.field]?.[TableConst.DATA_VALUE]
      : '';
    return {
      component: TextEditor,
      popup: true,
      params: {
        value: initialState,
      },
    };
  };
  item.valueSetter = (params) => {
    const { oldValue, newValue } = params;

    let obj;
    if (oldValue) {
      obj = {
        [TableConst.COLUMN_IDX]: Number(oldValue[TableConst.COLUMN_IDX]),
        [TableConst.ROW_IDX]: Number(oldValue[TableConst.ROW_IDX]),
        [TableConst.VALUE_TEXT1]: newValue,
        isNewRecord: false,
      };
    } else {
      const {
        data,
        colDef: { field },
      } = params;
      const rowIndex = data[Object.keys(data)[0]][TableConst.ROW_IDX];

      obj = {
        [TableConst.COLUMN_IDX]: Number(field),
        [TableConst.ROW_IDX]: Number(rowIndex),
        [TableConst.VALUE_TEXT1]: newValue,
        isNewRecord: true,
      };
    }
    params.data.b = obj;

    return true;
  };
};
const getTableColumns = (data) => {
  let isFirstColumn = true;
  data.forEach((item) => {
    item.isFirstColumn = isFirstColumn;
    isFirstColumn = false;
    addColumnDefs(item);
  });
  return data;
};
const getValueFormRecord = (item) => {
  if (Number(item[TableConst.COLUMN_IDX]) === 0) {
    return item[TableConst.VALUE_TEXT1];
  }
  return item[TableConst.VALUE_TEXT1];
};
const stringReadable = (str) => {
  let i;
  const frags = str.split('_');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(' ');
};

export { getTableColumns, getValueFormRecord, addColumnDefs, stringReadable };
