import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'apollo-react/components/Card/Card';
import TextField from 'apollo-react/components/TextField';
import Save from 'apollo-react-icons/Save';
import Pencil from 'apollo-react-icons/Pencil';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import Table from 'apollo-react/components/Table';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import { labDataApiValue } from '../protocolSlice';
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
  const labData = useSelector(labDataApiValue);
  const [columns, setColumns] = useState(LABDATA_CONSTANTS.columnList);
  const [rowData, setRowData] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tableId, setTableId] = useState();
  const [showData, setShowData] = useState(true);

  const getLabData = () => {
    dispatch({
      type: 'GET_LAB_DATA',
      payload: {
        docId,
      },
    });
  };

  useEffect(() => {
    if (showData) {
      getLabData();
    }
    // eslint-disable-next-line
  }, [dispatch, docId, showData]);

  const handleSave = () => {
    const updatedData = rowData?.filter((value) => value.isUpdated === true);
    if (updatedData.length > 0) {
      dispatch({
        type: 'UPDATE_LAB_DATA',
        payload: {
          data: updatedData,
        },
      });
    }

    let result = rowData?.filter((value) => value.soft_delete);
    if (result.length > 0) {
      dispatch({
        type: 'DELETE_LAB_DATA',
        payload: {
          data: {
            doc_id: result[0].doc_id,
            roi_id: result[0].roi_id,
            table_roi_id: result[0].table_roi_id,
          },
        },
      });
    }
    result = rowData?.filter((value) => value.isCreated);

    if (
      result[0].parameter_text.length > 0 ||
      result[0].procedure_panel_text.length > 0 ||
      result[0].assessment.length > 0 ||
      result[0].pname.length > 0 ||
      result[0].table_link_text.length > 0
    ) {
      dispatch({
        type: 'CREATE_LAB_DATA',
        payload: {
          data: result[0],
        },
      });
    }
    getLabData();

    setEditedRow({});
    setIsEdit(false);
  };

  const onRowEdit = (id) => {
    setEditedRow(rowData?.find((row) => row.id === id));
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
    const rowUpdated = rowData?.map((row) => {
      if (row.id !== editedRow.id) {
        return row;
      }
      if (editedRow.id === '') {
        return { ...editedRow, isCreated: true };
      }
      return { ...editedRow, isUpdated: true };
    });
    setRowData(rowUpdated);
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
    }
    // eslint-disable-next-line
  }, [isEdit]);

  const onDeleteRow = () => {
    setIsEdit(true);
    setIsOpen(false);
    const rowUpdated = rowData?.map((row) =>
      row.id === tableId ? { ...row, soft_delete: true } : row,
    );
    setRowData(rowUpdated);
  };

  useEffect(() => {
    if (labData.data.length && showData) {
      setRowData(labData.data.filter((value) => value.soft_delete !== true));
      setShowData(false);
    }
    if (labData.success && !showData) {
      setShowData(true);
    }
    // eslint-disable-next-line
  }, [labData]);

  const handleAdd = (id) => {
    const index = rowData.findIndex((ele) => ele.id === id);

    const newData = [...rowData];
    const obj = {
      parameter_text: '',
      id: '',
      run_id: '',
      procedure_panel_text: '',
      dts: '',
      ProcessMachineName: '',
      roi_id: '',
      section: '',
      table_roi_id: rowData[0].table_roi_id,
      parameter: '',
      doc_id: docId,
      procedure_panel: '',
      assessment: '',
      pname: '',
      ProcessVersion: '',
      table_link_text: '',
      table_sequence_index: -1,
    };
    newData.splice(index + 1, 0, obj);
    setRowData(newData);
    setEditedRow(obj);
  };

  const dataRow = Array.from(rowData);

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
        {rowData?.length > 0 && (
          <div className="lab-btn-container">
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
        )}
        <Table
          isLoading={rowData?.length === 0}
          title="Lab Data"
          columns={columns}
          rows={dataRow
            ?.filter((obj) => !obj.soft_delete)
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
          initialSortedColumn="table_link_text"
          initialSortOrder="asc"
          rowId="table_link_text"
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

LabData.propTypes = {
  docId: PropTypes.isRequired,
};
