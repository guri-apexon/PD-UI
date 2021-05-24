import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { followedProtocolsList } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function FollowedProtocols() {
  const dispatch = useDispatch();
  const protocolData = useSelector(followedProtocolsList);

  useEffect(() => {
    dispatch({ type: "GET_FOLLOWED_PROTOCOL_SAGA" });
  }, []);
  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? protocolData : []
        }
        pageRows={[5, 20, 30, "All"]}
        screen="FollowedProtocols"
      />
    </>
  );
}

export default FollowedProtocols;
