import _ from "lodash";
import React, { useState, useEffect } from "react";
import ChevronDown from "apollo-react-icons/ChevronDown";
import ChevronRight from "apollo-react-icons/ChevronRight";
import Clock from "apollo-react-icons/Clock";
import Upload from "apollo-react-icons/Upload";
import StatusCheck from "apollo-react-icons/StatusCheck";
import StatusExclamation from "apollo-react-icons/StatusExclamation";
import Check from "apollo-react-icons/Check";
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
import axios from "axios";

import "./ProtocolTable.scss";

const ActionCell = ({
  row: { id, handleToggleRow, expanded, selected, handleChange },
}) => {
  return (
    <div>
      {/* <div className="table-selection">
        <Checkbox
          label=""
          checked={selected}
          onChange={() => handleChange(id)}
        />
      </div> */}
      <div className="table-selection">
        {/* <Tooltip title="Expand" disableFocusListener> */}
          <IconButton
            id="expand"
            size="small"
            onClick={() => handleToggleRow(id)}
          >
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </IconButton>
        {/* </Tooltip> */}
      </div>
    </div>
  );
};

const ProtocolTitle = ({ row, column: { accessor: key } }) => {
  return (
    <Tooltip
      variant="light"
      title={"Protocol Title"}
      subtitle={row[key]}
      placement="top"
      style={{ marginRight: 192 }}
    >
      <span>
        <Link to={`/protocols?protocolId=${row["id"]}`}>{row[key]}</Link>
      </span>
    </Tooltip>
  );
};

const Cell = ({ row, column }) => {
  if (row[column.accessor] && row[column.accessor].length > 25) {
    return (
      <Tooltip variant="light" title={row[column.accessor]} placement="top">
        <div className="long-text" style={{ fontWeight: 800 }}>
          {row[column.accessor]}
        </div>
      </Tooltip>
    );
  }

  return <div style={{ fontWeight: 800 }}>{row[column.accessor]}</div>;
};

const ProtocolLink = ({ row, column: { accessor: key } }) => {
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
};

const iconStatus = (status) => {
  switch (status) {
    case "DIGITIZER1_STARTED":
    case "DIGITIZER2_STARTED":
    case "DIGITIZER1_COMPLETED":
    case "DIGITIZER2_COMPLETED":
    case "DIGITIZER2_OMOPUPDATE_STARTED":
    case "DIGITIZER2_OMOPUPDATE_COMPLETED":
    case "I2E_OMOP_UPDATE_STARTED":
    case "I2E_OMOP_UPDATE_COMPLETED":
      return {
        comp: <Clock htmlColor={"orange"} />,
        title: "Digitization In Progress",
      };
    case "TRIAGE_STARTED":
    case "TRIAGE_COMPLETED":
      return {
        comp: <StatusCheck htmlColor={"cornflowerblue"} />,
        title: "Upload Complete",
      };
    case "EXTRACTION_STARTED":
    case "EXTRACTION_COMPLETED":
    case "FINALIZATION_STARTED":
    case "FINALIZATION_COMPLETED":
      return {
        comp: <Clock htmlColor={"orange"} />,
        title: "Extraction In Progress",
      };
    case "PROCESS_COMPLETED":
      return {
        comp: <Check htmlColor={"green"} />,
        title: "Digitization Complete",
      };
    case "ERROR":
      return {
        comp: <StatusExclamation htmlColor={"red"} />,
        title: "Extraction Error",
      };
    case "COMPARISON_STARTED":
    case "COMPARISON_COMPLETED":
      return {
        comp: <Clock htmlColor={"orange"} />,
        title: "Comparison In Progress",
      };
    default:
      return {
        comp: <StatusExclamation htmlColor={"red"} />,
        title: "Extraction Error",
      };
  }
};

