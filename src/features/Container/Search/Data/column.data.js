/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { covertMMDDYYYY } from "../../../../utils/utilFunction";
import { BASE_URL_8000, httpCall } from "../../../../utils/api";

import React, { useState } from "react";
import Loader from "apollo-react/components/Loader";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";

const ProtocolLink = ({ row, column: { accessor: key } }) => {
  return (
    <>
      {row.isPrimaryUser ? (
        row[key] ? (
          <Link to={`/protocols?protocolId=${row.id}`}>{row[key]}</Link>
        ) : (
          "-"
        )
      ) : (
        <span>{row[key]}</span>
      )}
    </>
  );
};
/* istanbul ignore next*/
const DownloadLink = ({ row, column: { accessor: key } }) => {
  const [loader, setLoader] = useState(false);
  const handleDownload = async (row) => {
    setLoader(true);
    let splitArr = row.documentFilePath.split("\\");
    const fileName = splitArr[splitArr.length - 1];
    console.log(fileName);
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`,
      method: "GET",
      responseType: "blob",
    };

    const resp = await httpCall(config);
    if (resp.success) {
      FileDownload(resp.data, fileName);
    } else {
      toast.error("Download Failed");
    }
    setLoader(false);
  };
  return (
    <>
      {loader && <Loader />}
      {row.isPrimaryUser ? (
        <a onClick={() => handleDownload(row)}>{row[key]}</a>
      ) : (
        <span>{row[key]}</span>
      )}
    </>
  );
};
const dateFormat = ({ row }) => {
  return <>{covertMMDDYYYY(row.uploadDate)}</>;
};
const dateFormatApp = ({ row }) => {
  return <>{row.approvalDate ? covertMMDDYYYY(row.approvalDate) : "-"}</>;
};

const Cell = ({ row, column: { accessor: key } }) => {
  return <>{row[key] ? row[key] : "-"}</>;
};

const StatusCell = ({ row, column: { accessor: key } }) => {
  return <span className="text-capitalize">{row[key] ? row[key] : "-"}</span>;
};

const columns = [
  {
    header: "Version #",
    accessor: "versionNumber",
    width: "10%",
    customCell: ProtocolLink,
  },
  {
    header: "Draft #",
    accessor: "draftVersion",
    width: "10%",
    customCell: Cell,
  },
  {
    header: "Source Document",
    accessor: "fileName",
    width: "20%",
    customCell: DownloadLink,
  },
  {
    header: "Approval Date",
    accessor: "approvalDate",
    width: "10%",
    customCell: dateFormatApp,
  },
  {
    header: "Upload Date",
    accessor: "uploadDate",
    customCell: dateFormat,
    width: "10%",
  },

  {
    header: "Document Status",
    accessor: "documentStatus",
    customCell: StatusCell,
    width: "10%",
  },
];

export default columns;
