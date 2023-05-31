import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TableConst, TableEvents, TIMPE_POINTS } from '../Constants';
import { getTableColumns, getValueFormRecord, stringReadable } from '../utils';

const tableGridData = {
  refreshValue: 0,
  footNotes: [],
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
    studyVisit: {
      name: 'Study Period',
      children: TIMPE_POINTS.map((a) => ({ name: a })),
    },
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
  const { tableId } = data;
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
        filtered.forEach((filterItem) => {
          if (Number(action.column) <= Number(filterItem[COL])) {
            const index = filterItem[COL];
            filterItem[COL] = index - 1;
          }
        });
        svItem[key] = filtered;
      } else if (type === TableEvents.ADD_TABLE_COLUMN) {
        svItem[key].forEach((colItem) => {
          if (Number(column) <= Number(colItem[TableConst.COLUMN_IDX])) {
            const colIndex = colItem[TableConst.COLUMN_IDX] + 1;
            colItem[TableConst.COLUMN_IDX] = colIndex;
          }
        });

        if (key === timePoint) {
          const uid = uuidv4();
          const newColumn = {
            table_row_index: 0,
            [TableConst.UID]: uid,
            table_column_index: column,
            indicator_text: 'New Column',
            table_roi_id: id,
            timePoint,
          };

          svItem[key].push(newColumn);
          data[tableId][uid] = newColumn;
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

    if (
      action.type === TableEvents.DELETE_TABLE_ROW ||
      action.type === TableEvents.DELETE_TABLE_COLUMN
    ) {
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
        if (Number(rowItem[TableConst.COLUMN_IDX]) === Number(col)) {
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
  cells[TableConst.STUDYVISIT].forEach((item) => {
    const key = Object.keys(item)[0];
    if (key !== timePoint) {
      const missingObject = {
        [TableConst.ROW_IDX]: 0,
        [TableConst.COLUMN_IDX]: tableColumnIndex,
        [TableConst.UID]: uuidv4(),
        [TableConst.TIME_POINT]: key,
        [TableConst.VALUE_TEXT1]: '',
        [TableConst.TABLE_ROI_ID]: tableRoiId,
        isMissing: true,
      };
      item[key].push(missingObject);
      cells[tableRoiId][missingObject[TableConst.UID]] = missingObject;
    }
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
const updateAvailableHeaders = (state, selectedTab) => {
  const hideColumns = [];

  state.tables[selectedTab][TableConst.STUDYVISIT].forEach((item) => {
    const key = Object.keys(item)[0];
    let canPush = true;
    item[key].every((record) => {
      if (
        record[TableConst.VALUE_TEXT1].length > 0 &&
        Number(record[TableConst.COLUMN_IDX]) > 0
      ) {
        canPush = false;
        return false;
      }
      return true;
    });
    if (canPush) hideColumns.push(key);
  });

  return hideColumns;
};

const getTableId = (state, selectedTab) => {
  return state.tables[selectedTab].tableId;
};

const isObjectIn = (arr, object) => {
  return !!arr.find((item) => item === object);
};

const getColumns = ({ state, selectedTab, hideColumns }) => {
  const table = state.tables[selectedTab];
  let horizontalCols = new Set();
  const hideGroupsColumns = hideColumns ?? state.hideGroupsColumns;

  const avlblTimePoints = getAvailableHeader(state.tables[selectedTab]);
  const filteredColumns = TIMPE_POINTS.filter(
    (item) =>
      avlblTimePoints.includes(item) && !hideGroupsColumns.includes(item),
  );

  const timePoints = [TableConst.STUDYVISIT, TableConst.STUDYPROCEDURE];
  const allColls = [];
  timePoints.forEach((tpItem) => {
    let vistArr = [];
    if (tpItem === TableConst.NO_COLUMN) {
      vistArr = table[tpItem];
      vistArr.forEach((visitItem) => {
        if (Number(visitItem[TableConst.ROW_IDX]) === 0) {
          allColls.push({
            ...visitItem,
            [TableConst.TIME_POINT]: TableConst.STUDYPROCEDURE,
            field: String(visitItem[TableConst.COLUMN_IDX]),
            [TableConst.DATA_VALUE]: visitItem[TableConst.VALUE_TEXT1],
          });
          horizontalCols.add(Number(visitItem[TableConst.COLUMN_IDX]));
        }
      });
    } else if (tpItem === TableConst.STUDYVISIT) {
      vistArr = table[tpItem];

      vistArr.forEach((vstItem) => {
        const key = Object.keys(vstItem)[0];
        if (filteredColumns.includes(key)) {
          vstItem[key].forEach((vstSubItem) => {
            if (Number(vstSubItem[TableConst.ROW_IDX]) === 0) {
              allColls.push({
                ...vstSubItem,
                [TableConst.TIME_POINT]: key,
                field: String(vstSubItem[TableConst.COLUMN_IDX]),
                [TableConst.DATA_VALUE]: vstSubItem[TableConst.VALUE_TEXT1],
              });
              horizontalCols.add(Number(vstSubItem[TableConst.COLUMN_IDX]));
            }
          });
        }
      });
    }
  });

  horizontalCols = Array.from(horizontalCols)
    .sort((a, b) => a - b)
    .map((item) => ({
      field: String(item),
      baseColumn: true,
      [TableConst.COLUMN_IDX]: Number(item),
      [TableConst.ROW_IDX]: 0,
    }));

  const timePointsArr = filteredColumns;
  const finalgroups = [];
  horizontalCols.forEach((col) => {
    let prevObject;
    let grpObj;
    timePointsArr.forEach((tp) => {
      const colItem = allColls.find(
        (arecord) =>
          Number(arecord[TableConst.COLUMN_IDX]) ===
            Number(col[TableConst.COLUMN_IDX]) &&
          arecord[TableConst.TIME_POINT] === tp,
      );
      if (!colItem.children) colItem.children = [];
      if (prevObject && !isObjectIn(prevObject.children, colItem))
        prevObject.children.push(colItem);
      prevObject = colItem;
      if (!grpObj) grpObj = colItem;
    });
    if (prevObject && !isObjectIn(prevObject.children, col)) {
      prevObject.children.push(col);
    }
    if (grpObj) {
      finalgroups.push(grpObj);
    }
  });

  getTableColumns(allColls);
  getTableColumns(horizontalCols);
  return { columnDefs: getTableColumns(finalgroups) };
};
const isColumn = (cell) => Number(cell[TableConst.ROW_IDX]) === 0;
const isValidColumn = (cell) => Number(cell[TableConst.COLUMN_IDX]) > 0;
const formatTables = (data) => {
  const footNotes = [];
  const actualColumns = [];
  const cellColumns = [];
  const tables = data.map((tableItem) => {
    const footes = [];
    footNotes.push(footes);
    const actualColSet = new Set();
    const cellColumnsSet = new Set();
    actualColumns.push(actualColSet);
    cellColumns.push(cellColumnsSet);
    const rtObj = {};
    const groupObject = {};
    rtObj[tableItem.tableId] = groupObject;
    const defaultTimePoints = [];
    rtObj[TableConst.DEFAULT_TIME_POINTS] = defaultTimePoints;
    const keys = Object.keys(tableItem);
    keys.forEach((tableKey) => {
      if (tableKey !== TableConst.NORMALIZED_SOA) {
        rtObj[tableKey] = tableItem[tableKey];

        if (tableKey === TableConst.STUDYPROCEDURE) {
          tableItem[tableKey].forEach((tableKeyItem) => {
            if (isValidColumn(tableKeyItem)) {
              if (isColumn(tableKeyItem)) {
                actualColSet.add(Number(tableKeyItem[TableConst.COLUMN_IDX]));
              } else {
                cellColumnsSet.add(Number(tableKeyItem[TableConst.COLUMN_IDX]));
              }

              tableKeyItem[TableConst.UID] = uuidv4();
              tableKeyItem[TableConst.TIME_POINT] = TableConst.STUDYPROCEDURE;
            }
          });
        }
        if (tableKey === TableConst.STUDYVISIT) {
          tableItem[tableKey].forEach((svItem) => {
            const key = Object.keys(svItem)[0];

            svItem[key].forEach((svKey) => {
              if (isValidColumn(svKey)) {
                if (isColumn(svKey)) {
                  actualColSet.add(Number(svKey[TableConst.COLUMN_IDX]));
                } else {
                  cellColumnsSet.add(Number(svKey[TableConst.COLUMN_IDX]));
                }

                svKey[TableConst.UID] = uuidv4();
                svKey[TableConst.TIME_POINT] = key;
                groupObject[svKey[TableConst.UID]] = svKey;
              }
            });
            if (svItem[key].length > 0) {
              defaultTimePoints.push(key);
            }
          });
        }
      } else if (tableKey === TableConst.NORMALIZED_SOA) {
        tableItem[tableKey].forEach((tableKeyItem) => {
          if (tableKeyItem.footnotes?.length > 0) {
            tableKeyItem.footnotes.forEach((note) => {
              if (!footes.includes(note)) footes.push(note);
            });
          }
          if (!rtObj[tableKey]) rtObj[tableKey] = [];
          const obj = {
            [TableConst.COLUMN_IDX]: tableKeyItem[TableConst.COLUMN_IDX],
            [TableConst.ROW_IDX]: tableKeyItem[TableConst.ROW_IDX],
            [TableConst.VALUE_TEXT1]: tableKeyItem[TableConst.VALUE_TEXT1],
            id: tableKeyItem.id,
            [TableConst.UID]: uuidv4(),
            [TableConst.TIME_POINT]: TableConst.NORMALIZED_SOA,
          };
          if (isValidColumn(obj)) {
            if (isColumn(obj)) {
              actualColSet.add(Number(obj[TableConst.COLUMN_IDX]));
            } else {
              cellColumnsSet.add(Number(obj[TableConst.COLUMN_IDX]));
            }
            rtObj[tableKey].push(obj);
          }
        });
      }
    });
    return rtObj;
  });
  cellColumns.forEach((item, index) => {
    const actCols = Array.from(actualColumns[index]);

    actCols.forEach((cell) => {
      tables[index][TableConst.STUDYVISIT].forEach((itemTimePoint) => {
        const tpName = Object.keys(itemTimePoint)[0];
        const isMissing = itemTimePoint[tpName].find(
          (item) => item[TableConst.COLUMN_IDX] === cell,
        );
        if (!isMissing) {
          const missingObject = {
            [TableConst.ROW_IDX]: 0,
            [TableConst.COLUMN_IDX]: cell,
            [TableConst.UID]: uuidv4(),
            [TableConst.TIME_POINT]: tpName,
            [TableConst.VALUE_TEXT1]: '',
            [TableConst.TABLE_ROI_ID]: tables[index].tableId,
            isMissing: true,
          };
          itemTimePoint[tpName].push(missingObject);
          tables[index][tables[index].tableId][missingObject[TableConst.UID]] =
            missingObject;
        }
      });

      if (!actCols.includes(cell)) {
        tables[index][TableConst.STUDYPROCEDURE].push({
          [TableConst.COLUMN_IDX]: cell,
          [TableConst.ROW_IDX]: 0,
          [TableConst.VALUE_TEXT1]: '',
        });
      }
    });
  });
  // add time points
  tables.forEach((table) => {
    table[TableConst.STUDYVISIT].forEach((item) => {
      const key = Object.keys(item)[0];
      let tpRecord = item[key].find(
        (record) =>
          record[TableConst.COLUMN_IDX] === 0 &&
          record[TableConst.ROW_IDX] === 0,
      );
      if (tpRecord) {
        tpRecord[TableConst.VALUE_TEXT1] = stringReadable(key);
      } else {
        tpRecord = {
          [TableConst.COLUMN_IDX]: 0,
          [TableConst.ROW_IDX]: 0,
          [TableConst.TIME_POINT]: key,
          [TableConst.VALUE_TEXT1]: stringReadable(key),
          [TableConst.UID]: uuidv4(),
        };
        item[key].push(tpRecord);
      }
      table[table.tableId][tpRecord[TableConst.UID]] = tpRecord;
    });
  });

  // end of time points
  const fNootes = [];

  footNotes.forEach((fnotes) => {
    const fNote = [];
    fNootes.push(fNote);
    fnotes.sort();
    fnotes.forEach((notes) => {
      const noteValue = String(notes).trim();
      const key = noteValue.substring(0, noteValue.indexOf(' ')); // "72"
      const value = noteValue.substring(noteValue.indexOf(' ') + 1);
      const footObject = { key, value };
      fNote.push(footObject);
    });
  });
  return { tables, footNotes: fNootes };
};
const tableReducer = (state, actions) => {
  switch (actions.type) {
    case TableEvents.SET_DOC_ID:
      return { ...state, docId: actions.docId };
    case TableEvents.SET_TABLES:
      return { ...state, ...formatTables(actions.payload) };
    case TableEvents.SET_SELECTED_TAB:
      return {
        ...state,
        hideGroupsColumns: updateAvailableHeaders(state, actions.payload),
        tableId: getTableId(state, actions.payload),
        refreshValue: state.refreshValue + 1,
        ...getTableData(state.tables[actions.payload], null),
        selectedTab: actions.payload,
        ...getColumns({
          state,
          selectedTab: actions.payload,
          hideColumns: updateAvailableHeaders(state, actions.payload),
        }),
      };

    case TableEvents.UPDATE_CELL_VALUES:
      return {
        ...state,
        tableData: updateCellValues(state, actions.payload),
        refreshValue: state.refreshValue + 1,
      };
    case TableEvents.DELETE_TABLE_ROW:
      return {
        ...state,
        ...deleteRow(state, actions.payload),
        refreshValue: state.refreshValue + 1,
      };
    case TableEvents.ADD_TABLE_ROW:
      return {
        ...state,
        tableData: addTableRow(state.tables[state.selectedTab], {
          rowIndex: actions.payload.rowIndex,
          newRow: actions.payload.newRow,
        }),
        refreshValue: state.refreshValue + 1,
      };
    case TableEvents.ADD_TABLE_COLUMN:
      return {
        ...state,
        refreshValue: state.refreshValue + 1,
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
        refreshValue: state.refreshValue + 1,
        ...getColumns({ state, selectedTab: state.selectedTab }),
      };
    case TableEvents.DELETE_TABLE_COLUMN:
      return {
        ...state,
        refreshValue: state.refreshValue + 1,
        tableData: deleteTableColumn(
          state.tables[state.selectedTab],
          actions.payload,
        ),
        ...getColumns({ state, selectedTab: state.selectedTab }),
      };
    case TableEvents.ADD_TABLE_CELL:
      return {
        ...state,
        refreshValue: state.refreshValue + 1,
        tableData: addTableCell(state.tables[state.selectedTab], {
          newCell: actions.payload,
        }),
      };
    case TableEvents.SET_SETTINGS_OPEN:
      return {
        ...state,
        refreshValue: state.refreshValue + 1,
        openSettings: actions.payload,
      };

    case TableEvents.SET_GRID_REF:
      return { ...state, gridRef: actions.payload };

    case TableEvents.FILTER_GROUP_COLUMN:
      return {
        ...state,
        refreshValue: state.refreshValue + 1,
        hideGroupsColumns: toggleItemFromArray(
          state.hideGroupsColumns,
          actions.payload.name,
        ),
      };
    case TableEvents.REFRESH_TABLE:
      return {
        ...state,
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
