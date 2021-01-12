import CheckBox from "apollo-react/components/Checkbox";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CheckBoxCell = ({ row }) => {
  return (
    <div>
      <CheckBox />
    </div>
  );
};
const ProtocolLink = ({ row, column: { accessor: key } }) => {
  // console.log("--------------", row);
  // console.log(row[key])
  return <Link to={`/protocols?protocolId=${row.id}`}>{row[key]}</Link>;
};

const DownloadLink = ({ row, column: { accessor: key } }) => {
  // console.log("--------------", row);
  let url;
  const handleDownload = async (row) => {
    console.log("Rows", row);
    const resp = await axios.get(
      `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
    );
    
    url = `http://ca2spdml06d:3000/${resp.data}`;
    window.open(
      url,
      '_blank' // <- This is what makes it open in a new window.
    );
    // console.log(url);
  };
  return (
    <a onClick={() => handleDownload(row)}>
      {row[key]}
    </a>
  );
};
const columns = [
  {
    accessor: "action",
    customCell: CheckBoxCell,
    width: 30,
  },
  {
    header: "Version #",
    accessor: "versionNumber",
    width: 90,
    customCell: ProtocolLink,
  },
  {
    header: "Draft #",
    accessor: "dradraftVersionft",
    width: 75,
  },
  {
    header: "Source Document",
    accessor: "fileName",
    width: 150,
    customCell: DownloadLink,
  },
  {
    header: "Upload Date",
    accessor: "uploadDate",
  },

  {
    header: "Document Status",
    accessor: "documentStatus",
  },
];

export default columns;
