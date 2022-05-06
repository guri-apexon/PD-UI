import { select } from "redux-saga/effects";

export const QC_CHANGE_TYPE = {
  ADDED: "add",
  UPDATED: "modify",
  DELETED: "delete",
};
const ADDTEXT = "Add Text Here";

export function* getUserId() {
  const state = yield select();
  const id = state.user.userDetail.userId;
  return id.substring(1);
}

export const createTextField = (newLineID, detail) => {
  const obj = {
    content: ADDTEXT,
    font_info: {},
    input_seq_num: detail.input_seq_num,
    derived_section_type: "text",
    synonyms_extracted_terms: detail.synonyms_extracted_terms,
    semantic_extraction: detail.semantic_extraction,
    qc_change_type: QC_CHANGE_TYPE.ADDED,
    sec_id: detail.sec_id,
    line_id: newLineID,
    is_active: detail.is_active,
    aidocid: detail.aidocid,
    genre: detail.genre,
    hover: false,
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

export const createTableField = (newLineID, detail) => {
  const obj = {
    content: {
      Table: "",
      TableProperties:
        '[{"1.0":{"entities":[],"content":"Edit Col-1","roi_id":{"table_roi_id":"b9a2e1ff-efb4-476d-b43d-a198c56ea43c","row_roi_id":"77fd70eb-3620-4daf-beae-eaba14f948aa","column_roi_id":"101ce83c-a6f2-472f-bb6d-06e6bbcd6cce","datacell_roi_id":"f56b87d1-1aaf-45b4-8940-2689f613952c"},"table_index":0.0,"qc_change_type":""},"2.0":{"entities":[],"content":"Edit Col-2","roi_id":{"table_roi_id":"b9a2e1ff-efb4-476d-b43d-a198c56ea43c","row_roi_id":"77fd70eb-3620-4daf-beae-eaba14f948aa","column_roi_id":"101ce83c-a6f2-472f-bb6d-06e6bbcd6cce","datacell_roi_id":"f56b87d1-1aaf-45b4-8940-2689f613952c"},"table_index":0.0,"qc_change_type":""}}]',
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
