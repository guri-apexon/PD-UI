import React, { useState } from "react";
import PlusIcon from "apollo-react-icons/Plus";

import Modal from "apollo-react/components/Modal";
import Grid from "apollo-react/components/Grid";
import TextField from "apollo-react/components/TextField";
import Button from "apollo-react/components/Button";
import Table from "apollo-react/components/Table";
import { compareStrings } from "apollo-react/components/Table";

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

const handleSaveForm = () => {
  console.log("click save");
};

const UsersRole = ({ initialRows }) => {
  const [isOpen, setIsOpen] = useState(false);

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
        onClose={() => setIsOpen(false)}
        title="Add New Role to PD"
        // subtitle={}
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
              // value={}
              // helperText={formErrorValues.protocolNumber.errorMessage}
              // error={formErrorValues.protocolNumber.error}
              // required={formErrorValues.protocolNumber.isRequired}
              // onChange={(e) =>
              //   onTextFieldChange("protocolNumber", e, "Textbox")
              // }
              // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
              data-testid="user-role-texfield"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              placeholder="Description"
              fullWidth
              sizeAdjustable
              // value={}
              // helperText={formErrorValues.protocolNumber.errorMessage}
              // error={formErrorValues.protocolNumber.error}
              // required={formErrorValues.protocolNumber.isRequired}
              // onChange={(e) =>
              //   onTextFieldChange("protocolNumber", e, "Textbox")
              // }
              // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
              data-testid="role-description-texfield"
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default UsersRole;
