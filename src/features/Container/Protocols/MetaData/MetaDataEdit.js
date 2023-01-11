import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import PropTypes, { func } from 'prop-types';
import Button from 'apollo-react/components/Button';
import DatePicker from 'apollo-react/components/DatePickerV2';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Checkbox from 'apollo-react/components/Checkbox/Checkbox';
import Table, {
  compareDates,
  compareNumbers,
  compareStrings,
} from 'apollo-react/components/Table';
import TextField from 'apollo-react/components/TextField';
import Tooltip from 'apollo-react/components/Tooltip';
import initialRows from './rows.json';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

const fieldStyles = {
  style: {
    marginTop: 3,
    marginLeft: -8,
  },
};

const predefindKey = (value) => {
  const keys = ['Protocol Number', 'Protocol Title'];
  if (keys.includes(value)) {
    return false;
  }
  return true;
};

function EditableCell({ row, column: { accessor: key } }) {
  console.log(key);
  const [inputValue, setInputValue] = useState(row.editRowData[key]);
  return row.editMode ? (
    <TextField
      size="small"
      fullWidth
      value={inputValue}
      onChange={(e) => {
        // row.editRow(row.header, key, e.target.value);
        setInputValue(e.target.value);
      }}
      error={!row.editRowData[key]}
      helperText={!row.editRowData[key] && 'Required'}
      {...fieldStyles}
    />
  ) : (
    row[key]
  );
}

function EditableDatePicker({ row, accessor: key }) {
  const [inputValue, setInputValue] = React.useState(null);

  return (
    <DatePicker
      size="small"
      fullWidth
      TextFieldProps={fieldStyles}
      value={moment(row.editRowData[key], 'MM/DD/YYYY')}
      inputValue={inputValue}
      onChange={(value, inputValue) => {
        row.editRow(row.header, key, value);
        setInputValue(inputValue);
      }}
      error={!row.editRowData[key]}
      helperText={!row.editRowData[key] ? 'Required' : ''}
    />
  );
}

function MetaDataEdit() {
  const columns = [
    {
      header: 'Key',
      accessor: 'header',
      customCell: Cell,
      // customCell: EditableCell,
      fixedWidth: 20,
    },
    {
      header: 'Value',
      accessor: 'name',
      sortFunction: compareStrings,
      //   customCell: EditableCell,
    },
  ];
  const [rows, setRows] = useState(initialRows);
  const [editedRows, setEditedRows] = useState([]);
  const [confidence, setConfidence] = React.useState(false);
  const [note, setNote] = React.useState(false);
  const [column, setColumn] = useState(columns);

  useEffect(() => {
    console.log(column);
  }, [column]);

  const removeIndex = (key) => {
    const columnTemp = [...column];
    let index;
    for (let i = 0; i < columnTemp.length; i++) {
      if (Object.values(columnTemp[i])[0] === key) {
        index = i;
      }
    }

    columnTemp.splice(index, 1);
    setColumn(columnTemp);
  };
  const handleConfidence = (e, checked) => {
    setConfidence(checked);
    const columnTemp = [...column];
    if (checked) {
      columnTemp.push({
        header: 'Confidence Score',
        accessor: 'confidence',
        //  customCell: Cell,
      });
      setColumn(columnTemp);
    } else {
      removeIndex('Confidence Score');
    }
  };

  const handleNotes = (e, checked) => {
    setNote(checked);
    if (checked) {
      column.push({
        header: 'Note',
        accessor: 'note', // customCell: Cell
      });
      setColumn(column);
    } else {
      removeIndex('Note');
    }
  };

  const onEditAll = () => {
    setEditedRows(rows);
  };

  const onSave = () => {
    setRows(editedRows);
    setEditedRows([]);
  };

  const onCancel = () => {
    setEditedRows([]);
  };

  const onDelete = (header) => {
    setRows(rows.filter((row) => row.header !== header));
  };

  useEffect(() => {
    onEditAll();
  }, []);

  const editRow = (header, key, value) => {
    setEditedRows((rows) =>
      rows.map((row) =>
        row.header === header ? { ...row, [key]: value } : row,
      ),
    );
  };
  console.log('column', column);
  const editMode = editedRows.length > 0;

  return (
    <div className="digitize-panel-content" data-testid="metadata-table-view">
      <Checkbox
        label="Notes"
        size="small"
        checked={note}
        onChange={handleNotes}
        className="checkbox-pad metadata-checkbox"
        data-testid="metadata-notes"
      />
      <Checkbox
        label="Confidence Score"
        checked={confidence}
        onChange={handleConfidence}
        size="small"
        className="metadata-checkbox checkbox-pad "
        data-testid="metadata-confidence"
      />
      <Table
        columns={columns}
        // columns={columns.map((column) => ({ ...column, fixedWidth: true }))}
        rowId="header"
        // rows={rows.map((row, i) => ({
        //   ...row,
        //   onDelete,
        //   editRow,
        //   editMode,
        //   editRowData: editMode && editedRows[i],
        // }))}
        rows={rows}
        // rowProps={{ hover: false }}
        // headerProps={{ onEditAll, onSave, onCancel, editMode }}
        hidePagination
        hasScroll
      />
    </div>
  );
}

EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

Cell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};

EditableDatePicker.propTypes = {
  row: PropTypes.isRequired,
  accessor: PropTypes.isRequired,
};

export default MetaDataEdit;
