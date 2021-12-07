import React, { useState, useEffect } from "react";
import concat from "lodash/concat";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import ChevronDown from "apollo-react-icons/ChevronDown";
import ChevronRight from "apollo-react-icons/ChevronRight";
import Clock from "apollo-react-icons/Clock";
import StatusCheck from "apollo-react-icons/StatusCheck";
import StatusExclamation from "apollo-react-icons/StatusExclamation";
import Check from "apollo-react-icons/Check";
import User from "apollo-react-icons/User";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Checkbox from "apollo-react/components/Checkbox";
import { neutral8 } from "apollo-react/colors";
import IconButton from "apollo-react/components/IconButton";
import Table, {
  compareStrings,
  compareDates,
} from "apollo-react/components/Table";
import Tooltip from "apollo-react/components/Tooltip";
import Typography from "apollo-react/components/Typography";
import Minus from "apollo-react-icons/Minus";
import FileDownload from "js-file-download";
import { BASE_URL_8000, httpCall } from "../../../utils/api";
import { setSelectedProtocols } from "../../Container/Dashboard/dashboardSlice";
import "./ProtocolTable.scss";
import Loader from "apollo-react/components/Loader";
import { toast } from "react-toastify";
import { userId } from "../../../store/userDetails";
import { useSelector } from "react-redux";
import { redaction } from "../../../AppConstant/AppConstant";

const ActionCell = ({
  row: {
    id,
    handleToggleRow,
    expanded,
    selected,
    handleChange,
    status,
    qcActivity,
    screen,
  },
}) => {
  return (
    <div>
      {screen !== "QC" ? (
        <div className="table-selection">
          <Checkbox
            label=""
            checked={selected}
            onChange={() => handleChange(id)}
            disabled={
              status === "Digitization Complete" &&
              qcActivity === "QC Not Started"
                ? false
                : true
            }
            size="small"
            data-testid="selected-row"
          />
        </div>
      ) : null}

      <div className="table-selection">
        <IconButton
          id="expand"
          data-testid="expandable-row"
          size="small"
          onClick={() => handleToggleRow(id)}
        >
          {expanded ? <ChevronDown /> : <ChevronRight />}
        </IconButton>
      </div>
    </div>
  );
};

function createFullMarkup(str) {
  return {
    __html: str.replace(
      redaction.text,
      `<span class="blur">${redaction.text}</span>`
    ),
  };
}
const ProtocolTitle = ({ row, column: { accessor: key } }) => {
  if (row[key].includes(redaction.text)) {
    return (
      <Tooltip
        variant="light"
        title={"Protocol Title"}
        subtitle={
          <div dangerouslySetInnerHTML={createFullMarkup(row[key])}></div>
        }
        placement="top"
        style={{ marginRight: 192 }}
      >
        <span>
          {row &&
          row.screen &&
          (row.screen === "QC" || row.screen === "FollowedProtocols") ? (
            <span className="adjust-ellipses">{row[key]}</span>
          ) : (
            <Link
              to={`/protocols?protocolId=${row["id"]}`}
              dangerouslySetInnerHTML={createFullMarkup(row[key])}
            ></Link>
          )}
        </span>
      </Tooltip>
    );
  }
  return (
    <Tooltip
      variant="light"
      title={"Protocol Title"}
      subtitle={<div>{row[key]}</div>}
      placement="top"
      style={{ marginRight: 192 }}
    >
      <span>
        {row &&
        row.screen &&
        (row.screen === "QC" || row.screen === "FollowedProtocols") ? (
          <span className="adjust-ellipses">{row[key]}</span>
        ) : (
          <Link to={`/protocols?protocolId=${row["id"]}`}>{row[key]}</Link>
        )}
      </span>
    </Tooltip>
  );
};

const Cell = ({ row, column }) => {
  if (row[column.accessor] && row[column.accessor] === redaction.text) {
    return (
      <Tooltip variant="light" title={redaction.hoverText} placement="top">
        <div className="long-text blur" style={{ fontWeight: 800 }}>
          {row[column.accessor]}
        </div>
      </Tooltip>
    );
  } else if (row[column.accessor] && row[column.accessor].length > 15) {
    return (
      <Tooltip variant="light" title={row[column.accessor]} placement="top">
        <div className="long-text" style={{ fontWeight: 800 }}>
          {row[column.accessor]}
        </div>
      </Tooltip>
    );
  } else {
    return <div style={{ fontWeight: 800 }}>{row[column.accessor]}</div>;
  }
};

