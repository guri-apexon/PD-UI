const initialStateSuccess = {
  dashboard: {
    workflowData: {
      loading: false,
      error: null,
      data: {
        Status: 200,
        default_workflows: {
          document_compare: [
            {
              depends: [],
              service_name: 'digitizer2_compare',
            },
          ],
          norm_soa: [
            {
              depends: [],
              service_name: 'digitizer2_normsoa',
            },
          ],
          lm_flow: [
            {
              depends: [],
              service_name: 'digitizer2_omopgenerate',
            },
            {
              depends: ['digitizer2_omopgenerate'],
              service_name: 'i2e_omop_update',
            },
            {
              depends: ['i2e_omop_update'],
              service_name: 'digitizer2_omopupdate',
            },
          ],
        },
        custom_workflows: {
          dipa_client: [
            {
              depends: [],
              service_name: 'meta_tagging',
            },
            {
              depends: ['meta_tagging'],
              service_name: 'meta_extraction',
            },
          ],
        },
      },
    },
    workflowSubmit: {
      loading: false,
      error: null,
      data: [],
      success: false,
    },
    addProtocolErrorState: {
      type: '',
      data: {},
    },
    addProtocolDataError: '',
    addProtocolModal: true,
  },
};

export default initialStateSuccess;

export const pipeLoadingState = {
  dashboard: {
    workflowData: {
      loading: true,
      error: null,
      data: {
        Status: '',
      },
    },
    workflowSubmit: {
      loading: false,
      error: null,
      data: [],
      success: false,
    },
    addProtocolErrorState: {
      type: '',
      data: {},
    },
    addProtocolDataError: '',
    addProtocolModal: true,
  },
};

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
