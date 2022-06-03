import { useEffect, useState } from "react";
import TableComp from "./table";
// import data from "./data.json";
import "./table.scss";

import {
  getColumnInfoFromSourceData,
  getSourceDataFromProperties,
  getColumnInfoFromSourceDataNonEditable,
} from "./Utils/dataAndColumn";
import { cloneDeep } from "lodash";
import ViewTable from "./ViewTable";

const SHARED_OPTIONS = { suppressCellSelection: true };

const PDTable = ({ data, edit, handleSave, enableTableForEdit }) => {
  const [dataSource, setDataSource] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  const [columnInfoNonEdit, setColumnInfoNonEdit] = useState([]);
  const [tableProperties, setTableProperties] = useState("");
  const [editTable, setEditTable] = useState(false);
  useEffect(() => {
    const tableProperties = JSON.parse(data.content.TableProperties);
    setTableProperties(tableProperties);
    const sourceData = getSourceDataFromProperties(tableProperties);
    setDataSource(sourceData);
    if ("editEnabledFor" in data && data.editEnabledFor === data.line_id) {
      const columnInfoData = getColumnInfoFromSourceData(sourceData[0]);
      setColumnInfo(columnInfoData);
      setEditTable(true);
    } else {
      const columnInfoData = getColumnInfoFromSourceDataNonEditable(
        sourceData[0]
      );
      setColumnInfoNonEdit(columnInfoData);
    }
  }, [data]);
  //   const handleCreateTable = () => {
  //     setCreateTable(!createTable);
  //     setEditTable(!editTable);
  //   };
  const handleSaveTable = (tableJSON, lineID) => {
    let cloneData = cloneDeep(data);
    cloneData.content.TableProperties = tableJSON;
    handleSave(cloneData.content, lineID);
  };
  return (
    <div key={"Table" + data.line_id} style={{ height: "100%" }}>
      {"editEnabledFor" in data && data.editEnabledFor === data.line_id ? (
        <TableComp
          rowData={dataSource}
          columnData={[...columnInfo]}
          tableData={tableProperties}
          editTable={editTable}
          setEditTable={setEditTable}
          edit={edit}
          handleSave={handleSaveTable}
          lineID={data.line_id}
          gridOptions={{ ...SHARED_OPTIONS }}
        />
      ) : (
        <div>
          {edit && (
            <div className="button-container-index">
              <button
                className="button add-row"
                onClick={() => enableTableForEdit(data.line_id)}
              >
                Edit Table
              </button>
            </div>
          )}
          <ViewTable
            rowData={dataSource}
            columnData={[...columnInfoNonEdit]}
            gridOptions={{ ...SHARED_OPTIONS }}
          />
        </div>
      )}
    </div>
  );
};
export default PDTable;
