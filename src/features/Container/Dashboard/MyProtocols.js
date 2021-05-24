import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { prtocolsList } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function MyProtocols() {
  const dispatch = useDispatch();
  const protocolData = useSelector(prtocolsList);

  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
  }, []);
  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        pageRows={[5, 20, 30, "All"]}
      />
    </>
  );
}

export default MyProtocols;
