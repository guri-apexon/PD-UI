import Table from "apollo-react/components/Table";
import React from "react";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";

const Cell = ({ row, column }) => (
  <a href={row.filePath} target="_blank">
    {row.fileName}
  </a>
);

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
  return <p className="hyperlink" onClick={() => onHandleChange(row)}> {row.VersionNumber}</p>;
};

const DataCell = ({ row, column }) =>
  moment(row[column.accessor]).format("DD-MMM-YYYY");
const columns = [
  {
    accessor: "VersionNumber",
    header: "Associated Versions",
    customCell: VersionCell,
  },
  {
    accessor: "DraftVersion",
    header: "Draft#",
  },
  {
    accessor: "fileName",
    header: "Source Document",
    customCell: Cell,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DataCell,
  },
  {
    header: "Document Status",
    accessor: "DocumentStatus",
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
