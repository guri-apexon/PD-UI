import { createContext } from 'react';
import { TableConst, TableEvents } from '../Constants';
import { checkAndPush, getTableColumns, getValueFormRecord } from '../utils';

const tableGridData = {
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
  settingItems: [
    { Legend: 'Legend' },
    { studyVisit: 'Study Period' },
    { mappings: 'mappings' },
    { display: 'Display' },
    { references: 'References' },
  ],
  headerGroups: {
    headerGroups: [
      { data: 'Screening', columns: [1, 2] },
      {
        data: 'Treatment Period',
        children: [
          { data: 'BL/Rand', columns: [3, 4] },
          { data: 'Year1', columns: [5, 6] },
          { data: 'Year2', columns: [7, 8] },
        ],
      },
      { data: 'Test', columns: [9, 10] },
    ],
  },
};
const headRows = [TableConst.STUDYVISIT, TableConst.STUDYPROCEDURE];

const readReccursive = (data, records, cols, rows, action) => {
  if (Array.isArray(data)) {
    data.forEach((item) => readReccursive(item, records, cols, rows, action));
  }
  if (typeof data === 'object') {
    if (
      Number.isInteger(parseInt(data[TableConst.ROW_IDX], 10)) &&
      Number.isInteger(parseInt(data[TableConst.COLUMN_IDX], 10))
    ) {
      if (Number(data[TableConst.ROW_IDX]) === 0) {
        if (!cols.includes(Number(data[TableConst.COLUMN_IDX]))) {
          cols.push(Number(data[TableConst.COLUMN_IDX]));
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
      readReccursive(data[item], records, cols, rows, action);
    });
    // for (let i in data) {
    //   readReccursive(data[i], records, cols, rows, action);
    // }
  }
};
const getTableData = (data, action) => {
  let cols = [];
  const records = [];
  const rows = new Set();

  readReccursive(data, records, cols, rows, action);
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
  const baseColumns = cols.map((ci) => ({
    field: String(ci),
    [TableConst.COLUMN_IDX]: ci,
    [TableConst.ROW_IDX]: 0,
  }));
  return {
    tableData: finRecords,
    columnDefs: getTableColumns(baseColumns, tableGridData.headerGroups),
  };
};
const updateCellValues = (state) => {
  return state.tableData;
};
const addTableRow = (cells, { rowIndex, newRow }) => {
  const { tableData, columnDefs } = getTableData(cells, {
    type: TableEvents.ADD_TABLE_ROW,
    row: rowIndex,
  });

  const recs = getTableData([...tableData, ...columnDefs, newRow]);

  return recs;
};
const deleteRow = (cells, deleteRow) => {
  return getTableData(cells, {
    type: TableEvents.DELETE_TABLE_ROW,
    row: deleteRow,
  });
};
const toggleItemFromArray = (data, uid) => {
  if (data.includes(uid)) return data.filter((item) => item !== uid);
  data.push(uid);
  return data;
};
const tableReducer = (state, actions) => {
  switch (actions.type) {
    case TableEvents.SET_TABLES:
      return { ...state, tables: actions.payload };
    case TableEvents.UPDATE_TABLE_COLUMNS:
      return {
        ...state,
        ...getTableData(actions.payload, null, state.tables[state.selectedTab]),
      };
    case TableEvents.SET_SELECTED_TAB:
      return {
        ...state,
        ...getTableData(
          state.tables[actions.payload],
          null,
          state.tables[state.selectedTab],
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
        ),
      };
    case TableEvents.ADD_TABLE_ROW:
      return {
        ...state,
        ...addTableRow([...state.tableData, ...state.columnDefs], {
          rowIndex: actions.payload.rowIndex,
          newRow: actions.payload.newRow,
        }),
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
      return {
        ...state,
        hideGroupsColumns: toggleItemFromArray(
          state.hideGroupsColumns,
          actions.payload,
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
};
