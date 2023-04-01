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
import Modal from 'apollo-react/components/Modal';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import IconButton from 'apollo-react/components/IconButton';
import Plus from 'apollo-react-icons/Plus';
import {
  labDataApiValue,
  labDataDeleteApiValue,
  labDataUpdateApiValue,
  labDataCreateApiValue,
} from '../protocolSlice';
import Loader from '../../../Components/Loader/Loader';
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
    <div className="saveCancelButtonGroup" data-testid="saveCancelButtonGroup">
      <Button onClick={handleCancel}>Cancel</Button>
      <Button
        variant="primary"
        onClick={handleSaveRow}
        disabled={
          editMode &&
          !Object.keys(editedRow).some((key) => editedRow[key] !== row[key])
        }
      >
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

// function PlusIcon({ row }) {
//   const { id, handlePlus } = row;
//   return (
//     <IconButton
//       id={id}
//       data-testId="plus-add"
//       color="primary"
//       size="small"
//       onClick={handlePlus}
//       destructiveAction
//     >
//       <Plus />
//     </IconButton>
//   );
// }
function LabData({ docId }) {
  const dispatch = useDispatch();
  const labData = useSelector(labDataApiValue);
  const deleteLabData = useSelector(labDataDeleteApiValue);
  const updateLabData = useSelector(labDataUpdateApiValue);
  const createLabData = useSelector(labDataCreateApiValue);
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
    const updatedData = rowData.filter((value) => value.isUpdated === true);
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
    const rowUpdated = rowData.map((row) =>
      row.id === editedRow.id ? { ...editedRow, isUpdated: true } : row,
    );
    setRowData(rowUpdated);
    setEditedRow({});
    setIsShow(true);
  };

  const updateRow = (key, value) => {
    setEditedRow({
      ...editedRow,
      [key]: value,
    });
  };

  useEffect(() => {
    setColumns(
      columns.map((col) => {
        const isIncluded = ['table_link_text', 'menu', 'plus'].includes(
          col.accessor,
        );
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

  // useEffect(() => {
  //   setColumns([
  //     ...columns,
  //     {
  //       header: '',
  //       accessor: 'plus',
  //       customCell: PlusIcon,
  //     },
  //   ]);
  // }, []);

  const onDeleteRow = () => {
    const result = rowData.find((value) => value.id === tableId);
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
    setRowData(result);
    setEditedRow({});
    setIsOpen(false);
  };

  const handleCreate = () => {
    const result = rowData.find((value) => value.table_roi_id);
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
    setIsAdd(false);
    setTableIndex('');
    setAssessmentName('');
    setProcedureName('');
    setAssessmentPreferred('');
    setProcedurePreferred('');
  };
  // const handlePlus = (e) => {
  //   const id = e.target.parentNode.parentNode.getAttribute('id');
  //   // const getRow =
  //   //   e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  //   rowData.map((value) => {
  //     if (value.id === id) {
  //       setRowData([
  //         ...rowData,
  //         {
  //           id: 'Table 333',
  //           name: 'Laboratory Safety Variables',
  //           assName: 'Haematology',
  //           prName: 'B-Haemoglobin',
  //           assPrefName: 'Haematology',
  //           prPrefName: 'NA',
  //         },
  //       ]);
  //     }
  //     return value;
  //   });
  // };

  // useEffect(() => {
  //   const element = document.querySelectorAll(
  //     '.lab-table-container table tbody tr',
  //   );
  //   const result = () => {
  //     for (let i = 0; i < element.length; i++) {
  //       const after = element[i].querySelector('::after');
  //       console.log(after, 'after');
  //     }
  //   };
  //   console.log(result, 'result');
  //   console.log(element, 'element');
  // });

  useEffect(() => {
    if (labData.data.length > 0 && showData === true) {
      setRowData(labData.data.filter((value) => value.soft_delete !== true));
      setShowData(false);
    }
  }, [labData]);

  useEffect(() => {
    if (deleteLabData.success === true && showData === false) {
      setShowData(true);
    }
  }, [deleteLabData]);

  useEffect(() => {
    if (updateLabData.success === true && showData === false) {
      setShowData(true);
    }
  }, [updateLabData]);
  useEffect(() => {
    if (createLabData.success === true && showData === false) {
      setShowData(true);
    }
  }, [createLabData]);
  const handleAdd = () => {
    setIsAdd(true);
  };
  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="lab-data"
    >
      {rowData.length > 0 ? (
        <div className="lab-table-container" data-testid="lab-table-container">
          <Button
            data-testid="add-item"
            variant="secondary"
            onClick={handleAdd}
          >
            Add Item
          </Button>
          <div className="lab-btn-container">
            {isEdit ? (
              <Button
                disabled={!isShow}
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
          <Table
            title="Lab Data"
            columns={columns}
            rows={rowData?.map((row) => ({
              ...row,
              editMode: editedRow.id === row.id,
              editedRow,
              updateRow,
              onRowEdit,
              onDelete,
              handleChange,
              handleCancel,
              handleSaveRow,
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
      ) : (
        <div className="loader" data-testid="loader">
          <Loader />
        </div>
      )}
      <Modal
        data-testid="delete-row-modal"
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
      <Modal
        data-testid="add-row-modal"
        open={isAdd}
        variant="warning"
        onClose={() => setIsAdd(false)}
        title="PLease add Item"
        buttonProps={[
          { label: 'Close' },
          { label: 'Create', onClick: () => handleCreate() },
        ]}
      >
        <TextField
          value={tableIndex}
          onChange={(e) => setTableIndex(e.target.value)}
          fullWidth
          placeholder="Table index"
        />
        <TextField
          value={tableIndex}
          onChange={(e) => setTableIndex(e.target.value)}
          fullWidth
          placeholder="Table name"
        />
        <TextField
          value={assessmentName}
          onChange={(e) => setAssessmentName(e.target.value)}
          fullWidth
          placeholder="Assessment name"
        />
        <TextField
          value={procedureName}
          onChange={(e) => setProcedureName(e.target.value)}
          fullWidth
          placeholder="Procedure name"
        />
        <TextField
          value={assessmentPreferred}
          onChange={(e) => setAssessmentPreferred(e.target.value)}
          fullWidth
          placeholder="Assessment preferred name"
        />
        <TextField
          value={procedurePreferred}
          onChange={(e) => setProcedurePreferred(e.target.value)}
          fullWidth
          placeholder="Procedure preferred name"
        />
      </Modal>
    </Card>
  );
}

export default LabData;

ActionCell.propTypes = {
  row: PropTypes.isRequired,
};
// PlusIcon.propTypes = {
//   row: PropTypes.isRequired,
// };
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
LabData.propTypes = {
  docId: PropTypes.isRequired,
};
