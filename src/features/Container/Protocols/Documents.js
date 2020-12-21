import React from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector } from "react-redux";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import "./Documents.scss";
const Documents = ({ handleChangeTab }) => {
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);
  return (
    <div className="document-tab">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="source-document-tab" data-testid='source-document-tab'>
            <DocumentsTable initialsRow={summary.success && [summary.data]} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="associate-document-tab" >
            <AssociateDocumentsTable
              handleChangeTab={handleChangeTab}
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
