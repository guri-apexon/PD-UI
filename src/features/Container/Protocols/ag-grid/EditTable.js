import React, { useState, useCallback, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "apollo-react/components/Button/Button";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import tableJSONData from "./data/tableProperties.json";
import {
  createFinalTableJSON,
  getColumnFromJSON,
  getDataSourceFromJSON,
  getEmptyRowByColumnSize,
} from "./utils";
import { cloneDeep } from "lodash";
// import { cloneDeep } from "lodash";

const EditTable = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnData] = useState([]);
  const [tableJSON] = useState(tableJSONData);

  useEffect(() => {
    console.log("Actual Table JSON", tableJSON);
    const data = getColumnFromJSON(tableJSON);
    console.log("Column Data", data);
    setColumnData(data);

    const dataSource = getDataSourceFromJSON(tableJSON);
    console.log("Data Source", dataSource);
    setRowData(dataSource);
    window.rowDataServerSide = dataSource;
  }, []);
  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const updateTableJSON = (data, event) => {
    console.log(data);
    console.log(event);
    const rowIndex = event.rowIndex;
    const columnIndex = event.column.instanceId;
    const rowData = event.data;
    console.log(rowData[columnIndex + "a"]);
    const dataSource = cloneDeep(data);
    dataSource[rowIndex][columnIndex + 1 + ".0"].content =
      rowData[columnIndex + "a"];
    dataSource[rowIndex][columnIndex + 1 + ".0"].qc_change_type = "updated";
    console.log(dataSource);
  };
  const onCellValueChanged = (event) => {
    console.log("data after changes is: ", event);
    if (event.oldValue !== event.value) {
      console.log(`Value changed from "${event.oldValue}" to "${event.value}"`);
      updateTableJSON(tableJSON, event);
    } else {
      console.log(`Nothing changed`);
    }
  };

  const handleTableSubmit = () => {
    const tableData = getRowData();
    console.log("Table Final Submit", tableData);
    const reqFormat = createFinalTableJSON(tableData, tableJSON);
    console.log("Require Format JSON", reqFormat);
    console.log(
      "Require Format Payload",
      JSON.stringify(JSON.stringify(JSON.stringify(reqFormat)))
    );
  };
  const getRowData = useCallback(() => {
    var rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log("Row Data:");
    console.log(rowData);
    return rowData;
  }, []);
  const handleAddRow = useCallback(() => {
    const emptyRow = getEmptyRowByColumnSize(columnDefs.length);
    gridRef.current.api.applyTransaction({ add: [emptyRow] });
    getRowData();
  }, []);
  const handleDeleteRow = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedData });
    getRowData();
  }, [columnDefs]);
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
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
      ></AgGridReact>
    </div>
  );
};

export default EditTable;
