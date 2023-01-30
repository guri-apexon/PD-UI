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

const confidenceCol = { attr_name: 'Confidence Score', accessor: 'confidence' };

function EditableCell({ row, column: { accessor: key } }) {
  const [val, setVal] = useState(row[key]);
  const handleDataChange = (id, key, e) => {
    setVal(e.target.value);
  };
  return key === 'attr_value' || row?.isCustom || key === 'note' ? (
    <TextField
      size="small"
      fullWidth
      value={val}
      onChange={(e) => {
        handleDataChange(row.id, key, e);
      }}
      onBlur={() => row.editRow(row?.id, key, val)}
      // error={!row[key]}
      // helperText={!row[key]}
    />
  ) : (
    row[key]
  );
}

function MetaDataEditTable({
  metaDataList,
  setMetaDataList,
  data,
  updateRows,
  deleteRows,
}) {
  const { _meta_data } = data;
  const [editedRow, setEditedRow] = useState({});
  const [deletedRow, setDeletedRow] = useState({});

  const columns = [
    {
      attr_name: 'Key',
      accessor: 'attr_name',
      customCell: EditableCell,
    },
    {
      attr_name: 'Value',
      accessor: 'attr_value',
      customCell: EditableCell,
    },
    {
      attr_name: 'Delete',
      accessor: 'isCustom',
      customCell: DeleteCell,
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
        attr_name: 'Note',
        accessor: 'note',
        customCell: EditableCell,
      });
      reArrangeColumn(columnTemp);
    } else {
      removeIndex('Note');
    }
  };
  const editRow = (id, key, value) => {
    const filterRow = _meta_data.filter((row) => row?.id === id);
    setEditedRow({
      ...filterRow[0],
      [key]: value,
    });
  };

  const deleteRow = (id) => {
    let index;
    for (let i = 0; i < _meta_data.length; i++) {
      if (_meta_data[i]?.id === id) {
        index = i;
      }
    }
    _meta_data.splice(index, 1);
    setDeletedRow(_meta_data);
  };

  useEffect(() => {
    deleteRows(deletedRow, data?.name);
    // eslint-disable-next-line
  }, [deletedRow]);

  const addNewRow = (rowLength) => {
    setMetaDataList({
      ...metaDataList,
      [data.name]: metaDataList[data.name]
        ? [
            ...metaDataList[data.name],
            {
              id: metaDataList[data.name].length + rowLength + 1,
              isCustom: true,
              attr_name: '',
              attr_value: '',
              type: '',
            },
          ]
        : [
            {
              id: rowLength + 1,
              isCustom: true,
              attr_name: '',
              attr_value: '',
              type: '',
            },
          ],
    });
  };

  const handleChange = (e, id) => {
    setMetaDataList({
      ...metaDataList,
      [data.name]: metaDataList[data.name].map((list) =>
        list?.id === id
          ? {
              ...list,
              [e.target.name]:
                list?.type === 'Date' && e.target.name === 'attr_value'
                  ? moment(e.target.value).format('DD-MMM-YYYY')
                  : e.target.value,
            }
          : list,
      ),
    });
  };

  const deleteMetaData = (id) => {
    setMetaDataList({
      ...metaDataList,
      [data.name]: metaDataList[data.name].filter((list) => list?.id !== id),
    });
  };

  useEffect(() => {
    updateRows(editedRow, data?.name);
    // eslint-disable-next-line
  }, [editedRow]);

  const RenderTable = useMemo(() => {
    return (
      <Table
        data-testid="metadata-table"
        className="table-panel"
        columns={column}
        rows={_meta_data?.map((row) => ({
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
  }, [column, _meta_data?.length]);

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
      {metaDataList[data.name]?.map((list) => (
        <CustomForm
          data-testid="metadata-form"
          key={list?.id}
          item={list}
          deleteMetaData={() => deleteMetaData(list?.id)}
          handleChange={(e) => handleChange(e, list?.id)}
        />
      ))}
      <div className="iconDiv">
        <div className="iconContainer">
          <Plus
            data-testid="metadata-add"
            onClick={() => addNewRow(_meta_data.length)}
          />
        </div>
      </div>
    </div>
  );
}

MetaDataEditTable.propTypes = {
  metaDataList: PropTypes.isRequired,
  setMetaDataList: PropTypes.isRequired,
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
