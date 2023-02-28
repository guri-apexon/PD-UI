import React, { useState } from 'react';
import Table from 'apollo-react/components/Table';
import Checkbox from 'apollo-react/components/Checkbox';
import PropTypes from 'prop-types';

function MetaDataTable({ metaData }) {
  const METADATA_CONFIDENCE = {
    header: 'Confidence Score',
    accessor: 'confidence',
  };
  const METADATA_NOTE = { header: 'Notes', accessor: 'note' };

  const columns = [
    {
      header: 'Key',
      accessor: 'display_name',
    },
    {
      header: 'Value',
      accessor: 'attr_value',
    },
  ];
  const [column, setColumn] = useState(columns);

  const [confidence, setConfidence] = React.useState(false);
  const [note, setNote] = React.useState(false);

  const removeIndex = (key) => {
    setColumn(column.filter((col) => col.accessor !== key));
  };
  const handleConfidence = (e, checked) => {
    setConfidence(checked);
    if (checked) {
      setColumn([...column, METADATA_CONFIDENCE]);
    } else {
      removeIndex('confidence');
    }
  };

  const handleNotes = (e, checked) => {
    setNote(checked);
    if (checked) {
      setColumn([...column, METADATA_NOTE]);
    } else {
      removeIndex('note');
    }
  };

  return (
    <div className="digitize-panel-content" data-testid="metadata-table-view">
      <div className="checkbox-right">
        <Checkbox
          label="Confidence Score"
          checked={confidence}
          onChange={handleConfidence}
          size="small"
          className="metadata-checkbox checkbox-pad "
          data-testid="metadata-confidence"
        />
        <Checkbox
          label="Notes"
          size="small"
          checked={note}
          onChange={handleNotes}
          className="checkbox-pad metadata-checkbox"
          data-testid="metadata-notes"
        />
      </div>

      <div>
        <Table
          className="table-panel"
          columns={column}
          rows={metaData}
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
  metaData: PropTypes.isRequired,
};

export default MetaDataTable;
