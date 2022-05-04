import { useEffect } from "react";
import { getColumns } from "./util";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import Button from "apollo-react/components/Button/Button";

const gridStyle = { minHeight: 200 };

const NewTable = (props) => {
  const { noOfColumns } = props;
  const [dataSource, setDataSource] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);

  useEffect(() => {
    if (noOfColumns > 0) {
      let obj = {
        name: "id",
        header: "Id",
        type: "string",
        maxWidth: 0,
        defaultVisible: false,
      };
      let columns = [obj, ...getColumns(noOfColumns)];
      setTableColumn(columns);
    }
  }, [noOfColumns]);

  const onEditComplete = (arg) => {
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
  const handleAddRow = () => {
    const data = [...dataSource];
    if (data.length > 0) {
      let newRow = {};
      Object.keys(data[0]).map((key) => {
        if (key === "id") {
          return (newRow[key] = uuidv4());
        }
        return (newRow[key] = "");
      });
      data.push(newRow);
      setDataSource(data);
    } else {
      let newRow = {};
      for (let i = 0; i < tableColumn.length; i++) {
        if (tableColumn[i].name === "id") {
          newRow.id = uuidv4();
        } else {
          newRow[tableColumn[i].name] = "";
        }
      }
      data.push(newRow);
      setDataSource(data);
    }
  };
  // console.log(dataSource);
  // console.log("Table Column", tableColumn);
  return (
    <div>
      {/* {dataSource.length > 0 && ( */}
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          {tableColumn.length > 0 && (
            <Button
              variant="primary"
              size="small"
              style={{ marginBottom: 10, marginTop: 10 }}
              onClick={handleAddRow}
            >
              Add Row
            </Button>
          )}
        </div>
        {tableColumn.length > 0 && (
          <ReactDataGrid
            idProperty="id"
            style={gridStyle}
            onEditComplete={onEditComplete}
            editable={true}
            columns={tableColumn}
            dataSource={dataSource}
          />
        )}
      </div>
      {/* )} */}
    </div>
  );
};
export default NewTable;
