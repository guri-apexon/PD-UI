import cloneDeep from "lodash/cloneDeep";
import { v4 as uuidv4 } from "uuid";

const QC_CHANGE_TYPE = {
  ADDED: "add",
  UPDATED: "modify",
  DELETED: "delete",
};
export const getQCChangeType = (oldValue, newValue) => {
  console.log(oldValue, newValue);
  if (oldValue !== undefined) {
    if (oldValue === newValue) {
      return "";
    }
    if (oldValue === "" && newValue !== "") {
      return QC_CHANGE_TYPE.ADDED;
    }
    if (oldValue !== "" && newValue === "") {
      return QC_CHANGE_TYPE.DELETED;
    }
    return QC_CHANGE_TYPE.UPDATED;
  } else {
    if (newValue !== undefined && newValue !== "") {
      return QC_CHANGE_TYPE.ADDED;
    } else {
      return "";
    }
  }
};
export const compareAndUpdateJSON = (data, event) => {
  // debugger;
  const rowIndex = event.rowIndex;
  const columnStr = event.colDef.field;
  let columnIndex = null;
  if (columnStr.length === 4) {
    columnIndex = columnStr.slice(-1);
  } else {
    columnIndex = columnStr.slice(-2);
  }
  console.log(columnIndex);
  //   const columnIndex = columnStr.slice(0, columnStr.length - 1);
  const value = event.value;

  let dataSource = cloneDeep(data);

  if (dataSource[rowIndex][columnIndex + ".0"]) {
    if (dataSource[rowIndex][columnIndex + ".0"].qc_change_type) {
      dataSource[rowIndex][columnIndex + ".0"].content = value;
    } else {
      dataSource[rowIndex][columnIndex + ".0"].qc_change_type = getQCChangeType(
        dataSource[rowIndex][columnIndex + ".0"].content,
        value
      );
      dataSource[rowIndex][columnIndex + ".0"].content = value;
    }
  } else {
    const obj = {
      entities: [],
      content: value,
      roi_id: {
        table_roi_id: "",
        row_roi_id: "",
        column_roi_id: "",
        datacell_roi_id: "",
      },
      table_index: "",
      qc_change_type: QC_CHANGE_TYPE.ADDED,
    };
    dataSource[rowIndex][columnIndex + ".0"] = obj;
  }
  return dataSource;
};
function array_move(arr, old_index, new_index) {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing purposes
}
export const updateTablePropertiesOnRowDrag = (data, event) => {
  let cloneData = cloneDeep(data);
  let reqArr;
  const rowData = event.node.data;
  const rowDragedID = rowData.rowID;
  const indexToInsert = event.overIndex;

  for (let i = 0; i < cloneData.length; i++) {
    const rowKeys = Object.keys(cloneData[i]);
    let rowID = "";
    for (let j = 0; j < rowKeys.length; j++) {
      if (cloneData[i][rowKeys[j]]) {
        if (cloneData[i][rowKeys[j]].roi_id.row_roi_id) {
          rowID = cloneData[i][rowKeys[j]].roi_id.row_roi_id;
          break;
        }
      }
    }
    if (rowDragedID === rowID) {
      reqArr = array_move(cloneData, i, indexToInsert);
    }
  }
  return reqArr;
};
export const getEmptyRowByColumnSize = (newRow) => {
  let row = {
    rowID: newRow["1.0"].roi_id.row_roi_id,
  };
  for (let i = 1; i <= Object.keys(newRow).length; i++) {
    row["col" + i] = "";
  }
  return row;
};
export const getNewColumnInfoArr = (currentColumns) => {
  let cloneColumns = cloneDeep(currentColumns);
  const index = currentColumns.length + 1;
  let column = {
    flex: 1,
    field: "col" + index,
    editable: true,
    resizable: true,
    rowHeight: "auto",
    cellEditor: "agTextCellEditor",
    autoHeight: true,
    cellClass: "cell-wrap-text",
    rowDrag: false,
    cellRenderer: (params) => {
      if (params.value !== undefined) {
        return (
          <div
            className="value-inside"
            dangerouslySetInnerHTML={{ __html: params.value }}
          />
        );
      } else {
        return "";
      }
    },
  };
  cloneColumns.push(column);
  return cloneColumns;
};
export const getEmptyRowTableJSON = (columnSize) => {
  let row = {};
  const obj = {
    entities: [],
    content: "",
    roi_id: {
      table_roi_id: "",
      row_roi_id: uuidv4(),
      column_roi_id: "",
      datacell_roi_id: "",
    },
    table_index: "",
    qc_change_type: QC_CHANGE_TYPE.ADDED,
  };
  //   row.rowID = uuidv4();
  for (let i = 1; i <= columnSize; i++) {
    if (i === 1) {
      row[i + ".0"] = obj;
    } else {
      row[i + ".0"] = "";
    }
  }
  return row;
};
export const handleColumnSwaping = (json, newColumns) => {
  console.log(newColumns);
  let cloneJSON = cloneDeep(json);

  for (let i = 0; i < newColumns.length; i++) {
    const fromIndex = parseInt(newColumns[i].instanceId);
    const toIndex = i;
    // Handle Deleted columns
    const columnName = newColumns[i].colId;
    let columnIndex = null;
    if (columnName.length === 4) {
      columnIndex = columnName.slice(-1);
    } else {
      columnIndex = columnName.slice(-2);
    }
    if (!newColumns[i].visible) {
      for (let j = 0; j < cloneJSON.length; j++) {
        if (cloneJSON[j][columnIndex + ".0"]) {
          cloneJSON[j][columnIndex + ".0"].qc_change_type =
            QC_CHANGE_TYPE.DELETED;
        } else {
          const obj = {
            entities: [],
            content: "",
            roi_id: {
              table_roi_id: "",
              row_roi_id: "",
              column_roi_id: "",
              datacell_roi_id: "",
            },
            table_index: "",
            qc_change_type: QC_CHANGE_TYPE.DELETED,
          };
          cloneJSON[j][columnIndex + ".0"] = obj;
        }
        // const toIndexKey = i + 1 + ".0";
        // const fromIndexKey = fromIndex + 1 + ".0";
        // cloneJSON[j][toIndexKey] = json[j][fromIndexKey];
        // cloneJSON[j][toIndexKey]=;
      }
    }
    if (fromIndex !== toIndex) {
      for (let j = 0; j < cloneJSON.length; j++) {
        const toIndexKey = i + 1 + ".0";
        const fromIndexKey = fromIndex + 1 + ".0";
        cloneJSON[j][toIndexKey] = json[j][fromIndexKey];
        // cloneJSON[j][toIndexKey]=;
      }
    }
  }
  // const deletedColumns = handleDeletedColumns(cloneJSON, newColumns);
  // console.log(cloneJSON);
  return cloneJSON;
};

