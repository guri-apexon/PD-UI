import CheckBox from "apollo-react/components/Checkbox";
import React from "react";
import { Link } from "react-router-dom";

const CheckBoxCell = ({ row }) => {
  return (
    <div>
      <CheckBox />
    </div>
  );
};
const ProtocolLink = ({ row, column: { accessor: key } }) => {
  console.log("--------------", row);
  return <Link to={`/protocols?protocolId=${row["version"]}`}>{row[key]}</Link>;
};

const DownloadLink = ({ row, column: { accessor: key } }) => {
  console.log("--------------", row);
  return <Link to={`${row["documentPath"]}`} download target="_blank">{row[key]}</Link>;
};
const columns = [
  {
    accessor: "action",
    customCell: CheckBoxCell,
    width: 30,
  },
  {
    header: "Version #",
    accessor: "version",
    width: 90,
    customCell: ProtocolLink,
  },
  {
    header: "Draft #",
    accessor: "draft",
    width: 75,
  },
  {
    header: "Source Document",
    accessor: "sourceDocument",
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
