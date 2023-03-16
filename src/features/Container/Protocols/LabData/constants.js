const columnList = [
  {
    header: 'Table Index',
    accessor: 'id',
  },
  {
    header: 'Table Name',
    accessor: 'name',
  },
  {
    header: 'Assessment Name (From Document)',
    accessor: 'assName',
  },
  {
    header: 'Procedure Name (From Document)',
    accessor: 'prName',
  },
  {
    header: 'Assessment Preferred Name',
    accessor: 'assPrefName',
  },
  {
    header: 'Procedure Preferred Name',
    accessor: 'prPrefName',
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
export default { columnList, records };
