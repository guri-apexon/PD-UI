import React from "react";
// import moment from "moment";

import Cog from "apollo-react-icons/Cog";
import Pencil from "apollo-react-icons/Pencil";
import Trash from "apollo-react-icons/Trash";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "apollo-react/components/IconButton";
import Button from "apollo-react/components/Button";
import {
  compareDates,
  compareStrings,
  createStringSearchFilter,
  createSelectFilterComponent,
} from "apollo-react/components/Table";
import TextField from "apollo-react/components/TextField";
import MenuItem from "apollo-react/components/MenuItem";
import Select from "apollo-react/components/Select";

const fieldStyles = {
  style: {
    marginTop: 3,
    marginLeft: -8,
  },
};

// const DateCell = ({ row, column: { accessor } }) => {
//   const rowValue = row[accessor];
//   const date =
//     rowValue && moment(rowValue).isValid()
//       ? moment(rowValue).format("MM/DD/YYYY")
//       : rowValue;

//   return <div style={{ paddingTop: "12px" }}>{date}</div>;
// };

const ActionCell = ({ row }) => {
  const {
    username,
    onRowEdit,
    onRowSave,
    editMode,
    onCancel,
    editedRow,
    onDelete,
  } = row;
  return editMode ? (
    <div style={{ marginTop: 8, whiteSpace: "nowrap" }}>
      <Button size="small" style={{ marginRight: 8 }} onClick={onCancel}>
        {"Cancel"}
      </Button>
      <Button
        size="small"
        variant="primary"
        onClick={onRowSave}
        disabled={
          Object.values(editedRow).some((item) => !item) ||
          (editMode &&
            !Object.keys(editedRow).some((key) => editedRow[key] !== row[key]))
        }
      >
        {"Save"}
      </Button>
    </div>
  ) : (
    <div>
      <span>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => onRowEdit(username)}
            data-id={row.username}
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
            onClick={() => onDelete(username)}
            data-id={row.username}
          >
            <Trash />
          </IconButton>
        </Tooltip>
      </span>
    </div>
  );
};

const TextFieldFilter = ({ accessor, filters, updateFilterValue }) => {
  return (
    <TextField
      value={filters[accessor]}
      name={accessor}
      onChange={updateFilterValue}
      margin="none"
      size="small"
      data-testid={accessor}
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

const EditableCell = ({ row, column: { accessor: key } }) =>
  row.editMode ? (
    <TextField
      size="small"
      fullWidth
      value={row.editedRow[key]}
      onChange={(e) => row.editRow(key, e.target.value)}
      error={!row.editedRow[key]}
      helperText={!row.editedRow[key] && "Required"}
      {...fieldStyles}
    />
  ) : (
    row[key]
  );

const makeEditableSelectCell =
  (options) =>
  ({ row, column: { accessor: key } }) =>
    row.editMode ? (
      <Select
        size="small"
        fullWidth
        canDeselect={false}
        value={row.editedRow[key]}
        onChange={(e) => row.editRow(key, e.target.value)}
        {...fieldStyles}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    ) : (
      row[key]
    );

const Cell = ({ row, column }) => (
  <div style={{ paddingTop: row.editMode ? 12 : 0 }}>
    {row[column.accessor]}
  </div>
);

const columns = [
  {
    header: "User ID",
    accessor: "username",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("username"),
    filterComponent: TextFieldFilter,
    width: 90,
    customCell: Cell,
  },
  {
    header: "First Name",
    accessor: "first_name",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("first_name"),
    filterComponent: TextFieldFilter,
    customCell: EditableCell,
  },
  {
    header: "Last Name",
    accessor: "last_name",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("last_name"),
    filterComponent: TextFieldFilter,
    customCell: EditableCell,
  },
  {
    header: "Email",
    accessor: "email",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("email"),
    filterComponent: TextFieldFilter,
    customCell: EditableCell,
  },
  {
    header: "Country",
    accessor: "country",
    sortFunction: compareStrings,
    filterFunction: createStringSearchFilter("country"),
    filterComponent: TextFieldFilter,
    customCell: EditableCell,
    width: 120,
  },
  {
    header: "Created Date",
    accessor: "date_of_registration",
    sortFunction: compareDates,
    customCell: Cell,
    width: 120,
  },
  {
    header: "User Role",
    accessor: "user_type",
    sortFunction: compareStrings,
    filterFunction: createStringArraySearchFilter("user_type"),
    filterComponent: createSelectFilterComponent(
      ["normal", "QC1", "QC2", "admin"],
      { size: "small", multiple: true }
    ),
    customCell: makeEditableSelectCell(["normal", "QC1", "QC2", "admin"]),
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