const ProtocolLink = ({ row, column: { accessor: key } }) => {
  if (row && row.screen && row.screen === "QC") {
    if (row[key] && row[key].length > 25) {
      /*eslint-disable */
      return (
        <Tooltip variant="light" title={row[key]} placement="top">
          <div className="long-text">
            <a
              data-testid={`click-link-${row.protocol}`}
              href="javascript:void(0)"
              onClick={() => row.handleRowProtocolClick(row)}
            >
              {row[key]}
            </a>
          </div>
        </Tooltip>
      );
      /* eslint-enable  */
    }
    return (
      /* eslint-disable  */
      <a
        data-testid={`click-link-${row.protocol}`}
        href="javascript:void(0)"
        onClick={() => row.handleRowProtocolClick(row)}
      >
        {row[key]}
      </a>
    );
  } else if (row && row.screen && row.screen === "FollowedProtocols") {
    if (row[key] && row[key].length > 25) {
      return (
        <Tooltip variant="light" title={row[key]} placement="top">
          <div className="long-text">{row[key]}</div>
        </Tooltip>
      );
    }
    return <span>{row[key]}</span>;
  } else {
    if (row[key] && row[key].length > 25) {
      return (
        <Tooltip variant="light" title={row[key]} placement="top">
          <div className="long-text">
            <Link to={`/protocols?protocolId=${row["id"]}`}>{row[key]}</Link>
          </div>
        </Tooltip>
      );
    }
    return <Link to={`/protocols?protocolId=${row["id"]}`}>{row[key]}</Link>;
  }
};

const qcIconStatus = (status) => {
  switch (status) {
    case "QC Not Started":
      return <Minus />;
    case "QC In Progress":
      return <Clock htmlColor={"orange"} />;
    case "QC Completed":
      return <Check htmlColor={"green"} />;
    default:
      return <Minus />;
  }
};
const iconStatus = (status) => {
  switch (status) {
    case "Digitization In Progress":
      return <Clock htmlColor={"orange"} />;
    case "Upload Complete":
      return <StatusCheck htmlColor={"cornflowerblue"} />;
    case "Extraction In Progress":
      return <Clock htmlColor={"orange"} />;
    case "Digitization Complete":
      return <Check htmlColor={"green"} />;
    case "Digitization Error":
      return <StatusExclamation htmlColor={"red"} />;
    case "Comparison In Progress":
      return <Clock htmlColor={"orange"} />;
    case "QC Review":
      return <User htmlColor={"neutral7"} />;
    default:
      return <StatusExclamation htmlColor={"red"} />;
  }
};

const ActivityCell = ({ row, column: { accessor: key } }) => {
  const statusIcon = iconStatus(row[key]);
  return (
    <Tooltip variant="light" title={row[key]} placement="top">
      <IconButton size="small" data-id={row.id} style={{ marginRight: 4 }}>
        {statusIcon}
      </IconButton>
    </Tooltip>
  );
};

const qcActivityCell = ({ row, column: { accessor: key } }) => {
  const statusIcon = qcIconStatus(row[key]);
  return (
    <Tooltip variant="light" title={row[key]} placement="top">
      <IconButton size="small" data-id={row.id} style={{ marginRight: 4 }}>
        {statusIcon}
      </IconButton>
    </Tooltip>
  );
};

function getColumns(screen) {
  const columns = [
    {
      accessor: "action",
      customCell: ActionCell,
      width: "3%",
    },
    {
      accessor: "uploadDate",
      sortFunction: compareDates,
      width: 0,
      hidden: true,
    },
    {
      header: "Protocol",
      accessor: "protocol",
      sortFunction: compareStrings,
      customCell: ProtocolLink,
      width: "15%",
    },
    {
      header: "PD Activity",
      accessor: "status",
      sortFunction: compareStrings,
      customCell: ActivityCell,
      width: "8%",
    },
    {
      header: "QC Activity",
      accessor: "qcActivity",
      sortFunction: compareStrings,
      customCell: qcActivityCell,
      hidden: screen === "QC" ? true : false,
      width: "8%",
    },
    {
      header: "Sponsor",
      accessor: "sponsor",
      sortFunction: compareStrings,
      width: "15%",
      customCell: Cell,
    },
    {
      header: "Project ID / CRM #",
      accessor: "projectId",
      sortFunction: compareStrings,
      width: "15%",
      customCell: Cell,
    },
    {
      header: "Protocol Title",
      accessor: "protocolTitle",
      sortFunction: compareStrings,
      customCell: ProtocolTitle,
    },
  ];
  return columns;
}

