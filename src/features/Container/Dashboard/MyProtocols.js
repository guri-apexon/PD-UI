import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { prtocolsList, tableLoader } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function MyProtocols({ setSelectedProtocols, pageRows }) {
  const dispatch = useDispatch();
  const protocolData = useSelector(prtocolsList);
  const loader = useSelector(tableLoader);

  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
  }, []);
  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        isLoading={loader}
        pageRows={pageRows}
        setSelectedProtocols={setSelectedProtocols}
      />
    </>
  );
}

export default MyProtocols;
