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
// import CompareCard from "./CompareCard";
import CompareCard from "./CompareCardNew";

import { compareResult } from "./protocolSlice.js";

const countries = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
];

const AmendmentCompare = () => {
  const compare = useSelector(compareResult);
  const dispatch = useDispatch();
  const associateData = useSelector(associateDocs);
  const [version1, setVersion1] = useState("");
  const [prot1, setProt1] = useState({});
  const [version2, setVersion2] = useState("");
  const [prot2, setProt2] = useState({});

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
        // dispatch({ type: "POST_COMPARE_PROTOCOL", payload: postBody });
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

  const handleSelect = (select, id) => {
    if (select === 1) {
      let obj1 = associateData.find((item) => item.id === id);
      setProt1(obj1);
      setVersion1(id);
    } else {
      let obj2 = associateData.find((item) => item.id === id);
      setProt2(obj2);
      setVersion2(id);
    }
  };

  console.log("....", compare);
  return (
    <div className="amendment-compare">
      <Sidebar open={open} setOpen={setOpen} />
      <Grid md={12} container>
        <Grid md={6} container>
          <Grid md={6}>
            <div className="version-dropdown" style={{ width: "90%" }}>
              <Select
                label="Select First Version to Compare"
                value={version1}
                onChange={(e) => {
                  handleSelect(1, e.target.value);
                }}
                placeholder="Select item..."
                fullWidth
              >
                {associateData &&
                  associateData.length > 0 &&
                  associateData.map((item, i) => (
                    <MenuItem value={item.id} key={i}>
                      {item.protocol + " (" + item.versionNumber + ")"}
                    </MenuItem>
                  ))}
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
                value={version2}
                onChange={(e) => {
                  handleSelect(2, e.target.value);
                }}
                placeholder="Select item..."
                fullWidth
              >
                {associateData &&
                  associateData.length > 0 &&
                  associateData.map((item, i) => (
                    <MenuItem value={item.id} key={i}>
                      {item.protocol + " (" + item.versionNumber + ")"}
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
          {/* <div className="summary-button">
            <Button
              variant="secondary"
              icon={<ArrowLeft color="blue" />}
              size="small"
              style={{ marginRight: 10 }}
              onClick={() => setOpen(!open)}
            >
              Summary
            </Button>
          </div> */}
        </Grid>
      </Grid>
      {compare.iqvdata.data && compare.iqvdata.data.length > 0 && (
        <Grid container md={12}>
          <Grid md={6}>
            <CompareCard float="left" cardID="first-card" data={prot1} compare={compare}/>
          </Grid>
          <Grid md={6}>
            <CompareCard float="right" cardID="second-card" data={prot2} compare={compare}/>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AmendmentCompare;
