/* eslint-disable */
import React, { useState, useEffect } from 'react';
import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import { v4 as uuidv4 } from 'uuid';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Tooltip from 'apollo-react/components/Tooltip';
import Table from 'apollo-react/components/Table';
import { userId, userType } from '../../../../../store/userDetails';
import Button from 'apollo-react/components/Button';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import { deleteModalLabels } from '../Assessment/Assessment';
import RestricModal from '../Modal';
import { useSelector } from 'react-redux';
import TextField from 'apollo-react/components/TextField';

let globalEditedRow = {};

const ActionCell = ({ row }) => {
  const {
    id,
    onRowEdit,
    onRowSave,
    editMode,
    onCancel,
    editedRow,
    handleDelete,
    is_default,
  } = row;
  const user_type = useSelector(userType);

  const menuItemsP = [
    {
      text: 'Edit',
      onClick: () => onRowEdit(id),
    },
  ];
  const menuItemsA = [
    {
      text: 'Edit',
      onClick: () => onRowEdit(id),
    },
    {
      text: 'Delete',
      onClick: () => handleDelete(id),
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
      <IconMenuButton
        id="actions"
        menuItems={
          user_type === 'admin' || !is_default ? menuItemsA : menuItemsP
        }
        size="small"
      >
        <EllipsisVerticalIcon />
      </IconMenuButton>
    </Tooltip>
  );
};
const AllCell = ({ row, column: { accessor: key } }) => {
  const [value, setValue] = useState(row?.editedRow[key]);
  const width = key === 'assessment_text' || 'visit_label' ? 150 : 100;

  const handleChange = (e) => {
    setValue(e.target.value);
    const obj = { ...globalEditedRow, [key]: e.target.value };
    globalEditedRow = obj;
  };

  if (!row?.is_default) {
    return row.editMode ? (
      <div className="input-container">
        <TextField
          size="small"
          fullWidth
          value={value}
          onChange={handleChange}
          {...fieldStyles}
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
  function EditableAutocompleteCell({ row, column }) {
    const key = column.accessor;
    const [value, setValue] = useState(row?.editedRow[key]);

    const handleChange = (e) => {
      setValue(e.target.value);
      const obj = { ...globalEditedRow, [key]: e.target.value };
      globalEditedRow = obj;
    };

    return (
      <div className="input-container">
        {row.editMode ? (
          options.length > 0 ? (
            <Select
              size="small"
              fullWidth
              canDeselect={false}
              value={value}
              onChange={handleChange}
              {...fieldStyles}
            >
              {options.map((option) => (
                <MenuItem value={option.label} key={uuidv4()}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField
              size="small"
              fullWidth
              value={value}
              onChange={handleChange}
              {...fieldStyles}
            />
          )
        ) : row[key] === 'N' ? (
          <div></div>
        ) : row[key].length > 12 ? (
          <Tooltip
            variant="light"
            title={column.header}
            subtitle={<div dangerouslySetInnerHTML={{ __html: row[key] }} />}
            placement="left"
            style={{ width: 100, padding: 5 }}
          >
            <span>
              <span className="adjust-ellipses">
                {row[key].substring(0, 12)}...
              </span>
            </span>
          </Tooltip>
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
  const userId1 = useSelector(userId);
  const [columnData, setColumndata] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [deletedRows, setDeletedRows] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

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
      globalEditedRow = data[index];
    }
    setRows(data);
    if (!editEnabled) {
      setEditedRow({});
      globalEditedRow = {};
    }
  }, [data, editEnabled, columns]);

  const onRowEdit = (id) => {
    setEditedRow(rows.find((row) => row.id === id));
    globalEditedRow = rows?.find((row) => row.id === id);
  };

  const onRowSave = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === globalEditedRow.id) {
        let obj = { ...globalEditedRow };
        if (obj?.status === 'added') {
          obj.user_id = userId1.substring(1);
          delete obj.status;
        }
        if (obj?.operation !== 'create') {
          obj.operation = 'update';
          obj.user_id = userId1.substring(1);
        }
        return obj;
      }
      return row;
    });
    setRows(updatedRows);
    handleTableChange(updatedRows);
    setEditedRow({});
    globalEditedRow = {};
  };

  const onCancel = () => {
    setEditedRow({});
  };

  const onDelete = () => {
    setDeleteModal(false);
    const id = deleteId;
    const obj = rows.find((row) => {
      if (row.id === id) {
        if (row?.operation === 'create') return null;
        else {
          row.operation = 'delete';
          row.user_id = userId1.substring(1);
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
    setEditedRow({ ...editedRow, [key]: value });
  };
  const handleCloseModal = () => {
    setDeleteModal(false);
  };
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  return (
    <div className="assessment-table-container">
      <RestricModal
        open={deleteModal}
        setOpen={setDeleteModal}
        buttonOne={deleteModalLabels.buttonOne}
        buttonTwo={deleteModalLabels.buttonTwo}
        title={deleteModalLabels.title}
        buttonOneHandler={handleCloseModal}
        buttonTwoHandler={onDelete}
      />
      {/* {columnData.length > 0 && rows.length > 0 && ( */}
      <Table
        columns={columnData}
        rows={rows.map((row) => {
          return {
            ...row,
            onRowEdit,
            onRowSave,
            onCancel,
            handleDelete,
            editRow,
            editMode: editedRow?.id === row.id,
            editedRow,
          };
        })}
        rowId="id"
        hidePagination
        hasScroll
        maxHeight={fullView ? '72vh' : '60vh'}
        className="table-assessment-visit"
      />
      {/* )} */}
    </div>
  );
}