export const updateDataSourceOnColumnAddition = (columnLength, data) => {
  let cloneData = cloneDeep(data);
  const index = columnLength + 1;
  for (let i = 0; i < cloneData.length; i++) {
    cloneData[i]["col" + index] = "";
  }
  return cloneData;
};
export const updateTableJSONOnColumnAddition = (columnLength, json) => {
  let cloneData = cloneDeep(json);
  const index = columnLength + 1;
  for (let i = 0; i < cloneData.length; i++) {
    cloneData[i][index + ".0"] = {
      entities: [],
      content: "",
      roi_id: {
        table_roi_id: "",
        row_roi_id: "",
        column_roi_id: "",
        datacell_roi_id: "",
      },
      table_index: 2,
      qc_change_type: QC_CHANGE_TYPE.ADDED,
    };
  }
  return cloneData;
};
export const handleColumnSwaping2 = (json, newColumns) => {
  console.log(newColumns);
  let cloneJSON = cloneDeep(json);

  for (let i = 0; i < newColumns.length; i++) {
    const fromIndex = parseInt(newColumns[i].instanceId);
    const toIndex = i;
    if (fromIndex !== toIndex) {
      for (let j = 0; j < cloneJSON.length; j++) {
        const toIndexKey = i + 1 + ".0";
        const fromIndexKey = fromIndex + 1 + ".0";
        cloneJSON[j][toIndexKey] = json[j][fromIndexKey];
      }
    }
  }
  const deletedColumns = handleDeletedColumns(cloneJSON, newColumns);
  console.log(deletedColumns);
  return deletedColumns;
};
const handleDeletedColumns = (json, columns) => {
  let cloneData = cloneDeep(json);
  for (let i = 0; i < columns.length; i++) {
    if (!columns[i].visible) {
      const index = i + 1;
      for (let j = 0; j < cloneData.length; j++) {
        if (cloneData[j][index + ".0"]) {
          cloneData[j][index + ".0"].qc_change_type = QC_CHANGE_TYPE.DELETED;
        } else {
          const obj = {
            entities: [],
            content: "",
            roi_id: {
              table_roi_id: "",
              row_roi_id: "",
              column_roi_id: "",
              datacell_roi_id: "",
            },
            table_index: "",
            qc_change_type: QC_CHANGE_TYPE.DELETED,
          };
          cloneData[j][index + ".0"] = obj;
        }
      }
    }
  }
  return cloneData;
};
