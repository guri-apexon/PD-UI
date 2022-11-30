const versionReg = /^\w+([\s-_.]\w+)*$/;
export const initialFormValues = {
  protocolNumber: '',
  amendmentNumber: {},
  projectID: '',
  versionNumber: '',
  sponsor: {
    label: '',
  },
  sponsor1: [],
  documentStatus: {
    label: '',
  },
  indication: {
    label: '',
  },
  moleculeDevice: '',
  uploadFile: [],
};
export const initialFormErrorValues = {
  protocolNumber: {
    isRequired: false,
    error: false,
    errorMessage: ' ',
    type: 'Textbox',
  },
  amendmentNumber: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'Dropdown',
  },
  projectID: {
    isRequired: false,
    error: false,
    errorMessage: ' ',
    type: 'Textbox',
  },
  versionNumber: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    regex: versionReg,
    type: 'Textbox',
  },
  sponsor: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'CustomDropdown',
  },
  sponsor1: {
    isRequired: false,
    error: false,
    errorMessage: ' ',
    type: 'Dropdown',
  },
  documentStatus: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'Dropdown',
  },
  indication: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'CustomDropdown',
  },
  moleculeDevice: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'Textbox',
  },
  uploadFile: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'File',
  },
};

export const documentStatusList = [
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Approved Final',
    value: 'final',
  },
];

export const amendmentNumber = [
  {
    label: 'Y',
    value: 'Yes',
  },
  {
    label: 'N',
    value: 'No',
  },
];
export const emptyAutoObj = {
  label: '',
};
