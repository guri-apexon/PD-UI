import Card from 'apollo-react/components/Card/Card';
import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import React, { useState } from 'react';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Table, {
  compareNumbers,
  compareStrings,
} from 'apollo-react/components/Table';
import TextField from 'apollo-react/components/TextField';
import Tooltip from 'apollo-react/components/Tooltip';
import PropTypes from 'prop-types';
import Pencil from 'apollo-react-icons/Pencil';
import initialRows from './Records.json';
import './MetaData.scss';

function ActionCell({ row }) {
  const {
    employeeId,
    onRowEdit,
    onRowSave,
    editMode,
    onCancel,
    editedRow,
    onDelete,
  } = row;
  const menuItems = [
    {
      text: 'Edit',
      onClick: () => onRowEdit(employeeId),
    },
    {
      text: 'Delete',
      onClick: () => onDelete(employeeId),
    },
  ];

  return editMode ? (
    <div style={{ marginTop: 8, whiteSpace: 'nowrap' }}>
      <Button size="small" style={{ marginRight: 8 }} onClick={onCancel}>
        Cancel
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
        Save
      </Button>
    </div>
  ) : (
    <Tooltip title="Actions" disableFocusListener>
      <IconMenuButton id="actions" menuItems={menuItems} size="small">
        <EllipsisVerticalIcon />
      </IconMenuButton>
    </Tooltip>
  );
}

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

const fieldStyles = {
  style: {
    marginTop: 3,
    marginLeft: -8,
  },
};

function EditableCell({ row, column: { accessor: key } }) {
  return row.editMode ? (
    <TextField
      size="small"
      fullWidth
      value={row.editedRow[key]}
      onChange={(e) => row.editRow(key, e.target.value)}
      error={!row.editedRow[key]}
      helperText={!row.editedRow[key] && 'Required'}
      {...fieldStyles}
    />
  ) : (
    row[key]
  );
}

function MetaData() {
  const [rows, setRows] = useState(initialRows);
  const [editedRow, setEditedRow] = useState({});

  const onRowEdit = (employeeId) => {
    setEditedRow(rows.find((row) => row.employeeId === employeeId));
  };

  const onRowSave = () => {
    setRows(
      rows.map((row) =>
        row.employeeId === editedRow.employeeId ? editedRow : row,
      ),
    );
    setEditedRow({});
  };

  const onCancel = () => {
    setEditedRow({});
  };

  const onDelete = (employeeId) => {
    setRows(rows.filter((row) => row.employeeId !== employeeId));
  };

  const editRow = (key, value) => {
    setEditedRow({ ...editedRow, [key]: value });
  };
  const columns = [
    {
      header: 'Header',
      accessor: 'header',
      sortFunction: compareNumbers,
      customCell: Cell,
    },
    {
      header: 'Description',
      accessor: 'name',
      sortFunction: compareStrings,
      customCell: EditableCell,
    },

    {
      accessor: 'action',
      customCell: ActionCell,
      // align: 'right',
    },
  ];

  return (
    <Card
      className="protocol-column protocol-digitize-column"
      style={{ borderRight: '0' }}
    >
      <div className="panel-heading" data-testid="header">
        MetaData View
      </div>
      <div
        className="digitize-panel-content"
        data-testid="protocol-column-wrapper"
      >
        <div>
          <Pencil />
        </div>
        <Table
          className="table-panel"
          columns={columns}
          rows={rows.map((row) => ({
            ...row,
            onRowEdit,
            onRowSave,
            onCancel,
            onDelete,
            editRow,
            editMode: editedRow.employeeId === row.employeeId,
            editedRow,
          }))}
          rowId="employeeId"
          initialSortedColumn="name"
          initialSortOrder="asc"
          hidePagination
          hasScroll
          rowProps={{ hover: false }}
          stripedRows
        />
      </div>
    </Card>
  );
}

MetaData.propTypes = {
  // eslint-disable-next-line react/require-default-props
  // handleRightBlade: PropTypes.func,
};

EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

Cell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

ActionCell.propTypes = {
  row: PropTypes.isRequired,
};

export default MetaData;
