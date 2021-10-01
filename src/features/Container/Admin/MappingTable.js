import React from "react";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import Table from "apollo-react/components/Table";
import { compareStrings, compareDates } from "apollo-react/components/Table";
import { protocolMap } from "./adminSlice";
import Cog from "apollo-react-icons/Cog";
import Trash from "apollo-react-icons/Trash";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "apollo-react/components/IconButton";

const FollowCell = ({ row, column }) => (row[column.accessor] ? "Yes" : "No");

const DateCell = ({ row, column }) =>
  moment(row[column.accessor]).format("MM/DD/YYYY");

const ActionCell = ({ row }) => {
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={() =>
            row.onDelete({ userId: row.userId, protocol: row.protocol })
          }
          data-id={row.userId}
        >
          <Trash />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const columns = [
  {
    header: "User ID",
    accessor: "userId",
    sortFunction: compareStrings,
  },
  {
    header: "Protocol",
    accessor: "protocol",
    sortFunction: compareStrings,
  },
  {
    header: "Role",
    accessor: "userRole",
    sortFunction: compareStrings,
  },
  {
    header: "Following",
    accessor: "follow",
    sortFunction: compareStrings,
    customCell: FollowCell,
  },
  {
    header: "Created Date",
    accessor: "timeCreated",
    sortFunction: compareDates,
    customCell: DateCell,
  },
  {
    header: "Updated Date",
    accessor: "lastUpdated",
    sortFunction: compareDates,
    customCell: DateCell,
  },
  {
    header: <Cog size="small" />,
    accessor: "action",
    customCell: ActionCell,
    align: "center",
  },
];

const MappingTable = () => {
  const dispatch = useDispatch();
  const initialRows = useSelector(protocolMap);

  const onDelete = ({ userId, protocol }) => {
    let confirmBox = window.confirm(
      "Do you want to delete the Selected Mapping?"
    );
    if (confirmBox) {
      dispatch({
        type: "DELETE_USER_PROTOCOL_MAPPING",
        payload: { userId: userId, protocol: protocol },
      });
    }
  };

  return (
    <div style={{ overflowX: "auto", paddingTop: 20 }}>
      <Table
        columns={columns}
        rows={initialRows.map((row) => ({
          ...row,
          onDelete,
          key: row.uid,
        }))}
        initialSortedColumn="lastUpdated"
        initialSortOrder="desc"
        rowsPerPageOptions={[5, 10, 15, "All"]}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `Mapping ${from}-${to} of ${count}`,
          truncate: true,
        }}
      />
    </div>
  );
};

export default MappingTable;
