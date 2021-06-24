import React from "react";
import { useSelector } from "react-redux";

import { prtocolsList, tableLoader } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function MyProtocols({ setSelectedProtocols, pageRows }) {
  const protocolData = useSelector(prtocolsList);
  const loader = useSelector(tableLoader);

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
