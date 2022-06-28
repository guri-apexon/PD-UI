/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.scss";

import Grid from "apollo-react/components/Grid";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";
import Button from "apollo-react/components/Button";

import { useSelector, useDispatch } from "react-redux";
import { relatedProtocol } from "../../store/slice";
import Sidebar from "./Sidebar";
import Loader from "../../../../Components/Loader/Loader";
import CompareCard from "./CompareCard";
import compareJSON from "./compare.json";
import { ActionTypes } from "../../store/ActionTypes";
import ArrowLeft from "apollo-react-icons/ArrowLeft";

const AmendmentCompare = ({ id, name }) => {
  const compare = compareJSON;
  const dispatch = useDispatch();
  const associateData = useSelector(relatedProtocol);
  const [version1, setVersion1] = useState("");
  // const [prot1, setProt1] = useState({});
  const [version2, setVersion2] = useState("");
  // const [prot2, setProt2] = useState({});
  useEffect(() => {
    if (id && name) {
      dispatch({ type: ActionTypes.GET_PROTOCOL_OVERVIEW, payload: id });
      dispatch({ type: ActionTypes.GET_RELATED_PROTOCOL, payload: name });
    }
  }, [dispatch, id, name]);
  const [open, setOpen] = useState(false);

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
  /* istanbul ignore next */
  const handleSelect = (select, id) => {
    if (select === 1) {
      // let obj1 = associateData.find((item) => item.id === id);
      // setProt1(obj1);
      setVersion1(id);
    } else {
      // let obj2 = associateData.find((item) => item.id === id);
      // setProt2(obj2);
      setVersion2(id);
    }
  };
  // const handleDownloadTOC = (data) => {
  //   axios({
  //     url: "http://localhost:4000/create-excel",
  //     method: "POST",
  //     responseType: "blob", // Important
  //     data: compare,
  //   }).then((response) => {
  //     FileDownload(response.data, `${compare.protocolNumber}.xlsx`);
  //   });
  // };

  // const iqvdata = compare.iqvdata ? JSON.parse(compare.iqvdata) : "";
  const iqvdata = compare.iqvdata ? compare.iqvdata : "";
  return (
    <div className="amendment-compare">
      {iqvdata && (
        <Sidebar
          open={open}
          setOpen={setOpen}
          compare={compare}
          // handleDownloadTOC={handleDownloadTOC}
        />
      )}
      {associateData && associateData.length > 1 ? (
        <Grid container>
          <Grid item md={3}>
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
                    <MenuItem
                      value={item.id}
                      key={i}
                      data-testid={"compare-option-1" + i}
                    >
                      {item.protocol + " (" + item.versionNumber + ")"}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </Grid>
          <Grid item md={3}>
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
                    <MenuItem
                      value={item.id}
                      key={i}
                      data-testid={"compare-option-2" + i}
                    >
                      {item.protocol + " (" + item.versionNumber + ")"}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </Grid>

          <Grid md={3} item>
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
          {iqvdata && (
            <Grid md={3} item>
              <div className="summary-button" data-testid="summary-button-div">
                <Button
                  variant="secondary"
                  icon={<ArrowLeft />}
                  size="small"
                  style={{ marginRight: 10 }}
                  onClick={() => setOpen(!open)}
                  data-testid="summary-button"
                >
                  Summary
                </Button>
              </div>
            </Grid>
          )}
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
        <Grid container>
          <Grid md={6} item>
            <CompareCard
              float="left"
              cardID="first-card"
              compareJSON={compare}
            />
          </Grid>
          <Grid md={6}>
            <CompareCard
              float="right"
              cardID="second-card"
              compareJSON={compare}
            />
          </Grid>
        </Grid>
      )}
      {compare.called && compare.loading && (
        <div
          data-testid="loader"
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
