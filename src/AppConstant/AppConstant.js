const userRole = {
  primary: 'primary',
  secondary: 'secondary',
};
const messages = {
  legacyDocMsg:
    'You are not authorized to view this protocol detail. Please re-process the document.',
  downloadFileContentExcel: {
    header: 'Excel Content',
    body: [
      {
        header: 'Description',
        body: [
          'In the compare output, there is content compared from 2 unique documents, usually from the same clinical trial (for example, 2 different versions).',
          'The baseline document may also be known as document A or left-hand-side (LHS) document.',
          'The comparator document may also be known as document B or right-hand side (RHS) document.',
        ],
      },
      {
        header: 'In the Excel output, there are 3 tabs',
        body: [
          'Summary',
          'TOC--Table of Contents section headers',
          'SOA--Schedule of Assessments items, grouped by visit',
        ],
      },
      {
        header: 'In the Excel TOC tab, there are 4 fields',
        body: [
          'baseline document section header ',
          'compare document section header',
          'Modification (high-level)',
          'Specific Change',
        ],
      },
      {
        header: 'In the Excel SOA tab, there are 5 fields',
        body: [
          'baseline document section header',
          'compare document section header',
          'Modification (high-level)',
          'Specific Change',
          'Visit',
        ],
      },
    ],
  },
  downloadFileContentCSV: {
    header: 'CSV Content',
    body: [
      {
        header: 'Description',
        body: [
          'In the compare output, there is content compared from 2 unique documents, usually from the same clinical trial (for example, 2 different versions).',
          'The baseline document may also be known as document A or left-hand-side (LHS) document.',
          'The comparator document may also be known as document B or right-hand side (RHS) document.',
        ],
      },
      {
        header:
          'In the CSV output, each item is compared and modified items are listed as records.',
        body: [],
      },
    ],
  },
  compareMessage:
    'Please Select One Baseline Document and One Comparator Document to Download Compare Result.',
  versionMessage: {
    heading: 'Allowed Characters',
    infoMessage: [
      'Alphabets',
      'Numbers',
      'Space',
      'Underscore ( _ )',
      'Hyphen ( - )',
      'Dot ( . )',
    ],
    validationMessage: 'Invalid Entry. Please Refer Information Icon.',
  },
};
const SORT_DROPDOWN = [
  {
    id: '1',
    value: 'score',
    label: 'Relevancy',
  },
  {
    id: '2',
    value: 'approval_date',
    label: 'Approval Date',
  },
  {
    id: '3',
    value: 'uploadDate',
    label: 'Upload Date',
  },
];

export const POST_OBJECT = {
  key: '',
  toc: [],
  sponsor: [],
  indication: [],
  phase: [],
  qcStatus: [],
  documentStatus: [],
  dateType: 'approval_date',
  dateFrom: '',
  dateTo: '',
  sortField: 'score',
  sortOrder: 'desc',
  pageNo: 1,
  pageSize: 10,
  dateSection: '0',
};

const USER_MENU = [
  {
    text: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    text: 'Protocols',
    pathname: '/protocols',
  },
  {
    text: 'Search',
    pathname: '/search',
  },
];
const QC1_MENU = [
  {
    text: 'QC',
    pathname: '/qc',
  },
];
const QC2_MENU = [
  {
    text: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    text: 'Protocols',
    pathname: '/protocols',
  },
  {
    text: 'Search',
    pathname: '/search',
  },
  {
    text: 'QC',
    pathname: '/qc',
  },
];
const ADMIN_MENU = [
  {
    text: 'Dashboard',
    pathname: '/dashboard',
  },
  {
    text: 'Protocols',
    pathname: '/protocols',
  },
  {
    text: 'Search',
    pathname: '/search',
  },
  {
    text: 'Admin',
    pathname: '/admin',
  },
];

const redaction = {
  text: '~REDACTED~',
  hoverText: 'Redacted Information',
};

const CONTENT_TYPE = {
  TABLE: 'table',
  TEXT: 'text',
  IMAGE: 'image',
  HEADER: 'header',
};

const QC_CHANGE_TYPE = {
  ADDED: 'add',
  UPDATED: 'modify',
  DELETED: 'delete',
};

const METADATA_LIST = [
  { label: 'Patient Burden Variables' },
  { label: 'Eligibility Criteria' },
  { label: 'Study Assessment and Procedure' },
  { label: 'Endpoint and Objectives' },
];

export const POST_ADD_SECTION = {
  type: 'header',
  qc_change_type: 'add',
  link_prefix: '',
  link_text: '',
  link_level: '1',
  line_id: '',
  content: '',
  uuid: '',
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
  },
  section_locked: false,
};

export {
  SORT_DROPDOWN,
  USER_MENU,
  QC1_MENU,
  QC2_MENU,
  ADMIN_MENU,
  redaction,
  messages,
  userRole,
  CONTENT_TYPE,
  QC_CHANGE_TYPE,
  METADATA_LIST,
};
