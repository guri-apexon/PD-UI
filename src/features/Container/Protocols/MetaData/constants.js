const TYPES = ['string', 'integer', 'array', 'float'];

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
  {
    name: 'Array',
    value: 'array',
  },
  {
    name: 'Decimal',
    value: 'float',
  },
];
const METADATA_ADD_LIST = [
  { label: 'Add new section' },
  { label: 'Add existing section' },
];
const BOOLEAN_VALUES = ['true', 'false'];
export default {
  TYPES,
  DROPDOWN_LIST,
  COLUMN_KEYS,
  METADATA_ADD_LIST,
  BOOLEAN_VALUES,
};
