import React, { useState, useEffect } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";

import { toast } from "react-toastify";

const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);

  const [protocolSelected, setProtocolSelected] = useState([]);
  const [prevProtSelected, setPrevProtSelected] = useState("");

  useEffect(() => {
    console.log("Selected", protocolSelected);
  }, [protocolSelected]);
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
