export const tableOperations = {
  addRowAbove: 'ADD_ROW_ABOVE',
  addRowBelow: 'ADD_ROW_BELOW',
  addColumnRight: 'ADD_COLUMN_RIGHT',
  addColumnLeft: 'ADD_COLUMN_LEFT',
  deleteRow: 'DELETE_ROW',
  deleteColumn: 'DELETE_COLUMN',
  swapRow: 'SWAP_ROW',
  swapColumn: 'SWAP_COLUMN',
};
export const columnHoverData = [
  {
    text: 'Add Column to left',
    image: "<img src='./images/addcolumnLeft.svg' alt='' />",
    id: tableOperations.addColumnLeft,
  },
  {
    text: 'Add Column to Right',
    image: "<img src='./images/addColumnRight.svg' alt='' />",
    id: tableOperations.addColumnRight,
  },
  {
    text: 'Delete Column',
    image: "<img src='./images/delete.svg' alt='' />",
    id: tableOperations.deleteColumn,
  },
];

export const rowHoverData = [
  {
    text: 'Add row above',
    image: "<img src='./images/addRowAbove.svg' alt='' />",
    id: tableOperations.addRowAbove,
  },
  {
    text: 'Add row below',
    image: "<img src='./images/addRowBelow.svg' alt='' />",
    id: tableOperations.addRowBelow,
  },
  {
    text: 'Delete row',
    image: "<img src='./images/delete.svg' alt='' />",
    id: tableOperations.deleteRow,
  },
];
