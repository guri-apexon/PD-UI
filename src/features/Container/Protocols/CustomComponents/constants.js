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
  Text: 'Enter Your Text Here',
  TableId: '',
  AttachmentId: null,
  qc_change_type_footnote: QC_CHANGE_TYPE.ADDED,
};
delete image.font_info;

// eslint-disable-next-line
export default { text, table, header, image, footNote };
