import React, { useState } from "react";
import Modal from "apollo-react/components/Modal";
import Grid from "apollo-react/components/Grid";
import TextField from "apollo-react/components/TextField";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";

const handleSaveForm = () => {
  console.log("click save");
};
const options = ["normal", "QC1", "QC2", "admin"];

function NewUser({ isOpen, setIsOpen }) {
  const [role, setRole] = useState("");
  return (
    <Modal
      variant="default"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add New Users to PD"
      // subtitle={}
      buttonProps={[{}, { label: "Create", onClick: handleSaveForm }]}
      id="new-user-modal"
      data-testid="new-user-modal"
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <TextField
            label="First Name"
            placeholder="First Name"
            fullWidth
            // value={}
            // helperText={formErrorValues.protocolNumber.errorMessage}
            // error={formErrorValues.protocolNumber.error}
            // required={formErrorValues.protocolNumber.isRequired}
            // onChange={(e) =>
            //   onTextFieldChange("protocolNumber", e, "Textbox")
            // }
            // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
            data-testid="first-name-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Last Name"
            placeholder="Last Name"
            fullWidth
            // value={}
            // helperText={formErrorValues.protocolNumber.errorMessage}
            // error={formErrorValues.protocolNumber.error}
            // required={formErrorValues.protocolNumber.isRequired}
            // onChange={(e) =>
            //   onTextFieldChange("protocolNumber", e, "Textbox")
            // }
            // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
            data-testid="last-name-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Email"
            placeholder="Email"
            fullWidth
            // value={}
            // helperText={formErrorValues.protocolNumber.errorMessage}
            // error={formErrorValues.protocolNumber.error}
            // required={formErrorValues.protocolNumber.isRequired}
            // onChange={(e) =>
            //   onTextFieldChange("protocolNumber", e, "Textbox")
            // }
            // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
            data-testid="email-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="Country"
            placeholder="Country"
            fullWidth
            // value={}
            // helperText={formErrorValues.protocolNumber.errorMessage}
            // error={formErrorValues.protocolNumber.error}
            // required={formErrorValues.protocolNumber.isRequired}
            // onChange={(e) =>
            //   onTextFieldChange("protocolNumber", e, "Textbox")
            // }
            // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
            data-testid="Country-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            label="User ID"
            placeholder="qid/uid"
            fullWidth
            // value={}
            // helperText={formErrorValues.protocolNumber.errorMessage}
            // error={formErrorValues.protocolNumber.error}
            // required={formErrorValues.protocolNumber.isRequired}
            // onChange={(e) =>
            //   onTextFieldChange("protocolNumber", e, "Textbox")
            // }
            // onBlur={(e) => onFieldBlur("protocolNumber", e, "Textbox")}
            data-testid="user-id-texfield"
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <Select
            label="User Role"
            helperText="You can select one option"
            // size="small"
            fullWidth
            canDeselect={true}
            placeholder="Select User Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            // {...fieldStyles}
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
