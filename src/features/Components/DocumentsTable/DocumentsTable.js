import Table from "apollo-react/components/Table";
import React, { useEffect } from "react";
import moment from 'moment'
import axios from "axios";
import {BASE_URL_8000, UI_URL} from '../../../utils/api';
// const Cell = ({ row, column }) => (
  // <a href={row.documentFilePath} target="_blank">
  //   {row.fileName}
  // </a>
  // <span onClick={()=>downloadDoc(row.path)}>
  //   {row.fileName}
  // </span>
// );
// const downloadDoc = (path) =>{
//   // file://quintiles.net/enterprise/Services/protdigtest/
//   console.log('sssssss')
//   window.open('file:///quintiles.net/enterprise/Services/protdigtest/data/IQVIA protocol/Protocol-2013-05-29-VER-V1.0-000001.pdf')
// }
const DownloadLink = ({ row, column: { accessor: key } }) => {
  let url;
  const handleDownload = async (row) => {
    console.log("Rows", row);
    // const resp = await axios.get(
    //   `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
    // );

    // url = `http://ca2spdml06d:3000/${resp.data}`;
    const resp = await axios.get(
      `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`
    );
  
    url = `${UI_URL}/${resp.data}`;
    window.open(
      url,
      "_blank" // <- This is what makes it open in a new window.
    );
  };
  return <a href="javascript:void(0)" onClick={() => handleDownload(row)}>{row[key]}</a>; // eslint-disable-line
};
const DataCell = ({row, column}) => (moment(row[column.accessor]).format('DD-MMM-YYYY'));
const columns = [
  {
    accessor: "fileName",
    header: "Document Name",
    customCell: DownloadLink,
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
