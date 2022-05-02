import {
  getColumnFromJSON,
  getColumnFromJSONNonEdit,
  getDataSourceFromJSON,
} from "../utils";
import AGTable from "./EditTable";
import DisplayTable from "./DisplayTable";
import RenderFootNotes from "./RenderFootnotes";
import { useEffect, useState } from "react";

const RenderTable = ({ data, edit }) => {
  const [item, setItem] = useState(null);
  const [tableProperties, setTableProperties] = useState(null);
  const [dataColumn, setDataColumn] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [footNote, setFootNote] = useState([]);

  useEffect(() => {
    const item1 = data.content;
    setItem(item1);
    let footNote1 = [];
    for (const [key, value] of Object.entries(item1)) {
      const note = key.split("_")[0];
      if (note === "FootnoteText") {
        footNote1.push(value);
      }
    }
    setFootNote(footNote1);
  }, [data]);
  useEffect(() => {
    if (item) {
      if (edit) {
        const tableProperties1 = JSON.parse(item.TableProperties);
        setTableProperties(tableProperties1);
        const dataColumn1 = getColumnFromJSON(tableProperties1);
        setDataColumn(dataColumn1);
        const dataSource1 = getDataSourceFromJSON(tableProperties1);
        setDataSource(dataSource1);
      } else {
        const tableProperties1 = JSON.parse(item.TableProperties);
        setTableProperties(tableProperties1);
        const dataColumn1 = getColumnFromJSONNonEdit(tableProperties1);
        setDataColumn(dataColumn1);
        const dataSource1 = getDataSourceFromJSON(tableProperties1);
        setDataSource(dataSource1);
      }
    }
  }, [edit, item]);

  return (
    item && (
      <div className="table-footnote-container">
        <div className="level-3-header">{item.TableName}</div>

        <div
          className="table-container"
          key={`${item.TableIndex}`}
          style={{ overflowX: "auto", marginTop: "10px", marginBottom: "20px" }}
        >
          {edit ? (
            <AGTable
              table={tableProperties}
              dataSource={dataSource}
              columns={dataColumn}
              item={data}
              showOptions={true}
            />
          ) : (
            <DisplayTable
              table={tableProperties}
              dataSource={dataSource}
              columns={dataColumn}
              item={data}
              showOptions={false}
            />
          )}
        </div>
        <RenderFootNotes footNotes={footNote} />
      </div>
    )
  );
};

export default RenderTable;
