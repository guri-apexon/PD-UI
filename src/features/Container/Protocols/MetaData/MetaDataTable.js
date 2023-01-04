import Card from 'apollo-react/components/Card/Card';
import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import React, { useState } from 'react';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Table, {
  compareNumbers,
  compareStrings,
} from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import Checkbox from 'apollo-react/components/Checkbox';
import initialRows from './Records.json';
import './MetaData.scss';

function MetaDataTable() {
  const [rows] = useState(initialRows);
  const columns = [
    {
      header: 'Header',
      accessor: 'header',
      sortFunction: compareNumbers,
    },
    {
      header: 'Description',
      accessor: 'name',
      sortFunction: compareStrings,
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
      console.log(Object.values(columnTemp[i])[0]);
      if (Object.values(columnTemp[i])[0] === key) {
        index = i;
      }
    }

    console.log('index', index);
    columnTemp.splice(index, 1);
    setColumn(columnTemp);
  };
  const handleConfidence = (e, checked) => {
    setConfidence(checked);
    const columnTemp = [...column];
    if (checked) {
      columnTemp.push({ header: 'Confidence', accessor: 'confidence' });
      setColumn(columnTemp);
    } else {
      removeIndex('Confidence');
    }

    console.log(column);
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
      <div className="metadata-checkbox">
        <Checkbox
          label="Confidence Score"
          checked={confidence}
          onChange={handleConfidence}
          size="small"
        />
        <Checkbox
          label="Notes"
          size="small"
          checked={note}
          onChange={handleNotes}
        />
      </div>
      <div>
        <Table
          className="table-panel"
          columns={column}
          rows={rows}
          rowId="employeeId"
          initialSortedColumn="name"
          initialSortOrder="asc"
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
