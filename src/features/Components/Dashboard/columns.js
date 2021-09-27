import { covertMMDDYYYY } from "../../../utils/utilFunction";
import Tooltip from "apollo-react/components/Tooltip";
import { Link } from "react-router-dom";

const DownloadLink = ({ row, column: { accessor: key } }) => {
  return (
    <>
      <Tooltip
        variant="light"
        title={"Protocol Title"}
        subtitle={row[key]}
        placement="top"
      >
        <span>
          <span className="adjust-ellipses">
            {row[key].length > 50
              ? row[key].substring(0, 50) + "..."
              : row[key]}
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

const Cell = ({ row, column: { accessor: key } }) => {
  return <>{row[key] ? row[key] : "-"}</>;
};

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
