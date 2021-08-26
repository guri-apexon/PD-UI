/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import { BASE_URL_8000, httpCall, UI_URL } from "../../../../utils/api";

import { covertMMDDYYYY } from "../../../../utils/utilFunction";

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

const DownloadLink = ({ row, column: { accessor: key } }) => {
  let url;
  const handleDownload = async (row) => {
    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${row.documentFilePath}`,
      method: "GET",
    };
    const resp = await httpCall(config);

    url = `${UI_URL}/${resp.data}`;
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
  return (
    <>
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
