import Table from "apollo-react/components/Table";
import React, { useEffect } from "react";
import moment from 'moment'

const Cell = ({ row, column }) => (
  <a href={row.documentFilePath} target="_blank">
    {row.fileName}
  </a>
  // <span onClick={()=>downloadDoc(row.path)}>
  //   {row.fileName}
  // </span>
);
// const downloadDoc = (path) =>{
//   // file://quintiles.net/enterprise/Services/protdigtest/
//   console.log('sssssss')
//   window.open('file:///quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf')
// }

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
    accessor: "userCreated",
  },
];

const DocumentsTable = ({ initialsRow }) => {
    
  return <Table title="Source Document" rows={initialsRow} columns={columns}  />;
};

export default DocumentsTable;
