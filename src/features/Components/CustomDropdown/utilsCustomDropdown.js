export const blurFun = ({
  blur,
  buttonRef,
  formValue,
  fieldName,
  fieldType,
  onChange,
  onBlur,
  value,
  setBlur,
}) => {
  if (blur === true) {
    if (
      buttonRef.current !== null &&
      formValue &&
      formValue.label !== buttonRef.current.innerText
    ) {
      onChange(fieldName, '', fieldType, { label: '' });
      onBlur(fieldName, '', fieldType);
    } else if (formValue && formValue.label !== value.label) {
      onBlur(fieldName, '', fieldType);
    } else {
      onBlur(fieldName, value.label, fieldType);
    }
  }
  setBlur(false);
};

export const getModifyString = (value) => {
  const regConstant = ['(', ')', '+', '[', ']', '*', '?', '|', '.', '$'];
  return value
    .split('')
    .map((val) => {
      if (regConstant.includes(val)) {
        return `\\${val}`;
      }
      return val;
    })
    .join('');
};

export const feildChangeFun = (substring, SetSubStringExist) => {
  if (substring.length === 0) {
    SetSubStringExist(true);
  } else {
    SetSubStringExist(false);
  }
};

export const targetValueFun = (
  e,
  onChange,
  fieldName,
  fieldType,
  tempvalue,
  setBlur,
  setList,
  source,
) => {
  if (e.target.value === '') {
    // setting onblur to true when text is cut,so that error should display as field required
    onChange(fieldName, e, fieldType, tempvalue);
    setBlur(true);
    setList(source);
  }
};
