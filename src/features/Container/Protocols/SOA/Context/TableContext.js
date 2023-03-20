import { createContext } from 'react';
import { TableConst, TableEvents, TIMPE_POINTS } from '../Constants';
import {
  addColumnDefs,
  checkAndPush,
  getTableColumns,
  getValueFormRecord,
} from '../utils';

const tableGridData = {
  apiData: {},
  tables: [],
  soa_data: [],
  tableData: [],
  columnDefs: [],
  selectedTab: 0,
  arrangeBy: '',
  showBy: '',
  openSettings: false,
  showGroupRows: [],
  hideGroupsColumns: [],
  gridRef: null,
  settingItems: {
    legend: { name: 'Legend' },
    studyVisit: {
      name: 'Study Period',
      children: TIMPE_POINTS.map((a) => ({ enable: false, name: a })),
    },
    mappings: { name: 'mappings' },
    display: { name: 'Display' },
    references: { name: 'References' },
  },
};
const headRows = [TableConst.STUDYVISIT, TableConst.STUDYPROCEDURE];
const getParentName = (myName, foreFathers, list) => {
  if (!list.includes(myName) || !foreFathers.includes(myName)) return null;
  const arr = [];
  list.forEach((item) => {
    if (foreFathers.includes(item)) arr.push(item);
  });
  let isFound = false;
  let pName = '';
  arr.reverse().every((item) => {
    if (isFound) {
      pName = item;
      return false;
    }
    if (item === myName) isFound = true;
    return 1;
  });

  return pName;
};
const getParentObject = (arr, child) => {
  let pobj = null;

  arr.every((a) => {
    if (a.tagName === child.parentName) {
      pobj = a;
      return false;
    }
    return true;
  });
  return pobj;
};
const getGroupedObjects = (arr) => {
  const objs = {};
  arr.forEach((a) => {
    const txt = a[TableConst.VALUE_TEXT1];
    addColumnDefs(a);
    if (!objs[txt]) {
      objs[txt] = a;
      a.cols = [];
      a.cols.push(a[TableConst.COLUMN_IDX]);
    } else {
      objs[txt].cols.push(a[TableConst.COLUMN_IDX]);
    }
  });
  return Object.values(objs);
};
const inArray = (arr, value) => {
  let found = false;
  arr.every((a) => {
    if (String(a) === String(value)) {
      found = true;
      return false;
    }
    return true;
  });
  return found;
};
const getAvailableHeader = (tableData) => {
  const sv = tableData[TableConst.STUDYVISIT];
  const avHeaders = new Set(); // available headers
  sv.forEach((svItem) => {
    svItem[Object.keys(svItem)[0]].forEach(() => {
      avHeaders.add(Object.keys(svItem)[0]);
    });
  });
  return Array.from(avHeaders);
};

