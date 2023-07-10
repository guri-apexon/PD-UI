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
  compareViaUIContent: {
    header: 'Compare via UI',
    body: [
      {
        header: 'Description',
        body: [
          'In the compare browser view, there is content compared from 2 unique documents, usually from the same clinical trial (for example, 2 different versions).',
          'The baseline document may also be known as document A or left-hand-side (LHS) document.',
          'The comparator document may also be known as document B or right-hand side (RHS) document.',
          "The user can view the document's change logs, including REPLACED, INSERTED, and DELETED, in the change list on the right side of the browser output.",
          'By clicking on any item in the change list, the user can navigate to the specific change position in a PDF document.',
          'So whatever user selects first will be base and second one becomes the comparator.',
        ],
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

const CONFIG_API_VARIABLES = [
  'clinical_terms',
  'time_points',
  'preferred_terms',
  'redaction_attributes',
  'references',
  'properties',
];

const SETTING_OPTION = [
  {
    optionName: 'QC Complete',
    value: 'QC_Complete',
    disabled: false,
  },
  {
    optionName: 'New Document/Version',
    value: 'New_Document/Version',
    disabled: true,
  },
  {
    optionName: 'Edited',
    value: 'Edited',
    disabled: false,
  },
];

const USERTYPE = { ADMIN: 'admin', NORMAL: 'normal', QC: 'QC1' };

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
  CONFIG_API_VARIABLES,
  SETTING_OPTION,
  USERTYPE,
};
