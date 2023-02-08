export const tableOperations = {
  addRowAbove: 'ADD_ROW_ABOVE',
  addRowBelow: 'ADD_ROW_BELOW',
  addColumnRight: 'ADD_COLUMN_RIGHT',
  addColumnLeft: 'ADD_COLUMN_LEFT',
  deleteRow: 'DELETE_ROW',
  deleteColumn: 'DELETE_COLUMN',
};
export const columnHoverData = [
  {
    text: 'Add Column to left',
    image: 'svg',
    id: tableOperations.addColumnLeft,
  },
  {
    text: 'Add Column to Right',
    image: 'svg',
    id: tableOperations.addColumnRight,
  },
  {
    text: 'Delete Column',
    image: 'svg',
    id: tableOperations.deleteColumn,
  },
];

export const rowHoverData = [
  {
    text: 'Add row above',
    image: 'svg',
    id: tableOperations.addRowAbove,
  },
  {
    text: 'Add row below',
    image: 'svg',
    id: tableOperations.addRowBelow,
  },
  {
    text: 'Delete row',
    image: 'svg',
    id: tableOperations.deleteRow,
  },
];
