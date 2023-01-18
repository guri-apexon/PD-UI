import React, { useEffect, useMemo, useState } from 'react';
import Table from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import TextField from 'apollo-react/components/TextField/TextField';
import Checkbox from 'apollo-react/components/Checkbox';
import Plus from 'apollo-react-icons/Plus';
import CustomForm from './CustomForm';

function Cell({ row, column }) {
  return (
    <div style={{ paddingTop: row.editMode ? 14 : 0 }}>
      {row[column.accessor]}
    </div>
  );
}

function EditableCell({ row, column: { accessor: key } }) {
  const [val, setVal] = useState(row[key]);
  const handleDataChange = (id, key, e) => {
    setVal(e.target.value);
  };
  return key === 'name' || row?.isCustom ? (
    <TextField
      size="small"
      fullWidth
      value={val}
      onChange={(e) => {
        handleDataChange(row.id, key, e);
      }}
      onBlur={() => row.editRow(row?.id, key, val)}
      error={!row[key]}
      helperText={!row[key] && 'Required'}
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
}) {
  const { tableData } = data;
  const [editedRow, setEditedRow] = useState({});

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
  const editRow = (id, key, value) => {
    const filterRow = tableData.filter((row) => row?.id === id);
    setEditedRow({
      ...filterRow[0],
      [key]: value,
    });
  };

  const addNewRow = (rowLength) => {
    setMetaDataList({
      ...metaDataList,
      [data.name]: metaDataList[data.name]
        ? [
            ...metaDataList[data.name],
            {
              id: metaDataList[data.name].length + rowLength + 1,
              isCustom: true,
              header: '',
              name: '',
              type: '',
            },
          ]
        : [
            {
              id: rowLength + 1,
              isCustom: true,
              header: '',
              name: '',
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
              [e.target.name]: e.target.value,
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
  }, [editedRow]);

  const RenderTable = useMemo(() => {
    return (
      <Table
        className="table-panel"
        columns={column}
        rows={tableData?.map((row) => ({
          ...row,
          editRow,
          editedRow: row,
          setEditedRow,
        }))}
        rowId="id"
        hidePagination
        hasScroll
        rowProps={{ hover: false }}
        stripedRows
      />
    );
  }, [column, tableData]);

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
      {metaDataList[data.name]?.map((list) => (
        <CustomForm
          key={list?.id}
          item={list}
          deleteMetaData={() => deleteMetaData(list?.id)}
          handleChange={(e) => handleChange(e, list?.id)}
        />
      ))}
      <div className="iconDiv">
        <div className="iconContainer">
          <Plus onClick={() => addNewRow(tableData.length)} />
        </div>
      </div>
    </div>
  );
}

MetaDataEditTable.propTypes = {
  // eslint-disable-next-line react/require-default-props
  // handleRightBlade: PropTypes.func,
  metaDataList: PropTypes.isRequired,
  setMetaDataList: PropTypes.isRequired,
  data: PropTypes.isRequired,
  updateRows: PropTypes.isRequired,
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
