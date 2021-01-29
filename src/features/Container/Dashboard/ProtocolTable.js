import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { prtocolsList, prtocolsError } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";
import { userId } from "../../../store/userDetails";
function ProtocolTable() {
  const dispatch = useDispatch();
  const protocolData = useSelector(prtocolsList);
  const id = useSelector(userId);
  const error = useSelector(prtocolsError);
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
  }, []);
  return (
    <div id="protocol-table">
      {error}
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        pageRows={[5, 20, 30, "All"]}
      />
    </div>
  );
}

export default ProtocolTable;
