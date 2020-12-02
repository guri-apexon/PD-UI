import ChevronDown from "apollo-react-icons/ChevronDown";
import ChevronRight from "apollo-react-icons/ChevronRight";
import Clock from "apollo-react-icons/Clock";
import Upload from "apollo-react-icons/Upload";
import StatusCheck from "apollo-react-icons/StatusCheck";
import StatusExclamation from "apollo-react-icons/StatusExclamation";
import Check from "apollo-react-icons/Check";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Link from "apollo-react/components/Link";
import Checkbox from "apollo-react/components/Checkbox";
import { neutral7, neutral8 } from "apollo-react/colors";
import DatePicker from "apollo-react/components/DatePickerV2";
import IconButton from "apollo-react/components/IconButton";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";
import Table, {
  compareNumbers,
  compareStrings,
} from "apollo-react/components/Table";
// import TextField from "apollo-react/components/TextField";
import Tooltip from "apollo-react/components/Tooltip";
import Typography from "apollo-react/components/Typography";

import "./ProtocolTable.scss";

const ActionCell = ({
  row: { protocolId, handleToggleRow, expanded, selected, handleChange },
}) => {
  return (
    <div>
      <div className="table-selection">
        <Checkbox
          label=""
          checked={selected}
          onChange={() => handleChange(protocolId)}
        />
      </div>
      <div className="table-selection">
        <Tooltip title="Expand" disableFocusListener>
          <IconButton
            id="expand"
            size="small"
            onClick={() => handleToggleRow(protocolId)}
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
        <Link
          onClick={() => console.log("link clicked")}
          className="protocol-table test"
        >
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
  <Link onClick={() => console.log("link clicked")}>{row[key]}</Link>
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
        data-id={row.protocolId}
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
    accessor: "protocolName",
    sortFunction: compareStrings,
    customCell: ProtocolLink,
    width: "15%",
  },
  {
    header: "Activity",
    accessor: "uploadStatus",
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
    width: "10%",
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
    <div style={{ display: "flex", padding: "8px 0px 8px 8px", backgroundColor:  'white', marginLeft: '3%'}}>
      <div style={{ width: '20%' }}>
        <Typography style={{ fontWeight: 500, color: neutral8, float: 'left', marginRight: '20px' }}>
          {"Phase:"}
        </Typography>
        <Typography style={{ fontWeight: 800 }} variant="body2">
          {row.phase}
        </Typography>
      </div>
      <div style={{ marginLeft: 32, width: '20%' }}>
        <Typography style={{ fontWeight: 500, color: neutral8, float: 'left', marginRight: '20px' }}>
          {"Indication:"}
        </Typography>
        <Typography style={{ fontWeight: 800 }} variant="body2">
          {row.indication}
        </Typography>
      </div>
      <div style={{ marginLeft: 32, width: '50%' }}>
        <Typography style={{ fontWeight: 500, color: neutral8, float: 'left', marginRight: '20px' }}>
          {"Document Status:"}
        </Typography>
        <Typography style={{ fontWeight: 800 }} variant="body2">
          {row.documentStatus}
        </Typography>
      </div>
    </div>
  );
};

const ProtocolTable = ({ initialRows }) => {
  const dispatch = useDispatch();
  const [expandedRows, setExpandedRows] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const handleChange = (protocolId) => {
    setSelectedRows((selectedRows) =>
      selectedRows.indexOf(protocolId) >= 0
        ? selectedRows.filter((id) => id !== protocolId)
        : selectedRows.length < 2
        ? [...selectedRows, protocolId]
        : [...selectedRows]
    );
  };


  // const newRows = initialRows.map((row, i) => ({
  //   ...row,
  //   description: `${row.name} is an amazing ${row.dept}`,
  //   birthday: moment(row.hireDate).subtract(23, "years"),
  //   skillLevel: 3,
  // }));

  const handleToggleRow = (protocolId) => {
    setExpandedRows((expandedRows) =>
      expandedRows.indexOf(protocolId) >= 0
        ? expandedRows.filter((id) => id !== protocolId)
        : [...expandedRows, protocolId]
    );
  };

  useEffect(() => {
   console.log('selectedRows', selectedRows);
   dispatch({ type: "CHECK_COMPARE_SAGA", payload: selectedRows.length });
}, [selectedRows]);

  return (
    <Table
      title="My Protocols"
      columns={columns}
      rows={initialRows.map((row) => ({
        ...row,
        key: row.protocolId,
        expanded: expandedRows.indexOf(row.protocolId) >= 0,
        selected: selectedRows.indexOf(row.protocolId) >= 0,
        handleToggleRow,
        handleChange,
      }))}
      initialSortedColumn="protocolName"
      initialSortOrder="asc"
      rowsPerPageOptions={[5, 20, 30]}
      rowProps={{ hover: false }}
      tablePaginationProps={{
        labelDisplayedRows: ({ from, to, count }) =>
          `Showing ${from}-${to} of ${count}`,
      }}
      ExpandableComponent={ExpandableComponent}
    />
  );
};

export default ProtocolTable;
