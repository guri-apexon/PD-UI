/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { covertMMDDYYYY } from "../../../utils/utilFunction";
import Tooltip from "apollo-react/components/Tooltip";
import { Link } from "react-router-dom";
import FileDownload from "js-file-download";
import { BASE_URL_8000, httpCall } from "../../../utils/api";
import Loader from "apollo-react/components/Loader";
import { toast } from "react-toastify";
import { userId } from "../../../store/userDetails";
import { useSelector } from "react-redux";

const DownloadLink = ({ row, column: { accessor: key } }) => {
  const [loader, setLoader] = useState(false);
  const userId1 = useSelector(userId);
  const handleDownload = async (row) => {
    setLoader(true);
    let splitArr = row.documentFilePath.split("\\");
    const fileName = splitArr[splitArr.length - 1];
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${
        row.documentFilePath
      }&userId=${userId1.substring(1)}&protocol=${row.protocol}`,
      method: "GET",
      responseType: "blob",
    };

    const resp = await httpCall(config);
    if (resp.success) {
      FileDownload(resp.data, fileName);
    } else {
      if (resp.message === "No Access") {
        toast.info("Access Provisioned to Primary Users only");
      } else {
        toast.error("Download Failed");
      }
    }
    setLoader(false);
  };
  return (
    <>
      {loader && <Loader />}
      <Tooltip
        variant="light"
        title={"Protocol Title"}
        subtitle={row[key]}
        placement="top"
      >
        <span>
          <span className="adjust-ellipses">
            <a
              href="javascript:void(0)"
              data-testid={`download-follow-asso`}
              onClick={() => handleDownload(row)}
            >
              {row[key].length > 50
                ? row[key].substring(0, 50) + "..."
                : row[key]}
            </a>
          </span>
        </span>
      </Tooltip>
    </>
  );
};
const dateFormat = ({ row }) => {
  return <>{covertMMDDYYYY(row.uploadDate)}</>;
};
const dateFormatApp = ({ row }) => {
  return <>{row.approvalDate ? covertMMDDYYYY(row.approvalDate) : "-"}</>;
};

// const Cell = ({ row, column: { accessor: key } }) => {
//   return <>{row[key] ? row[key] : "-"}</>;
// };

const StatusCell = ({ row, column: { accessor: key } }) => {
  return <span className="text-capitalize">{row[key] ? row[key] : "-"}</span>;
};
const ProtocolVersion = ({ row, column: { accessor: key } }) => {
  return (
    <span>
      <span className="adjust-ellipses">
        <Link to={`/protocols?protocolId=${row["id"]}`}>{row[key]}</Link>
      </span>
    </span>
  );
};

const columns = [
  {
    header: "Version #",
    accessor: "versionNumber",
    width: "10%",
    customCell: ProtocolVersion,
  },
  // {
  //   header: "Draft #",
  //   accessor: "draftVersion",
  //   width: "10%",
  //   customCell: Cell,
  // },
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
