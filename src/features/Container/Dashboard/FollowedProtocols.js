import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  followedProtocolsList,
  tableLoader,
} from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function FollowedProtocols({ pageRows }) {
  const dispatch = useDispatch();
  const protocolData = useSelector(followedProtocolsList);
  const loader = useSelector(tableLoader);

  useEffect(() => {
    dispatch({ type: "GET_FOLLOWED_PROTOCOL_SAGA" });
  }, []);
  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        isLoading={loader}
        pageRows={pageRows}
        screen="FollowedProtocols"
      />
    </>
  );
}

export default FollowedProtocols;
