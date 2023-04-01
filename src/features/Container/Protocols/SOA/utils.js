import CellRenderer from './CellRenderers/CellRenderer';
import { TableConst } from './Constants';
import FirstColumn from './CellRenderers/FirstColumn';
import HeaderComponent from './CellRenderers/HeaderComponent';

const addColumnDefs = (item) => {
  if (item.isFirstColumn) {
    item.width = 150;
    item.cellRenderer = FirstColumn;
    item.cellClass = 'column1';
  } else {
    item.cellRenderer = CellRenderer;
  }
  item.headerClass = TableConst.headerClass;
  item.suppressSizeToFit = true;
  item.headerComponent = HeaderComponent;
  item.editable = true;
  item.minWidth = 150;
  item.maxWidth = 250;
  item.headerName = item[TableConst.VALUE_TEXT1];
  item.suppressMovable = true;

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
  if (item[TableConst.DATA_NEW_VALUE]) return item[TableConst.DATA_NEW_VALUE];
  if (Number(item[TableConst.COLUMN_IDX]) === 0) {
    return item[TableConst.VALUE_TEXT1];
  }
  return item[TableConst.VALUE_TEXT1];
};

export { getTableColumns, getValueFormRecord, addColumnDefs };
