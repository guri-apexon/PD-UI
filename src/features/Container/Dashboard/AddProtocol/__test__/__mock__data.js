export const initialStateSuccess = {
  dashboard: {
    workflowData: {
      loading: false,
      error: null,
      success: true,
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
            {
              depends: [],
              service_name: 'digitizer2_compare',
            },
            {
              depends: [],
              service_name: 'digitizer2_normsoa',
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
  user: {
    userDetail: {
      userId: 'u1072234',
      username: 'Subhadatta',
      email: 'subhadatta.samal@iqvia.com',
      user_type: 'admin',
    },
  },
};

const dashboard = {
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
          {
            depends: [],
            service_name: 'digitizer2_compare',
          },
          {
            depends: [],
            service_name: 'digitizer2_normsoa',
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
    type: 'inputCheck',
    data: {
      message: 'input Error',
    },
  },
  addProtocolDataError: '',
  addProtocolModal: true,
};
export const errorInputState = {
  dashboard,
  user: {
    userDetail: {
      userId: 'u1072234',
      username: 'Subhadatta',
      email: 'subhadatta.samal@iqvia.com',
      user_type: 'admin',
    },
  },
};
export const errorWorkflowState = {
  dashboard,
  user: {
    userDetail: {
      userId: 'u1072234',
      username: 'Subhadatta',
      email: 'subhadatta.samal@iqvia.com',
      user_type: 'admin',
    },
  },
};
