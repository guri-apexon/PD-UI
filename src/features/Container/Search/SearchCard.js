import React from "react";

import Table from "apollo-react/components/Table";
import columns from "./Data/column.data";
import Grid from "apollo-react/components/Grid";

const SearchCard = ({ data }) => (
  <div style={{ marginTop: 10, marginBottom: 10 }}>
    <Grid md={10} container>
      <Grid md={3}>
        <p className="grid-item">Indication :</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item  bold-class">{data.indication}</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item">Phase :</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item  bold-class">{data.phase}</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item">Sponsor :</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item  bold-class">{data.sponsor}</p>
      </Grid>
      {/* <Grid md={3}>
        <p className="grid-item">Source Document:</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item">{data.sourceDocument}</p>
      </Grid> */}
      {/* \{" "} */}
      <Grid md={3}>
        <p className="grid-item">Recent Approval Date:</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item bold-class">{data.approvalDate}</p>
      </Grid>
      <Grid md={3}>
        <p className="grid-item">Molecule/Device :</p>
      </Grid>
      <Grid md={3}>
        <p className='grid-item bold-class'>{data.molecule}</p>
      </Grid>
    </Grid>

    <div className="width100 search-inner-table">
      <Table columns={columns} rows={data.rows} hidePagination />
    </div>
  </div>
);

export default SearchCard;
