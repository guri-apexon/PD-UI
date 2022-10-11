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
import ContentEdit from "../../Tabs/NewProtocolView/Components/ContentEdit";

const SHARED_OPTIONS = { suppressCellSelection: true };

const PDTable = ({
  data,
  edit,
  handleSave,
  enableTableForEdit,
  handleTableDelete,
}) => {
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
  const getFootnoteArray = (content) => {
    const arr = [];
    for (const [key, value] of Object.entries(content)) {
      const reg = /FootnoteText/i;
      let result = reg.test(key);
      if (result) {
        arr.push({
          key,
          value,
        });
      }
    }
    return arr;
  };
  const renderFootnote = (content) => {
    const footnoteArr = getFootnoteArray(content);
    if (footnoteArr.length > 0) {
      return footnoteArr.map((item) => {
        return (
          <ContentEdit
            data={data}
            content={item.value}
            edit={edit}
            lineID={item.key}
            // setActiveLineID={setActiveLineID}
            // activeLineID={activeLineID}
            // handleContentEdit={handleContentEdit}
            className="line-content edit-text-con"
          />
        );
      });
    }
    return <div>{}</div>;
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
          handleTableDelete={handleTableDelete}
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
      {data.content && renderFootnote(data.content)}
    </div>
  );
};
export default PDTable;
