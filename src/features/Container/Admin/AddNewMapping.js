import { useState, memo } from "react";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import Modal from "apollo-react/components/Modal";
import TextField from "apollo-react/components/TextField";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";

const roleOptions = ["Primary", "Secondary"];
const followOptions = ["Yes", "No"];

function AddNewMapping() {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("");
  const [follow, setFollow] = useState("");

  const handleSaveForm = () => {
    console.log("click save");
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ marginRight: 10 }}
        onClick={() => setIsOpen(true)}
      >
        Map
      </Button>
      <Modal
        variant="default"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Map User to Protocol"
        // subtitle={}
        buttonProps={[{}, { label: "Add", onClick: handleSaveForm }]}
        id="new-user-modal"
        data-testid="new-user-modal"
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={6}>
            <TextField
              label="User Id"
              placeholder="Enter User Id"
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
              label="Protocol Number"
              placeholder="Enter Protocol Number"
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
            <Select
              label="Role"
              helperText="You can select one option"
              // size="small"
              fullWidth
              canDeselect={true}
              placeholder="Select User Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              // {...fieldStyles}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Select
              label="Following"
              helperText="You can select one option"
              // size="small"
              fullWidth
              canDeselect={true}
              // placeholder="Select User Role"
              value={follow}
              onChange={(e) => setFollow(e.target.value)}
              // {...fieldStyles}
            >
              {followOptions.map((option) => (
                <MenuItem key={option} value={option === "Yes" ? "1" : "0"}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              label="Project Id"
              placeholder=""
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
        </Grid>
      </Modal>
    </>
  );
}

export default memo(AddNewMapping);
