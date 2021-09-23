import React, { useState } from "react";
import trim from "lodash/trim";
import cloneDeep from "lodash/cloneDeep";
import { useSelector, useDispatch } from "react-redux";
import Modal from "apollo-react/components/Modal";
import Grid from "apollo-react/components/Grid";
import TextField from "apollo-react/components/TextField";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";
import {
  modalToggle,
  setNewUserValues,
  newUser,
  newUserError,
  setNewUserError,
} from "./adminSlice";

const options = ["normal", "QC1", "QC2", "admin"];
const userValue = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  country: null,
  userRole: null,
};
const errorValue = {
  firstName: { error: false, message: "" },
  lastName: { error: false, message: "" },
  email: { error: false, message: "" },
  country: { error: false, message: "" },
  userId: { error: false, message: "" },
  userRole: { error: false, message: "" },
};

function NewUser({ setIsOpen }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalToggle);
  const formValue = useSelector(newUser);
  const error = useSelector(newUserError);
  const [role, setRole] = useState("");
  //   const [formValue, setFormValue] = useState(intialValue);
  const [formErrValue, setFormErrValue] = useState(errorValue);

  const handleSaveForm = () => {
    let err = cloneDeep(formErrValue);
    if (!formValue.firstName) {
      err.firstName.error = true;
      err.firstName.message = "Required";
    }
    if (!formValue.lastName) {
      err.lastName.error = true;
      err.lastName.message = "Required";
    }
    if (!formValue.email) {
      err.email.error = true;
      err.email.message = "Required";
    }
    if (
      !/^(([a-zA-Z0-9])|([a-zA-Z0-9]+\.[A-Za-z]))+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        formValue.email
      )
    ) {
      err.email.error = true;
      err.email.message = "Enter valid email";
    }
    if (!formValue.country) {
      err.country.error = true;
      err.country.message = "Required";
    }
    if (!formValue.userId) {
      err.userId.error = true;
      err.userId.message = "Required";
    }
    if (!formValue.userRole) {
      err.userRole.error = true;
      err.userRole.message = "Required";
    }

    setFormErrValue(err);
    if (
      formValue.firstName &&
      formValue.lastName &&
      formValue.email &&
      formValue.country &&
      formValue.userId &&
      formValue.userRole
    ) {
      dispatch({ type: "ADD_NEW_USER_SAGA", payload: formValue });
    }
    console.log(formValue);
  };

  const handleChange = (key, value) => {
    const data = cloneDeep(formValue);
    data[key] = trim(value);
    dispatch(setNewUserValues(data));
  };
  const onFieldBlur = (key, value) => {
    let err = cloneDeep(formErrValue);
    if (
      key === "email" &&
      trim(value) &&
      !/^(([a-zA-Z0-9])|([a-zA-Z0-9]+\.[A-Za-z]))+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        trim(value)
      )
    ) {
      err.email.error = true;
      err.email.message = "Enter valid email";
    } else if (trim(value)) {
      err[key].error = false;
      err[key].message = "";
    } else {
      err[key].error = true;
      err[key].message = "Required";
    }
    setFormErrValue(err);
  };

  return (
    <Modal
      variant="default"
      open={isOpen}
      onClose={() => {
        const reset = {
          firstName: { error: false, message: "" },
          lastName: { error: false, message: "" },
          email: { error: false, message: "" },
          country: { error: false, message: "" },
          userId: { error: false, message: "" },
          userRole: { error: false, message: "" },
        };
        setIsOpen(false);
        dispatch(setNewUserValues(userValue));
        setFormErrValue(reset);
        setRole("");
        dispatch(setNewUserError(""));
      }}
      subtitle={error && <span style={{ color: "red" }}>{error}</span>}
      title="Add New Users to PD"
      buttonProps={[{}, { label: "Create", onClick: handleSaveForm }]}
      id="new-user-modal"
      data-testid="new-user-modal"
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            label="First Name"
            placeholder="First Name"
            type="text"
            fullWidth
            required
            helperText={formErrValue.firstName.message}
            error={formErrValue.firstName.error}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={(e) => onFieldBlur("firstName", e.target.value)}
            data-testid="first-name-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Last Name"
            placeholder="Last Name"
            type="text"
            fullWidth
            required
            helperText={formErrValue.lastName.message}
            error={formErrValue.lastName.error}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={(e) => onFieldBlur("lastName", e.target.value)}
            data-testid="last-name-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            required
            type="email"
            helperText={formErrValue.email.message}
            error={formErrValue.email.error}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={(e) => onFieldBlur("email", e.target.value)}
            data-testid="email-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Country"
            placeholder="Country"
            fullWidth
            type="text"
            required
            helperText={formErrValue.country.message}
            error={formErrValue.country.error}
            onChange={(e) => handleChange("country", e.target.value)}
            onBlur={(e) => onFieldBlur("country", e.target.value)}
            data-testid="Country-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="User ID"
            placeholder="qid/uid"
            fullWidth
            type="text"
            required
            helperText={formErrValue.userId.message}
            error={formErrValue.userId.error}
            onChange={(e) => handleChange("userId", e.target.value)}
            onBlur={(e) => onFieldBlur("userId", e.target.value)}
            data-testid="user-id-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Select
            label="User Role"
            helperText={`${formErrValue.userRole.message} You can select one option`}
            error={formErrValue.userRole.error}
            onBlur={(e) => onFieldBlur("userRole", e.target.value)}
            fullWidth
            canDeselect={true}
            placeholder="Select User Role"
            value={role}
            onChange={(e) => {
              handleChange("userRole", e.target.value);
              setRole(e.target.value);
            }}
            required
            data-testid="user-role-select"
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Modal>
  );
}

export default NewUser;
