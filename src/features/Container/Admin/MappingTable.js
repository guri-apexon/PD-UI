import React from "react";
import moment from "moment-timezone";
import { useDispatch } from "react-redux";
import Loader from "apollo-react/components/Loader";
import Table from "apollo-react/components/Table";
import { compareStrings, compareDates } from "apollo-react/components/Table";
import Cog from "apollo-react-icons/Cog";
import Trash from "apollo-react-icons/Trash";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "apollo-react/components/IconButton";

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
          data-testid={`delete-${row.id}`}
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

const MappingTable = ({ initialRows, loader }) => {
  const dispatch = useDispatch();

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
      {loader ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          rows={initialRows.map((row) => ({
            ...row,
            onDelete,
            key: row.id,
          }))}
          initialSortedColumn="lastUpdated"
          initialSortOrder="desc"
          rowsPerPageOptions={[5, 10, 15, "All"]}
          tablePaginationProps={{
            labelDisplayedRows: ({ from, to, count }) =>
              `Mapping ${from}-${to} of ${count}`,
            truncate: true,
          }}
          hasScroll
          maxHeight={345}
        />
      )}
    </div>
  );
};

export default MappingTable;
