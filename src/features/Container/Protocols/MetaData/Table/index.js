/* eslint-disable */
import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Tooltip from 'apollo-react/components/Tooltip';
import Table from 'apollo-react/components/Table';
import React, { useState, useEffect } from 'react';
import Button from 'apollo-react/components/Button';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import TextField from 'apollo-react/components/TextField';

const ActionCell = ({ row }) => {
  const { id, onRowEdit, onRowSave, editMode, onCancel, editedRow, onDelete } =
    row;
  const menuItems = [
    {
      text: 'Edit',
      onClick: () => onRowEdit(id),
    },
    {
      text: 'Delete',
      onClick: () => onDelete(id),
    },
  ];

  return editMode ? (
    <div style={{ marginTop: 8, whiteSpace: 'nowrap' }}>
      <Button size="small" style={{ marginRight: 8 }} onClick={onCancel}>
        {'Cancel'}
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
        {'Save'}
      </Button>
    </div>
  ) : (
    <Tooltip title="Actions" disableFocusListener>
      <IconMenuButton id="actions" menuItems={menuItems} size="small">
        <EllipsisVerticalIcon />
      </IconMenuButton>
    </Tooltip>
  );
};
const AllCell = ({ row, column: { accessor } }) => {
  const width = accessor === 'assessment_text' || 'visit_label' ? 150 : 100;
  return (
    <div
      style={{ width }}
      dangerouslySetInnerHTML={{ __html: row[accessor] }}
    />
  );
};
const fieldStyles = {
  style: {
    marginTop: 3,
    marginLeft: -8,
  },
};
const makeEditableAutocompleteCell = (options) =>
  function EditableAutocompleteCell({ row, column: { accessor: key } }) {
    return row.editMode ? (
      options.length ? (
        <select>
          {options.map((option) => (
            <option key={option.label}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          onChange={(e) => row.editRow(key, e.target.value)}
          value={row.editedRow[key]}
        />
        // <Select
        //   size="small"
        //   fullWidth
        //   canDeselect={false}
        //   value={row.editedRow[key]}
        //   onChange={(e) => row.editRow(key, e.target.value)}
        //   {...fieldStyles}
        // >
        //   {options.map((option) => (
        //     <MenuItem key={option.label} value={option.label}>
        //       {option.label}
        //     </MenuItem>
        //   ))}
        // </Select>
        // <TextField
        //   size="small"
        //   fullWidth
        //   value={row.editedRow[key]}
        //   onChange={(e) => row.editRow(key, e.target.value)}
        //   // error={!row.editedRow[key]}
        //   // helperText={!row.editedRow[key] && 'Required'}
        //   {...fieldStyles}
        // />
      )
    ) : (
      <div
        style={{ width: 100 }}
        dangerouslySetInnerHTML={{ __html: row[key] }}
      />
    );
  };
const getColumns = (columns) => {
  const cols = [];
  const id = {
    header: 'id',
    accessor: 'id',
    width: 68,
    hidden: true,
  };

  cols.push(id);
  columns.forEach((element) => {
    const obj = {
      header: element.displayName,
      accessor: element.key,
      customCell:
        element.key === 'assessment_text' || element.key === 'visit_label'
          ? AllCell
          : makeEditableAutocompleteCell(element?.possible_values || []),
      fixedWidth: true,
      frozen:
        element.key === 'assessment_text' || element.key === 'visit_label',
    };
    cols.push(obj);
  });
  const actionCell = {
    accessor: 'action',
    customCell: ActionCell,
    width: 68,
    // hidden: true,
  };
  cols.push(actionCell);
  return cols;
};

export default function AssessmentVisitTable(props) {
  const { data, columns, settings, fullView } = props;
  const [columnData, setColumndata] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedRow, setEditedRow] = useState({});

  useEffect(() => {
    setColumndata(getColumns(columns));
    setRows(data);
  }, [data]);

  const onRowEdit = (id) => {
    console.log('OnRowEdit');
    setEditedRow(rows.find((row) => row.id === id));
  };

  const onRowSave = () => {
    console.log('onRowSave');
    setRows(rows.map((row) => (row.id === editedRow.id ? editedRow : row)));
    setEditedRow({});
  };

  const onCancel = () => {
    console.log('onCancel');
    setEditedRow({});
  };

  const onDelete = (id) => {
    console.log('onDelete');
    setRows(rows.filter((row) => row.id !== id));
  };

  const editRow = (key, value) => {
    console.log('editRow');
    setEditedRow({ ...editedRow, [key]: value });
  };

  return (
    <div className="assessment-table-container">
      {columnData.length && rows.length && (
        <Table
          columns={columnData}
          rows={rows.map((row) => {
            return {
              ...row,
              onRowEdit,
              onRowSave,
              onCancel,
              onDelete,
              editRow,
              editMode: editedRow?.id === row.id,
              editedRow,
            };
          })}
          rowId="id"
          hidePagination
          hasScroll
          maxHeight={fullView ? '78vh' : '60vh'}
          columnSettings={{ enabled: settings, frozenColumnsEnabled: true }}
          className="abc"
        />
      )}
    </div>
  );
}
