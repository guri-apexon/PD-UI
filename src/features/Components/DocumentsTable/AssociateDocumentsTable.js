import Table from "apollo-react/components/Table";
import React from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

// const Cell = ({ row, column }) => (
//   <a href={row.documentFilePath} target="_blank">
//     {row.fileName}
//   </a>
// );
const DownloadLink = ({ row, column: { accessor: key } }) => {
  let url;
  const handleDownload = async (row) => {
    console.log("Rows", row);
    const resp = await axios.get(
      `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
    );

    url = `http://ca2spdml06d:3000/${resp.data}`;
    window.open(
      url,
      "_blank" // <- This is what makes it open in a new window.
    );
    // console.log(url);
  };
  return <a href="javascript:void(0)" onClick={() => handleDownload(row)}>{row[key]}</a>; // eslint-disable-line
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
  return <p className="hyperlink" onClick={() => onHandleChange(row)}> {row.versionNumber}</p>;
};

const DataCell = ({ row, column }) =>
  moment(row[column.accessor]).format("DD-MMM-YYYY");
const columns = [
  {
    accessor: "versionNumber",
    header: "Associated Versions",
    customCell: VersionCell,
  },
  {
    accessor: "draftVersion",
    header: "Draft#",
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
    header: "Document Status",
    accessor: "documentStatus",
  },
];

const AssociateDocumentsTable = ({ initialsRow, handleChangeTab }) => {
  console.log("initialsRow :", initialsRow);

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
    <div className="associate11-document-tab" data-testid='associate-document-tab'>
      <Table
        title="Associated Documents"
        rows={initialsRow.map((row) => {
          let temp = _.cloneDeep(row);
          let details = {
            key: row.id,
            handleChangeTab,
          };
          return _.merge(temp, details);
        })}
        columns={columns}
      />
    </div>
  );
};

export default AssociateDocumentsTable;
