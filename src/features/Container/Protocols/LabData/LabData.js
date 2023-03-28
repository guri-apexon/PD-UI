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
import { labDataApiValue, updateGetLabData } from '../protocolSlice';
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

function PlusIcon({ row }) {
  const { id, handlePlus } = row;
  return (
    <IconButton
      id={id}
      data-testId="plus-add"
      color="primary"
      size="small"
      onClick={handlePlus}
      destructiveAction
    >
      <Plus />
    </IconButton>
  );
}
function LabData({ docId }) {
  const dispatch = useDispatch();
  const labData = useSelector(labDataApiValue);
  const updateLabData = useSelector(updateGetLabData);
  const [columns, setColumns] = useState(LABDATA_CONSTANTS.columnList);
  const [rowData, setRowData] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tableId, setTableId] = useState();

  useEffect(() => {
    dispatch({
      type: 'GET_LAB_DATA',
      payload: {
        docId,
      },
    });
  }, [docId]);

  useEffect(() => {
    console.log(updateLabData, 'updateLabData from UI');
  }, [updateLabData]);

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
    dispatch({
      type: 'UPDATE_LAB_DATA',
      payload: {
        docId,
        data: editedRow,
      },
    });
    setRowData(
      rowData.map((row) => (row.id === editedRow.id ? editedRow : row)),
    );
    setEditedRow({});
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
        id: result.id,
        doc_id: result.doc_id,
        run_id: result.run_id,
        parameter: result.parameter,
        parameter_text: result.parameter_text,
        procedure_panel: result.procedure_panel,
        procedure_panel_text: result.procedure_panel_text,
        assessment: result.assessment,
        dts: result.dts,
        pname: result.pname,
        ProcessMachineName: result.ProcessMachineName,
        ProcessVersion: result.ProcessVersion,
        roi_id: result.roi_id,
        section: result.section,
        table_link_text: result.table_link_text,
        table_roi_id: result.table_roi_id,
        table_sequence_index: -1,
      },
    });
    setRowData(result);
    setEditedRow({});
    setIsOpen(false);
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
    if (labData.length > 0) {
      setRowData(labData.filter((value) => value.soft_delete !== true));
    }
  }, [labData]);
  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="lab-data"
    >
      {labData.length > 0 ? (
        <div className="lab-table-container">
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
        <div className="loader">
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
    </Card>
  );
}

export default LabData;

ActionCell.propTypes = {
  row: PropTypes.isRequired,
};
PlusIcon.propTypes = {
  row: PropTypes.isRequired,
};
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
LabData.propTypes = {
  docId: PropTypes.isRequired,
};