const getGroupHeaders = (baseColumns, tableData, headers, result) => {
  const sv = JSON.parse(JSON.stringify(tableData[TableConst.STUDYVISIT]));
  const bc = JSON.parse(JSON.stringify(baseColumns));

  const ftObjects = [];
  let avHeaders = new Set(); // available headers
  sv.forEach((svItem) => {
    const fitem = Object.keys(svItem)[0];
    if (headers.includes(fitem)) {
      svItem[Object.keys(svItem)[0]].forEach((i) => {
        avHeaders.add(Object.keys(svItem)[0]);
        const field = String(i[TableConst.COLUMN_IDX]);
        const headerName = i[TableConst.VALUE_TEXT1];
        ftObjects.push({
          ...i,
          tagName: String(Object.keys(svItem)[0]).toLowerCase(),
          field,
          headerName,
        });
      });
    }
  });

  avHeaders = Array.from(avHeaders);

  ftObjects.forEach((item) => {
    const parentName = getParentName(item.tagName, avHeaders, headers);
    item.parentName = parentName;
  });

  const pHeaders = [];
  headers.forEach((item) => {
    if (avHeaders.includes(item)) pHeaders.push(item);
  });
  const groupObjects = getGroupedObjects(ftObjects);
  const rootObj = groupObjects.find((a) => a.tagName === pHeaders[0]);

  groupObjects.forEach((a) => {
    if (a.parentName) {
      const p = getParentObject(groupObjects, a);
      if (p) {
        if (!p.children) p.children = [];
        p.children.push(a);
      }
    }
  });

  result = [];
  bc.forEach((a) => {
    if (!inArray(rootObj.cols, a.field)) result.push(a);
  });
  result.push(rootObj);

  return result;
};
const readReccursive = (data, records, cols, rows, action, colObject) => {
  if (Array.isArray(data)) {
    data.forEach((item) =>
      readReccursive(item, records, cols, rows, action, colObject),
    );
  }
  if (typeof data === 'object') {
    if (
      Number.isInteger(parseInt(data[TableConst.ROW_IDX], 10)) &&
      Number.isInteger(parseInt(data[TableConst.COLUMN_IDX], 10))
    ) {
      if (Number(data[TableConst.ROW_IDX]) === 0) {
        if (!cols.includes(Number(data[TableConst.COLUMN_IDX]))) {
          cols.push(Number(data[TableConst.COLUMN_IDX]));
          colObject[String(data[TableConst.COLUMN_IDX])] = data;
        }
        // checkAndPush(cols, Number(data[TableConst.COLUMN_IDX]));
      } else {
        if (!action) {
          rows.add(data[TableConst.ROW_IDX]);
          checkAndPush(records, data);
        }
        if (action?.type) {
          if (action.type === TableEvents.DELETE_TABLE_ROW) {
            if (action.row !== Number(data[TableConst.ROW_IDX])) {
              if (action.row < Number(data[TableConst.ROW_IDX])) {
                rows.add(data[TableConst.ROW_IDX] - 1);
                const index = data[TableConst.ROW_IDX] - 1;
                checkAndPush(records, { ...data, [TableConst.ROW_IDX]: index });
              } else {
                rows.add(data[TableConst.ROW_IDX]);
                checkAndPush(records, data);
              }
            }
          } else if (action.type === TableEvents.ADD_TABLE_ROW) {
            if (action.row <= Number(data[TableConst.ROW_IDX])) {
              rows.add(data[TableConst.ROW_IDX] + 1);
              const index = data[TableConst.ROW_IDX] + 1;
              checkAndPush(records, { ...data, [TableConst.ROW_IDX]: index });
            } else {
              rows.add(data[TableConst.ROW_IDX]);
              checkAndPush(records, data);
            }
          }
        }
      }
    }
    Object.keys(data).forEach((item) => {
      readReccursive(data[item], records, cols, rows, action, colObject);
    });
  }
};
const getTableData = (data, action, tables, state) => {
  let cols = [];
  const records = [];
  const rows = new Set();
  const colObject = {};

  readReccursive(data, records, cols, rows, action, colObject);
  cols = cols.sort((a, b) => a - b);

  const finRecords = [];
  Array.from(rows)
    .sort((a, b) => a - b)
    .forEach((item) => {
      const rowItems = records.filter(
        (item2) => Number(item2[TableConst.ROW_IDX]) === Number(item),
      );
      const rowRecord = {};
      cols.forEach((item3) => {
        rowItems.forEach((item4) => {
          if (String(item4[TableConst.COLUMN_IDX]) === String(item3)) {
            item4[TableConst.DATA_VALUE] = getValueFormRecord(item4);
            rowRecord[item3] = item4;
          }
        });
      });

      finRecords.push(rowRecord);
    });

  const baseColumns = cols.map((ci) => {
    return {
      field: String(ci),
      [TableConst.COLUMN_IDX]: ci,
      [TableConst.ROW_IDX]: 0,
      [TableConst.VALUE_TEXT1]: colObject[ci][TableConst.VALUE_TEXT1],
    };
    //  return {...colObject[ci]}
  });
  const filteredColumns = TIMPE_POINTS.filter(
    (item) => !state.hideGroupsColumns.includes(item),
  );
  const headers = getGroupHeaders(baseColumns, tables, filteredColumns, []);

  return {
    tableData: finRecords,
    columnDefs: getTableColumns(headers),
  };
};
const updateCellValues = (state) => {
  return state.tableData;
};
const addTableRow = (cells, { rowIndex, newRow }, tables, state) => {
  const { tableData, columnDefs } = getTableData(
    cells,
    {
      type: TableEvents.ADD_TABLE_ROW,
      row: rowIndex,
    },
    tables,
    state,
  );

  const recs = getTableData(
    [...tableData, ...columnDefs, newRow],
    null,
    tables,
    state,
  );

  return recs;
};
const deleteRow = (cells, deleteRow, tables, state) => {
  return getTableData(
    cells,
    {
      type: TableEvents.DELETE_TABLE_ROW,
      row: deleteRow,
    },
    tables,
    state,
  );
};
const toggleItemFromArray = (data, uid) => {
  if (data.includes(uid)) return data.filter((item) => item !== uid);
  data.push(uid);
  return data;
};
const updateAvailableHeaders = (state) => {
  const ah = getAvailableHeader(state.tables[state.selectedTab]);
  const settings = state.settingItems[TableConst.STUDYVISIT];
  settings.children.forEach((a) => {
    a.enable = ah.includes(a.name);
  });
};
const canUpdateGroupFilters = (state, actions) => {
  const filters = state.settingItems[TableConst.STUDYVISIT].children;

  let canUncheck = true;
  let counter = 0;
  filters.forEach((item) => {
    if (!state.hideGroupsColumns.includes(item.name) && item.enable) counter++;
  });
  if (counter < 2) canUncheck = false;
  return !actions.payload.push && !canUncheck;
};
const tableReducer = (state, actions) => {
  switch (actions.type) {
    case TableEvents.SET_API_DATA:
      return { ...state, apiData: actions.payload };
    case TableEvents.SET_TABLES:
      return { ...state, tables: actions.payload };
    case TableEvents.UPDATE_TABLE_COLUMNS:
      return {
        ...state,
        ...getTableData(
          actions.payload,
          null,
          state.tables[state.selectedTab],
          state,
        ),
      };
    case TableEvents.SET_SELECTED_TAB:
      updateAvailableHeaders(state);

      return {
        ...state,
        ...getTableData(
          state.tables[actions.payload],
          null,
          state.tables[state.selectedTab],
          state,
        ),
        selectedTab: actions.payload,
      };
    case TableEvents.UPDATE_TABLE_RECORDS:
      return { ...state, columnDefs: actions.payload };
    case TableEvents.UPDATE_CELL_VALUES:
      return {
        ...state,
        ...updateCellValues(state.tableData, actions.payload),
      };
    case TableEvents.DELETE_TABLE_ROW:
      return {
        ...state,
        ...deleteRow(
          [...state.tableData, ...state.columnDefs],
          actions.payload,
          state.tables[state.selectedTab],
          state,
        ),
      };
    case TableEvents.ADD_TABLE_ROW:
      return {
        ...state,
        ...addTableRow(
          [...state.tableData, ...state.columnDefs],
          {
            rowIndex: actions.payload.rowIndex,
            newRow: actions.payload.newRow,
          },
          state.tables[state.selectedTab],
          state,
        ),
      };
    case TableEvents.SET_ARRANGE_BY:
      return { ...state, arrangeBy: actions.payload };
    case TableEvents.SET_SHOW_BY:
      return { ...state, showBy: actions.payload };
    case TableEvents.SET_SETTINGS_OPEN:
      return { ...state, openSettings: actions.payload };
    case TableEvents.ADD_GROUP_ID:
      return {
        ...state,
        showGroupRows: toggleItemFromArray(
          state.showGroupRows,
          actions.payload,
        ),
      };
    case TableEvents.REMOVE_GROUP_ID:
      return {
        ...state,
        showGroupRows: toggleItemFromArray(
          state.showGroupRows,
          actions.payload,
        ),
      };
    case TableEvents.SET_GRID_REF:
      return { ...state, gridRef: actions.payload };
    case TableEvents.GRID_REFRESH:
      state.gridRef?.api.resetRowHeights();
      return state;
    case TableEvents.FILTER_GROUP_COLUMN:
      if (canUpdateGroupFilters(state, actions)) return state;

      return {
        ...state,
        hideGroupsColumns: toggleItemFromArray(
          state.hideGroupsColumns,
          actions.payload.name,
        ),
        ...getTableData(
          state.tables[state.selectedTab],
          null,
          state.tables[state.selectedTab],
          state,
        ),
      };
    default:
      return state;
  }
};
const TabelContext = createContext(null);

export default TabelContext;
export {
  tableGridData,
  tableReducer,
  headRows,
  toggleItemFromArray,
  getTableData,
  readReccursive,
};
