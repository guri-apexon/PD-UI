const TYPES = ['string', 'integer'];

const COLUMN_KEYS = ['note', 'confidence'];
const DROPDOWN_LIST = [
  {
    name: 'String',
    value: 'string',
  },
  {
    name: 'Number',
    value: 'integer',
  },
  {
    name: 'Boolean',
    value: 'boolean',
  },
  {
    name: 'Date',
    value: 'date',
  },
];

const BOOLEAN_VALUES = ['true', 'false'];
export default { TYPES, DROPDOWN_LIST, COLUMN_KEYS, BOOLEAN_VALUES };
