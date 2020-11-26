import React, { useState, useRef } from "react";
import Button from "apollo-react/components/Button";
import TextField from "apollo-react/components/TextField";
import Modal from "apollo-react/components/Modal";
import Grid from "apollo-react/components/Grid";
// import Paper from "apollo-react/components/Paper";
// import { shadowLevel1 } from "apollo-react/shadows";
import { neutral3 } from "apollo-react/colors";
import Autocomplete from "apollo-react/components/Autocomplete";
import AutocompleteV2 from "apollo-react/components/AutocompleteV2";

const AddProtocol = ({ state, handleClose, handleOpen, handleSave }) => {
    const styles = {
      padding: 16,
      textAlign: "center",
      boxShadow: shadowLevel1,
      border: `1px solid ${neutral3}`,
    };

  const countries = [
    { label: "Afghanistan", id: 122, value: "AFG" },
    { label: "Aland Islands" },
    { label: "Albania" },
    { label: "Algeria" },
    { label: "American Samoa" },
    { label: "Andorra" },
    { label: "Angola" },
    { label: "Anguilla" },
    { label: "Antarctica" },
    { label: "Antigua and Barbuda" },
    { label: "Argentina" },
    { label: "Armenia" },
    { label: "Aruba" },
    { label: "Australia" },
    { label: "Austria" },
    { label: "Azerbaijan" },
    { label: "Bahamas" },
    { label: "Bahrain" },
    { label: "Bangladesh" },
    { label: "Barbados" },
    { label: "Belarus" },
    { label: "Belgium" },
    { label: "Belize" },
    { label: "Benin" },
    { label: "Bermuda" },
    { label: "Bhutan" },
    { label: "Bolivia, Plurinational State of" },
    { label: "Bonaire, Sint Eustatius and Saba" },
    { label: "Bosnia and Herzegovina" },
    { label: "Botswana" },
    { label: "Bouvet Island" },
    { label: "Brazil" },
    { label: "British Indian Ocean Territory" },
    { label: "Brunei Darussalam" },
  ];
  const textInput = useRef(null);
  const [selectedCountries, setSelectedCountries] = useState("");
  const [value2, setValue2] = React.useState(countries[3]);
  const [inputValue2, setInputValue2] = React.useState(countries[3].label);
  const [value1, setValue1] = React.useState([countries[3].label]);
  console.log("value1, value2 :", value1, value2, selectedCountries);
  const handleCountriesSelected = (selectedCountries, value) => {
    console.log("selectedCountries :", selectedCountries, value);
    setSelectedCountries(selectedCountries);
  };

  const handleOnTextChange = (value) => {
    console.log("value :", value.target.value);
  };

  return (
    <div className="add-protocol" ref={textInput}>
      <Button
        // className={classes.button}
        // variant="secondary"
        variant="primary"
        onClick={() => handleOpen("custom")}
        // icon={PencilIcon}
      >
        {"Add Protocol to Library"}
      </Button>
      <Modal
        open={state.custom}
        variant="default"
        onClose={() => handleClose("custom")}
        title="Add Protocol to Library"
        buttonProps={[{}, { label: "Save", onClick: handleSave }]}
        // className={classes.modal}
        id="add-protocol-modal"
      >
        <Grid container spacing={2}>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Protocol Number"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Amendment"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              value="Aned"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Project ID or Opportunity Number"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Version Number"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              // value="Aned"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Sponsor"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Document Status"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              // value="Aned"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Indication"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={5} sm={5}>
            <TextField
              label="Molecule / Device"
              placeholder="Optional hint Text"
              // helperText="This is a note about the field"
              // value="Aned"
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
          {/*  */}
        </Grid>

        <div style={{ maxWidth: 400 }}>
          <Autocomplete
            label="Label"
            helperText="This is a note about the field"
            placeholder="Optional hint text…"
            source={countries}
            fullWidth
            singleSelect
            onChange={handleCountriesSelected}
            onTextChange={handleOnTextChange}
            //value="ss"
          />
          <AutocompleteV2
            label="LV2"
            placeholder="Optional hint text…"
            helperText="Optional help text"
            source={countries}
            fullWidth
            value={value2}
            inputValue={inputValue2}
            onChange={(event, newValue) => {
              console.log("onChange v2", newValue);
              setValue2(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue2(newInputValue);
              console.log("onInputChange v2", newInputValue);
            }}
            // defaultValue={['sss']}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddProtocol;
