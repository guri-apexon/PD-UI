import React, { useEffect, useMemo, useState } from 'react';
import Table from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField/TextField';
import Checkbox from 'apollo-react/components/Checkbox';
import Button from 'apollo-react/components/Button/Button';
import Plus from 'apollo-react-icons/Plus';
import patientBurdern from './patientBurdern.json';
import CustomForm from './CustomForm';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  return row.editMode ? (
    <TextField
      size="small"
      fullWidth
      value={row.editRowData[key]}
      onChange={(e) => {
        row.editRow(row.id, key, e);
      }}
      error={!row.editRowData[key]}
      helperText={!row.editRowData[key] && 'Required'}
    />
  ) : (
    row[key]
  );
}

function MetaDataEditTable({ rows, setRows, metaDataList, setMetaDataList }) {
  const [editedRows, setEditedRows] = useState([]);

  const columns = [
    {
      header: 'Id',
      accessor: 'id',
      customCell: Cell,
    },
    {
      header: 'Key',
      accessor: 'header',
      customCell: EditableCell,
    },
    {
      header: 'Value',
      accessor: 'name',
      customCell: EditableCell,
    },
  ];
  const [column, setColumn] = useState(columns);

  const [confidence, setConfidence] = React.useState(false);
  const [note, setNote] = React.useState(false);

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
      columnTemp.push({ header: 'Confidence Score', accessor: 'confidence' });
      setColumn(columnTemp);
    } else {
      removeIndex('Confidence Score');
    }
  };

  const handleNotes = (e, checked) => {
    setNote(checked);
    const columnTemp = [...column];
    if (checked) {
      columnTemp.push({ header: 'Note', accessor: 'note' });
      setColumn(columnTemp);
    } else {
      removeIndex('Note');
    }
  };
  const onEditAll = () => {
    setEditedRows(rows);
  };
  const editRow = (id, key, value) => {
    setEditedRows((rows) =>
      rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  const editMode = editedRows?.length > 0;
  console.log('column', editMode);
  const onRowSave = () => {
    // setRows(rows.map((row) => (row.id === editedRows.id ? editedRows : row)));
    setEditedRows({});
  };

  const addNewRow = (rowLength) => {
    setMetaDataList([
      ...metaDataList,
      {
        id: metaDataList.length + rowLength + 1,
        header: '',
        name: '',
        type: '',
      },
    ]);
  };

  const handleChange = (e, id) => {
    setMetaDataList(
      metaDataList.map((list) =>
        list?.id === id
          ? {
              ...list,
              [e.target.name]: e.target.value,
            }
          : list,
      ),
    );
  };

  const deleteMetaData = (id) => {
    setMetaDataList(metaDataList.filter((list) => list?.id !== id));
  };

  const RenderTable = useMemo(() => {
    return (
      <Table
        className="table-panel"
        columns={column}
        rows={rows?.map((row, i) => ({
          ...row,
          editRow,
          editMode,
          editRowData: editMode && editedRows[i],
          editedRows,
        }))}
        rowId="id"
        hidePagination
        hasScroll
        rowProps={{ hover: false }}
        stripedRows
      />
    );
  }, [column, editedRows]);

  useEffect(() => {
    setEditedRows(rows);
  }, []);
  //   useEffect(() => {
  //     console.log('Rows in table ', rows);
  //   }, [rows]);
  //   useEffect(() => {
  //     console.log('editedRows in table ', editedRows);
  //   }, [editedRows]);

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
      <div>{RenderTable}</div>
      {metaDataList.map((list) => (
        <CustomForm
          key={list?.id}
          item={list}
          deleteMetaData={() => deleteMetaData(list?.id)}
          handleChange={(e) => handleChange(e, list?.id)}
        />
      ))}
      <div className="iconDiv">
        <div className="iconContainer">
          <Plus onClick={() => addNewRow(rows.length)} />
        </div>
      </div>
    </div>
  );
}

MetaDataEditTable.propTypes = {
  // eslint-disable-next-line react/require-default-props
  // handleRightBlade: PropTypes.func,
  rows: PropTypes.isRequired,
  setRows: PropTypes.isRequired,
  metaDataList: PropTypes.isRequired,
  setMetaDataList: PropTypes.isRequired,
};

Cell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
export default MetaDataEditTable;
