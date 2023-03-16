import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'apollo-react/components/Card/Card';
import TextField from 'apollo-react/components/TextField';
import Filter from 'apollo-react-icons/Filter';
import Save from 'apollo-react-icons/Save';
import Pencil from 'apollo-react-icons/Pencil';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import Table, { createStringSearchFilter } from 'apollo-react/components/Table';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import LABDATA_CONSTANTS from './constants';
import './LabData.scss';

function TextFieldFilter() {
  return (
    <TextField
      // value={filters[accessor]}
      // name={accessor}
      // onChange={updateFilterValue}
      fullWidth
      margin="none"
      size="small"
    />
  );
}

function ActionCell({ row }) {
  const { id, onRowEdit, onDelete } = row;
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
  return (
    <div>
      <IconMenuButton menuItems={menuItems}>
        <EllipsisVertical className="ellipsis-icon" />
      </IconMenuButton>
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const { editMode } = row;
  return editMode ? (
    <TextField
      size="small"
      fullWidth
      value={row[key]}
      onChange={(e) => row.handleChange(key, e.target.value)}
    />
  ) : (
    row[key]
  );
}

function LabData() {
  const [columns, setColumns] = useState(LABDATA_CONSTANTS.columnList);
  const [rowData, setRowData] = useState(LABDATA_CONSTANTS.records);
  const [editedRow, setEditedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleSave = () => {
    setIsEdit(false);
    setColumns(columns.filter((col) => col.accessor !== 'menu'));
  };

  const onRowEdit = (id) => {
    setEditedRow(rowData.find((row) => row.id === id));
  };

  const onDelete = () => {};

  const handleChange = (key, value) => {
    setEditedRow({ ...editedRow, [key]: value });
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
  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="panel-heading ">
        <div className="metadat-flex-plus"> Lab Data </div>
      </div>
      <div className="lab-btn-container">
        <Button variant="secondary" icon={<Filter />} className="btn-filter mR">
          Filters
        </Button>
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
      <div className="lab-table-container">
        <Table
          columns={columns}
          rows={rowData?.map((row) => ({
            ...row,
            editMode: editedRow.id === row.id,
            editedRow,
            onRowEdit,
            onDelete,
            handleChange,
          }))}
          rowId="id"
          hidePagination
        />
      </div>
    </Card>
  );
}

TextFieldFilter.propTypes = {};

ActionCell.propTypes = {
  row: PropTypes.isRequired,
};

EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

export default LabData;
