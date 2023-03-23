import {
  compareNumbers,
  numberSearchFilter,
  compareStrings,
  createStringSearchFilter,
} from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField';

function TextFieldFilter({ accessor, filters, updateFilterValue }) {
  return (
    <TextField
      value={filters[accessor]}
      name={accessor}
      onChange={updateFilterValue}
      fullWidth
      margin="none"
      size="small"
    />
  );
}

const columnList = [
  {
    header: 'Table Index',
    accessor: 'id',
    sortFunction: compareNumbers,
    filterFunction: numberSearchFilter('id'),
  },
  {
    header: 'Table Name',
    accessor: 'name',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('name'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Assessment Name (From Document)',
    accessor: 'assName',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('assName'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Procedure Name (From Document)',
    accessor: 'prName',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('prName'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Assessment Preferred Name',
    accessor: 'assPrefName',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('assPrefName'),
    filterComponent: TextFieldFilter,
  },
  {
    header: 'Procedure Preferred Name',
    accessor: 'prPrefName',
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter('prPrefName'),
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

TextFieldFilter.propTypes = {
  accessor: PropTypes.isRequired,
  filters: PropTypes.isRequired,
  updateFilterValue: PropTypes.isRequired,
};

export {
  moreColumns,
  moreColumnsWithFrozen,
  moreColumnsWithFrozenWithoutActions,
  evenMoreColumns,
};

export default { columnList, records };
