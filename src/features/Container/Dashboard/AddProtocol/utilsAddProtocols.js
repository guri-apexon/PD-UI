/* eslint-disable import/prefer-default-export */
export const formValuesUtilsFun = (formValues, emptyAutoObj) => {
  if (formValues.sponsor) {
    return formValues.sponsor;
  }
  return emptyAutoObj;
};

export const formValuesUtilsFunction = (formValues, emptyAutoObj) => {
  if (formValues.indication) {
    return formValues.indication;
  }
  return emptyAutoObj;
};
