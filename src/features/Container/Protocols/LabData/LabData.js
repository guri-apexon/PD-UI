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
import AddRow from './Modal/AddRow';
import LABDATA_CONSTANTS from './constants';
import './LabData.scss';

function ActionCell({ row }) {
  const { id, onRowEdit, onDelete, editMode, handleCancel, handleSaveRow } =
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
    <div className="saveCancelButtonGroup" data-testid="saveCancelButtonGroup">
      <Button onClick={handleCancel}>Cancel</Button>
      <Button variant="primary" onClick={handleSaveRow}>
        Save
      </Button>
    </div>
  ) : (
    <div>
      <IconMenuButton data-testid="ellipsis-icon" menuItems={menuItems}>
        <EllipsisVertical className="ellipsis-icon" />
      </IconMenuButton>
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

function AddRowCell({ row, column }) {
  const { handleAdd } = row;
  // eslint-disable-next-line
  return (
    <div className="customCell">
      {row[column.accessor]}
      <button
        data-testid="add-item"
        type="button"
        className="hoverButton"
        onClick={() => handleAdd()}
      >
        +
      </button>
    </div>
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
  const [isShow, setIsShow] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [tableIndex, setTableIndex] = useState('');
  const [assessmentName, setAssessmentName] = useState('');
  const [procedureName, setProcedureName] = useState('');
  const [assessmentPreferred, setAssessmentPreferred] = useState('');
  const [procedurePreferred, setProcedurePreferred] = useState('');
  const [isDeleteRow, setIsDeleteRow] = useState(false);
  const [isCreateRow, setIsCreateRow] = useState(false);

  useEffect(() => {
    if (showData) {
      dispatch({
        type: 'GET_LAB_DATA',
        payload: {
          docId,
        },
      });
    }
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
      setIsEdit(false);
      setColumns(columns.filter((col) => col.accessor !== 'menu'));
    }
    if (isDeleteRow) {
      const result = rowData?.find((value) => value.id === tableId);
      dispatch({
        type: 'DELETE_LAB_DATA',
        payload: {
          data: {
            doc_id: result.doc_id,
            roi_id: result.roi_id,
            table_roi_id: result.table_roi_id,
          },
        },
      });
      setRowData(rowData);
      setRowData(result);
      setEditedRow({});
    }
    if (isCreateRow) {
      const result = rowData?.find((value) => value.table_roi_id);
      if (
        procedureName.length > 0 ||
        assessmentName.length > 0 ||
        assessmentPreferred.length > 0 ||
        procedurePreferred.length > 0 ||
        tableIndex.length > 0
      ) {
        dispatch({
          type: 'CREATE_LAB_DATA',
          payload: {
            data: {
              parameter_text: procedureName,
              id: '',
              run_id: '',
              procedure_panel_text: assessmentName,
              dts: '',
              ProcessMachineName: '',
              roi_id: '',
              section: '',
              table_roi_id: result.table_roi_id,
              parameter: '',
              doc_id: docId,
              procedure_panel: '',
              assessment: assessmentPreferred,
              pname: procedurePreferred,
              ProcessVersion: '',
              table_link_text: tableIndex,
              table_sequence_index: -1,
            },
          },
        });
      }
      setRowData(rowData);
      setTableIndex('');
      setAssessmentName('');
      setProcedureName('');
      setAssessmentPreferred('');
      setProcedurePreferred('');
    }
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
    const rowUpdated = rowData?.map((row) =>
      row.id === editedRow.id ? { ...editedRow, isUpdated: true } : row,
    );
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
      const newColumns = columns.map((col) => {
        const isIncluded = ['menu'].includes(col.accessor);
        if (!isIncluded) {
          return {
            ...col,
            customCell: EditableCell,
          };
        }
        return col;
      });

      setColumns([
        ...newColumns,
        {
          header: '',
          accessor: 'menu',
          customCell: ActionCell,
        },
      ]);
    } else {
      const newColumns = columns.map((col) => {
        if (col.accessor === 'pname') {
          return {
            ...col,
            customCell: AddRowCell,
          };
        }
        return col;
      });

      setColumns([...newColumns]);
    }
    // eslint-disable-next-line
  }, [isEdit]);

  const onDeleteRow = () => {
    setIsDeleteRow(true);
    setIsEdit(true);
    setIsOpen(false);
  };

  const handleCreate = () => {
    setIsCreateRow(true);
    setIsEdit(true);
    setIsAdd(false);
  };

  useEffect(() => {
    if (labData.data.length && showData) {
      setRowData(labData.data.filter((value) => value.soft_delete !== true));
      setShowData(false);
    }
  }, [labData]);

  useEffect(() => {
    if (labData.success && !showData) {
      setShowData(true);
    }
  }, [labData]);
  const handleAdd = () => {
    setIsAdd(true);
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
          rows={dataRow?.map((row) => ({
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
      {isAdd && (
        <AddRow
          isAdd={isAdd}
          setIsAdd={setIsAdd}
          handleCreate={handleCreate}
          tableIndex={tableIndex}
          setTableIndex={setTableIndex}
          assessmentName={assessmentName}
          setAssessmentName={setAssessmentName}
          procedureName={procedureName}
          setProcedureName={setProcedureName}
          assessmentPreferred={assessmentPreferred}
          setAssessmentPreferred={setAssessmentPreferred}
          procedurePreferred={procedurePreferred}
          setProcedurePreferred={setProcedurePreferred}
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

AddRowCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
LabData.propTypes = {
  docId: PropTypes.isRequired,
};
