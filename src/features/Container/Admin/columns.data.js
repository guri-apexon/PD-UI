import React from "react";
import moment from "moment";

import Cog from "apollo-react-icons/Cog";
import Pencil from "apollo-react-icons/Pencil";
import Trash from "apollo-react-icons/Trash";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "apollo-react/components/IconButton";
import {
  compareDates,
  compareStrings,
  createStringSearchFilter,
  createSelectFilterComponent,
} from "apollo-react/components/Table";
import TextField from "apollo-react/components/TextField";

export const IntegerFilter = ({ accessor, filters, updateFilterValue }) => {
  return (
    <TextField
      value={filters[accessor]}
      name={accessor}
      onChange={updateFilterValue}
      type="number"
      style={{ width: 74 }}
      margin="none"
      size="small"
    />
  );
};

const DateCell = ({ row, column: { accessor } }) => {
  const rowValue = row[accessor];
  const date =
    rowValue && moment(rowValue, "MM/DD/YYYY").isValid()
      ? moment(rowValue, "MM/DD/YYYY").format("M/D/YYYY")
      : rowValue;

  return <div style={{ paddingTop: "12px" }}>{date}</div>;
};

const ActionCell = ({ row }) => (
  <div>
    <span>
      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={() => console.log("edit")}
          data-id={row.userId}
          style={{ marginRight: 4 }}
        >
          <Pencil />
        </IconButton>
      </Tooltip>
    </span>
    <span>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          onClick={() => console.log("delete")}
          data-id={row.userId}
        >
          <Trash />
        </IconButton>
      </Tooltip>
    </span>
  </div>
);

const TextFieldFilter = ({ accessor, filters, updateFilterValue }) => {
  return (
    <TextField
      value={filters[accessor]}
      name={accessor}
      onChange={updateFilterValue}
      margin="none"
      size="small"
    />
  );
};

export function createStringArraySearchFilter(accessor) {
  return (row, filters) =>
    !Array.isArray(filters[accessor]) ||
    filters[accessor].length === 0 ||
    filters[accessor].some(
      (value) => value.toUpperCase() === row[accessor].toUpperCase()
    );
}

const Cell = ({ row, column }) => (
  <div style={{ paddingTop: row.editMode ? 12 : 0 }}>
    {row[column.accessor]}
  </div>
);

const columns = [
  {
    header: "User ID",
    accessor: "userId",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("userId"),
    filterComponent: TextFieldFilter,
    width: 90,
    customCell: Cell,
  },
  {
    header: "First Name",
    accessor: "firstName",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("firstName"),
    filterComponent: TextFieldFilter,
    // customCell: EditableCell,
  },
  {
    header: "Last Name",
    accessor: "lastName",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("lastName"),
    filterComponent: TextFieldFilter,
    // customCell: EditableCell,
  },
  {
    header: "Email",
    accessor: "email",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("email"),
    filterComponent: TextFieldFilter,
    // customCell: EditableCell,
  },
  {
    header: "Country",
    accessor: "country",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("country"),
    filterComponent: TextFieldFilter,
    // customCell: EditableCell,
    width: 120,
  },
  {
    header: "Created Date",
    accessor: "createdDate",
    sortFunction: compareDates,
    customCell: DateCell,
    width: 120,
  },
  {
    header: "User Role",
    accessor: "userType",
    sortFunction: compareStrings,
    filterFunction: createStringArraySearchFilter("userType"),
    filterComponent: createSelectFilterComponent(
      ["normal", "QC1", "QC2", "admin"],
      { size: "small", multiple: true }
    ),
    // customCell: makeEditableSelectCell(["normal", "QC1", "QC2", "admin"]),
    width: 120,
  },
  {
    header: <Cog size="small" />,
    accessor: "action",
    customCell: ActionCell,
    align: "center",
    width: 120,
  },
];

export default columns;
