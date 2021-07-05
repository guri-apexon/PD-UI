import React from "react";
import { useSelector } from "react-redux";

import { prtocolsList } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function MyProtocols({ setSelectedProtocols, pageRows, maxHeight }) {
  const protocolData = useSelector(prtocolsList);

  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        isLoading={false}
        pageRows={protocolData && protocolData.length > 0 ? pageRows : []}
        setSelectedProtocols={setSelectedProtocols}
        maxHeight={maxHeight}
        defaultRows={pageRows[0]}
      />
    </>
  );
}

export default MyProtocols;
