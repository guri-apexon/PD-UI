import Table from "apollo-react/components/Table";
import React, { useEffect } from "react";
import moment from 'moment'

const Cell = ({ row, column }) => (
  <a href={row.filePath} target="_blank">
    {row.fileName}
  </a>
);

const DataCell = ({row, column}) => (moment(row[column.accessor]).format('DD-MMM-YYYY'));
const columns = [
  {
    accessor: "fileName",
    header: "Document Name",
    customCell: Cell,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DataCell,
  },
  {
    header: "Uploaded By",
    accessor: "uploaded_by",
  },
];

const DocumentsTable = ({ initialsRow }) => {
    
  return <Table title="Source Document" rows={initialsRow} columns={columns}  />;
};

export default DocumentsTable;
