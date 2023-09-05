/* eslint-disable */
import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Tooltip from 'apollo-react/components/Tooltip';
import Table from 'apollo-react/components/Table';
import React, { useState, useEffect } from 'react';
import Button from 'apollo-react/components/Button';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';

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
      <Button size="small" variant="primary" onClick={onRowSave}>
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
const AllCell = ({ row, column: { accessor: key } }) => {
  const [value, setValue] = useState(row?.editedRow[key]);
  const width = key === 'assessment_text' || 'visit_label' ? 150 : 100;
  if (row?.operation === 'create') {
    return row.editMode ? (
      <div className="input-container">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => row.editRow(key, value)}
          value={value}
        />
      </div>
    ) : (
      <div style={{ width }} dangerouslySetInnerHTML={{ __html: row[key] }} />
    );
  }
  return (
    <div style={{ width }} dangerouslySetInnerHTML={{ __html: row[key] }} />
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
    return (
      <div className="input-container">
        {row.editMode ? (
          options.length ? (
            <Select
              size="small"
              fullWidth
              canDeselect={false}
              value={row.editedRow[key]}
              onChange={(e) => row.editRow(key, e.target.value)}
              {...fieldStyles}
            >
              {options.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <input
              type="text"
              onChange={(e) => row.editRow(key, e.target.value)}
              value={row.editedRow[key]}
            />
          )
        ) : (
          <div
            style={{ width: 100 }}
            dangerouslySetInnerHTML={{ __html: row[key] }}
          />
        )}
      </div>
    );
  };
const getColumns = (columns, editEnabled, page) => {
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
          : makeEditableAutocompleteCell(element?.possible_values.values || []),
      fixedWidth: true,
      frozen:
        element.key === 'assessment_text' || element.key === 'visit_label',
      hidden: element?.hidden,
    };
    if (element.key === 'assessment_text' || element.key === 'visit_label') {
      cols.unshift(obj);
    } else {
      cols.push(obj);
    }
  });
  const actionCell = {
    accessor: 'action',
    customCell: ActionCell,
    width: 68,
    hidden: !editEnabled,
  };
  cols.push(actionCell);
  return cols;
};

export default function AssessmentVisitTable(props) {
  const {
    data,
    columns,
    settings,
    fullView,
    getFinalDataFromTable,
    datafetch,
    editEnabled,
    handleTableChange,
    page,
  } = props;
  const [columnData, setColumndata] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    if (datafetch) {
      const updatedRows = rows.filter(
        (item) =>
          item?.operation === 'create' ||
          item?.operation === 'update' ||
          item?.operation === 'delete',
      );
      const allUpdatedRows = updatedRows.concat(deletedRows);
      getFinalDataFromTable(allUpdatedRows);
      setDeletedRows([]);
    }
  }, [datafetch]);

  useEffect(() => {
    setColumndata(getColumns(columns, editEnabled, page));
    const index = data.findIndex((item) => item?.status === 'added');
    if (index > -1) {
      setEditedRow(data[index]);
    }
    setRows(data);
  }, [data, editEnabled, columns]);

  const onRowEdit = (id) => {
    setEditedRow(rows.find((row) => row.id === id));
  };

  const onRowSave = () => {
    console.log('onRowSave');
    const updatedRows = rows.map((row) => {
      if (row.id === editedRow.id) {
        let obj = { ...editedRow };
        if (obj?.status === 'added') {
          delete obj.status;
        }
        if (obj?.operation !== 'create') {
          obj.operation = 'update';
        }
        return obj;
      }
      return row;
    });
    setRows(updatedRows);
    handleTableChange(updatedRows);

    // const index = rowsUpdated.findIndex((item) => item.id === editedRow.id);

    // if (index > -1) {
    //   rowU;
    // }
    // let obj = { ...editedRow };
    // if (obj?.operation !== 'create') {
    //   obj.operation = 'update';
    // }
    // setRowsUpdated([...rowsUpdated, obj]);
    setEditedRow({});
  };

  const onCancel = () => {
    console.log('onCancel');
    setEditedRow({});
  };

  const onDelete = (id) => {
    console.log('onDelete');
    const obj = rows.find((row) => {
      if (row.id === id) {
        if (row?.operation === 'create') return null;
        else {
          row.operation = 'delete';
          return row;
        }
      }
    });
    const index = deletedRows.findIndex((item) => item.id === editedRow.id);
    if (obj && index < 0) {
      setDeletedRows([...deletedRows, obj]);
    }
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
    handleTableChange(updatedRows);
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
            // if (row?.status === 'added') {
            //   onRowEdit(row.id);
            // }
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
          // columnSettings={{ enabled: settings, frozenColumnsEnabled: true }}
          className="abc"
        />
      )}
    </div>
  );
}
