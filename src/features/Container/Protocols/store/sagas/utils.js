import { select } from "redux-saga/effects";
import { tableJSONByRowAndColumnLength } from "../../Components/AG-Table/Utils/createTable";

export const QC_CHANGE_TYPE = {
  ADDED: "add",
  UPDATED: "modify",
  DELETED: "delete",
};
const ADDTEXT = "Add Text Here";
const IMAGEADD = "Add Image";

export function* getUserId() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
}

export const createTextField = (newLineID, detail) => {
  const obj = {
    content: ADDTEXT,
    font_info: {},
    derived_section_type: "text",
    qc_change_type: QC_CHANGE_TYPE.ADDED,
    hover: false,
    input_seq_num: detail.input_seq_num,
    synonyms_extracted_terms: detail.synonyms_extracted_terms,
    semantic_extraction: detail.semantic_extraction,
    sec_id: detail.sec_id,
    line_id: newLineID,
    is_active: detail.is_active,
    aidocid: detail.aidocid,
    genre: detail.genre,
  };
  return obj;
};
export const createHeaderField = (newLineID, detail) => {
  const obj = {
    content: `<b>${ADDTEXT}</b>`,
    font_info: {
      IsBold: true,
      font_size: "",
      font_style: "",
      print_page: "",
      entity: [],
      roi_id: {},
    },
    input_seq_num: detail.input_seq_num,
    derived_section_type: "header",
    synonyms_extracted_terms: detail.synonyms_extracted_terms,
    semantic_extraction: detail.semantic_extraction,
    qc_change_type: QC_CHANGE_TYPE.ADDED,
    sec_id: detail.sec_id,
    line_id: newLineID,
    is_active: detail.is_active,
    aidocid: detail.aidocid,
    genre: detail.genre,
  };
  return obj;
};

export const createTableField = (newLineID, detail, rows, columns) => {
  const obj = {
    content: {
      Table: "",
      TableProperties: tableJSONByRowAndColumnLength(rows, columns),
      SectionHeaderPrintPage: "0",
      TableIndex: "1",
      TableName: "",
      Header: [],
    },
    font_info: {
      IsBold: true,
      font_size: "",
      font_style: "",
      print_page: "",
      entity: [],
      roi_id: {},
    },
    input_seq_num: detail.input_seq_num,
    derived_section_type: "table",
    synonyms_extracted_terms: detail.synonyms_extracted_terms,
    semantic_extraction: detail.semantic_extraction,
    qc_change_type: QC_CHANGE_TYPE.ADDED,
    sec_id: detail.sec_id,
    line_id: newLineID,
    is_active: detail.is_active,
    aidocid: detail.aidocid,
    genre: detail.genre,
  };
  return obj;
};

export const createImageField = (newLineID, detail) => {
  const obj = {
    content: IMAGEADD,
    font_info: {},
    derived_section_type: "image",
    qc_change_type: QC_CHANGE_TYPE.ADDED,
    hover: false,
    input_seq_num: detail.input_seq_num,
    synonyms_extracted_terms: detail.synonyms_extracted_terms,
    semantic_extraction: detail.semantic_extraction,
    sec_id: detail.sec_id,
    line_id: newLineID,
    is_active: detail.is_active,
    aidocid: detail.aidocid,
    genre: detail.genre,
    imageButton: true,
  };
  return obj;
};
