import React, { useState, useEffect } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";
import Button from "apollo-react/components/Button";
import { toast } from "react-toastify";

const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);

  const [protocolSelected, setProtocolSelected] = useState([]);
  const [prevProtSelected, setPrevProtSelected] = useState("");

  // useEffect(() => {
  //   console.log("Selected", protocolSelected);
  // }, [protocolSelected]);
  const setProtocolToDownload = (id) => {
    if (prevProtSelected === "") {
      setPrevProtSelected(id);
      setProtocolSelected([id]);
    } else {
      if (protocolSelected.length === 1) {
        if (prevProtSelected === id) {
          setProtocolSelected((protocolSelected) =>
            protocolSelected.filter((item) => item !== id)
          );
          setPrevProtSelected("");
        } else {
          setProtocolSelected([protocolSelected[0], id]);
        }
      } else if (protocolSelected.length === 2) {
        const index = protocolSelected.indexOf(id);
        if (index > -1) {
          setProtocolSelected((protocolSelected) =>
            protocolSelected.filter((item) => item !== id)
          );
        } else {
          toast.warn("Comparison is available only for two protocols.");
          // alert("Comparison is available only for two protocols.");
        }
      }
    }
  };
  const downloadCompare = () => {
    console.log("Selected", protocolSelected);
    if (protocolSelected.length <= 1) {
      toast.warn("Please select two versions, for compare and download");
    } else if (protocolSelected.length === 2) {
      // API Call
      toast.warn("No difference found for this compare");
    }
  };
  return (
    <div className="document-tab">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className="source-document-tab"
            data-testid="source-document-tab"
          >
            <DocumentsTable initialsRow={summary.success && [summary.data]} />
          </div>
        </Grid>
        <div style={{ width: "100%", marginTop: "10px", marginRight: "7px" }}>
          <Button
            onClick={() => downloadCompare()}
            variant="primary"
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
        <Grid item xs={12}>
          <div className="associate-document-tab">
            <AssociateDocumentsTable
              handleChangeTab={handleChangeTab}
              protocolSelected={protocolSelected}
              setProtocolToDownload={setProtocolToDownload}
              //  initialsRow={protocolData && protocolData}
              initialsRow={associateDocuments && associateDocuments}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Documents;
