import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Card from 'apollo-react/components/Card/Card';
import TextField from 'apollo-react/components/TextField';
import Save from 'apollo-react-icons/Save';
import Pencil from 'apollo-react-icons/Pencil';
import FilterIcon from 'apollo-react-icons/Filter';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import Table from 'apollo-react/components/Table';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import { labDataSelector, setLabDataSuccess } from '../protocolSlice';
import DeleteRow from './Modal/DeleteRow';
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
    handleAdd,
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
    <div className="saveCancelButtonGroup" data-testid="saveCancelButtonGroup">
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" onClick={handleSaveRow}>
        Save
      </Button>
    </div>
  ) : (
    <>
      <div>
        <IconMenuButton data-testid="ellipsis-icon" menuItems={menuItems}>
          <EllipsisVertical className="ellipsis-icon" />
        </IconMenuButton>
      </div>
      <div className="customCell">
        <button
          data-testid="add-item"
          type="button"
          className="hoverButton"
          onClick={() => handleAdd(row.id)}
        >
          +
        </button>
      </div>
    </>
  );
}

function CustomHeader({
  isEdit,
  clearFilter,
  setIsEdit,
  handleSave,
  toggleFilters,
}) {
  return (
    <div className="btn-container">
      <Button
        variant="text"
        className="btn-common clear-button"
        onClick={clearFilter}
        data-testid="clearFilter"
      >
        Clear Filter
      </Button>
      <Button
        // size="small"
        variant="secondary"
        icon={FilterIcon}
        onClick={toggleFilters}
      >
        Filter
      </Button>
      {isEdit ? (
        <Button
          variant="secondary"
          icon={<Save />}
          className="btn-common"
          onClick={handleSave}
          data-testid="saveall"
        />
      ) : (
        <Button
          variant="secondary"
          icon={<Pencil />}
          className="btn-common"
          onClick={() => setIsEdit(true)}
          data-testid="editall"
        />
      )}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const { editedRow, updateRow } = row;
  const [val, setVal] = useState(editedRow[key]);
  const handleDataChange = (e) => {
    setVal(e.target.value);
  };

  return row.editMode ? (
    <TextField
      inputProps={{ 'aria-label': val }}
      size="small"
      fullWidth
      name={val}
      value={val}
      onChange={handleDataChange}
      onBlur={() => updateRow(key, val)}
    />
  ) : (
    row[key]
  );
}

function LabData({ docId }) {
  const dispatch = useDispatch();
  const tableRef = useRef();

  const labData = useSelector(labDataSelector);
  const [columns, setColumns] = useState(LABDATA_CONSTANTS.columnList);
  const [rowData, setRowData] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rowId, setRowId] = useState();

  const getLabData = () => {
    dispatch({
      type: 'GET_LAB_DATA',
      payload: {
        docId,
      },
    });
  };

  useEffect(() => {
    getLabData();
    // eslint-disable-next-line
  }, []);

  const handleSave = () => {
    const updatedData = rowData?.filter((value) => value.request_type);
    if (updatedData.length > 0) {
      dispatch({
        type: 'UPDATE_LAB_DATA',
        payload: {
          data: updatedData,
        },
      });
    }
    setEditedRow({});
    setIsEdit(false);
  };

  const onRowEdit = (id) => {
    if (Object.keys(editedRow).length === 0) {
      setEditedRow(rowData?.find((row) => row.id === id));
      setRowId(id);
    }
  };

  const onDelete = (id) => {
    setIsOpen(true);
    setRowId(id);
  };

  const handleChange = (key, value) => {
    setEditedRow({ ...editedRow, [key]: value });
  };

  const handleCancel = () => {
    if (editedRow.isSaved === false) {
      setRowData(rowData?.filter((value) => value.id !== editedRow.id));
    }
    setEditedRow({});
  };

  const handleSaveRow = () => {
    const updatedRows = rowData?.map((row) => {
      if (row.id !== editedRow.id) {
        return row;
      }
      if (editedRow.isSaved === false) {
        return { ...editedRow, isSaved: true };
      }
      return {
        ...editedRow,
        request_type: LABDATA_CONSTANTS.REQUEST_TYPE.UPDATE,
      };
    });
    setRowData(updatedRows);
    setEditedRow({});
  };

  const updateRow = (key, value) => {
    setEditedRow({
      ...editedRow,
      [key]: value,
    });
  };

  useEffect(() => {
    if (isEdit) {
      let isIncluded = true;
      const newColumns = columns.map((col) => {
        isIncluded = ['menu'].includes(col.accessor);
        if (!isIncluded) {
          return {
            ...col,
            customCell: EditableCell,
          };
        }
        return col;
      });
      if (!isIncluded) {
        setColumns([
          ...newColumns,
          {
            header: '',
            accessor: 'menu',
            customCell: ActionCell,
          },
        ]);
      }
    } else {
      setColumns(LABDATA_CONSTANTS.columnList);
    }
    // eslint-disable-next-line
  }, [isEdit]);

  const onDeleteRow = () => {
    setIsEdit(true);
    setIsOpen(false);
    const index = rowData.findIndex((row) => row.id === rowId);
    let updatedRows;
    if (rowData[index].request_type === LABDATA_CONSTANTS.REQUEST_TYPE.CREATE) {
      updatedRows = rowData.filter((row) => row.id !== rowId);
    } else {
      updatedRows = rowData.map((row) =>
        row.id === rowId
          ? { ...row, request_type: LABDATA_CONSTANTS.REQUEST_TYPE.DELETE }
          : row,
      );
    }
    setRowData(updatedRows);
  };

  useEffect(() => {
    if (labData.data.length > 0) {
      setRowData(
        labData.data.filter(
          (value) =>
            value.request_type !== LABDATA_CONSTANTS.REQUEST_TYPE.DELETE,
        ),
      );
    } else {
      setRowData([]);
    }
    if (labData.success) {
      getLabData();
      dispatch(setLabDataSuccess(false));
    }
    // eslint-disable-next-line
  }, [labData]);

  const handleAdd = (id) => {
    if (Object.keys(editedRow).length === 0) {
      const newArr = [...rowData];
      const index = rowData.findIndex((ele) => ele.id === id);
      const addRow = LABDATA_CONSTANTS.ADD_ROW_LAB_DATA;
      addRow.doc_id = docId;
      addRow.table_roi_id = rowData[0].table_roi_id;
      addRow.id = uuidv4();
      addRow.isSaved = false;
      newArr.splice(index + 1, 0, addRow);
      setRowData(newArr);
      setEditedRow(addRow);
    }
  };

  const clearFilter = () => {
    if (tableRef?.current) {
      LABDATA_CONSTANTS.FILTER_COLUMNS.forEach((val) =>
        tableRef?.current?.updateFilterValue({
          target: {
            name: val,
            value: '',
          },
        }),
      );
    }
  };

  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="lab-data"
    >
      <div
        className={`${
          isEdit ? 'table-hover lab-table-container' : 'lab-table-container'
        }`}
        data-testid="lab-table-container"
      >
        <div className="panel-heading">Lab Data</div>
        <div>
          <Table
            isLoading={labData.loading}
            ref={tableRef}
            title=" "
            columns={columns}
            rows={rowData
              ?.filter(
                (obj) =>
                  obj.request_type !== LABDATA_CONSTANTS.REQUEST_TYPE.DELETE,
              )
              ?.map((row) => ({
                ...row,
                editMode: editedRow.id === row.id,
                editedRow,
                updateRow,
                onRowEdit,
                onDelete,
                handleChange,
                handleCancel,
                handleSaveRow,
                handleAdd,
              }))}
            rowId="table_link_text"
            rowsPerPageOptions={[5, 10, 15, 'All']}
            tablePaginationProps={{
              labelDisplayedRows: ({ from, to, count }) =>
                `${
                  count === 1 ? 'Lab Data' : 'Lab Datas'
                } ${from}-${to} of ${count}`,
              truncate: true,
            }}
            // eslint-disable-next-line
            CustomHeader={(props) => (
              <CustomHeader
                isEdit={isEdit}
                clearFilter={clearFilter}
                setIsEdit={setIsEdit}
                handleSave={handleSave}
                {...props}
              />
            )}
          />
        </div>
      </div>
      {isOpen && (
        <DeleteRow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onDeleteRow={onDeleteRow}
        />
      )}
    </Card>
  );
}

export default LabData;

ActionCell.propTypes = {
  row: PropTypes.isRequired,
};
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

CustomHeader.propTypes = {
  isEdit: PropTypes.isRequired,
  clearFilter: PropTypes.isRequired,
  setIsEdit: PropTypes.isRequired,
  handleSave: PropTypes.isRequired,
  toggleFilters: PropTypes.isRequired,
};

LabData.propTypes = {
  docId: PropTypes.isRequired,
};
