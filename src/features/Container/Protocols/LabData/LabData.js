import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'apollo-react/components/Card/Card';
import TextField from 'apollo-react/components/TextField';
import Filter from 'apollo-react-icons/Filter';
import Save from 'apollo-react-icons/Save';
import Pencil from 'apollo-react-icons/Pencil';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import Table from 'apollo-react/components/Table';
import Button from 'apollo-react/components/Button';
import Modal from 'apollo-react/components/Modal';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import LABDATA_CONSTANTS from './constants';
import './LabData.scss';

function ActionCell({ row }) {
  const {
    id,
    onRowEdit,
    onDelete,
    editMode,
    handleCancel,
    handleSaveRow,
    editedRow,
  } = row;
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
    <div className="saveCancelButtonGroup">
      <Button onClick={handleCancel}>Cancel</Button>
      <Button
        variant="primary"
        onClick={handleSaveRow}
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
    <div>
      <IconMenuButton menuItems={menuItems}>
        <EllipsisVertical className="ellipsis-icon" />
      </IconMenuButton>
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  return row.editMode ? (
    <TextField
      size="small"
      fullWidth
      value={row.editedRow[key]}
      onChange={(e) => row.handleChange(key, e.target.value)}
    />
  ) : (
    row[key]
  );
}

function PlusIcon() {
  return (
    <IconButton
      data-testId="plus-add"
      color="primary"
      size="small"
      destructiveAction
    >
      <Plus />
    </IconButton>
  );
}
function LabData() {
  const [columns, setColumns] = useState(LABDATA_CONSTANTS.columnList);
  const [rowData, setRowData] = useState(LABDATA_CONSTANTS.records);
  const [editedRow, setEditedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tableId, setTableId] = useState();

  const handleSave = () => {
    setIsEdit(false);
    setColumns(columns.filter((col) => col.accessor !== 'menu'));
  };

  const onRowEdit = (id) => {
    setEditedRow(rowData.find((row) => row.id === id));
    setTableId(id);
  };

  const onDelete = (id) => {
    setIsOpen(true);
    setTableId(id);
  };

  const handleChange = (key, value) => {
    setEditedRow({ ...editedRow, [key]: value });
  };
  const handleCancel = () => {
    setEditedRow({});
  };

  const handleSaveRow = () => {
    setRowData(
      rowData.map((row) => (row.id === editedRow.id ? editedRow : row)),
    );
    setEditedRow({});
  };

  useEffect(() => {
    setColumns(
      columns.map((col) => {
        const isIncluded = ['id', 'menu'].includes(col.accessor);
        if (!isIncluded) {
          return {
            ...col,
            customCell: EditableCell,
          };
        }
        return col;
      }),
    );
  }, []);

  useEffect(() => {
    if (isEdit) {
      setColumns([
        ...columns,
        {
          header: '',
          accessor: 'menu',
          customCell: ActionCell,
        },
      ]);
    }
    // eslint-disable-next-line
  }, [isEdit]);

  // console.log('columns--->', columns);

  const onDeleteRow = () => {
    const result = rowData.filter((value) => value.id !== tableId);
    setRowData(result);
    setEditedRow({});
    setIsOpen(false);
  };
  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="lab-table-container">
        <div className="lab-btn-container">
          {isEdit ? (
            <Button
              variant="secondary"
              icon={<Save />}
              className="btn-common"
              onClick={handleSave}
            />
          ) : (
            <Button
              variant="secondary"
              icon={<Pencil />}
              className="btn-common"
              onClick={() => setIsEdit(true)}
            />
          )}
        </div>
        <Table
          title="Lab Data"
          columns={columns}
          rows={rowData?.map((row) => ({
            ...row,
            editMode: editedRow.id === row.id,
            editedRow,
            onRowEdit,
            onDelete,
            handleChange,
            handleCancel,
            handleSaveRow,
          }))}
          initialSortedColumn="id"
          initialSortOrder="asc"
          rowId="id"
          rowsPerPageOptions={[5, 10, 15, 'All']}
          tablePaginationProps={{
            labelDisplayedRows: ({ from, to, count }) =>
              `${
                count === 1 ? 'Lab Data' : 'Lab Datas'
              } ${from}-${to} of ${count}`,
            truncate: true,
          }}
          showClearFiltersButton
        />
      </div>
      <Modal
        open={isOpen}
        variant="warning"
        onClose={() => setIsOpen(false)}
        title="Alert"
        message="Please confirm if you want to continue with the delete?"
        buttonProps={[
          { label: 'Cancel' },
          { label: 'Yes', onClick: () => onDeleteRow() },
        ]}
      />
    </Card>
  );
}

ActionCell.propTypes = {
  row: PropTypes.isRequired,
};
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

export default LabData;
