import React, { useEffect, useState } from "react";

import Table from "apollo-react/components/Table";
import columns from "./Data/column.data";
import Grid from "apollo-react/components/Grid";
import Link from "apollo-react/components/Link";
import Loader1 from "../../Components/Loader/Loader";
import Loader from "apollo-react/components/Loader";
import { userId } from "../../../store/userDetails";
import { useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { formatESDate } from "../../../utils/utilFunction";
import axios from "axios";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";
import { toast } from "react-toastify";
import Tooltip from "apollo-react/components/Tooltip";

const textLength = 24;
const SearchCard = ({
  data,
  compareTwoProtocol,
  selection,
  onViewAssociateProtocolClick,
  protocolSelected,
}) => {
  const [dataRow, setDataRow] = useState([]);
  const [loader] = useState(false);
  const userId1 = useSelector(userId);
  // let rowContent = "";
  // if (data && !data.rowsLoading) {
  //   rowContent = cloneDeep(data.rows);
  //   rowContent.handleSelectRow = compareTwoProtocol();
  // }
  // const selection1 = selection;
  useEffect(() => {
    let arrOfObj = cloneDeep(data.rows);
    var result = arrOfObj.map(function (el) {
      var o = Object.assign({}, el);
      o.protocolSelected = protocolSelected;
      return o;
    });
    setDataRow(result);
  }, [protocolSelected, data]);
  /* istanbul ignore next */
  const handleSelectRow = (data, protocol) => {
    compareTwoProtocol(data, protocol);
  };

  const handleDownload = async (row) => {
    // setLoader(true);
    // console.log("path", row.path);
    // const dfsPath = row.path.replaceAll("\\", "/");
    // console.log("DFS", dfsPath);
    // try {
    //   const resp = await axios({
    //     url: "http://localhost:4000/api/pdf/download",
    //     method: "GET",
    //     params: {
    //       path: dfsPath,
    //     },
    //     responseType: "blob", // Important
    //   });
    //   // console.log("resp", resp);
    //   const blob = resp.data;
    //   let url = URL.createObjectURL(blob);
    //   setLoader(false);
    //   window.open(url, "_blank");
    // } catch (err) {
    //   setLoader(false);
    //   console.log(err);
    // }
    const userresp = await axios.get(
      `${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userId1.substring(
        1
      )}&protocol=${data.protocolNumber}`
    );
    console.log("--------------||------------", userresp);
    if (userresp && userresp.data) {
      const resp = await axios.get(
        `${BASE_URL_8000}/api/download_file/?filePath=${row.path}`
      );

      let url = `${UI_URL}/${resp.data}`;
      let encodeUrl = encodeURI(url);
      let myWindow = window.open("about:blank", "_blank");
      myWindow.document.write(
        `<embed src=${encodeUrl} frameborder="0" width="100%" height="100%">`
      );
    } else {
      toast.info("Access Provisioned to Primary Users only");
    }
  };
  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      {loader && <Loader />}
      <Grid md={11} container>
        {/* ------------------------------------------------- */}
        <Grid md={6} container>
          <Grid md={6}>
            <p className="grid-item bold-class">Indication :</p>
          </Grid>
          <Grid md={6}>
            {data.indication && data.indication.length > textLength ? (
              <Tooltip
                variant="light"
                // title="Title"
                subtitle={data.indication}
                placement="left"
                // style={{ marginRight: 48 }}
              >
                <p
                  className="grid-item grid-key-value"
                  data-testid="indication-value"
                  style={{ marginRight: 10 }}
                >
                  {data.indication}
                </p>
              </Tooltip>
            ) : (
              <p
                className="grid-item grid-key-value"
                data-testid="indication-value"
              >
                {data.indication}
              </p>
            )}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Sponsor :</p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item grid-key-value" data-testid="sponsor-value">
              {data.sponsor && data.sponsor.length > textLength ? (
                <Tooltip
                  variant="light"
                  // title="Title"
                  subtitle={data.sponsor}
                  placement="left"
                  // style={{ marginRight: 48 }}
                >
                  <p
                    className="grid-item grid-key-value"
                    data-testid="indication-value"
                    style={{ marginRight: 10 }}
                  >
                    {data.sponsor}
                  </p>
                </Tooltip>
              ) : (
                <p
                  className="grid-item grid-key-value"
                  data-testid="sponsor-value"
                >
                  {data.sponsor}
                </p>
              )}
            </p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">ProjectId / Opportunity :</p>
          </Grid>
          <Grid md={6}>
            {data.projectId && data.projectId.length > textLength ? (
              <Tooltip
                variant="light"
                // title="Title"
                subtitle={data.projectId}
                placement="left"
                // style={{ marginRight: 48 }}
              >
                <p
                  className="grid-item grid-key-value"
                  data-testid="projectid-value"
                  style={{ marginRight: 10 }}
                >
                  {data.projectId}
                </p>
              </Tooltip>
            ) : (
              <p
                className="grid-item grid-key-value"
                data-testid="projectid-value"
              >
                {data.projectId}
              </p>
            )}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Document Status :</p>
          </Grid>
          <Grid md={6}>
            <p
              className="grid-item grid-key-value text-capitalize"
              data-testid="status-value"
            >
              {data.documentStatus}
            </p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Version #:</p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item grid-key-value" data-testid="version-value">
              {data.version}
            </p>
          </Grid>
          {/* <Grid md={6}>
            <p className="grid-item bold-class">QC Status :</p>
          </Grid>
          <Grid md={6}>
            <p
              className="grid-item grid-key-value text-capitalize"
              data-testid="status-value"
            >
              QC Completed
            </p>
          </Grid> */}
        </Grid>
        {/* ------------------------------------------------- */}
        <Grid md={6} container>
          <Grid md={6}>
            <p className="grid-item bold-class">Phase :</p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item grid-key-value" data-testid="phase-value">
              {data.phase}
            </p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Molecule/Device :</p>
          </Grid>
          <Grid md={6}>
            {data.molecule && data.molecule.length > textLength ? (
              <Tooltip
                variant="light"
                // title="Title"
                subtitle={data.molecule}
                placement="left"
                // style={{ marginRight: 48 }}
              >
                <p
                  className="grid-item grid-key-value"
                  data-testid="molecule-value"
                  style={{ marginRight: 10 }}
                >
                  {data.molecule}
                </p>
              </Tooltip>
            ) : (
              <p
                className="grid-item grid-key-value"
                data-testid="molecule-value"
              >
                {data.molecule}
              </p>
            )}
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Approval Date:</p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item grid-key-value" data-testid="date-value">
              {data.approval_date ? formatESDate(data.approval_date) : "-"}
            </p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Upload Date :</p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item grid-key-value" data-testid="upload-value">
              {data.uploadDate ? formatESDate(data.uploadDate) : "-"}
            </p>
          </Grid>
          <Grid md={6}>
            <p className="grid-item bold-class">Source :</p>
          </Grid>
          <Grid md={6}>
            <a
              onClick={() => handleDownload(data)}
              className="grid-item grid-key-value"
              data-testid="source-value"
              style={{
                color: "#0138ff",
                textDecoration: "underline",
                cursor: "pointer",
                whiteSpace: "normal",
              }}
            >
              {data.source}
            </a>
          </Grid>
        </Grid>
        {/* ------------------------------------------------- */}

        <Grid md={3}>
          <p className="grid-item bold-class">QC Activity :</p>
        </Grid>
        <Grid md={3}>
          <p
            className="grid-item grid-key-value text-capitalize"
            data-testid="qc-activity-value"
          >
            {data.qcActivity}
          </p>
        </Grid>
      </Grid>
      <Link
        onClick={() => onViewAssociateProtocolClick(data)}
        variant="secondary"
        size="small"
        style={{ marginRight: 10, marginTop: 5, fontWeight: 600 }}
        disabled={data && data.viewAssociate && data.viewAssociate}
        data-testid="view_associated_protocol"
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
            <Loader1 />
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
