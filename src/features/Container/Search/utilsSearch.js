/* eslint-disable import/prefer-default-export */
export const renderDateSectionUtilsFun = (data) => {
  if (data[0].value === '0') {
    return <div />;
  }
  return false;
};

export const renderDateTypeUtilsFun = (data) => {
  if (data[0].value === 'approval_date') {
    return <div />;
  }
  return false;
};
