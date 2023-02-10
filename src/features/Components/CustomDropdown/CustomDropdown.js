/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import TextField from 'apollo-react/components/TextField';
import cloneDeep from 'lodash/cloneDeep';
import {
  blurFun,
  feildChangeFun,
} from './utilsCustomDropdown';
import './CustomDropdown.scss';

function CustomDropdown({
  label,
  placeholder,
  fullWidth,
  id,
  source,
  formValue,
  helperText,
  error,
  required,
  onBlur,
  onChange,
  fieldType,
  fieldName,
  insertField,
}) {
  const [value, setValue] = useState({
    label: '',
  });
  const buttonRef = useRef(null);
  const [blur, setBlur] = useState(false);
  const [list, setList] = useState(source);
  const [subStringExist, SetSubStringExist] = useState(false);
  const [expandClass, setExpandClass] = useState('');
  const textInputRef = useRef(null);

  useEffect(() => {
    blurFun(
      blur,
      buttonRef,
      formValue,
      fieldName,
      fieldType,
      onChange,
      onBlur,
      value,
      setBlur,
    );
    // eslint-disable-next-line
  }, [blur]);

  useEffect(() => {
    setList(source);
  }, [source]);

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

  const onTextFieldChange = (id, e, type) => {
    const customListTemp = cloneDeep(source);
    const str = getModifyString(e.target.value);
    const subStr = new RegExp(`^${str}$`, 'i');
    const filteredList = customListTemp.filter((item) => {
      const reg = new RegExp(`^${str}[a-z0-9 ]*$`, 'i');
      return item.label.toLowerCase().match(reg);
    });
    const substring = customListTemp.filter((item) => {
      return item.label.toLowerCase().match(subStr);
    });
    feildChangeFun(substring, SetSubStringExist);
    const tempvalue = {
      label: e.target.value,
    };
    setValue(tempvalue);
    setList(filteredList);
    targetValueFun(
      e,
      onChange,
      fieldName,
      fieldType,
      tempvalue,
      setBlur,
      setList,
      source,
    );
  };

  const handleOutsideClick = (event) => {
    if (
      event.target &&
      textInputRef &&
      textInputRef.current &&
      textInputRef.current.contains(event.target)
    ) {
    } else {
      setExpandClass('');
      setBlur(true);
    }
  };

  const onCustomClick = () => {
    setExpandClass('is-expanded');
    document.addEventListener('click', handleOutsideClick, true);
  };

  const onClickAdd = (e) => {
    const tempValue = {
      label: value.label,
      [insertField]: value.label,
    };
    onChange(fieldName, '', fieldType, tempValue);
    setExpandClass('');
  };
  const onListItemClick = (e, item) => {
    setValue(item);
    onChange(fieldName, e, fieldType, item);
    setExpandClass('');
  };
  return (
    <div
      className={`custom-dropdown-parent custom-dropdown-parent-${id}`}
      ref={textInputRef}
      data-testid="custom-dropdown-test-id"
    >
      <div
        className={`custom-dropdown-wrapper-${id} custom-dropdown-container ${expandClass}`}
      >
        <TextField
          label={label}
          placeholder={placeholder}
          fullWidth={fullWidth}
          value={value.label ? value.label : formValue.label}
          helperText={helperText}
          error={error}
          required={required}
          onChange={(e) => onTextFieldChange(id, e, 'Textbox')}
          onClick={(e) => onCustomClick()}
        />
        <div
          className={`custom-dropdown-list ${error && 'adjust-margin'}`}
          data-testid="custom-dropdown-list-customadd"
        >
          {list && list.length > 0 && subStringExist && value.label && (
            <p className="custom-list-item">
              {value.label}
              <span className="float-right" onClick={(e) => onClickAdd(e)}>
                Add
              </span>
            </p>
          )}
          {list && list.length > 0 ? (
            list.map((item, index) => (
              <p
                key={item}
                className="custom-list-item"
                onClick={(e) => onListItemClick(e, item)}
                data-testid={`custom-dropdown-list-exist-${index}`}
              >
                {item.label}
              </p>
            ))
          ) : (
            <>
              <div>
                <p className="float-left" title={value.label} ref={buttonRef}>
                  {value.label}
                </p>
                <p className="float-right" onClick={(e) => onClickAdd(e)}>
                  Add
                </p>
              </div>
              <p className="noresult-para">
                No results found for "{value.label}"
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomDropdown;
