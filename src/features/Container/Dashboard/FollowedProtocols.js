import React from "react";
import { useSelector } from "react-redux";

import {
  followedProtocolsList,
  tableLoader,
} from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function FollowedProtocols({ pageRows, maxHeight }) {
  const protocolData = useSelector(followedProtocolsList);
  const loader = useSelector(tableLoader);

  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        isLoading={loader}
        pageRows={protocolData && protocolData.length > 0 ? pageRows : []}
        screen="FollowedProtocols"
        maxHeight={maxHeight}
        defaultRows={pageRows[0]}
      />
    </>
  );
}

export default FollowedProtocols;
