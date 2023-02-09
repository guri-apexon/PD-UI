export const blurFun = (
  blur,
  buttonRef,
  formValue,
  fieldName,
  fieldType,
  onChange,
  onBlur,
  value,
  setBlur,
) => {
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
export const abc = () => {
  console.log('abc');
};
