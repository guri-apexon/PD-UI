import CheckBox from "apollo-react/components/Checkbox";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_8000, UI_URL } from "../../../../utils/api";

import { covertMMDDYYYY } from "../../../../utils/utilFunction";
import Table, {
  compareDates,
} from "apollo-react/components/Table";

const arr = [];
const CheckBoxCell = ({ row: { handleSelectRow, id, selection } }) => {
  return (
    <div>
      <CheckBox onChange={() => handleSelectRow(id)} />
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
      `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`
    );

    url = `${UI_URL}/${resp.data}`;
    window.open(
      url,
      "_blank" // <- This is what makes it open in a new window.
    );
    // console.log(url);
  };
  return <a onClick={() => handleDownload(row)}>{row[key]}</a>;
};
const dateFormat = ({ row, column: { accessor: key } }) => {
  // console.log("--------------", row);
  // console.log("MMDDYYYY",covertMMDDYYYY(row.uploadDate))

  return <>{covertMMDDYYYY(row.uploadDate)}</>;
};
const dateFormatApp = ({ row, column: { accessor: key } }) => {
  // console.log("--------------", row);
  // console.log("MMDDYYYY",covertMMDDYYYY(row.uploadDate))

  return <>{row.approvalDate ? covertMMDDYYYY(row.approvalDate) : "-"}</>;
};

const Cell = ({ row, column: { accessor: key } }) => {
  return <>{row[key] ? row[key] : "-"}</>;
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
    accessor: "draftVersion",
    width: 75,
    customCell: Cell,
  },
  {
    header: "Source Document",
    accessor: "fileName",
    width: 150,
    customCell: DownloadLink,
  },
  {
    header: "Approval Date",
    accessor: "approvalDate",
    customCell: dateFormatApp,
  },
  {
    header: "Upload Date",
    accessor: "uploadDate",
    customCell: dateFormat,
    sortFunction: compareDates
  },

  {
    header: "Document Status",
    accessor: "documentStatus",
  },
];

export default columns;
