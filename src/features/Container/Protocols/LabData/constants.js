import {
  compareNumbers,
  numberSearchFilter,
  createStringSearchFilter,
} from 'apollo-react/components/Table';
import TextFieldFilter from './utilFunction';

const columnList = [
  {
    header: 'Table Name',
    accessor: 'table_link_text',
    filterFunction: createStringSearchFilter('table_link_text'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Assessment Name (From Document)',
    accessor: 'procedure_panel_text',
    filterFunction: createStringSearchFilter('procedure_panel_text'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Procedure Name (From Document)',
    accessor: 'parameter_text',
    filterFunction: createStringSearchFilter('parameter_text'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Assessment Preferred Name',
    accessor: 'assessment',
    filterFunction: createStringSearchFilter('assessment'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Procedure Preferred Name',
    accessor: 'pname',
    filterFunction: createStringSearchFilter('pname'),
    filterComponent: TextFieldFilter,
  },
];

const columnsToAdd = [
  {
    header: 'id',
    accessor: 'employeeIQ',
    sortFunction: compareNumbers,
    filterFunction: numberSearchFilter('id'),
  },
];

const moreColumns = [
  ...columnList.map((column) => ({ ...column })).slice(0, -1),
  ...columnsToAdd.map((column) => ({ ...column, hidden: true })),
  columnList.slice(-1)[0],
];

const moreColumnsWithFrozenWithoutActions = [
  ...columnList.map((column) => ({ ...column })).slice(0, -1),
  ...columnsToAdd.map((column) => ({ ...column })),
];

const moreColumnsWithFrozen = [
  ...moreColumnsWithFrozenWithoutActions,
  columnList.slice(-1)[0],
];

moreColumnsWithFrozen[0].frozen = true;
moreColumnsWithFrozen[1].frozen = true;

const evenMoreColumns = [
  ...moreColumnsWithFrozenWithoutActions,
  ...new Array(40).fill().map((_, i) => ({
    header: `${i}`,
    accessor: `${i}`,
    sortFunction: compareNumbers,
    filterFunction: numberSearchFilter('id'),
  })),
];

const ADD_ROW_LAB_DATA = {
  parameter_text: '',
  id: '',
  run_id: '',
  procedure_panel_text: '',
  dts: '',
  ProcessMachineName: '',
  roi_id: '',
  section: '',
  table_roi_id: 'table_roi_id',
  parameter: '',
  doc_id: 'docId',
  procedure_panel: '',
  assessment: '',
  pname: '',
  ProcessVersion: '',
  table_link_text: '',
  table_sequence_index: -1,
  request_type: 'create',
};

const FILTER_COLUMNS = [
  'table_link_text',
  'procedure_panel_text',
  'parameter_text',
  'assessment',
  'pname',
];

const REQUEST_TYPE = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

export {
  moreColumns,
  moreColumnsWithFrozen,
  moreColumnsWithFrozenWithoutActions,
  evenMoreColumns,
};

export default { columnList, ADD_ROW_LAB_DATA, FILTER_COLUMNS, REQUEST_TYPE };
