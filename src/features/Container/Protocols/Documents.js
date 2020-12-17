import React, { useEffect, useState } from "react";
import DocumentsTable from "../../Components/DocumentsTable/DocumentsTable";
import AssociateDocumentsTable from "../../Components/DocumentsTable/AssociateDocumentsTable";

import { useSelector, useDispatch } from "react-redux";
import { prtocolsList } from "../Dashboard/dashboardSlice";
import { protocolSummary, associateDocs } from "./protocolSlice.js";
import Grid from "apollo-react/components/Grid";
import queryString from "query-string";
import "./Documents.scss";
import { useLocation } from "react-router-dom";
const Documents = ({ handleChangeTab }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const protocolData = useSelector(prtocolsList);
  const summary = useSelector(protocolSummary);
  const associateDocuments = useSelector(associateDocs);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    let params = location && location.search;
    const parsed = queryString.parse(params);
    if ("protocolId" in parsed) {
      // dispatch({type:'FETCH_ASSOCIATE_PROTOCOLS', payload: parsed.protocolId})
      let filterrow =
        protocolData &&
        protocolData.filter((item) => item.id == parsed.protocolId);
      setRows(filterrow);
    }
  }, [prtocolsList]);
  console.log("rows :", protocolData, rows, summary, associateDocuments);
  return (
    <div className="document-tab">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="source-document-tab">
            <DocumentsTable initialsRow={summary.success && [summary.data]} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="associate-document-tab">
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
