import React, { useEffect, useState } from "react";
import "./compare.scss";

import Grid from "apollo-react/components/Grid";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";
import Button from "apollo-react/components/Button";

import { useSelector, useDispatch } from "react-redux";
import { associateDocs } from "./protocolSlice.js";

import Sidebar from "./Sidebar";
// import CompareCard from "./CompareCard";
import CompareCard from "./compareTable";

import { compareResult } from "./protocolSlice.js";
import Loader from "../../Components/Loader/Loader";
import ArrowLeft from "apollo-react-icons/ArrowLeft";

const AmendmentCompare = ({ prot11, prot22 }) => {
  const compare = useSelector(compareResult);
  const dispatch = useDispatch();
  const associateData = useSelector(associateDocs);
  const [version1, setVersion1] = useState("");
  const [prot1, setProt1] = useState({});
  const [version2, setVersion2] = useState("");
  const [prot2, setProt2] = useState({});

  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch({ type: "POST_COMPARE_PROTOCOL", payload: null });
  }, []);
  useEffect(() => {
    setVersion1(prot11);
    setVersion2(prot22);
    const postBody = {
      docID: prot11,
      docID2: prot22,
    };
    if (prot11 && prot22) {
      dispatch({ type: "POST_COMPARE_PROTOCOL", payload: postBody });
    }
  }, [prot11, prot22]);

  const handleCompare = () => {
    if (version1 && version2) {
      if (version1 === version2) {
        alert("can not comapare same version");
      } else {
        const postBody = {
          docID: version1,
          docID2: version2,
        };

        dispatch({ type: "POST_COMPARE_PROTOCOL", payload: postBody });
      }
    } else {
      alert("Please select both the fields");
    }
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
  const handleDownloadTOC = (data) => {
    debugger;
  };

  // const iqvdata = compare.iqvdata ? JSON.parse(compare.iqvdata) : "";
  const iqvdata = compare.iqvdata ? compare.iqvdata : "";
  return (
    <div className="amendment-compare">
      <Sidebar
        open={open}
        setOpen={setOpen}
        compare={compare}
        handleDownloadTOC={handleDownloadTOC}
      />
      {associateData && associateData.length > 1 ? (
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
                  data-testid="select-div1"
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
                  data-testid="select-div2"
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
                data-testid="compare-button"
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
      ) : (
        <div className="single-version">
          <p>This Protocol has only one version.</p>
          <p>So compare option is not available for this Protocol.</p>
        </div>
      )}
      {compare.error && (
        <div className="single-version">
          <p>{compare.message}</p>
        </div>
      )}
      {iqvdata && !compare.error && iqvdata.data.length > 0 && (
        <Grid container md={12}>
          <Grid md={12}>
            <CompareCard
              float="left"
              cardID="first-card"
              data={prot1}
              compare={compare}
            />
          </Grid>
          {/* <Grid md={6}>
            <CompareCard
              float="right"
              cardID="second-card"
              data={prot2}
              compare={compare}
            />
          </Grid> */}
        </Grid>
      )}
      {compare.called && compare.loading && (
        <div
          style={{
            height: 250,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AmendmentCompare;
