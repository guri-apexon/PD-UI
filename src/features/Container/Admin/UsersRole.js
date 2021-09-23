import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import trim from "lodash/trim";
import cloneDeep from "lodash/cloneDeep";

import PlusIcon from "apollo-react-icons/Plus";

import Modal from "apollo-react/components/Modal";
import Grid from "apollo-react/components/Grid";
import TextField from "apollo-react/components/TextField";
import Button from "apollo-react/components/Button";
import Table from "apollo-react/components/Table";
import { compareStrings } from "apollo-react/components/Table";
import {
  setUserRole,
  roleValues,
  roleError,
  setUserRoleErr,
  modalToggle,
  setModalToggle,
} from "./adminSlice";

const errorValue = {
  role: { error: false, message: "" },
  description: { error: false, message: "" },
};

const columns = [
  {
    header: "User Role",
    accessor: "role",
    sortFunction: compareStrings,
  },
  {
    header: "Description",
    accessor: "description",
    sortFunction: compareStrings,
  },
];

const CustomButtonHeader = ({ setIsOpen }) => (
  <div>
    <Button
      size="small"
      variant="primary"
      icon={PlusIcon}
      onClick={() => setIsOpen(true)}
      style={{ marginRight: 8 }}
    >
      New Role
    </Button>
  </div>
);

const UsersRole = ({ initialRows }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(modalToggle);
  const formValue = useSelector(roleValues);
  const error = useSelector(roleError);
  const [formErrValue, setFormErrValue] = useState(errorValue);
  const setIsOpen = (value) => {
    dispatch(setModalToggle(value));
  };
  const handleSaveForm = () => {
    let err = cloneDeep(formErrValue);
    if (!formValue.role) {
      err.role.error = true;
      err.role.message = "Required";
    }
    if (!formValue.description) {
      err.description.error = true;
      err.description.message = "Required";
    }
    setFormErrValue(err);
    if (formValue.role && formValue.description) {
      dispatch({ type: "ADD_NEW_ROLE_SAGA", payload: formValue });
    }
    console.log(formValue);
  };
  const handleChange = (key, value) => {
    const data = cloneDeep(formValue);
    data[key] = trim(value);
    dispatch(setUserRole(data));
  };
  const onFieldBlur = (key, value) => {
    let err = cloneDeep(formErrValue);
    if (trim(value)) {
      err[key].error = false;
      err[key].message = "";
    } else {
      err[key].error = true;
      err[key].message = "Required";
    }
    setFormErrValue(err);
  };

  return (
    <div style={{ overflowX: "auto", paddingTop: 20 }}>
      <Table
        columns={columns}
        rows={initialRows.map((row) => ({
          ...row,
          key: row.id,
        }))}
        initialSortedColumn="role"
        initialSortOrder="asc"
        hidePagination
        CustomHeader={(props) => (
          <CustomButtonHeader setIsOpen={setIsOpen} {...props} />
        )}
      />
      <Modal
        variant="default"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setFormErrValue(errorValue);
          dispatch(setUserRole({}));
          dispatch(setUserRoleErr(""));
        }}
        title="Add New Role to PD"
        subtitle={error && <span style={{ color: "red" }}>{error}</span>}
        buttonProps={[{}, { label: "Create", onClick: handleSaveForm }]}
        id="new-role-modal"
        data-testid="new-role-modal"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="User Role"
              placeholder="Role"
              fullWidth
              required
              helperText={formErrValue.role.message}
              error={formErrValue.role.error}
              onChange={(e) => handleChange("role", e.target.value)}
              onBlur={(e) => onFieldBlur("role", e.target.value)}
              data-testid="user-role-texfield"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              placeholder="Description"
              fullWidth
              sizeAdjustable
              helperText={formErrValue.description.message}
              error={formErrValue.description.error}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={(e) => onFieldBlur("description", e.target.value)}
              data-testid="role-description-texfield"
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default UsersRole;
