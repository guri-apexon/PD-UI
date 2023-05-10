/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { qcProtocols, qcProtocolsError, tableLoader } from '../qcSlice';
import ProtocolTableComp from '../../../Components/Dashboard/QCTable';

function ProtocolTable({ handleProtocolClick }) {
  const protocolData = useSelector(qcProtocols);
  const error = useSelector(qcProtocolsError);
  const loader = useSelector(tableLoader);

  return (
    <div className="qc-protocol-table">
      <div id="protocol-table">
        {error}
        <ProtocolTableComp
          initialRows={
            protocolData && protocolData.length > 0 ? protocolData : []
          }
          isLoading={loader}
          pageRows={
            protocolData && protocolData.length > 0 ? [10, 20, 30, 'All'] : []
          }
          handleProtocolClick={handleProtocolClick}
          screen="QC"
          maxHeight={600}
          defaultRows={10}
        />
      </div>
    </div>
  );
}

export default ProtocolTable;
