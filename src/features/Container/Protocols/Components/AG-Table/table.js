import { useEffect, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  compareAndUpdateJSON,
  getEmptyRowByColumnSize,
  getEmptyRowTableJSON,
  getNewColumnInfoArr,
  handleColumnSwaping2,
  updateDataSourceOnColumnAddition,
  updateTableJSONOnColumnAddition,
  updateTablePropertiesOnRowDrag,
} from "./Utils/updateAndCompare";
import { cloneDeep } from "lodash";
import "./table.scss";

const TableComp = ({
  rowData,
  columnData,
  tableData,
  editTable,
  setEditTable,
  edit,
  handleSave,
  lineID,
  gridOptions,
  handleTableDelete,
}) => {
  const gridRef = useRef();
  const [dataSource, setDataSource] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  const [tableProperties, setTableProperties] = useState("");
  useEffect(() => {
    setTableProperties(tableData);
    setDataSource(rowData);
    setColumnInfo(columnData);
    console.log("Table JSON", tableData);
    console.log("Data Source", rowData);
    console.log("COlumn Info", columnData);
  }, [rowData, columnData, tableData]);
  const onGridReady = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);
  const getRowData = useCallback(() => {
    var rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    return rowData;
  }, []);
  const onCellValueChanged = (event) => {
    if (event.oldValue !== event.value) {
      const updatedTableProperties = compareAndUpdateJSON(
        tableProperties,
        event
      );
      setTableProperties(updatedTableProperties);
    }
  };
  const onRowDragEnd = (e) => {
    console.log("Row Drag", tableProperties, e);
    const rowDragUpdate = updateTablePropertiesOnRowDrag(tableProperties, e);
    console.log("Row Drag", rowDragUpdate);
    setDataSource(getRowData());
    setTableProperties(rowDragUpdate);
    // getRowData();
  };

  const handleRowAdd = () => {
    const rowJSON = getEmptyRowTableJSON(columnInfo.length);
    const emptyRow = getEmptyRowByColumnSize(rowJSON);
    gridRef.current.api.applyTransaction({ add: [emptyRow] });
    setDataSource(getRowData());
    const tablePropsJSON = cloneDeep(tableProperties);
    tablePropsJSON.push(rowJSON);
    setTableProperties(tablePropsJSON);
  };
  const handleColumnAdd = () => {
    const newColumns = getNewColumnInfoArr(columnInfo);
    const dataSourceNew = updateDataSourceOnColumnAddition(
      columnInfo.length,
      dataSource
    );
    const tableJSON = updateTableJSONOnColumnAddition(
      columnInfo.length,
      tableProperties
    );
    gridRef.current.api.setColumnDefs(newColumns);
    setColumnInfo(newColumns);
    setDataSource(dataSourceNew);
    setTableProperties(tableJSON);
  };
  const handleColumnHide = (column) => {
    let cloneColumns = cloneDeep(columnInfo);
    const index = cloneColumns.findIndex((item) => item.field === column.field);
    if (index !== 0) {
      cloneColumns[index].hide = !cloneColumns[index].hide;
      setColumnInfo(cloneColumns);
    }
  };
  const updateDELETEDROWJSON = (selectedRows) => {
    const dataSource = cloneDeep(tableProperties);
    for (let i = 0; i < selectedRows.length; i++) {
      const rowIndex = selectedRows[i].rowIndex;
      const keys = Object.keys(dataSource[rowIndex]);
      for (let j = 0; j < keys.length; j++) {
        if (dataSource[rowIndex][keys[j]]) {
          dataSource[rowIndex][keys[j]].qc_change_type = "delete";
          // dataSource[rowIndex][keys[j]].content =
          //   dataSource[rowIndex][keys[j]].content;
        }
      }
    }
    setTableProperties(dataSource);
  };
  const handleDeleteRow = useCallback(() => {
    let cloneRows = cloneDeep(dataSource);
    const selectedRowData = gridRef.current.api.getSelectedRows();
    for (let i = 0; i < selectedRowData.length; i++) {
      for (let j = 0; j < cloneRows.length; j++) {
        if (selectedRowData[i].rowID === cloneRows[j].rowID) {
          const rowKeys = Object.keys(cloneRows[j]);
          for (let k = 0; k < rowKeys.length; k++) {
            if (rowKeys[k] !== "rowID") {
              cloneRows[j][rowKeys[k]] = `<strike>${
                cloneRows[j][rowKeys[k]]
              }</strike>`;
            }
          }
        }
      }
    }
    setDataSource(cloneRows);

    // const dataSource = cloneDeep(tableJSON);
    const selectedRows = gridRef.current.api.getSelectedNodes();
    updateDELETEDROWJSON(selectedRows);

    getRowData();
  }, [columnInfo, tableProperties]);
  const getFinalData = () => {
    const columns = gridRef.current.columnApi.getAllGridColumns();
    console.log("Get data Columns", columns);
    const finalJSON = handleColumnSwaping2(tableProperties, columns);
    const json = JSON.stringify(finalJSON);
    handleSave(json, lineID);
    setEditTable(false);
  };

  return (
    <div className="table-container">
      {editTable && (
        <div className="button-container">
          <button className="button add-row" onClick={handleRowAdd}>
            Add Row
          </button>
          <button className="button add-row" onClick={handleColumnAdd}>
            Add Column
          </button>
          <button className="button add-row" onClick={handleDeleteRow}>
            Delete Row
          </button>
          <button className="button add-row save-button" onClick={getFinalData}>
            Save
          </button>
          <button className="button add-row delete" onClick={handleTableDelete}>
            Delete Table
          </button>
          {/* <button className="button save-button" onClick={getFinalData}>
            Save
          </button> */}
        </div>
      )}
      {editTable && (
        <div className="column-checkbox">
          {columnInfo.map((item, i) => (
            <div className="checkbox-container" key={i + "field" + item.key}>
              <label htmlFor={"#" + item.field}>{item.field}</label>
              <input
                type="checkbox"
                checked={!item.hide}
                id={item.field}
                onChange={() => handleColumnHide(item)}
              />
            </div>
          ))}
        </div>
      )}
      <div className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={dataSource}
          columnDefs={columnInfo}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
          rowSelection={"multiple"}
          domLayout="autoHeight"
          rowDragManaged={true}
          animateRows={true}
          suppressColumnMoveAnimation={false}
          onRowDragEnd={onRowDragEnd}
          suppressDragLeaveHidesColumns={true}
          // gridOptions={gridOptions}
        ></AgGridReact>
      </div>
    </div>
  );
};
export default TableComp;
