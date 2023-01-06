import React, { useState } from 'react';
import Table from 'apollo-react/components/Table';

import Checkbox from 'apollo-react/components/Checkbox';
import initialRows from './Records.json';

function MetaDataTable() {
  const [rows] = useState(initialRows);

  const columns = [
    {
      header: 'Key',
      accessor: 'header',
    },
    {
      header: 'Value',
      accessor: 'name',
    },
  ];
  const [column, setColumn] = useState(columns);

  const [confidence, setConfidence] = React.useState(false);
  const [note, setNote] = React.useState(false);

  const removeIndex = (key) => {
    const columnTemp = [...column];
    console.log('before', columnTemp);
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
    if (checked) {
      column.push({ header: 'Note', accessor: 'note' });
      setColumn(column);
    } else {
      removeIndex('Note');
    }
  };

  return (
    <div
      className="digitize-panel-content"
      data-testid="protocol-column-wrapper"
    >
      <Checkbox
        label="Notes"
        size="small"
        checked={note}
        onChange={handleNotes}
        className="checkbox-pad metadata-checkbox"
      />
      <Checkbox
        label="Confidence Score"
        checked={confidence}
        onChange={handleConfidence}
        size="small"
        className="metadata-checkbox checkbox-pad "
      />

      <div>
        <Table
          className="table-panel"
          columns={column}
          rows={rows}
          rowId="employeeId"
          hidePagination
          hasScroll
          rowProps={{ hover: false }}
          stripedRows
        />
      </div>
    </div>
  );
}

MetaDataTable.propTypes = {
  // eslint-disable-next-line react/require-default-props
  // handleRightBlade: PropTypes.func,
};

export default MetaDataTable;
