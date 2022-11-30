const compareColorCode = {
  noChange: 0,
  deleted: 1,
  added: 3,
  edited: 2,
};

const codeMeanings = {
  0: 'No Change',
  1: 'Deleted',
  2: 'Updated',
  3: 'Inserted',
};

const colunmHeder = [
  { header: 'Protocol 1', key: '1', width: 70 },
  { header: '', key: '2', width: 10 },
  { header: 'Protocol 2', key: '3', width: 70 },
];

const textType = {
  text: 'text',
  header: 'header',
  table: 'table',
};
module.exports = {
  compareColorCode,
  codeMeanings,
  colunmHeder,
  textType,
};
