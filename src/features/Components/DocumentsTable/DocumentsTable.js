import Table from "apollo-react/components/Table";
import React from "react";
import axios from "axios";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";
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
const handleDownload = async (row) => {
  console.log("Rows", row);
  // const resp = await axios.get(
  //   `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
  // );

  // url = `http://ca2spdml06d:3000/${resp.data}`;
  const resp = await axios.get(
    `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`
  );

  let url = `${UI_URL}/${resp.data}`;
  let encodeUrl = encodeURI(url);
  let myWindow = window.open("about:blank", "_blank");
  myWindow.document.write(
    `<embed src=${encodeUrl} frameborder="0" width="100%" height="100%">`
  );

  // window.open(
  //   url,
  //   "_blank" // <- This is what makes it open in a new window.
  // );
};
const DownloadLink = ({ row, column: { accessor: key } }) => {
  return (
    <p
      className="hyperlink"
      data-testid="documentTable-sourcefile"
      onClick={() => handleDownload(row)}
    >
      {row[key]}
    </p>
  ); // eslint-disable-line
};
const DateCell = ({ row, column }) => {
  const date = new Date(row[column.accessor]);
  return date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");
};
const columns = [
  {
    accessor: "fileName",
    header: "Document Name",
    customCell: DownloadLink,
  },
  {
    header: "Uploaded Date",
    accessor: "uploadDate",
    customCell: DateCell,
  },
  {
    header: "Uploaded By",
    accessor: "userCreated",
  },
];

const DocumentsTable = ({ initialsRow }) => {
  return (
    <Table
      title="Source Document"
      rows={initialsRow}
      columns={columns}
      hidePagination
      maxHeight={160}
    />
  );
};

export default DocumentsTable;
