import React, { useEffect, useState } from "react";
import "./compare.scss";

import Autocomplete from "apollo-react/components/Autocomplete";
import Grid from "apollo-react/components/Grid";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";
import Button from "apollo-react/components/Button";
import ArrowLeft from "apollo-react-icons/ArrowLeft";


import Sidebar from "./Sidebar";


const countries = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
];

const AmendmentCompare = () => {
  const [version1, setVersion1] = useState("");
  const [version2, setVersion2] = useState("");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (version1 && version2 && version1 === version2) {
      alert("can not comapare same version");
    }
  }, [version1, version2]);
  return (
    <div className="amendment-compare">
      <Sidebar open={open} setOpen={setOpen}/>
      <Grid md={12} container>
        <Grid md={6} container>
          <Grid md={6}>
            <div className="version-dropdown" style={{ width: "90%" }}>
              <Select
                label="Select First Version to Compare"
                // helperText="You can select one option"
                value={version1}
                onChange={(e) => {
                  setVersion1(e.target.value);
                }}
                placeholder="Select item..."
                fullWidth
              >
                <MenuItem value="1">{"Item 1"}</MenuItem>
                <MenuItem value="2">{"Item 2"}</MenuItem>
                <MenuItem value="3">{"Item 3"}</MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid md={6}>
            <div
              className="version-dropdown"
              style={{ width: "90%", float: "right" }}
            >
              <Select
                label="Select Second Version to Compare"
                // helperText="You can select one option"
                value={version2}
                onChange={(e) => {
                  setVersion2(e.target.value);
                }}
                placeholder="Select item..."
                fullWidth
              >
                <MenuItem value="1">{"Item 1"}</MenuItem>
                <MenuItem value="2">{"Item 2"}</MenuItem>
                <MenuItem value="3">{"Item 3"}</MenuItem>
              </Select>
            </div>
          </Grid>
        </Grid>
        <Grid md={6} container>
          <div className="summary-button" >
            <Button
              variant="secondary"
              icon={<ArrowLeft color="blue" />}
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => setOpen(!open)}
            >
              Summary
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AmendmentCompare;
