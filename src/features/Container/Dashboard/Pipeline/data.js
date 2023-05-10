export const serviceStatus = {
  RUNNING: 'RUNNING',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
};

export const obj = [
  {
    services: [
      {
        name: 'meta_tagging',
        status: 'COMPLETED',
      },
      {
        name: 'digitizer2_omopgenerate',
        status: 'PENDING',
      },
      {
        name: 'terminate_node',
        status: 'PENDING',
      },
    ],
    name: 'Workflow',
    status: 'COMPLETED',
    percentComplete: 100,
  },
  {
    services: [
      {
        name: 'meta_tagging',
        status: 'COMPLETED',
      },
      {
        name: 'digitizer2_normsoa',
        status: 'PENDING',
      },
      {
        name: 'terminate_node',
        status: 'PENDING',
      },
    ],
    name: 'Workflow',
    status: 'RUNNING',
    percentComplete: 63,
  },
  {
    services: [
      {
        name: 'meta_tagging',
        status: 'COMPLETED',
      },
      {
        name: 'digitizer2_normsoa',
        status: 'RUNNING',
      },
      {
        name: 'terminate_node',
        status: 'PENDING',
      },
    ],
    name: 'Workflow',
    status: 'ERROR_TIMEOUT',
    percentComplete: 33,
  },
];

export const wfData = [
  {
    wfId: 'd7afc80e-e0bf-4c52-9510-abac8dda9f1f',
    wfStatus: 'RUNNING',
    wfAllServices: [
      'meta_tagging',
      'digitizer2_omopgenerate',
      'terminate_node',
    ],
    wfName: 'testing_workflows',
    wfRunningServices: ['digitizer2_omopgenerate'],
    wfFinishedServices: ['meta_tagging'],
    wfPercentComplete: 33,
    wfErrorMessageDetails: '',
    timeCreated: '05-Jan-2023',
  },
];

export const allData = [
  {
    wfId: 'd7afc80e-e0bf-4c52-9510-abac8dda9f1f',
    wfStatus: 'RUNNING',
    wfAllServices: [
      'meta_tagging',
      'digitizer2_omopgenerate',
      'terminate_node',
    ],
    wfName: 'testing_workflows',
    wfRunningServices: ['digitizer2_omopgenerate'],
    wfFinishedServices: ['meta_tagging'],
    wfPercentComplete: 33,
    wfErrorMessageDetails: '',
    timeCreated: '05-Jan-2023',
  },
  {
    wfId: '12a83208-523e-4e77-8149-ad54d478c652',
    wfStatus: 'RUNNING',
    wfAllServices: ['meta_tagging', 'digitizer2_normsoa', 'terminate_node'],
    wfName: 'custom_flow',
    wfRunningServices: [],
    wfFinishedServices: ['meta_tagging'],
    wfPercentComplete: 63,
    wfErrorMessageDetails: '',
    timeCreated: '05-Jan-2023',
  },
  {
    wfId: '362fda14-5fe8-43dc-be71-d2b281628d09',
    wfStatus: 'ERROR_TIMEOUT',
    wfAllServices: ['meta_tagging', 'digitizer2_normsoa', 'terminate_node'],
    wfName: 'custom_flow',
    wfRunningServices: ['digitizer2_normsoa'],
    wfFinishedServices: ['meta_tagging'],
    wfPercentComplete: 33,
    wfErrorMessageDetails: '',
    timeCreated: '05-Jan-2023',
  },
  {
    wfId: 'd7afc80e-e0bf-4c52-9510-abac8dda9f1f',
    wfStatus: 'COMPLETED',
    wfAllServices: [
      'meta_tagging',
      'digitizer2_omopgenerate',
      'terminate_node',
    ],
    wfName: 'testing_workflows',
    wfRunningServices: ['digitizer2_omopgenerate', 'terminate_node'],
    wfFinishedServices: [],
    wfPercentComplete: 100,
    wfErrorMessageDetails: '',
    timeCreated: '05-Jan-2023',
  },
  {
    wfId: 'd7afc80e-e0bf-4c52-9510-abac8dda9f1f',
    wfStatus: 'RUNNING',
    wfAllServices: [
      'meta_tagging',
      'terminate_node',
      'analyzer',
      'digitizer2_omopupdate',
      'i2e_omop_update',
      'digitizer2_omopgenerate',
    ],
    wfName: 'testing_workflows',
    wfRunningServices: ['i2e_omop_update', 'analyzer'],
    wfFinishedServices: ['meta_tagging', 'terminate_node'],
    wfPercentComplete: 38,
    wfErrorMessageDetails: '',
    timeCreated: '05-Jan-2023',
  },
];
