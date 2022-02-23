import React, { useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "apollo-react/components/Button/Button";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getColumnBySize, getEmptyRowByColumnSize } from "./utils";

const CreateTable = () => {
  const gridRef = useRef();
  const [columnSize, setColumnSize] = useState(0);
  const [showTable, setShowTable] = useState(false);
  const [rowData] = useState([]);

  const [columnDefs, setColumnData] = useState([]);

  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const createTable = () => {
    if (columnSize > 0) {
      const columns = getColumnBySize(columnSize);
      setColumnData(columns);
      setShowTable(true);
    }
  };
  const handleTableSubmit = () => {
    const tableData = getRowData();
    console.log("Table Final Submit", tableData);
    gridRef.current.api.sizeColumnsToFit();
    // const reqFormat = createFinalTableJSON(tableData, tableJSON);
    // console.log("Require Format JSON", reqFormat);
    // console.log(
    //   "Require Format Payload",
    //   JSON.stringify(JSON.stringify(JSON.stringify(reqFormat)))
    // );
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
    const emptyRow = getEmptyRowByColumnSize(columnSize);
    gridRef.current.api.applyTransaction({
      add: [emptyRow],
    });
    getRowData();
  }, [columnSize]);
  const handleDeleteRow = useCallback(() => {
    const selectedData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedData });
    getRowData();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {!showTable && (
        <div>
          <label>No of Column</label>
          <input
            type="text"
            onChange={(e) => setColumnSize(e.target.value)}
            style={{ margin: 10 }}
          />
          <Button
            variant="primary"
            size="small"
            style={{ margin: 10 }}
            onClick={createTable}
          >
            Add Table
          </Button>
        </div>
      )}
      {showTable > 0 && (
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
            rowSelection={"multiple"}
          ></AgGridReact>
        </div>
      )}
    </div>
  );
};

export default CreateTable;
