import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const QC_CHANGE_TYPE = {
  ADDED: "add",
  UPDATED: "modify",
  DELETED: "delete",
};
export const contentType = {
  table: "table",
  text: "text",
  image: "image",
  header: "header",
};
export const addText = "Edit Your Text Here";

export const QC_ADD_FORMAT = {
  qc_change_type: "add",
  prev_line_detail: {
    roi_id: {
      para: "150040fe-08ae-449f-a3f5-9eb882174239",
      childbox: "80235e64-b933-427b-8de1-8f1b2edd2fc8",
      subtext: "22598298-9db4-4e5f-9384-bfe630ac2d95",
    },
    doc_id: "23c8aff6-832b-4fba-81b0-864885c4aac1",
    link_id: "43fe0a9e-5105-11ed-9927-005056ab6469",
    link_id_level2: "",
    link_id_level3: "",
    link_id_level4: "",
    link_id_level5: "",
    link_id_level6: "",
    link_id_subsection1: "",
    link_id_subsection2: "",
    link_id_subsection3: "",
  },
  content: [
    {
      type: "text",
      content:
        "All PK summaries will be based on the PK analysis set. Anti-drug antibodies (ADA) and PD parameter summaries and safety presentations will be based on the safety analysis set.",
      seq_num: 1,
    },
  ],
  next_line_detail: {
    roi_id: {
      para: "150040fe-08ae-449f-a3f5-9eb882174239",
      childbox: "80235e64-b933-427b-8de1-8f1b2edd2fc8",
      subtext: "22598298-9db4-4e5f-9384-bfe630ac2d34",
    },
    doc_id: "23c8aff6-832b-4fba-81b0-864885c4aaab1",
    link_id: "43fe0a9e-5105-11ed-9927-005056ab6445",
    link_id_level2: "",
    link_id_level3: "",
    link_id_level4: "",
    link_id_level5: "",
    link_id_level6: "",
    link_id_subsection1: "",
    link_id_subsection2: "",
    link_id_subsection3: "",
  },
};
export const tableJSONByRowAndColumnLength = (row, column) => {
  const json = [];
  for (let i = 0; i < row; i++) {
    const rowId = uuidv4();
    const columnObj = {};
    for (let j = 0; j < column; j++) {
      const obj = {
        entities: [],
        content: "",
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

const setContent = (type) => {
  if (type === contentType.text || type === contentType.header) {
    return addText;
  } else if (type === contentType.table) {
    return {
      Table: "",
      TableProperties: tableJSONByRowAndColumnLength(2, 2),
      SectionHeaderPrintPage: "0",
      TableIndex: "1",
      TableName: "",
      Header: [],
    };
  } else {
    return "";
  }
};

export const handleQCAdd = (sectionData, lineId, type, contentID) => {
  const cloneData = cloneDeep(sectionData);
  const index = cloneData.findIndex((item) => item.line_id === lineId);
  if (index > -1) {
    if (cloneData[index].qc_change_type === QC_CHANGE_TYPE.ADDED) {
      const contentArr = cloneData[index].content;
      const childIndex = contentArr.findIndex((item) => item.id === contentID);
      if (childIndex > -1) {
        const seq_num = contentArr[childIndex].seq_num;
        const obj = {
          type,
          content: setContent(type),
          seq_num: parseInt(seq_num) + 1,
          id: uuidv4(),
        };
        contentArr.splice(seq_num + 1, 0, obj);
        contentArr.forEach((element, index) => {
          element.seq_num = index;
        });
      }
    } else {
      if (cloneData[index + 1].qc_change_type === QC_CHANGE_TYPE.ADDED) {
        const editIndex = index + 1;
        const contentArr = cloneData[editIndex].content;
        const obj = {
          type,
          content: setContent(type),
          seq_num: 0,
          id: uuidv4(),
        };
        contentArr.splice(0, 0, obj);
        contentArr.forEach((element, arrIndex) => {
          element.seq_num = arrIndex;
        });
      } else {
        const prevLineDetail = cloneData[index];
        const nextLineDetail = cloneData[index + 1];

        const qc_add_obj = {
          line_id: uuidv4(),
          qc_change_type: QC_CHANGE_TYPE.ADDED,
          prev_line_detail: prevLineDetail,
          next_line_detail: nextLineDetail,
          content: [
            {
              type,
              content: setContent(type),
              seq_num: 0,
              id: uuidv4(),
            },
          ],
        };
        cloneData.splice(index + 1, 0, qc_add_obj);
      }
    }
    return cloneData;
  }
  return null;
};
