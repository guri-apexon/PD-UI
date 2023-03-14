import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'apollo-react/components/Card/Card';
import Table from 'apollo-react/components/Table';
import LABDATA_CONSTANTS from './constants';

function LabData() {
  const rows = [];
  return (
    <Card
      className="protocol-column protocol-digitize-column metadata-card"
      data-testid="metadata-accordian"
    >
      <div className="panel-heading ">
        <div className="metadat-flex-plus"> Lab Data </div>
      </div>
      <div>
        <Table
          columns={LABDATA_CONSTANTS.columnList}
          rows={rows}
          rowId="id"
          hidePagination
        />
      </div>
    </Card>
  );
}

export default LabData;
