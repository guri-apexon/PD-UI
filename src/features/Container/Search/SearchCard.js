import React from "react";

import Table from "apollo-react/components/Table";
import columns from "./Data/column.data";
import Grid from "apollo-react/components/Grid";
import Loader from "../../Components/Loader/Loader";
import _ from "lodash";

const SearchCard = ({ data, compareTwoProtocol, selection }) => {
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
          <p className="grid-item bold-class">{data.molecule}</p>
        </Grid>
      </Grid>

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
  );
};

export default SearchCard;
