import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Card from 'apollo-react/components/Card/Card';
import TextField from 'apollo-react/components/TextField';
import Save from 'apollo-react-icons/Save';
import Pencil from 'apollo-react-icons/Pencil';
import Plus from 'apollo-react-icons/Plus';
import FilterIcon from 'apollo-react-icons/Filter';
import EllipsisVertical from 'apollo-react-icons/EllipsisVertical';
import Table from 'apollo-react/components/Table';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import { useHistory } from 'react-router-dom';
import {
  labDataSelector,
  setLabDataSuccess,
  discardDetails,
} from '../protocolSlice';
import DeleteRow from './Modal/DeleteRow';
import LABDATA_CONSTANTS from './constants';
import './LabData.scss';
import DiscardModal from '../DigitizedPanel/Modals/DiscardModal';

let globalEditedRow = {};
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
  handleSave,
  onEditClick,
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
          onClick={onEditClick}
          data-testid="editall"
        />
      )}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const [val, setVal] = useState(row.editedRow[key]);
  const handleChange = (e) => {
    setVal(e.target.value);
    const obj = { ...globalEditedRow, [key]: e.target.value };
    globalEditedRow = obj;
  };

  return row.editMode ? (
    <TextField size="small" fullWidth value={val} onChange={handleChange} />
  ) : (
    row[key]
  );
}
const styles = {
  modal: {
    maxWidth: 500,
  },
};

const useStyles = makeStyles(styles);
function LabData({ docId }) {
  const dispatch = useDispatch();
  const tableRef = useRef();
  const classes = useStyles();
  const labData = useSelector(labDataSelector);
  const discardSelector = useSelector(discardDetails);
  const [discardData, setDiscardData] = useState({});
  const [columns, setColumns] = useState(LABDATA_CONSTANTS.columnList);
  const [rowData, setRowData] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isDiscard, setIsDiscard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rowId, setRowId] = useState();
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const history = useHistory();
  const [requestedRoute, setRequestedRoute] = useState('');

  const getLabData = () => {
    dispatch({
      type: 'GET_LAB_DATA',
      payload: {
        docId,
      },
    });
  };

  useEffect(() => {
    globalEditedRow = {};
    getLabData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (discardSelector) {
      setDiscardData(discardSelector);
    }
  }, [discardSelector]);

  useEffect(() => {
    if (isDiscard) {
      history.push(requestedRoute);
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: false,
          isDiscarded: false,
          protocolTab: -1,
          bladeRight: {},
          labEdited: false,
        },
      });
    }
    // eslint-disable-next-line
  }, [isDiscard, requestedRoute]);

  useEffect(() => {
    if (
      (discardData?.isDiscarded && discardData?.isEdited) ||
      (discardData?.bladeRight?.name && discardData?.labEdited)
    ) {
      setShowDiscardConfirm(true);
    }
    // eslint-disable-next-line
  }, [discardData]);

  useEffect(() => {
    const blockRedireting = history.block((requestUrl) => {
      if (isEdit && !isDiscard) {
        setShowDiscardConfirm(true);
        setRequestedRoute(requestUrl.pathname);
        setIsDiscard(false);
        return false;
      }
      return true;
    });
    return () => {
      blockRedireting();
    };
  }, [isEdit, isDiscard, history]);

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
    dispatch({
      type: 'DISCARD_DETAILS',
      payload: {
        isEdited: false,
        isDiscarded: false,
        protocolTab: -1,
        bladeRight: {},
        labEdited: false,
      },
    });
    setEditedRow({});
    setIsEdit(false);
  };

  const onRowEdit = (id) => {
    if (Object.keys(editedRow).length === 0) {
      setEditedRow(rowData?.find((row) => row.id === id));
      globalEditedRow = rowData?.find((row) => row.id === id);
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
    if (globalEditedRow.isSaved === false) {
      setRowData(rowData?.filter((value) => value.id !== globalEditedRow.id));
    }
    globalEditedRow = {};
    setEditedRow({});
  };

  const handleSaveRow = () => {
    const updatedRows = rowData?.map((row) => {
      if (row.id !== globalEditedRow.id) {
        return row;
      }
      if (globalEditedRow.isSaved === false) {
        return { ...globalEditedRow, isSaved: true };
      }
      return {
        ...globalEditedRow,
        request_type: LABDATA_CONSTANTS.REQUEST_TYPE.UPDATE,
      };
    });
    setRowData(updatedRows);
    globalEditedRow = {};
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

  const handleAdd = (id) => {
    if (rowData.length === 0) {
      const addRow = LABDATA_CONSTANTS.ADD_ROW_LAB_DATA;
      addRow.doc_id = docId;
      addRow.table_roi_id = labDataSelector.createdTable.table_roi_id;
      addRow.id = uuidv4();
      addRow.isSaved = false;
      setRowData([addRow]);
      setEditedRow(addRow);
      globalEditedRow = { ...addRow };
    } else if (Object.keys(editedRow).length === 0) {
      const newArr = [...rowData];
      const addRow = LABDATA_CONSTANTS.ADD_ROW_LAB_DATA;
      addRow.doc_id = docId;
      addRow.table_roi_id = rowData[0].table_roi_id;
      addRow.id = uuidv4();
      addRow.isSaved = false;
      const index = rowData.findIndex((ele) => ele.id === id);
      newArr.splice(index + 1, 0, addRow);
      setRowData(newArr);
      setEditedRow(addRow);
      globalEditedRow = { ...addRow };
    }
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

    if (labData.createdTable) {
      handleAdd();
    }
    // eslint-disable-next-line
  }, [labData]);

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
  const onDiscardClick = () => {
    if (requestedRoute !== '') {
      setShowDiscardConfirm(false);
      setIsDiscard(true);
    } else {
      setShowDiscardConfirm(false);
      setIsEdit(false);
      if (discardData?.bladeRight?.name) {
        dispatch({
          type: 'GET_RIGHT_BLADE',
          payload: {
            name: discardData?.bladeRight?.name,
          },
        });
      }
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: false,
          isDiscarded: false,
          protocolTab: discardSelector?.protocolTab,
          bladeRight: {},
          labEdited: false,
        },
      });
    }
  };

  const onEditClick = () => {
    setIsEdit(true);
    dispatch({
      type: 'DISCARD_DETAILS',
      payload: {
        isEdited: false,
        isDiscarded: false,
        protocolTab: -1,
        bladeRight: {},
        labEdited: true,
      },
    });
  };

  const createLabDataTable = () => {
    dispatch({
      type: 'CREATE_LABDATA_TABLE',
      payload: {
        docId,
      },
    });
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
        <div
          className={`${isEdit && rowData.length === 0 ? 'no-data-table' : ''}`}
        >
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
                onEditClick={onEditClick}
                {...props}
              />
            )}
          />
          {isEdit && rowData.length === 0 && (
            <Button
              icon={<Plus />}
              className="addrow-button"
              onClick={createLabDataTable}
            >
              Add Row
            </Button>
          )}
        </div>
        <DiscardModal
          classes={classes}
          showDiscardConfirm={showDiscardConfirm}
          setShowDiscardConfirm={setShowDiscardConfirm}
          onDiscardClick={onDiscardClick}
          setRequestedRoute={setRequestedRoute}
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

CustomHeader.propTypes = {
  isEdit: PropTypes.isRequired,
  clearFilter: PropTypes.isRequired,
  handleSave: PropTypes.isRequired,
  onEditClick: PropTypes.isRequired,
  toggleFilters: PropTypes.isRequired,
};

LabData.propTypes = {
  docId: PropTypes.isRequired,
};
