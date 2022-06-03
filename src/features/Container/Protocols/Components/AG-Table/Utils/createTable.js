import { v4 as uuidv4 } from "uuid";

// const QC_CHANGE_TYPE = {
//   ADDED: "add",
//   UPDATED: "modify",
//   DELETED: "delete",
// };

export const tableJSONByRowAndColumnLength = (row, column) => {
  const json = [];
  for (let i = 0; i < row; i++) {
    const rowId = uuidv4();
    const columnObj = {};
    for (let j = 0; j < column; j++) {
      const obj = {
        entities: [],
        content: "-",
        roi_id: {
          table_roi_id: "",
          row_roi_id: rowId,
          column_roi_id: "",
          datacell_roi_id: "",
        },
        table_index: uuidv4(),
        qc_change_type: "",
      };
      columnObj[j + 1 + ".0"] = obj;
    }
    json.push(columnObj);
  }
  return JSON.stringify(json);
};