const ActivityCell = ({ row, column: { accessor: key } }) => {
  const status = iconStatus(row[key]);
  return (
    <Tooltip variant="light" title={status && status.title} placement="top">
      <IconButton size="small" data-id={row.id} style={{ marginRight: 4 }}>
        {status && status.comp}
      </IconButton>
    </Tooltip>
  );
};
const columns = [
  {
    accessor: "action",
    customCell: ActionCell,
    width: "3%",
  },
  {
    accessor: "uploadDate",
    sortFunction: compareDates,
    width: "0%",
  },
  {
    header: "Protocol",
    accessor: "protocol",
    sortFunction: compareStrings,
    customCell: ProtocolLink,
    width: "15%",
  },
  {
    header: "Activity",
    accessor: "status",
    sortFunction: compareStrings,
    customCell: ActivityCell,
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
    width: "13%",
    customCell: Cell,
  },
  {
    header: "Protocol Title",
    accessor: "protocolTitle",
    sortFunction: compareStrings,
    customCell: ProtocolTitle,
  },
];

const ExpandableComponent = ({ row }) => {
  return (
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
      <div className="extended-data" style={{width: '30%'}}>
        <Typography
          style={{
            fontWeight: 500,
            color: neutral8,
            marginRight: "20px",
          }}
        >
          {"Indication"}
        </Typography>
        {row.indication.length > 40 ? (
          <Tooltip variant="light" title={row.indication} placement="top">
            <Typography className="fw-8 ex-text" variant="body2">
              {row.indication}
            </Typography>
          </Tooltip>
        ) : (
          <Typography className="fw-8" variant="body2">
            {row.indication}
          </Typography>
        )}
      </div>
      <div className="extended-data" style={{width: '15%'}}>
        <Typography
          style={{
            fontWeight: 500,
            color: neutral8,
            marginRight: "20px",
          }}
        >
          {"Document Status"}
        </Typography>
        <Typography className="fw-8" variant="body2">
          {row.documentStatus}
        </Typography>
      </div>
      {/* {row.fileName &&  */}
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
        <Typography className="fw-8" variant="body2">
          {row.fileName ? (
            // <Link to={row.documentFilePath} target="_blank">
            //   {row.fileName}
            // </Link>
            <a href="javascript:void(0)" onClick={() => handleDownload(row)}>
              {row.fileName}
            </a> // eslint-disable-line
          ) : (
            "-"
          )}
        </Typography>
      </div>
      {/* } */}
    </div>
  );
};

const handleDownload = async (row) => {
  let url;
  console.log("Rows", row);
  const resp = await axios.get(
    `http://ca2spdml01q:8000/api/download_file/?filePath=${row.documentFilePath}`
  );

  url = `http://ca2spdml06d:3000/${resp.data}`;
  window.open(
    url,
    "_blank" // <- This is what makes it open in a new window.
  );
  // console.log(url);
};

const ProtocolTable = ({ initialRows, pageRows }) => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // const handleChange = (id) => {
  //   setSelectedRows((selectedRows) =>
  //     selectedRows.indexOf(id) >= 0
  //       ? selectedRows.filter((cid) => cid !== id)
  //       : selectedRows.length < 2
  //       ? _.concat(selectedRows, id)
  //       : _.concat(selectedRows)
  //   );
  // };

  const handleToggleRow = (id) => {
    setExpandedRows((expandedRows) =>
      expandedRows.indexOf(id) >= 0
        ? expandedRows.filter((eid) => eid !== id)
        : _.concat(expandedRows, id)
    );
  };

  // useEffect(() => {
  //   dispatch({ type: "CHECK_COMPARE_SAGA", payload: selectedRows.length });
  // }, [selectedRows]);
  // console.log('initial-rows', initialRows, pageRows);
  return (
    <div data-testid="protocol-table-wrapper" id="test-div">
      <Table
        title="My Protocols"
        columns={columns}
        rows={
          initialRows &&
          initialRows.map((row) => {
            let temp = _.cloneDeep(row);
            let details = {
              key: row.id,
              expanded: expandedRows.indexOf(row.id) >= 0,
              selected: selectedRows.indexOf(row.id) >= 0,
              handleToggleRow,
              // handleChange,
            };
            return _.merge(temp, details);
          })
        }
        initialSortedColumn="uploadDate"
        initialSortOrder="desc"
        rowsPerPageOptions={pageRows}
        rowProps={{ hover: false }}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `Showing ${from}-${to} of ${count}`,
          truncate: true,
        }}
        ExpandableComponent={ExpandableComponent}
      />
    </div>
  );
};

export default ProtocolTable;
