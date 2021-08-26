import React, { useState } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";
import Button from "apollo-react/components/Button";
import { toast } from "react-toastify";
import { httpCall } from "../../../utils/api";
import Loader from "apollo-react/components/Loader";
import FileDownload from "js-file-download";

const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);
  const [protocolSelected, setProtocolSelected] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [completed, setCompleted] = useState(0);

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
  const downloadCompare = async () => {
    console.log("Selected", protocolSelected);
    setLoader(true);
    if (protocolSelected.length <= 1) {
      toast.warn("Please select two versions, for compare and download");
    } else if (protocolSelected.length === 2) {
      try {
        let percentage;
        const config = {
          url: `http://ca2spdml110q:8008/api/document_compare/?id1=${protocolSelected[0]}&id2=${protocolSelected[1]}`,
          method: "GET",
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            ); // you can use this to show user percentage of file downloaded
            console.log(percentage);
          },
        };
        const resp = await httpCall(config);
        if (resp.message === "Success") {
          FileDownload(
            resp.data,
            `${protocolSelected[0]}-${protocolSelected[1]}.compare_detail.csv`
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
            <DocumentsTable initialsRow={summary.success && [summary.data]} />
          </div>
        </Grid>
        {associateDocuments && associateDocuments.length > 1 && (
          <div style={{ width: "100%", marginTop: "10px", marginRight: "7px" }}>
            <Button
              onClick={() => downloadCompare()}
              variant="primary"
              data-testid="compare-download-button"
              style={{
                float: "right",
                height: 38,
                width: 235,
                boxShadow:
                  "0 4px 8px 0 rgb(5 85 252 / 32%), 0 4px 16px 0 rgb(0 0 0 / 4%)",
              }}
            >
              {"Download Compare Result"}
            </Button>
          </div>
        )}
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
