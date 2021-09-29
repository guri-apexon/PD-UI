import React from "react";
import { useDispatch, useSelector } from "react-redux";

// import Button from "apollo-react/components/Button";
import Table from "apollo-react/components/Table";
// import columns from "./colums.data";
import { compareStrings, compareDates } from "apollo-react/components/Table";
import { getProtocolMap, protocolMap } from "./adminSlice";
import Cog from "apollo-react-icons/Cog";
import Trash from "apollo-react-icons/Trash";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "apollo-react/components/IconButton";
// import initialRows from "./rows.data";

const FollowCell = ({ row, column }) =>
  row[column.accessor] === "1" ? "Yes" : "No";

const ActionCell = ({ row }) => {
  return (
    <div>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={() => row.onDelete(row.id)}
          data-id={row.id}
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
  },
  {
    header: "Updated Date",
    accessor: "lastUpdated",
    sortFunction: compareDates,
  },
  {
    header: <Cog size="small" />,
    accessor: "action",
    customCell: ActionCell,
    align: "center",
  },
];

const MappingTable = () => {
  // const [rows, setRows] = useState(initialRows);
  const dispatch = useDispatch();
  const initialRows = useSelector(protocolMap);

  const onDelete = (userId) => {
    let confirmBox = window.confirm("Are you sure!\nThe user will be deleted");
    if (confirmBox) {
      dispatch(getProtocolMap(initialRows.filter((row) => row.id !== userId)));
    }
  };

  return (
    <div style={{ overflowX: "auto", paddingTop: 20 }}>
      <Table
        columns={columns}
        rows={initialRows.map((row) => ({
          ...row,
          onDelete,
          key: row.id,
        }))}
        // onChange={(e) => console.log(e)}
        initialSortedColumn="lastUpdated"
        initialSortOrder="desc"
        rowsPerPageOptions={[5, 10, 15, "All"]}
        tablePaginationProps={{
          labelDisplayedRows: ({ from, to, count }) =>
            `${count === 1 ? "User" : "Users"} ${from}-${to} of ${count}`,
          truncate: true,
        }}
        // showFilterIcon
        // CustomHeader={(props) => (
        //   <CustomButtonHeader setIsOpen={setIsOpen} {...props} />
        // )}
      />
    </div>
  );
};

export default MappingTable;
