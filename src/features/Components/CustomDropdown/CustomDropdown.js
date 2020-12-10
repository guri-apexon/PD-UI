import React, { useState, useEffect, useRef } from "react";
import TextField from "apollo-react/components/TextField";
import _ from "lodash";
import "./CustomDropdown.scss";
const CustomDropdown = ({
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
}) => {
  const [value, setValue] = useState({
    label: "",
  });
  const buttonRef = useRef(null)
  const [blur, setBlur] = useState(false);
  const [expand, setExpand] = useState(false);
  const [list, setList] = useState(source);


  useEffect(() => {
      if(blur === true){
        if (buttonRef.current!== null && formValue && formValue.label !== buttonRef.current.innerText) {
            onChange(fieldName, "", fieldType, { label: "" });
            onBlur(fieldName, "", fieldType);
          } else {
            onBlur(fieldName, value.label, fieldType);
          }
        // if (!list.length > 0 && formValue.label !== value.label) {
        //   onChange(fieldName, "", fieldType, { label: "" });
        //   onBlur(fieldName, "", fieldType);
        //   let value = {
        //     label: "",
        //   };
        //   setValue(value);
        //   setList(source);
        // } else {
        //   onBlur(fieldName, value.label, fieldType);
        // }
        // onBlur(fieldName, value.label, fieldType);
      }
    setBlur(false);
  }, [blur]);


  const onTextFieldChange = (id, e, type) => {
    let customListTemp = _.cloneDeep(source);
    const filteredList = customListTemp.filter((item) => {
      let reg = new RegExp(`^${e.target.value}[a-z0-9 ]*$`, "i");
      return item.label.toLowerCase().match(reg);
    });
    let tempvalue = {
      label: e.target.value,
    };
    setValue(tempvalue);
    setList(filteredList);
    if(e.target.value === "") // setting onblur to true when text is cut,so that error should display as field required
    setBlur(true); 
  };
  const onCustomClick = (id, event) => {
    setExpand(true);
    event.target
      .closest(`.custom-dropdown-wrapper-${id}`)
      .classList.add("is-expanded", "focused");
    document.addEventListener("click", handleOutsideClick, true);
  };
 
  const handleOutsideClick = (event) => {
    if (
      event &&
      event.target.closest(`custom-dropdown-parent-${id}`) === null
    ) {
      if (
        document.getElementsByClassName("custom-dropdown-container").length > 0
      ) {
        document
          .getElementsByClassName(`custom-dropdown-wrapper-${id}`)[0]
          .classList.remove("is-expanded", "focused");
        setExpand(false);
        document.removeEventListener("click", handleOutsideClick, true);
        setBlur(true);
      }
    }
  };
  const onClickAdd = (e) => {
    let tempValue = {
      label: value.label,
      [insertField]: value.label,
    };
    onChange(fieldName, "", fieldType, tempValue);
  };
  const onListItemClick = (e, item) => {
    setValue(item);
    onChange(fieldName, e, fieldType, item);
  };
  return (
    <div className={`custom-dropdown-parent custom-dropdown-parent-${id}`}>
      <div
        className={`custom-dropdown-wrapper-${id} custom-dropdown-container`}
      >
        <TextField
          label={label}
          placeholder={placeholder}
          fullWidth={fullWidth}
          value={value.label}
          helperText={helperText}
          error={error}
          required={required}
          onChange={(e) => onTextFieldChange(id, e, "Textbox")}
          onClick={(e) => onCustomClick(id, e, "fieldType")}
        />
        <div className={`custom-dropdown-list ${error && "adjust-margin"}`}>
          {list && list.length > 0 ? (
            list.map((item) => (
              <p
                className="custom-list-item"
                onClick={(e) => onListItemClick(e, item)}
              >
                {item.label}
              </p>
            ))
          ) : (
            <>
              <div>
                <p className="float-left" title={value.label} ref={buttonRef}>{value.label}</p>
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
};

export default CustomDropdown;
