const headerStyle = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'CCCCCCCC' },
  bgColor: { argb: 'CCCCCCCC' },
};

const topHeaderStyle = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'COCOCOCO' },
  bgColor: { argb: 'COCOCOCO' },
};
const topHeaderTextStyle = {
  name: 'Arial Black',
  color: { argb: 'FFFFFFFF' },
  family: 2,
  size: 14,
  italic: false,
  underline: true,
  bold: true,
};

const textColors = {
  primary: '33333333',
  deleted: 'ffff3300',
  updated: '111a1aff',
};

module.exports = {
  headerStyle,
  topHeaderStyle,
  topHeaderTextStyle,
  textColors,
};
