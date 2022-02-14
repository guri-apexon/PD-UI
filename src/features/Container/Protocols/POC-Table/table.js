import React, { useEffect, useState } from "react";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

// import data from "../rows.data";
import { v4 as uuidv4 } from "uuid";
import { getDataSourceFromJSON } from "./util";
import htmlData from "../Static-Data/htmltojson.json";
import Button from "apollo-react/components/Button/Button";

const gridStyle = { minHeight: 700 };

const TableEdit = () => {
  const [gridRef, setGridRef] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const getColumnFromJSON = (data) => {
    // console.log(data);
    let columns = [];
    let obj = {
      name: "id",
      header: "Id",
      type: "string",
      maxWidth: 0,
      defaultVisible: false,
    };
    columns.push(obj);
    if (data.length > 0) {
      Object.keys(data[0]).map((elm) => {
        let column = {
          name: elm,
          header: elm,
          defaultFlex: 1,
          minWidth: 50,
          cellDOMProps: cellDOMProps,
        };
        columns.push(column);
      });
    }
    // console.log(columns);
    return columns;
  };
  useEffect(() => {
    const columns = getColumnFromJSON(htmlData);
    const dataSource = getDataSourceFromJSON(htmlData);

    setDataSource(dataSource);
    setColumns(columns);
  }, []);
  const cellDOMProps = (cellProps) => {
    return {
      onClick: () => {
        gridRef.current.startEdit({
          columnId: cellProps.id,
          rowIndex: cellProps.rowIndex,
        });
      },
    };
  };

  // const columns = [
  //   {
  //     name: "id",
  //     header: "Id",
  //     defaultVisible: false,
  //     minWidth: 100,
  //     type: "number",
  //     cellDOMProps,
  //   },
  //   {
  //     name: "name",
  //     header: "Name",
  //     defaultFlex: 1,
  //     minWidth: 250,
  //     cellDOMProps,
  //   },
  //   {
  //     name: "country",
  //     header: "Country",
  //     defaultFlex: 1,
  //     minWidth: 100,
  //     cellDOMProps,
  //   },
  //   {
  //     name: "city",
  //     header: "City",
  //     defaultFlex: 1,
  //     minWidth: 250,
  //     cellDOMProps,
  //   },
  //   { name: "age", header: "Age", minWidth: 150, type: "number", cellDOMProps },
  // ];
  const onEditComplete = (arg) => {
    console.log(arg);
    const data = [...dataSource];
    const newData = data.map((item) => {
      if (item.id === arg.rowId) {
        item[arg.columnId] = arg.value;
        return item;
      } else {
        return item;
      }
    });

    setDataSource(newData);
  };
  // const onEditComplete = useCallback(
  //   ({ value, columnId, rowId }) => {
  //     const data = [...dataSource];
  //     data[rowId][columnId] = value;

  //     setDataSource(data);
  //   },
  //   [dataSource]
  // );
  console.log("Actual Column", columns);
  const handleAddRow = () => {
    const data = [...dataSource];
    let newRow = {};
    Object.keys(data[0]).map((key) => {
      if (key === "id") {
        return (newRow[key] = uuidv4());
      }
      return (newRow[key] = "");
    });
    console.log(newRow);
    data.push(newRow);
    setDataSource(data);
  };
  console.log("Data-----", dataSource);
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          variant="primary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={handleAddRow}
        >
          Add Row
        </Button>
      </div>

      <ReactDataGrid
        onReady={setGridRef}
        idProperty="id"
        style={gridStyle}
        onEditComplete={onEditComplete}
        editable={true}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default TableEdit;
