export const errorMessage = {
  protocolDuplicate:
    'This protocol is already available in our PD library and is duplicate to',
  attributeDuplicate:
    'This protocol document cannot be added to the library because it already exists.',
  adminMessage: 'If you still want to push the document, please',
};

export const dashboardErrorType = {
  protocolDuplicate: 'protocolDuplicate',
  attributeDuplicate: 'attributeDuplicate',
};

export const primaryUserFinalSubmit = {
  docId: '',
  workFlowName: '',
  workFlowList: [
    {
      work_flow_name: 'meta_extraction',
      dependency_graph: [
        {
          service_name: 'meta_tagging',
          depends: [],
        },
        {
          service_name: 'meta_extraction',
          depends: ['meta_tagging'],
        },
      ],
    },
    {
      work_flow_name: 'document_compare',
      dependency_graph: [
        {
          service_name: 'digitizer2_compare',
          depends: [],
        },
      ],
    },
    {
      work_flow_name: 'norm_soa',
      dependency_graph: [
        {
          service_name: 'digitizer2_normsoa',
          depends: [],
        },
      ],
    },
    {
      work_flow_name: 'lm_flow',
      dependency_graph: [
        {
          service_name: 'digitizer2_omopgenerate',
          depends: [],
        },
        {
          service_name: 'i2e_omop_update',
          depends: ['digitizer2_omopgenerate'],
        },
        {
          service_name: 'digitizer2_omopupdate',
          depends: ['i2e_omop_update'],
        },
      ],
    },
    {
      work_flow_name: 'pb_flow',
      dependency_graph: [
        {
          service_name: 'analyzer',
          depends: [],
        },
      ],
    },
    {
      work_flow_name: 'es_ingestion',
      dependency_graph: [
        {
          service_name: 'es_ingestion',
          depends: [],
        },
      ],
    },
  ],
};
