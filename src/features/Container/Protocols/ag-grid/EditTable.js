import React, { useState, useCallback, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "apollo-react/components/Button/Button";

import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { getEmptyRowByColumnSize, getEmptyRowTableJSON } from "./utils";
import cloneDeep from "lodash/cloneDeep";

const QC_CHANGE_TYPE = {
  ADDED: "add",
  UPDATED: "update",
  DELETED: "delete",
};

const EditTable = (props) => {
  const { table, dataSource, columns } = props;
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnData] = useState([]);
  const [tableJSON, setTableJSON] = useState([]);

  useEffect(() => {
    console.log(columns);
    setColumnData(columns);
    setRowData(dataSource);
    setTableJSON(table);
  }, [table, dataSource, columns]);

  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const getQCChangeType = (oldValue, newValue) => {
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
  const updateTableJSON = (data, event) => {
    const rowIndex = event.rowIndex;
    const columnStr = event.colDef.field;
    const columnIndex = columnStr.slice(0, columnStr.length - 1);
    const value = event.value;

    const dataSource = cloneDeep(data);
    const index = parseInt(columnIndex) + 1;

    if (dataSource[rowIndex][index + ".0"]) {
      dataSource[rowIndex][index + ".0"].qc_change_type = getQCChangeType(
        dataSource[rowIndex][index + ".0"].content,
        value
      );
      dataSource[rowIndex][index + ".0"].content = value;
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
      dataSource[rowIndex][index + ".0"] = obj;
    }

    setTableJSON(dataSource);
  };
  const onCellValueChanged = (event) => {
    if (event.oldValue !== event.value) {
      updateTableJSON(tableJSON, event);
    } else {
      console.log(`Nothing changed`);
    }
  };

  const handleTableSubmit = () => {
    const tableData = getRowData();
    console.log("Table Final Submit", tableData);
    // const reqFormat = createFinalTableJSON(tableData, tableJSON);
    console.log("Require Format JSON", tableJSON);
    console.log(
      "Require Format Payload",
      JSON.stringify(JSON.stringify(JSON.stringify(tableJSON)))
    );
  };
  const getRowData = useCallback(() => {
    var rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    return rowData;
  }, []);
  const handleAddRow = useCallback(() => {
    const emptyRow = getEmptyRowByColumnSize(columnDefs.length);
    gridRef.current.api.applyTransaction({ add: [emptyRow] });

    const rowJSON = getEmptyRowTableJSON(columnDefs.length);
    const dataSource = cloneDeep(tableJSON);
    dataSource.push(rowJSON);
    setTableJSON(dataSource);

    getRowData();
  }, [columnDefs, tableJSON]);
  const updateDELETEDROWJSON = (selectedRows) => {
    const dataSource = cloneDeep(tableJSON);
    for (let i = 0; i < selectedRows.length; i++) {
      const rowIndex = selectedRows[i].rowIndex;
      console.log("TO UPDATE", dataSource[rowIndex]);
      const keys = Object.keys(dataSource[rowIndex]);
      for (let j = 0; j < keys.length; j++) {
        console.log(keys[j]);
        if (dataSource[rowIndex][keys[j]]) {
          dataSource[rowIndex][keys[j]].qc_change_type = QC_CHANGE_TYPE.DELETED;
          dataSource[rowIndex][keys[j]].content = "DELETED";
        }
      }
    }
    setTableJSON(dataSource);
    console.log("Deleted Data Source", dataSource);
  };
  const handleDeleteRow = useCallback(() => {
    // // eslint-disable-next-line no-debugger
    // debugger;
    const selectedRowData = gridRef.current.api.getSelectedRows();
    selectedRowData.forEach(function (dataItem) {
      console.log(dataItem);
      const keys = Object.keys(dataItem);
      for (let i = 0; i < keys.length; i++) {
        dataItem[keys[i]] = `<strike>DELETED</strike>`;
      }
      // dataItem.category = category;
    });
    gridRef.current.api.applyTransaction({ update: selectedRowData });
    // const dataSource = cloneDeep(tableJSON);
    const selectedRows = gridRef.current.api.getSelectedNodes();
    updateDELETEDROWJSON(selectedRows);

    getRowData();
  }, [columnDefs, tableJSON]);
  return (
    <div className="ag-theme-alpine">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="primary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={handleTableSubmit}
        >
          Submit
        </Button>
        <Button
          variant="secondary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}
          onClick={handleDeleteRow}
        >
          Delete Row
        </Button>
        <Button
          variant="secondary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}
          onClick={handleAddRow}
        >
          Add Row
        </Button>
      </div>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        onCellValueChanged={onCellValueChanged}
        rowSelection={"multiple"}
        domLayout="autoHeight"
      ></AgGridReact>
    </div>
  );
};

export default EditTable;
