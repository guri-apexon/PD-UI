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
import Table, { compareStrings } from "apollo-react/components/Table";
import Tooltip from "apollo-react/components/Tooltip";
import Typography from "apollo-react/components/Typography";

import "./ProtocolTable.scss";

const ActionCell = ({
  row: { protocol_id, handleToggleRow, expanded, selected, handleChange },
}) => {
  return (
    <div>
      <div className="table-selection">
        <Checkbox
          label=""
          checked={selected}
          onChange={() => handleChange(protocol_id)}
        />
      </div>
      <div className="table-selection">
        <Tooltip title="Expand" disableFocusListener>
          <IconButton
            id="expand"
            size="small"
            onClick={() => handleToggleRow(protocol_id)}
          >
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </IconButton>
        </Tooltip>
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
        <Link to={`/protocols?protocolId=${row["protocol_id"]}`}>
          {row[key]}
        </Link>
      </span>
    </Tooltip>
  );
};

const Cell = ({ row, column }) => (
  <div style={{ fontWeight: 800 }}>{row[column.accessor]}</div>
);

const ProtocolLink = ({ row, column: { accessor: key } }) => (
  <Link to={`/protocols?protocolId=${row["protocol_id"]}`}>{row[key]}</Link>
);

const iconStatus = (status) => {
  switch (status) {
    case "uploadInProgress":
      return {
        comp: <Upload htmlColor={"orange"} />,
        title: "Upload In Progress",
      };
    case "uploadComplete":
      return {
        comp: <StatusCheck htmlColor={"cornflowerblue"} />,
        title: "Upload Complete",
      };
    case "extractionInProgress":
      return {
        comp: <Clock htmlColor={"orange"} />,
        title: "Extraction In Progress",
      };
    case "digitizationComplete":
      return {
        comp: <Check htmlColor={"green"} />,
        title: "Digitization Complete",
      };
    case "extractionError":
      return {
        comp: <StatusExclamation htmlColor={"red"} />,
        title: "Extraction Error",
      };
    case "final":
      return { comp: <Check htmlColor={"green"} />, title: "" };
  }
};

const ActivityCell = ({ row, column: { accessor: key } }) => {
  const status = iconStatus(row[key]);
  return (
    <Tooltip variant="light" title={status.title} placement="top">
      <IconButton
        size="small"
        data-id={row.protocol_id}
        style={{ marginRight: 4 }}
      >
        {status.comp}
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
    header: "Protocol",
    accessor: "protocol_name",
    sortFunction: compareStrings,
    customCell: ProtocolLink,
    width: "15%",
  },
  {
    header: "Activity",
    accessor: "protocol_document_status",
    sortFunction: compareStrings,
    customCell: ActivityCell,
    width: "8%",
  },
  {
    header: "Sponsor",
    accessor: "protocol_sponsor",
    sortFunction: compareStrings,
    width: "15%",
    customCell: Cell,
  },
  {
    header: "Project ID / CRM #",
    accessor: "project_id",
    sortFunction: compareStrings,
    width: "10%",
    customCell: Cell,
  },
  {
    header: "Protocol Title",
    accessor: "protocol_title",
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
      <div className="extended-data">
        <Typography
          style={{
            fontWeight: 500,
            color: neutral8,
            marginRight: "20px",
          }}
        >
          {"Indication"}
        </Typography>
        <Typography className="fw-8" variant="body2">
          {row.indication}
        </Typography>
      </div>
      <div className="extended-data">
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
          {row.protocol_document_status}
        </Typography>
      </div>
      <div className="extended-data">
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
          <a href={row.protocol_document_path} target="_blank">
            {row.protocol_document_name}
          </a>
        </Typography>
      </div>
    </div>
  );
};

const ProtocolTable = ({ initialRows }) => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleChange = (protocol_id) => {
    setSelectedRows((selectedRows) =>
      selectedRows.indexOf(protocol_id) >= 0
        ? selectedRows.filter((id) => id !== protocol_id)
        : selectedRows.length < 2
        ? _.concat(selectedRows, protocol_id)
        : _.concat(selectedRows)
    );
  };

  const handleToggleRow = (protocol_id) => {
    setExpandedRows((expandedRows) =>
      expandedRows.indexOf(protocol_id) >= 0
        ? expandedRows.filter((id) => id !== protocol_id)
        : _.concat(expandedRows, protocol_id)
    );
  };

  useEffect(() => {
    dispatch({ type: "CHECK_COMPARE_SAGA", payload: selectedRows.length });
  }, [selectedRows]);

  return (
    <Table
      title="My Protocols"
      columns={columns}
      rows={initialRows.map((row) => {
        let temp = _.cloneDeep(row);
        let details = {
          key: row.protocol_id,
          expanded: expandedRows.indexOf(row.protocol_id) >= 0,
          selected: selectedRows.indexOf(row.protocol_id) >= 0,
          handleToggleRow,
          handleChange,
        };
        return _.merge(temp, details);
      })}
      initialSortedColumn="protocol_name"
      initialSortOrder="asc"
      rowsPerPageOptions={[5, 20, 30, 'All']}
      rowProps={{ hover: false }}
      tablePaginationProps={{
        labelDisplayedRows: ({ from, to, count }) =>
          `Showing ${from}-${to} of ${count}`,
          truncate: true,
      }}
      ExpandableComponent={ExpandableComponent}
    />
  );
};

export default ProtocolTable;
