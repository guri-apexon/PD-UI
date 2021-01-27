import React from "react";

import Table from "apollo-react/components/Table";
import columns from "./Data/column.data";
import Button from "apollo-react/components/Button";
import Grid from "apollo-react/components/Grid";
import Link from 'apollo-react/components/Link';
import Loader from "../../Components/Loader/Loader";
import _ from "lodash";
import { covertMMDDYYYY } from "../../../utils/utilFunction";

const SearchCard = ({
  data,
  compareTwoProtocol,
  selection,
  onViewAssociateProtocolClick,
}) => {
  // let rowContent = "";
  // if (data && !data.rowsLoading) {
  //   rowContent = _.cloneDeep(data.rows);
  //   rowContent.handleSelectRow = compareTwoProtocol();
  // }
  // const selection1 = selection;
  const handleSelectRow = (data) => {
    compareTwoProtocol(data);
    // console.log("<<<<<", data);
  };
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <Grid md={10} container>
        <Grid md={3}>
          <p className="grid-item">Indication :</p>
        </Grid>
        <Grid md={3}>
          <p
            className="grid-item grid-key-value"
            data-testid="indication-value"
          >
            {data.indication}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Phase :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="phase-value">
            {data.phase}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Sponsor :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="sponsor-value">
            {data.sponsor}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Molecule/Device :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="molecule-value">
            {data.molecule}
          </p>
        </Grid>
        {/* <Grid md={3}>
        <p className="grid-item">Source Document:</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item">{data.sourceDocument}</p>
      </Grid> */}
        {/* \{" "} */}
        <Grid md={3}>
          <p className="grid-item">ProjectId / Opportunity :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="molecule-value">
            {data.projectId}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Approval Date:</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="date-value">
            {data.approvalDate ? covertMMDDYYYY(data.approvalDate) : "-"}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Document Status :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="molecule-value">
            {data.documentStatus}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Upload Date :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="molecule-value">
            {data.uploadDate ? covertMMDDYYYY(data.uploadDate) : "-"}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Version #:</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="molecule-value">
            {data.version}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Source :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="molecule-value">
            {data.source}
          </p>
        </Grid>
        
      </Grid>
      <Link
        onClick={() => onViewAssociateProtocolClick(data)}
        variant="secondary"
        size="small"
        style={{ marginRight: 10, marginTop: 5,  fontWeight: 600 }}
        disabled ={ data && data.viewAssociate &&data.viewAssociate}
      >
        View Associate Protocols
      </Link>
      {/* <span onClick={()=> onViewAssociateProtocolClick(data)}> View </span> */}
      <div
        className={`${
          data.viewAssociate ? "show-associate-prot" : "hide-associate"
        }`}
        style={{
          display: data.viewAssociate ? "block" : "none",
        }}
      >
        {data && data.rowsLoading ? (
          <div
            style={{
              height: 100,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Loader />
          </div>
        ) : (
          <div className="width100 search-inner-table">
            <Table
              columns={columns}
              rows={data.rows.map((row) => ({
                ...row,
                handleSelectRow,
                key: row.id,
                selection: selection,
              }))}
              hidePagination
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
