import Table from "apollo-react/components/Table";
import React from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";

import Checkbox from "apollo-react/components/Checkbox";
// const Cell = ({ row, column }) => (
//   <a href={row.documentFilePath} target="_blank">
//     {row.fileName}
//   </a>
// );

const ActionCell = ({ row }) => {
  // console.log("....RoW........", row);
  return (
    <div>
      <div className="table-selection">
        <Checkbox
          label=""
          checked={row.protocolSelected.includes(row.id)}
          onChange={() => row.setProtocolToDownload(row.id)}
        />
      </div>
    </div>
  );
};

const DownloadLink = ({ row, column: { accessor: key } }) => {
  let url;
  const handleDownload = async (row) => {
    // console.log("Rows", row);
    // const resp = await axios.get(
    //   `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
    // );

    // url = `http://ca2spdml06d:3000/${resp.data}`;

    const resp = await axios.get(
      `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`
    );

    url = `${UI_URL}/${resp.data}`;
    let encodeUrl = encodeURI(url);
    let myWindow = window.open("about:blank", "_blank");
    myWindow.document.write(
      `<embed src=${encodeUrl} frameborder="0" width="100%" height="100%">`
    );
    // window.open(
    //   url,
    //   "_blank" // <- This is what makes it open in a new window.
    // );
    // console.log(url);
  };
  return (
    <p className="hyperlink" onClick={() => handleDownload(row)}>
      {row[key]}
    </p>
  ); // eslint-disable-line
};
// const VersionCell = ({ row, column }) => (
//   <a href="/" target="_blank">
//     {row.VersionNumber}
//   </a>
// );

const VersionCell = ({ row, column }) => {
  let history = useHistory();
  const onHandleChange = (row) => {
    row.handleChangeTab("", 0);
    history.push(`/protocols?protocolId=${row["id"]}`);
  };
  return (
    <>
      {row.versionNumber ? (
        <p className="hyperlink" onClick={() => onHandleChange(row)}>
          {" "}
          {row.versionNumber}
        </p>
      ) : (
        "-"
      )}
    </>
  );
};
const Cell = ({ row, column: { accessor: key } }) => {
  return <>{row[key] ? row[key] : "-"}</>;
};

const StatusCell = ({ row, column: { accessor: key } }) => {
  return <span className="text-capitalize">{row[key] ? row[key] : "-"}</span>;
};

const DataCell = ({ row, column }) =>
  moment(row[column.accessor]).format("DD-MMM-YYYY");
const columns = [
  {
    accessor: "action",
    customCell: ActionCell,
    width: "3%",
  },
  {
    accessor: "versionNumber",
    header: "Associated Versions",
    customCell: VersionCell,
  },
  {
    accessor: "draftVersion",
    header: "Draft#",
    customCell: Cell,
  },
  {
    accessor: "fileName",
    header: "Source Document",
    customCell: DownloadLink,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DataCell,
  },
  {
    header: "Approval Date",
    accessor: "approvalDate",
    customCell: DataCell,
  },
  {
    header: "Document Status",
    accessor: "documentStatus",
    customCell: StatusCell,
  },
];

const AssociateDocumentsTable = ({
  initialsRow,
  handleChangeTab,
  protocolSelected,
  setProtocolToDownload,
}) => {
  // console.log("initialsRow :", initialsRow);

  // return (
  //   <Table
  //   title="Associated Documents"
  //   rows={initialsRow}
  //   columns={columns}
  //   initialSortOrder="asc"
  //   initialSortedColumn="fileName"
  //   />
  // );
  return (
    <div
      className="associate11-document-tab"
      data-testid="associate-document-tab"
    >
      <Table
        title="Associated Documents"
        rows={initialsRow.map((row) => {
          let temp = _.cloneDeep(row);
          let details = {
            key: row.id,
            handleChangeTab,
            protocolSelected,
            setProtocolToDownload,
          };
          return _.merge(temp, details);
        })}
        columns={columns}
      />
    </div>
  );
};

export default AssociateDocumentsTable;
