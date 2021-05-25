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
  const buttonRef = useRef(null);
  const [blur, setBlur] = useState(false);
  const [expand, setExpand] = useState(false);
  const [list, setList] = useState(source);
  const [subStringExist, SetSubStringExist] = useState(false);
  const [expandClass, setExpandClass] = useState("");
  const textInputRef = useRef(null);

  useEffect(() => {
    if (blur === true) {
      if (
        buttonRef.current !== null &&
        formValue &&
        formValue.label !== buttonRef.current.innerText
      ) {
        onChange(fieldName, "", fieldType, { label: "" });
        onBlur(fieldName, "", fieldType);
      } else {
        if (formValue && formValue.label !== value.label) {
          onBlur(fieldName, "", fieldType);
        } else {
          onBlur(fieldName, value.label, fieldType);
        }
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
    let str = getModifyString(e.target.value);
    let subStr = new RegExp(`^${str}$`, "i");
    // let subStr = new RegExp(`^${str}$`);
    const filteredList = customListTemp.filter((item) => {
      let reg = new RegExp(`^${str}[a-z0-9 ]*$`, "i");
      return item.label.toLowerCase().match(reg);
    });
    let substring = customListTemp.filter((item) => {
      // return item.label.match(subStr);
      return item.label.toLowerCase().match(subStr);
    });
    if (substring.length === 0) {
      SetSubStringExist(true);
    } else {
      SetSubStringExist(false);
    }
    let tempvalue = {
      label: e.target.value,
    };
    setValue(tempvalue);
    setList(filteredList);
    if (e.target.value === "") {
      // setting onblur to true when text is cut,so that error should display as field required
      onChange(fieldName, e, fieldType, tempvalue);
      setBlur(true);
      setList(source);
    }
  };
  const getModifyString = (value) => {
    let regConstant = ["(", ")", "+", "[", "]", "*", "?", "|", ".", "$"];
    let tempValue = value
      .split("")
      .map((val) => {
        if (regConstant.includes(val)) {
          return `\\${val}`;
        }
        return val;
      })
      .join("");
    return tempValue;
  };
  const onCustomClick = (id, event) => {
    setExpand(true);
    // event.target
    //   .closest(`.custom-dropdown-wrapper-${id}`)
    //   .classList.add("is-expanded", "focused");
    setExpandClass("is-expanded");
    document.addEventListener("click", handleOutsideClick, true);
  };

  const handleOutsideClick = (event) => {
    // if (
    //   event &&
    //   // event.target.closest(`custom-dropdown-parent-${id}`) === null
    // ) {
    //   if (
    //     document.getElementsByClassName("custom-dropdown-container").length > 0
    //   ) {
    //     // document
    //     //   .getElementsByClassName(`custom-dropdown-wrapper-${id}`)[0]
    //     //   .classList.remove("is-expanded", "focused");
    //     setExpandClass('');
    //     setExpand(false);
    //     document.removeEventListener("click", handleOutsideClick, true);
    //     setBlur(true);
    //   }
    // }
    if (
      event.target &&
      textInputRef &&
      textInputRef.current &&
      textInputRef.current.contains(event.target)
    ) {
      return;
    } else {
 setExpandClass('');
 setBlur(true);
    }
  };
  const onClickAdd = (e) => {
    let tempValue = {
      label: value.label,
      [insertField]: value.label,
    };
    onChange(fieldName, "", fieldType, tempValue);
    setExpandClass("");
  };
  const onListItemClick = (e, item) => {
    setValue(item);
    onChange(fieldName, e, fieldType, item);
    setExpandClass("");
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
          onChange={(e) => onTextFieldChange(id, e, "Textbox")}
          onClick={(e) => onCustomClick(id, e, "fieldType")}
        />
        <div className={`custom-dropdown-list ${error && "adjust-margin"}`} data-testid="custom-dropdown-list-customadd">
          {list && list.length > 0 && subStringExist && value.label && (
            <>
              <p className="custom-list-item">
                {value.label}
                <span className="float-right" onClick={(e) => onClickAdd(e)}>
                  Add
                </span>
              </p>
            </>
          )}
          {list && list.length > 0 ? (
            list.map((item, index) => (
              <p
                key={index}
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
};

export default CustomDropdown;
