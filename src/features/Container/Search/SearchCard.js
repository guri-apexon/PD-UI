import React, { useEffect, useState } from "react";

import Table from "apollo-react/components/Table";
import columns from "./Data/column.data";
import Button from "apollo-react/components/Button";
import Grid from "apollo-react/components/Grid";
import Link from "apollo-react/components/Link";
import Loader from "../../Components/Loader/Loader";
import _ from "lodash";
import { covertMMDDYYYY, formatESDate } from "../../../utils/utilFunction";
import axios from "axios";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";

const SearchCard = ({
  data,
  compareTwoProtocol,
  selection,
  onViewAssociateProtocolClick,
  protocolSelected,
}) => {
  const [dataRow, setDataRow] = useState([]);
  // let rowContent = "";
  // if (data && !data.rowsLoading) {
  //   rowContent = _.cloneDeep(data.rows);
  //   rowContent.handleSelectRow = compareTwoProtocol();
  // }
  // const selection1 = selection;
  useEffect(() => {
    let arrOfObj = _.cloneDeep(data.rows);
    var result = arrOfObj.map(function (el) {
      var o = Object.assign({}, el);
      o.protocolSelected = protocolSelected;
      return o;
    });
    // debugger;
    setDataRow(result);
  }, [protocolSelected, data]);
  const handleSelectRow = (data, protocol) => {
    compareTwoProtocol(data, protocol);
  };

  const handleDownload = async (row) => {
    // const resp = await axios.get(
    //   `http://ca2spdml01q:8000/api/download_file/?filePath=${row.path}`
    // );
    // if (resp.data.includes("/")) {
    //   let url = `http://ca2spdml06d:3000/${resp.data.split("/")[1]}`;
    //   window.open(
    //     url,
    //     "_blank" // <- This is what makes it open in a new window.
    //   );
    // } else {
    // let url = `http://ca2spdml06d:3000/${resp.data}`;
    const resp = await axios.get(
      `${BASE_URL_8000}/api/download_file/?filePath=${row.path}`
    );

    let url = `${UI_URL}/${resp.data}`;
    window.open(
      url,
      "_blank" // <- This is what makes it open in a new window.
    );
    // }
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
          <p className="grid-item grid-key-value" data-testid="projectid-value">
            {data.projectId}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Approval Date:</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="date-value">
            {data.approvalDate ? formatESDate(data.approvalDate) : "-"}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Document Status :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="status-value">
            {data.documentStatus}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Upload Date :</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="upload-value">
            {data.uploadDate ? formatESDate(data.uploadDate) : "-"}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Version #:</p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item grid-key-value" data-testid="version-value">
            {data.version}
          </p>
        </Grid>
        <Grid md={3}>
          <p className="grid-item">Source :</p>
        </Grid>
        <Grid md={3}>
          <a
            onClick={() => handleDownload(data)}
            className="grid-item grid-key-value"
            data-testid="source-value"
            style={{
              color: "#0138ff",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {data.source}
          </a>
        </Grid>
      </Grid>
      <Link
        onClick={() => onViewAssociateProtocolClick(data)}
        variant="secondary"
        size="small"
        style={{ marginRight: 10, marginTop: 5, fontWeight: 600 }}
        disabled={data && data.viewAssociate && data.viewAssociate}
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
            {dataRow.length > 0 && (
              <Table
                columns={columns}
                rows={dataRow.map((row) => ({
                  ...row,
                  handleSelectRow,
                  key: row.id,
                  selection: selection,
                }))}
                hidePagination
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
