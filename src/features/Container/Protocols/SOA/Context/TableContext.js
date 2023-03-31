import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TableConst, TableEvents, TIMPE_POINTS } from '../Constants';
import { getTableColumns, getValueFormRecord } from '../utils';

const tableGridData = {
  docId: '',
  tables: [],
  tableData: [],
  columnRows: [],
  columnDefs: [],
  selectedTab: 0,
  tableId: '',
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
const getAvailableHeader = (tableData) => {
  const sv = tableData[TableConst.STUDYVISIT];
  const avHeaders = new Set();
  sv.forEach((svItem) => {
    svItem[Object.keys(svItem)[0]].forEach(() => {
      avHeaders.add(Object.keys(svItem)[0]);
    });
  });
  return Array.from(avHeaders);
};

const getTableCells = (data, action) => {
  const records = [];
  const rows = new Set();
  const columns = new Set();

  const COL = TableConst.COLUMN_IDX;
  const ROW = TableConst.ROW_IDX;
  const cells = [
    ...data[TableConst.STUDYPROCEDURE],
    ...data[TableConst.NORMALIZED_SOA],
  ];

  cells.forEach((cell) => {
    if (Number(cell[ROW]) !== 0 || Number(cell[COL]) !== 0) {
      let canPush = true;

      if (action) {
        if (action.type === TableEvents.ADD_TABLE_COLUMN) {
          if (Number(action.column) <= Number(cell[COL])) {
            cell[COL] = Number(cell[COL]) + 1;
          }
        }

        if (action.type === TableEvents.DELETE_TABLE_COLUMN) {
          if (Number(action.column) === Number(cell[COL])) {
            canPush = false;
            cell[TableConst.TO_BE_REMOVE] = true;
          }

          if (Number(action.column) <= Number(cell[COL])) {
            const index = cell[COL];
            cell[COL] = index - 1;
          }
        }

        if (action.type === TableEvents.ADD_TABLE_ROW) {
          if (Number(action.row) <= Number(cell[ROW])) {
            const index = cell[ROW];
            cell[ROW] = index + 1;
          }
        }

        if (action.type === TableEvents.DELETE_TABLE_ROW) {
          if (Number(action.row) === Number(cell[ROW])) {
            canPush = false;
            cell[TableConst.TO_BE_REMOVE] = true;
          }

          if (Number(action.row) <= Number(cell[ROW])) {
            const index = cell[ROW];
            cell[ROW] = index - 1;
          }
        }
      }

      if (canPush) {
        rows.add(cell[ROW]);
        columns.add(cell[COL]);
        records.push(cell);
      }
    }
  });

  if (action) {
    const { type, column, timePoint, id } = action;

    const sv = data[TableConst.STUDYVISIT];
    sv.forEach((svItem) => {
      const key = Object.keys(svItem)[0];
      if (type === TableEvents.DELETE_TABLE_COLUMN) {
        const filtered = svItem[key].filter(
          (item) => Number(item[COL]) !== Number(column),
        );
        svItem[key] = filtered;
      } else if (type === TableEvents.ADD_TABLE_COLUMN) {
        svItem[key].forEach((colItem) => {
          if (Number(column) <= Number(colItem[TableConst.COLUMN_IDX])) {
            const colIndex = colItem[TableConst.COLUMN_IDX] + 1;
            colItem[TableConst.COLUMN_IDX] = colIndex;
          }
        });

        if (key === timePoint) {
          svItem[key].push({
            table_row_index: 0,
            table_column_index: column,
            indicator_text: 'new Column',
            table_roi_id: id,
          });
        }
      }
    });
  }
  return { records, rows, columns };
};

const getTableData = (data, action) => {
  const { records, rows, columns } = getTableCells(data, action);

  let cols = Array.from(columns);
  if (action) {
    if (action.type === TableEvents.ADD_TABLE_ROW) {
      records.push(action.newRow);
      rows.add(action.row);
      data[TableConst.NORMALIZED_SOA].push(action.newRow);
    }

    if (action.type === TableEvents.DELETE_TABLE_ROW) {
      const ns = data[TableConst.NORMALIZED_SOA];
      const sp = data[TableConst.STUDYPROCEDURE];
      data[TableConst.NORMALIZED_SOA] = ns.filter(
        (a) => a[TableConst.TO_BE_REMOVE] !== true,
      );
      data[TableConst.STUDYPROCEDURE] = sp.filter(
        (a) => a[TableConst.TO_BE_REMOVE] !== true,
      );
    }
  }

  cols = cols.sort((a, b) => a - b);

  const finRecords = [];
  const sortedRows = Array.from(rows);
  sortedRows.sort((a, b) => a - b);
  sortedRows.forEach((sortedRowItem) => {
    const rowItems = records.filter(
      (recordItem) =>
        Number(recordItem[TableConst.ROW_IDX]) === Number(sortedRowItem),
    );
    const rowRecord = {};
    cols.forEach((col) => {
      rowItems.forEach((rowItem) => {
        if (String(rowItem[TableConst.COLUMN_IDX]) === String(col)) {
          rowItem[TableConst.DATA_VALUE] = getValueFormRecord(rowItem);
          rowRecord[col] = rowItem;
        }
      });
    });

    finRecords.push(rowRecord);
  });

  return {
    tableData: finRecords,
  };
};
const updateCellValues = (state, payload) => {
  const {
    table_column_index: tableColumnIndex,
    table_row_index: tableRowIndex,
    indicator_text: indicatorText,
  } = payload;
  const data = state.tables[state.selectedTab];
  let isFound = false;
  let arr = data[TableConst.STUDYPROCEDURE];

  arr.every((item) => {
    if (
      Number(item[TableConst.COLUMN_IDX]) === Number(tableColumnIndex) &&
      Number(item[TableConst.ROW_IDX]) === Number(tableRowIndex)
    ) {
      isFound = true;
      item[TableConst.VALUE_TEXT1] = indicatorText;
      item[TableConst.DATA_VALUE] = indicatorText;
      return false;
    }
    return true;
  });

  if (!isFound) {
    arr = data[TableConst.NORMALIZED_SOA];
    arr.every((item) => {
      if (
        Number(item[TableConst.COLUMN_IDX]) === Number(tableColumnIndex) &&
        Number(item[TableConst.ROW_IDX]) === Number(tableRowIndex)
      ) {
        isFound = true;
        item[TableConst.VALUE_TEXT1] = indicatorText;
        item[TableConst.DATA_VALUE] = indicatorText;
        return false;
      }
      return true;
    });
  }

  const { tableData } = getTableData(state.tables[state.selectedTab]);
  return tableData;
};
const addTableRow = (cells, { rowIndex, newRow }) => {
  const { tableData } = getTableData(cells, {
    type: TableEvents.ADD_TABLE_ROW,
    row: rowIndex,
    newRow,
  });

  return tableData;
};

const addTableColumn = (
  cells,
  { table_column_index: tableColumnIndex, timePoint, table_roi_id: tableRoiId },
) => {
  const { tableData } = getTableData(cells, {
    type: TableEvents.ADD_TABLE_COLUMN,
    column: tableColumnIndex,
    timePoint,
    id: tableRoiId,
  });

  return tableData;
};
const updateTableColumn = (
  data,

  { table_column_index: tableColumnIndex, timePoint, newValue },
) => {
  let isUpdated = false;
  const sv = data[TableConst.STUDYVISIT];
  sv.forEach((svItem) => {
    const key = Object.keys(svItem)[0];
    if (key === timePoint) {
      svItem[key].forEach((svColumn) => {
        if (Number(svColumn[TableConst.COLUMN_IDX]) === tableColumnIndex) {
          svColumn[TableConst.VALUE_TEXT1] = newValue;
          isUpdated = true;
        }
      });
    }
  });
  if (!isUpdated) {
    const sp = data[TableConst.STUDYPROCEDURE];
    sp.forEach((spItem) => {
      if (Number(spItem[TableConst.COLUMN_IDX]) === tableColumnIndex) {
        spItem[TableConst.VALUE_TEXT1] = newValue;
      }
    });
  }
};

const deleteTableColumn = (
  cells,

  { table_column_index: tableColumnIndex, timePoint, tableRoi_id: tableRoiId },
) => {
  const { tableData } = getTableData(cells, {
    type: TableEvents.DELETE_TABLE_COLUMN,
    timePoint,
    column: tableColumnIndex,
    id: tableRoiId,
  });

  return tableData;
};

const addTableCell = (data, { newCell }) => {
  data[TableConst.NORMALIZED_SOA].push(newCell);
  const { tableData } = getTableData(data);
  return tableData;
};

const deleteRow = (state, deleteRow) => {
  const { tableData } = getTableData(state.tables[state.selectedTab], {
    type: TableEvents.DELETE_TABLE_ROW,
    row: deleteRow,
  });
  return { tableData };
};
const toggleItemFromArray = (data, uid) => {
  if (data.includes(uid)) return data.filter((item) => item !== uid);
  data.push(uid);
  return data;
};
const updateAvailableHeaders = (state) => {
  const ah = getAvailableHeader(state.tables[state.selectedTab]);
  const settings = state.settingItems[TableConst.STUDYVISIT];
  settings.children.forEach((settingItem) => {
    settingItem.enable = ah.includes(settingItem.name);
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
const getTableId = (state, selectedTab) => {
  return state.tables[selectedTab].tableId;
};

const getFlatCols = (list) => {
  const uniq = [];
  const duplicates = [];
  list.forEach((mainItem) => {
    let isFound = false;
    list.forEach((loopItem) => {
      if (
        mainItem !== loopItem &&
        mainItem[TableConst.COLUMN_IDX] === loopItem[TableConst.COLUMN_IDX]
      ) {
        isFound = true;
      }
    });
    if (isFound) {
      duplicates.push(mainItem);
    } else {
      mainItem.baseColumn = true;
      uniq.push(mainItem);
    }
  });

  const groupBy = duplicates.reduce((prev, current) => {
    if (!prev[String(current[TableConst.COLUMN_IDX])])
      prev[String(current[TableConst.COLUMN_IDX])] = [];
    prev[String(current[TableConst.COLUMN_IDX])].push(current);
    return prev;
  }, {});

  const tps = [...TIMPE_POINTS];

  tps.reverse();
  const baseCls = [];
  Object.keys(groupBy).forEach((gpItem) => {
    groupBy[gpItem].every((gpColumn) => {
      let grpItemFound = true;

      tps.every((tpItem) => {
        let tpItemFound = true;
        if (gpColumn.timePoint === tpItem) {
          gpColumn.baseColumn = true;
          baseCls.push(gpColumn);

          tpItemFound = false;
          grpItemFound = false;
        }
        return tpItemFound;
      });
      return grpItemFound;
    });
  });
  const flatCols = [...uniq, ...baseCls];
  return flatCols;
};
const isObjectIn = (arr, object) => {
  return !!arr.find((item) => item === object);
};

const predictEmptyHeaders = ({
  baseColumns,
  groupObjectToRemove,
  availableTimePoints,
  availableHeaders,
}) => {
  const finalgroups = [];
  baseColumns.forEach((baseCol) => {
    delete baseCol.children;
    const colIndex = Number(baseCol[TableConst.COLUMN_IDX]);
    let grpObj;
    availableTimePoints.forEach((avlTP) => {
      const grpsArr = availableHeaders[avlTP];
      let colItem = grpsArr.find(
        (grpItem) => Number(grpItem[TableConst.COLUMN_IDX]) === colIndex,
      );
      if (!colItem || colItem.baseColumn)
        colItem = {
          [TableConst.COLUMN_IDX]: colIndex,
          field: '',
          timePoint: avlTP,
          [TableConst.ROW_IDX]: 0,
          [TableConst.VALUE_TEXT1]: '',
        };
      if (!colItem.children) colItem.children = [];

      if (colItem.field) groupObjectToRemove[avlTP] = true;
      if (!grpObj) grpObj = colItem;
    });
  });
  return finalgroups;
};
const reFormatMultiHeader = ({
  baseColumns,
  groupObjectToRemove,
  availableTimePoints,
  availableHeaders,
}) => {
  const finalgroups = [];
  baseColumns.forEach((baseCol) => {
    delete baseCol.children;
    const colIndex = Number(baseCol[TableConst.COLUMN_IDX]);
    let grpObj;
    let prevObject;
    availableTimePoints.forEach((avlTP) => {
      const grpsArr = availableHeaders[avlTP];
      let colItem = grpsArr.find(
        (grpItem) => Number(grpItem[TableConst.COLUMN_IDX]) === colIndex,
      );

      if (!colItem || colItem.baseColumn)
        colItem = {
          [TableConst.COLUMN_IDX]: colIndex,
          field: '',
          timePoint: avlTP,
          [TableConst.ROW_IDX]: 0,
          [TableConst.VALUE_TEXT1]: '',
        };
      if (!colItem.children) colItem.children = [];
      if (colItem.field) groupObjectToRemove[avlTP] = true;
      if (prevObject && !isObjectIn(prevObject.children, colItem))
        prevObject.children.push(colItem);
      prevObject = colItem;
      if (!grpObj) grpObj = colItem;
    });
    if (prevObject && !isObjectIn(prevObject.children, baseCol))
      prevObject.children.push(baseCol);
    finalgroups.push(grpObj);
  });
  return finalgroups;
};
const genereateMultiHeader = (baseColumns, allColumns, timePoints) => {
  const availableHeaders = {};

  timePoints.forEach((tp) => {
    allColumns.forEach((col) => {
      if (col.timePoint === tp) {
        if (!availableHeaders[tp]) availableHeaders[tp] = [];
        availableHeaders[tp].push(col);
      }
    });
  });
  const availableTimePoints = Object.keys(availableHeaders);
  const groupObjectToRemove = {};
  availableTimePoints.forEach((avTP) => {
    groupObjectToRemove[avTP] = false;
  });
  let finalgroups = predictEmptyHeaders({
    baseColumns,
    groupObjectToRemove,
    availableTimePoints,
    availableHeaders,
  });

  const toRemove = [];
  Object.keys(groupObjectToRemove).forEach((item) => {
    if (!groupObjectToRemove[item]) toRemove.push(item);
  });
  const avTimePoints = availableTimePoints.filter(
    (item) => !toRemove.includes(item),
  );
  if (avTimePoints.length > 0) {
    finalgroups = reFormatMultiHeader({
      baseColumns,
      groupObjectToRemove,
      availableTimePoints: avTimePoints,
      availableHeaders,
    });
  } else {
    finalgroups = baseColumns;
  }

  return finalgroups;
};

const getColumns = ({ state, selectedTab }) => {
  const table = state.tables[selectedTab];

  const filteredColumns = TIMPE_POINTS.filter(
    (item) => !state.hideGroupsColumns.includes(item),
  );

  const timePoints = [TableConst.STUDYVISIT, TableConst.STUDYPROCEDURE];

  const allColls = [];
  timePoints.forEach((tpItem) => {
    let vistArr = [];
    if (tpItem === TableConst.STUDYPROCEDURE) {
      vistArr = table[tpItem];
      vistArr.forEach((visitItem) => {
        if (Number(visitItem[TableConst.ROW_IDX]) === 0)
          allColls.push({
            ...visitItem,
            timePoint: TableConst.STUDYPROCEDURE,
            field: String(visitItem[TableConst.COLUMN_IDX]),
            [TableConst.DATA_VALUE]: visitItem[TableConst.VALUE_TEXT1],
          });
      });
    } else if (tpItem === TableConst.STUDYVISIT) {
      vistArr = table[tpItem];

      vistArr.forEach((vstItem) => {
        const key = Object.keys(vstItem)[0];
        if (filteredColumns.includes(key)) {
          vstItem[key].forEach((vstSubItem) => {
            if (Number(vstSubItem[TableConst.ROW_IDX]) === 0)
              allColls.push({
                ...vstSubItem,
                timePoint: key,
                field: String(vstSubItem[TableConst.COLUMN_IDX]),
                [TableConst.DATA_VALUE]: vstSubItem[TableConst.VALUE_TEXT1],
              });
          });
        }
      });
    }
  });
  allColls.sort((a, b) => a[TableConst.COLUMN_IDX] - b[TableConst.COLUMN_IDX]);
  const flatCols = getFlatCols(allColls);
  flatCols.sort((a, b) => a[TableConst.COLUMN_IDX] - b[TableConst.COLUMN_IDX]);

  const baseCols = flatCols.filter((a) => a.baseColumn);
  const tpRpws = {};
  allColls.forEach((colItem) => {
    TIMPE_POINTS.forEach((tpItem) => {
      if (tpItem === colItem.timePoint && !colItem.baseColumn) {
        if (!tpRpws[tpItem]) tpRpws[tpItem] = [];
        tpRpws[tpItem].push(colItem);
      }
    });
  });

  const columnRows = [];
  Object.keys(tpRpws).forEach((rowItem) => {
    const cfilterItem = {};
    tpRpws[rowItem].forEach((tpColumn) => {
      cfilterItem[tpColumn[TableConst.COLUMN_IDX]] = tpColumn;
    });
    columnRows.push(cfilterItem);
  });

  const multiHeader = genereateMultiHeader(
    baseCols,
    getTableColumns(allColls),
    [...filteredColumns],
  );

  return { columnDefs: multiHeader, columnRows: allColls };
};

const formatTables = (data) => {
  const tables = data.map((tableItem) => {
    const rtObj = {};
    const keys = Object.keys(tableItem);
    keys.forEach((tableKey) => {
      if (tableKey !== TableConst.NORMALIZED_SOA) {
        rtObj[tableKey] = tableItem[tableKey];

        if (tableKey === TableConst.STUDYPROCEDURE) {
          tableItem[tableKey].forEach((tableKeyItem) => {
            tableKeyItem[TableConst.UID] = uuidv4();
            tableKeyItem.timePoint = TableConst.STUDYPROCEDURE;
          });
        }
        if (tableKey === TableConst.STUDYVISIT) {
          tableItem[tableKey].forEach((svItem) => {
            const key = Object.keys(svItem)[0];
            svItem[key].forEach((svKey) => {
              svKey[TableConst.UID] = uuidv4();
              svKey.timePoint = TableConst.STUDYVISIT;
            });
          });
        }
      } else if (tableKey === TableConst.NORMALIZED_SOA) {
        tableItem[tableKey].forEach((tableKeyItem) => {
          if (!rtObj[tableKey]) rtObj[tableKey] = [];
          const obj = {
            [TableConst.COLUMN_IDX]: tableKeyItem[TableConst.COLUMN_IDX],
            [TableConst.ROW_IDX]: tableKeyItem[TableConst.ROW_IDX],
            [TableConst.VALUE_TEXT1]: tableKeyItem[TableConst.VALUE_TEXT1],
            id: tableKeyItem.id,
            [TableConst.UID]: uuidv4(),
            timePoint: TableConst.NORMALIZED_SOA,
          };
          rtObj[tableKey].push(obj);
        });
      }
    });
    return rtObj;
  });

  return tables;
};
const tableReducer = (state, actions) => {
  switch (actions.type) {
    case TableEvents.SET_DOC_ID:
      return { ...state, docId: actions.docId };
    case TableEvents.SET_TABLES:
      return { ...state, tables: formatTables(actions.payload) };
    case TableEvents.SET_SELECTED_TAB:
      updateAvailableHeaders(state);

      return {
        ...state,
        tableId: getTableId(state, actions.payload),

        ...getTableData(state.tables[actions.payload], null),
        selectedTab: actions.payload,
        ...getColumns({ state, selectedTab: actions.payload }),
      };

    case TableEvents.UPDATE_CELL_VALUES:
      return {
        ...state,
        tableData: updateCellValues(state, actions.payload),
      };
    case TableEvents.DELETE_TABLE_ROW:
      return {
        ...state,
        ...deleteRow(state, actions.payload),
      };
    case TableEvents.ADD_TABLE_ROW:
      return {
        ...state,
        tableData: addTableRow(state.tables[state.selectedTab], {
          rowIndex: actions.payload.rowIndex,
          newRow: actions.payload.newRow,
        }),
      };
    case TableEvents.ADD_TABLE_COLUMN:
      return {
        ...state,
        tableData: addTableColumn(
          state.tables[state.selectedTab],
          actions.payload,
        ),
        ...getColumns({ state, selectedTab: state.selectedTab }),
      };
    case TableEvents.UPDATE_TABLE_COLUMN_CELL:
      updateTableColumn(state.tables[state.selectedTab], actions.payload);
      return {
        ...state,
        ...getColumns({ state, selectedTab: state.selectedTab }),
      };
    case TableEvents.DELETE_TABLE_COLUMN:
      return {
        ...state,
        tableData: deleteTableColumn(
          state.tables[state.selectedTab],
          actions.payload,
        ),
        ...getColumns({ state, selectedTab: state.selectedTab }),
      };
    case TableEvents.ADD_TABLE_CELL:
      return {
        ...state,
        tableData: addTableCell(state.tables[state.selectedTab], {
          newCell: actions.payload,
        }),
      };
    case TableEvents.SET_SETTINGS_OPEN:
      return { ...state, openSettings: actions.payload };

    case TableEvents.SET_GRID_REF:
      return { ...state, gridRef: actions.payload };

    case TableEvents.FILTER_GROUP_COLUMN:
      if (canUpdateGroupFilters(state, actions)) return state;

      return {
        ...state,
        hideGroupsColumns: toggleItemFromArray(
          state.hideGroupsColumns,
          actions.payload.name,
        ),
        ...getTableData(state.tables[state.selectedTab], null),
        ...getColumns({ state, selectedTab: state.selectedTab }),
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
