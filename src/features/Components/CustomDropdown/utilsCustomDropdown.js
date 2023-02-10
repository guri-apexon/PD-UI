export const feildChangeFun = (substring, SetSubStringExist) => {
  if (substring.length === 0) {
    SetSubStringExist(true);
  } else {
    SetSubStringExist(false);
  }
};

export const targetValueFun = ({
  e,
  onChange,
  fieldName,
  fieldType,
  tempvalue,
  setBlur,
  setList,
  source,
}) => {
  if (e.target.value === '') {
    // setting onblur to true when text is cut,so that error should display as field required
    onChange(fieldName, e, fieldType, tempvalue);
    setBlur(true);
    setList(source);
  }
};
