import { useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./table.scss";

const ViewTable = ({ rowData, columnData }) => {
  const gridRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  useEffect(() => {
    setDataSource(rowData);
    setColumnInfo(columnData);
  }, [rowData, columnData]);
  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  return (
    <div className="table-container">
      <div className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={dataSource}
          columnDefs={columnInfo}
          onGridReady={onGridReady}
          domLayout="autoHeight"
        ></AgGridReact>
      </div>
    </div>
  );
};
export default ViewTable;
