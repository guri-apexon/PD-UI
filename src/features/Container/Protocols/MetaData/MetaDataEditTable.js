import React, { useEffect, useMemo, useState } from 'react';
import Table from 'apollo-react/components/Table';
import Trash from 'apollo-react-icons/Trash';
import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField/TextField';
import IconButton from 'apollo-react/components/IconButton';
import Checkbox from 'apollo-react/components/Checkbox';
import Plus from 'apollo-react-icons/Plus';
import moment from 'moment';
import CustomForm from './CustomForm';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

function DeleteCell({ row }) {
  return row?.isCustom ? (
    <IconButton
      onClick={() => {
        row.deleteRow(row?.id);
      }}
    >
      <Trash />
    </IconButton>
  ) : null;
}

const confidenceCol = { header: 'Confidence Score', accessor: 'confidence' };

function EditableCell({ row, column: { accessor: key } }) {
  const [val, setVal] = useState(row[key]);
  const handleDataChange = (e) => {
    setVal(e.target.value);
  };
  return key === 'name' || row?.isCustom || key === 'note' ? (
    <TextField
      size="small"
      fullWidth
      value={val}
      onChange={(e) => {
        handleDataChange(e);
      }}
      onBlur={() => row.editRow(row?.id, key, val)}
      // error={!row[key]}
      // helperText={!row[key]}
    />
  ) : (
    row[key]
  );
}

function MetaDataEditTable({ rows, setRows, data, updateRows, deleteRows }) {
  const { metaData, name } = data;
  const [editedRow, setEditedRow] = useState({});
  const [deletedRow, setDeletedRow] = useState({});

  const columns = [
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
  const reArrangeColumn = (data) => {
    let index;
    for (let i = 0; i < data.length; i++) {
      if (Object.values(data[i])[1] === 'isCustom') {
        index = i;
      }
    }
    const obj = data[index];
    data.splice(index, 1);
    data.push(obj);
    setColumn(data);
  };
  const handleConfidence = (e, checked) => {
    setConfidence(checked);
    const columnTemp = [...column];
    if (checked) {
      columnTemp.push(confidenceCol);
      reArrangeColumn(columnTemp);
    } else {
      removeIndex('Confidence Score');
    }
  };

  const handleNotes = (e, checked) => {
    setNote(checked);
    const columnTemp = [...column];
    if (checked) {
      columnTemp.push({
        header: 'Note',
        accessor: 'note',
        customCell: EditableCell,
      });
      reArrangeColumn(columnTemp);
    } else {
      removeIndex('Note');
    }
  };
  const editRow = (id, key, value) => {
    const filterRow = rows[name].filter((row) => row?.id === id);
    setEditedRow({
      ...filterRow[0],
      [key]: value,
    });
  };

  const deleteRow = (id) => {
    let index;
    for (let i = 0; i < metaData.length; i++) {
      if (metaData[i]?.id === id) {
        index = i;
      }
    }
    metaData.splice(index, 1);
    setDeletedRow(metaData);
  };

  useEffect(() => {
    deleteRows(deletedRow, data?.name);
    // eslint-disable-next-line
  }, [deletedRow]);

  const addNewRow = () => {
    setRows({
      ...rows,
      [name]: [
        ...rows[name],
        {
          id: rows[name].length + 1,
          isCustom: true,
          header: '',
          name: '',
          type: '',
        },
      ],
    });
  };

  const handleChange = (e, id) => {
    setRows({
      ...rows,
      [name]: rows[name].map((list) =>
        list?.id === id
          ? {
              ...list,
              [e.target.name]:
                list?.type === 'Date' && e.target.name === 'name'
                  ? moment(e.target.value).format('DD-MMM-YYYY')
                  : e.target.value,
            }
          : list,
      ),
    });
  };

  const deleteMetaData = (id) => {
    setRows({
      ...rows,
      [name]: rows[name].filter((list) => list?.id !== id),
    });
  };

  useEffect(() => {
    console.log(editedRow);
    updateRows(editedRow, name);
    // eslint-disable-next-line
  }, [editedRow]);

  const RenderTable = useMemo(() => {
    return (
      <Table
        data-testid="metadata-table"
        className="table-panel"
        columns={column}
        rows={rows[name]?.map((row) => ({
          ...row,
          editRow,
          deleteRow,
          editedRow: row,
          deletedRow: row,
          setEditedRow,
        }))}
        rowId="id"
        hidePagination
        hasScroll
        rowProps={{ hover: false }}
        stripedRows
      />
    );
    // eslint-disable-next-line
  }, [column, rows[name]?.length]);

  console.log('rows', rows);

  return (
    <div className="digitize-panel-content" data-testid="metadata-table-view">
      <div className="checkbox-right">
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
      </div>
      <div>{RenderTable}</div>
      {/* {rows[name]?.map((list) => (
        <CustomForm
          data-testid="metadata-form"
          key={list?.id}
          item={list}
          deleteMetaData={() => deleteMetaData(list?.id)}
          handleChange={(e) => handleChange(e, list?.id)}
        />
      ))} */}
      <div className="iconDiv">
        <div className="iconContainer">
          <Plus data-testid="metadata-add" onClick={() => addNewRow()} />
        </div>
      </div>
    </div>
  );
}

MetaDataEditTable.propTypes = {
  rows: PropTypes.isRequired,
  setRows: PropTypes.isRequired,
  data: PropTypes.isRequired,
  updateRows: PropTypes.isRequired,
  deleteRows: PropTypes.isRequired,
};

Cell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
EditableCell.propTypes = {
  row: PropTypes.isRequired,
  column: PropTypes.isRequired,
};
DeleteCell.propTypes = {
  row: PropTypes.isRequired,
};
export default MetaDataEditTable;
