import React from "react";
import Grid from "apollo-react/components/Grid";
import QCProtocolTable from "./QCProtocolTable";
const QCTable = ({handleProtocolClick}) => {
  return (
    <div className="qc-protocol-table">
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <QCProtocolTable handleProtocolClick={handleProtocolClick} />
        </Grid>
      </Grid>
    </div>
  );
};

export default QCTable;
