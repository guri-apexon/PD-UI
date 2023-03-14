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
const finChildren = (data, col, colID, findObj) => {
  data.forEach((item) => {
    if (!findObj.pushed) {
      if (Array.isArray(item.childrens)) {
        finChildren(item.childrens, col, colID);
      } else if (item.columns && item.columns.includes(colID)) {
        if (!item.children) item.children = [];
        const f = item.children.find((a) => a === col);
        findObj.pushed = true;
        if (!f) item.children.push(col);
      }
    }
  });
};
const addHeaderGroups = (data, groups, results) => {
  data.forEach((colItem) => {
    const findObj = { pushed: false, groupItem: null };
    groups.forEach((groupItem) => {
      if (findObj.pushed === false) {
        findObj.groupItem = groupItem;

        if (
          Array.isArray(groupItem.children) &&
          !Array.isArray(groupItem.columns)
        ) {
          finChildren(
            groupItem.children,
            colItem,
            colItem[TableConst.COLUMN_IDX],
            findObj,
          );
        } else if (
          Array.isArray(groupItem.columns) &&
          groupItem.columns.includes(colItem[TableConst.COLUMN_IDX])
        ) {
          if (!groupItem.children) groupItem.children = [];

          const f = groupItem.children.find((a) => a === colItem);
          if (!f) groupItem.children.push(colItem);
          findObj.pushed = true;
        }
      }
    });
    // end of gorups loop

    if (findObj.pushed) {
      const found = results.find((item) => findObj.groupItem === item);
      if (!found) results.push(findObj.groupItem);
    } else {
      results.push(colItem);
    }
  });
};
const getTableColumns = (data, headerGroups) => {
  data.forEach((item) => {
    if (item[TableConst.ROW_IDX] === 0 && item[TableConst.COLUMN_IDX] === 0) {
      item.headerClass = TableConst.headerClass;
      item.width = 150;
      item.suppressSizeToFit = true;
      item.rowDrag = true;
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
    item.headerName = item.indicator_text;

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
  });

  const res = [];
  addHeaderGroups(
    data,
    JSON.parse(JSON.stringify(headerGroups.headerGroups)),
    res,
  );

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
export { checkAndPush, getTableColumns, getValueFormRecord };
