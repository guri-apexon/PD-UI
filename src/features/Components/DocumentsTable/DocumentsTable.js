import Table from "apollo-react/components/Table";
import React, { useEffect } from "react";
import moment from 'moment'

const Cell = ({ row, column }) => (
  <a href={row.protocol_document_path} target="_blank">
    {row.protocol_document_name}
  </a>
);

const DataCell = ({row, column}) => (moment(row[column.accessor]).format('DD-MMM-YYYY'));
const columns = [
  {
    accessor: "protocol_document_name",
    header: "Document Name",
    customCell: Cell,
  },
  {
    header: "Uploaded Date",
    accessor: "created_on",
    customCell: DataCell,
  },
  {
    header: "Uploaded By",
    accessor: "created_by",
  },
];

const DocumentsTable = ({ initialsRow }) => {
    
  return <Table title="Source Document" rows={initialsRow} columns={columns}  />;
};

export default DocumentsTable;
