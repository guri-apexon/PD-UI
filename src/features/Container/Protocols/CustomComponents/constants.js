import { QC_CHANGE_TYPE } from '../../../../AppConstant/AppConstant';

const text = {
  section_level: '',
  CPT_section: 'Unmapped',
  type: 'text',
  content: '',
  font_info: {
    IsBold: false,
    font_size: -1,
    font_style: '',
    entity: [],
    roi_id: {
      para: '',
      childbox: '',
      subtext: '',
    },
  },
  level_1_CPT_section: 'Unmapped',
  file_section: 'Unmapped',
  file_section_num: '',
  file_section_level: 1,
  seq_num: null,
  qc_change_type: '',
  line_id: '',
  aidocid: '',
  synonyms_extracted_terms: '',
  semantic_extraction: '',
  section_locked: false,
};

const table = { ...text, type: 'table' };
const header = { ...text, type: 'header', linkLevel: 2 };
const image = { ...text, type: 'image' };
const footNote = {
  footnote_line_id: '',
  footnote_indicator: '',
  footnote_text: 'Enter Your Text Here',
  previous_sequnce_index: null,
  qc_change_type_footnote: QC_CHANGE_TYPE.ADDED,
};
delete image.font_info;

const addHeader = {
  type: 'header',
  qc_change_type: 'add',
  link_prefix: '',
  link_text: '',
  link_level: '1',
  line_id: '',
  content: '',

  prev_detail: {
    line_id: '',
    link_id: '',
    link_id_level2: '',
    link_id_level3: '',
    link_id_level4: '',
    link_id_level5: '',
    link_id_level6: '',
    link_id_subsection1: '',
    link_id_subsection2: '',
    link_id_subsection3: '',
    link_level: '',
  },
  next_detail: {
    line_id: '',
    link_id: '',
    link_id_level2: '',
    link_id_level3: '',
    link_id_level4: '',
    link_id_level5: '',
    link_id_level6: '',
    link_id_subsection1: '',
    link_id_subsection2: '',
    link_id_subsection3: '',
    link_level: '1',
  },
  section_locked: false,
};

const headerLevel1 = { ...addHeader, type: 'header', link_level: '1' };
const supportedFileType = ['jpeg', 'png', 'jpg', 'gif', 'bmp'];

// eslint-disable-next-line
export default {
  text,
  table,
  header,
  image,
  footNote,
  headerLevel1,
  supportedFileType,
};