const ExpandableComponent = ({ row }) => {
  const [loader, setLoader] = useState(false);
  const userId1 = useSelector(userId);

  const handleDownload = async (row) => {
    setLoader(true);

    let splitArr = row.documentFilePath.split("\\");
    const fileName = splitArr[splitArr.length - 1];

    const config = {
      url: `${BASE_URL_8000}/api/download_file/?filePath=${encodeURIComponent(
        row.documentFilePath
      )}&userId=qc&protocol=${row.protocol}`,
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
      <div className="expanded-comp">
        <div style={{ width: "10%" }}>
          <Typography
            style={{
              fontWeight: 500,
              color: neutral8,
              marginRight: "20px",
            }}
          >
            {"Phase"}
          </Typography>
          <Typography className="fw-8" variant="body2">
            {row.phase}
          </Typography>
        </div>
        <div className="extended-data" style={{ width: "30%" }}>
          <Typography
            style={{
              fontWeight: 500,
              color: neutral8,
              marginRight: "20px",
            }}
          >
            {"Indication"}
          </Typography>
          {row.indication && row.indication.length > 40 ? (
            <Tooltip
              variant="light"
              title={row.indication && row.indication}
              placement="top"
            >
              <Typography className="fw-8 ex-text" variant="body2">
                {row.indication}
              </Typography>
            </Tooltip>
          ) : (
            <Typography className="fw-8" variant="body2">
              {row.indication ? row.indication : "-"}
            </Typography>
          )}
        </div>
        <div className="extended-data" style={{ width: "15%" }}>
          <Typography
            style={{
              fontWeight: 500,
              color: neutral8,
              marginRight: "20px",
            }}
          >
            {"Document Status"}
          </Typography>
          <Typography
            className="fw-8"
            variant="body2"
            style={{ textTransform: "capitalize" }}
          >
            {row.documentStatus}
          </Typography>
        </div>
        <div>
          <Typography
            style={{
              fontWeight: 500,
              color: neutral8,
              marginRight: "20px",
            }}
          >
            {"Source"}
          </Typography>
          <div className="fw-8" variant="body2">
            {row.fileName ? (
              row.fileName.length > 40 ? (
                <Tooltip
                  variant="light"
                  title={row.fileName && row.fileName}
                  placement="top"
                >
                  <Typography className="fw-8 ex-text" variant="body2">
                    <div
                      className="long-text2"
                      data-testid="handle-download"
                      id="handle-download"
                    >
                      <a
                        href="javascript:void(0)"
                        onClick={() => handleDownload(row)}
                      >
                        {row.fileName}
                      </a>
                    </div>
                  </Typography>
                </Tooltip>
              ) : (
                <a
                  href="javascript:void(0)"
                  onClick={() => handleDownload(row)}
                >
                  {row.fileName}
                </a>
              )
            ) : (
              // eslint-disable-line
              "-"
            )}
          </div>
        </div>
        {/* } */}
      </div>
    </>
  );
};

// const handleDownload = async (row) => {
//   row.dispatch({ type: "HANDLE_DOWNLOAD_SAGA", payload: row.documentFilePath });
// };

const ProtocolTable = ({
  initialRows,
  pageRows,
  screen,
  handleProtocolClick,
  isLoading,
  maxHeight,
  defaultRows,
}) => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(setSelectedProtocols(selectedRows));
  }, [selectedRows]);
  const handleChange = (id) => {
    setSelectedRows((selectedRows) =>
      selectedRows.indexOf(id) >= 0
        ? selectedRows.filter((cid) => cid !== id)
        : concat(selectedRows, id)
    );
  };

  const handleToggleRow = (id) => {
    setExpandedRows((expandedRows) =>
      expandedRows.indexOf(id) >= 0
        ? expandedRows.filter((eid) => eid !== id)
        : concat(expandedRows, id)
    );
  };
  const handleRowProtocolClick = (row) => {
    handleProtocolClick({
      id: row.id,
      path: row.documentFilePath,
      protocol: row.protocol,
    });
  };
  return (
    <div data-testid="protocol-table-wrapper" id="test-div">
      <Table
        columns={getColumns(screen)}
        rows={
          initialRows &&
          initialRows.map((row) => {
            let temp = cloneDeep(row);
            let details = {
              key: row.id,
              expanded: expandedRows.indexOf(row.id) >= 0,
              selected: selectedRows.indexOf(row.id) >= 0,
              handleToggleRow,
              handleRowProtocolClick,
              screen: screen,
              handleChange,
              dispatch,
            };
            return merge(temp, details);
          })
        }
        initialSortedColumn="uploadDate"
        initialSortOrder="desc"
        isLoading={isLoading}
        rowsPerPageOptions={pageRows}
        rowProps={{ hover: false }}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `Showing ${from}-${to} of ${count}`,
          truncate: true,
        }}
        ExpandableComponent={ExpandableComponent}
        defaultRowsPerPage={defaultRows}
        hasScroll
        maxHeight={maxHeight}
      />
    </div>
  );
};

export default ProtocolTable;
