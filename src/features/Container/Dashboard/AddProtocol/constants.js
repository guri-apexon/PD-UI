const versionReg = /^\w+([\s-_.]\w+)*$/;
export const initialFormValues = {
  protocolNumber: '',
  amendmentNumber: {},
  projectID: '',
  versionNumber: '',
  documentStatus: {
    label: '',
  },
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
  documentStatus: {
    isRequired: true,
    error: false,
    errorMessage: ' ',
    type: 'Dropdown',
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
