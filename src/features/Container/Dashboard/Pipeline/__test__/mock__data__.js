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
};

export default initialStateSuccess;
