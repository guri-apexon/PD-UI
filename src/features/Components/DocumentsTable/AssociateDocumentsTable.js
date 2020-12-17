import Table from "apollo-react/components/Table";
import React from "react";
import moment from 'moment'

const Cell = ({ row, column }) => (
  <a href={row.filePath} target="_blank">
    {row.fileName}
  </a>
);

const VersionCell = ({ row, column }) => (
    <a href={row.protocol_document_path} target="_blank">
      {row.VersionNumber}
    </a>
  );

const DataCell = ({row, column}) => (moment(row[column.accessor]).format('DD-MMM-YYYY'));
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

const AssociateDocumentsTable = ({ initialsRow }) => {
    
  return <Table title="Associated Documents" rows={initialsRow} columns={columns}  />;
};

export default AssociateDocumentsTable;
