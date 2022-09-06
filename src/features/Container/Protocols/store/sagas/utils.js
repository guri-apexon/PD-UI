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
export function* getUserDetail() {
  const state = yield select();
  return state.user.userDetail;
}
export const getPageWiseSection = (data, pageNumber) => {
  console.log("Datttta,", data, pageNumber);
  if (data) {
    let sectionDetail = {};
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const keyPlus = keys[i + 1];
      const startingPageNumber = data[key].header.page;

      let endingPageNumber = 0;
      if (i === keys.length - 1) {
        endingPageNumber = 100000;
      } else {
        endingPageNumber = parseInt(data[keyPlus].header.page) - 1;
      }
      if (pageNumber >= startingPageNumber && pageNumber <= endingPageNumber) {
        // const childArr = data[key].header.child_secid_seq.map((elm) => elm[0]);
        // const childString = childArr.toString();
        sectionDetail.id = data[key].header.aidocid;
        sectionDetail.sectionName = data[key].header.source_file_section;
        sectionDetail.childString = null;
        if (data[key].detail) {
          sectionDetail.dataPresent = true;
        } else {
          sectionDetail.dataPresent = false;
        }
        break;
      }
    }
    return sectionDetail;
  }
};

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
    genre: "3_line_item",
  };
  return obj;
};
export const createHeaderField = (newLineID, detail) => {
  const obj = {
    content: `<h2>${ADDTEXT}</h2>`,
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
    genre: "3_line_item",
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
    genre: "3_line_item",
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
    genre: "3_line_item",
    imageButton: true,
  };
  return obj;
};
