import React from "react";
import "./compare.scss";

import Autocomplete from "apollo-react/components/Autocomplete";
import Grid from "apollo-react/components/Grid";

const countries = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
];

const AmendmentCompare = () => {
  return (
    <div className="amendment-compare">
      <Grid md={6} container>
        <Grid md={6}>
          <div style={{ width: "90%" }}>
            <Autocomplete
              label="Select First Version to Compare"
              // helperText="This is a note about the field"
              placeholder="Select…"
              source={countries}
              fullWidth
              singleSelect
            />
          </div>
        </Grid>
        <Grid md={6}>
          <div style={{ width: "90%",float:"right" }}>
            <Autocomplete
              label="Select First Version to Compare"
              // helperText="This is a note about the field"
              placeholder="Select…"
              source={countries}
              fullWidth
              singleSelect
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AmendmentCompare;
