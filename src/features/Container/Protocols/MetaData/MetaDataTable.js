import Card from 'apollo-react/components/Card/Card';
import EllipsisVerticalIcon from 'apollo-react-icons/EllipsisVertical';
import React, { useEffect, useState } from 'react';
import Button from 'apollo-react/components/Button';
import IconMenuButton from 'apollo-react/components/IconMenuButton';
import Table, {
  compareNumbers,
  compareStrings,
} from 'apollo-react/components/Table';
import PropTypes from 'prop-types';
import Checkbox from 'apollo-react/components/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import initialRows from './Records.json';
import './MetaData.scss';
import { metaSummaryField } from '../protocolSlice';

function MetaDataTable() {
  const [rows] = useState(initialRows);
  const dispatch = useDispatch();
  const summaryFields = useSelector(metaSummaryField);

  useEffect(() => {
    console.log('useEffect');
    dispatch({
      type: 'GET_METADATA_SUMMARYDATA',
    });
  }, []);

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
      console.log(Object.values(columnTemp[i])[0]);
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
          // initialSortedColumn="name"
          // initialSortOrder="asc"
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
