import React, { useEffect, useState } from "react";
import "./compare.scss";

import Autocomplete from "apollo-react/components/Autocomplete";
import Grid from "apollo-react/components/Grid";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";
import Button from "apollo-react/components/Button";
import ArrowLeft from "apollo-react-icons/ArrowLeft";

import { useSelector, useDispatch } from "react-redux";
import { associateDocs } from "./protocolSlice.js";

import Sidebar from "./Sidebar";
import CompareCard from "./CompareCard";

const countries = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
];

const AmendmentCompare = () => {
  const dispatch = useDispatch();
  const associateData = useSelector(associateDocs);
  const [version1, setVersion1] = useState("");
  const [version2, setVersion2] = useState("");

  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (version1 && version2) {
      if (version1 === version2) {
        alert("can not comapare same version");
      } else {
        console.log(version1, version2);

        // const postBody = {
        //   docID: version1,
        //   docID: version2,
        // };
        // console.log()
      }
    } else {
      // alert("Please select both the fields")
    }
  }, [version1, version2]);

  const handleCompare = () => {
    const postBody = {
      docID: version1,
      docID2: version2,
    };

    dispatch({ type: "POST_COMPARE_PROTOCOL", payload: postBody });
  };

  console.log("....", associateData);
  return (
    <div className="amendment-compare">
      <Sidebar open={open} setOpen={setOpen} />
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
                {associateData &&
                  associateData.length > 0 &&
                  associateData.map((item, i) => (
                    <MenuItem value={item.id} key={i}>
                      {item.Protocol + " " + item.VersionNumber}
                    </MenuItem>
                  ))}

                {/* <MenuItem value="2">{"Item 2"}</MenuItem>
                <MenuItem value="3">{"Item 3"}</MenuItem> */}
              </Select>
            </div>
          </Grid>
          <Grid md={6}>
            <div
              className="version-dropdown"
              style={{ width: "90%", float: "right", marginRight: 10 }}
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
                {associateData &&
                  associateData.length > 0 &&
                  associateData.map((item, i) => (
                    <MenuItem value={item.id} key={i}>
                      {item.Protocol + " " + item.VersionNumber}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </Grid>
        </Grid>
        <Grid md={3} container>
          <div className="compare-button">
            <Button
              variant="primary"
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => handleCompare()}
            >
              Compare
            </Button>
          </div>
        </Grid>
        <Grid md={3} container>
          <div className="summary-button">
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
      <Grid container md={12}>
        <Grid md={6}>
          <CompareCard float="left" cardID="first-card" />
        </Grid>
        <Grid md={6}>
          <CompareCard float="right" cardID="second-card" />
        </Grid>
      </Grid>
    </div>
  );
};

export default AmendmentCompare;
