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

const records = [
  {
    id: 'Table 1',
    name: 'Laboratory Safety Variables',
    assName: 'Haematology',
    prName: 'B-Haemoglobin',
    assPrefName: 'Haematology',
    prPrefName: 'NA',
  },
  {
    id: 'Table 2',
    name: 'Laboratory Safety Variables',
    assName: 'Haematology',
    prName: 'B-Leukocyte',
    assPrefName: 'Haematology',
    prPrefName: 'NA',
  },
  {
    id: 'Table 3',
    name: 'Laboratory Safety Variables',
    assName: 'Haematology',
    prName: 'Neutrophils',
    assPrefName: 'Haematology',
    prPrefName: 'NA',
  },
  {
    id: 'Table 4',
    name: 'Laboratory Safety Variables',
    assName: 'Haematology',
    prName: 'Lymphocytes',
    assPrefName: 'Haematology',
    prPrefName: 'NA',
  },
  {
    id: 'Table 5',
    name: 'Laboratory Safety Variables',
    assName: 'Haematology',
    prName: 'U-Glucose',
    assPrefName: 'Haematology',
    prPrefName: 'NA',
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

export {
  moreColumns,
  moreColumnsWithFrozen,
  moreColumnsWithFrozenWithoutActions,
  evenMoreColumns,
};

export default { columnList, records };
