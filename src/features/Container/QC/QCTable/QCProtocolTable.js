import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {qcProtocols, qcProtocolsError} from '../qcSlice';
import ProtocolTableComp from "../../../Components/QC/QCProtocolTable";
function ProtocolTable({handleProtocolClick}) {
  const dispatch = useDispatch();
  const protocolData = useSelector(qcProtocols);
  const error = useSelector(qcProtocolsError);
  useEffect(() => {
    // dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
    dispatch({ type: "GET_QC_PROTOCOL_TABLE_SAGA" });
  }, []);
  return (
    <div id="protocol-table">
      {error}
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        pageRows={[5, 20, 30, "All"]}
        handleProtocolClick={handleProtocolClick}
      />
    </div>
  );
}

export default ProtocolTable;
