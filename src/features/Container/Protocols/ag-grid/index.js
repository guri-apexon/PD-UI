// import CreateTable from "./CreateTable";
import EditTable from "./EditTable";
import tableJSONData from "./data/tableProperties.json";
import { useEffect, useState } from "react";

import Button from "apollo-react/components/Button/Button";
import {
  getColumnBySize,
  getColumnFromJSON,
  getDataSourceFromJSON,
} from "./utils";

const Table = () => {
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumn] = useState([]);

  const [columnSize, setColumnSize] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const [editTable, setEditTable] = useState(false);

  useEffect(() => {
    if (editTable) {
      const dataColumn = getColumnFromJSON(tableJSONData);
      setColumn(dataColumn);
      const dataSource = getDataSourceFromJSON(tableJSONData);
      setDataSource(dataSource);
    }
  }, [editTable]);
  const createTable = () => {
    if (columnSize > 0) {
      const columns = getColumnBySize(columnSize);
      setColumn(columns);
      setShowTable(true);
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <div>
        <Button
          variant="primary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={() => setEditTable(false)}
        >
          Add Table
        </Button>
        <Button
          variant="primary"
          size="small"
          style={{ marginBottom: 10, marginTop: 10 }}
          onClick={() => setEditTable(true)}
        >
          Edit Table
        </Button>
      </div>
      {editTable && columns.length > 0 && (
        <EditTable
          table={tableJSONData}
          dataSource={dataSource}
          columns={columns}
        />
      )}
      {!editTable && (
        <div>
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
              Create Table
            </Button>
          </div>
          {showTable && (
            <EditTable table={[]} dataSource={dataSource} columns={columns} />
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
