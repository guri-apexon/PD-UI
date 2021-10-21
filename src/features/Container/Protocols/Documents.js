/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";
import Button from "apollo-react/components/Button";
import { toast } from "react-toastify";
import { httpCall, BASE_URL_8000 } from "../../../utils/api";
import Loader from "apollo-react/components/Loader";
import FileDownload from "js-file-download";
import cloneDeep from "lodash/cloneDeep";
import { userId } from "../../../store/userDetails";

const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const userId1 = useSelector(userId);
  const associateDocuments = useSelector(associateDocs);
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [loader, setLoader] = useState(false);
  const [summaryData, setSummaryData] = useState({});
  const [userName, setUserName] = useState("");
  // const [completed, setCompleted] = useState(0);

  const getUserName = async (userID) => {
    const config = {
      url: `${BASE_URL_8000}/api/user/read_all_users?userId=${userID}`,
      method: "GET",
    };
    const userDetailResp = await httpCall(config);
    console.log(userDetailResp);
    if (userDetailResp.success) {
      const userName = `${userDetailResp.data.first_name} ${userDetailResp.data.last_name}`;
      setUserName(userName);
    } else {
      setUserName("");
    }
  };
  useEffect(() => {
    let newObj = cloneDeep(summary.data);
    newObj.userName = userName;
    setSummaryData(newObj);
  }, [userName]);
  useEffect(() => {
    if (summary.success && summary.data.userId) {
      if (isNaN(parseInt(summary.data.userId))) {
        let newObj = cloneDeep(summary.data);
        newObj.userName = "-";
        setSummaryData(newObj);
      } else {
        getUserName(summary.data.userId);
      }
    }
  }, [summary]);

  const setProtocolToDownload = (id) => {
    console.log(id);
    if (protocolSelected.length === 0) {
      setProtocolSelected([id]);
    } else if (protocolSelected.length === 1) {
      const index = protocolSelected.indexOf(id);
      if (index > -1) {
        setProtocolSelected((protocolSelected) =>
          protocolSelected.filter((item) => item !== id)
        );
      } else {
        setProtocolSelected([...protocolSelected, id]);
      }
    } else if (protocolSelected.length === 2) {
      const index = protocolSelected.indexOf(id);
      if (index > -1) {
        setProtocolSelected((protocolSelected) =>
          protocolSelected.filter((item) => item !== id)
        );
      } else {
        toast.warn("Comparison is available only for two protocols.");
        // setProtocolSelected([...protocolSelected, id]);
      }
    }
  };
  const downloadCompare = async (type) => {
    if (protocolSelected.length <= 1) {
      toast.warn("Please select two versions, for compare and download");
    } else if (protocolSelected.length === 2) {
      try {
        setLoader(true);
        console.log("UserID Required", userId1);
        const config = {
          url: `${BASE_URL_8000}/api/document_compare/?id1=${
            protocolSelected[0]
          }&id2=${protocolSelected[1]}&userId=${userId1.substring(
            1
          )}&protocol=${summary.data.protocol}&file_type=${type}`,
          method: "GET",
          responseType: "blob",
        };
        const resp = await httpCall(config);
        if (resp.message === "Success") {
          FileDownload(
            resp.data,
            `${protocolSelected[0]}_${protocolSelected[1]}.compare_detail${type}`
          );
          // console.log(completed);
          // if (completed === 100 || completed === "100") {
          setLoader(false);
          // }
        } else if (resp.message === "No-Content") {
          toast.info("No difference found for this compare");
          setLoader(false);
        } else if (resp.message === "Not-Found") {
          toast.error("Compare is not available for selected documents.");
          setLoader(false);
        }
        setProtocolSelected([]);
      } catch (e) {
        setLoader(false);
        console.log("Compare Resp", e.response);
        /* istanbul ignore next*/
        if (e.response && e.response.data) {
          toast.error(e.response.data.detail);
        } else {
          toast.error("Data fetching failed. Please try again.");
        }
      }
    }
  };
  return (
    <div className="document-tab">
      {loader && <Loader />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="source-document-tab"
            data-testid="source-document-tab"
          >
            {"userName" in summaryData && summaryData.userName && (
              <DocumentsTable initialsRow={[summaryData]} />
            )}
          </div>
        </Grid>
        {associateDocuments && associateDocuments.length > 1 && (
          <div className="compare-buttons">
            <div
              style={{ width: "100%", marginTop: "10px", marginRight: "7px" }}
            >
              <Button
                onClick={() => downloadCompare(".csv")}
                variant="primary"
                data-testid="compare-download-button"
                style={{
                  float: "right",
                  height: 38,
                  width: 265,
                  boxShadow:
                    "0 4px 8px 0 rgb(5 85 252 / 32%), 0 4px 16px 0 rgb(0 0 0 / 4%)",
                }}
              >
                {"Download Compare Result"}
              </Button>
            </div>
          </div>
        )}
        {/* {associateDocuments && associateDocuments.length > 1 && (
          <div className="compare-buttons">
            <div
              style={{ width: "100%", marginTop: "10px", marginRight: "7px" }}
            >
              <Button
                onClick={() => downloadCompare(".xlsx")}
                variant="primary"
                data-testid="compare-download-button"
                style={{
                  float: "right",
                  height: 38,
                  width: 265,
                  boxShadow:
                    "0 4px 8px 0 rgb(5 85 252 / 32%), 0 4px 16px 0 rgb(0 0 0 / 4%)",
                }}
              >
                {"Download Compare Result (.xlsx)"}
              </Button>
            </div>
            <div
              style={{ width: "100%", marginTop: "10px", marginRight: "7px" }}
            >
              <Button
                onClick={() => downloadCompare(".csv")}
                variant="primary"
                data-testid="compare-download-button"
                style={{
                  float: "right",
                  height: 38,
                  width: 265,
                  boxShadow:
                    "0 4px 8px 0 rgb(5 85 252 / 32%), 0 4px 16px 0 rgb(0 0 0 / 4%)",
                }}
              >
                {"Download Compare Result (.csv)"}
              </Button>
            </div>
          </div>
        )} */}
        <Grid item xs={12}>
          <div className="associate-document-tab">
            <AssociateDocumentsTable
              handleChangeTab={handleChangeTab}
              protocolSelected={protocolSelected}
              setProtocolToDownload={setProtocolToDownload}
              //  initialsRow={protocolData && protocolData}
              initialsRow={associateDocuments && associateDocuments}
              showCheckbox={
                associateDocuments && associateDocuments.length > 1
                  ? true
                  : false
              }
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
