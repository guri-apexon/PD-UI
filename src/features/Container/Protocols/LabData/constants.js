import {
  compareNumbers,
  numberSearchFilter,
  compareStrings,
  createStringSearchFilter,
} from 'apollo-react/components/Table';
import TextFieldFilter from './utilFunction';

const columnList = [
  {
    header: 'Table Index',
    accessor: 'table_link_text',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('table_link_text'),
  },
  {
    header: 'Table Name',
    accessor: 'table_link_text',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('table_link_text'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Assessment Name (From Document)',
    accessor: 'procedure_panel_text',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('procedure_panel_text'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Procedure Name (From Document)',
    accessor: 'parameter_text',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('parameter_text'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Assessment Preferred Name',
    accessor: 'assessment',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('assessment'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Procedure Preferred Name',
    accessor: 'pname',
    sortFunction: compareStrings,
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
};

export {
  moreColumns,
  moreColumnsWithFrozen,
  moreColumnsWithFrozenWithoutActions,
  evenMoreColumns,
};

export default { columnList, ADD_ROW_LAB_DATA };
