import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prtocolsList, prtocolsError } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";
function ProtocolTable() {
  const dispatch = useDispatch();
  const protocolData = useSelector(prtocolsList);
  const error = useSelector(prtocolsError);
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
  }, []);
  return (
    <div id='protocol-table'>
      {error}
      <ProtocolTableComp initialRows={protocolData} />
    </div>
  );
}

export default ProtocolTable;
