/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  followedProtocolsList,
  tableLoader,
  getFollowedProtocols,
} from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/FollowingTable";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";

function FollowedProtocols({ pageRows, maxHeight }) {
  const dispatch = useDispatch();
  const protocolData = useSelector(followedProtocolsList);
  const loader = useSelector(tableLoader);

  const fetchAssociateData = async (row) => {
    dispatch({
      type: "FETCH_ASSOCIATE_DATA",
      payload: { protocol: row.protocol, id: row.id },
    });
  };
  const handleUnfollow = (row) => {
    dispatch({
      type: "HANDLE_FOLLOW_SAGA",
      payload: { data: row, follow: false },
    });
  };
  useEffect(() => {
    if (protocolData.length > 0) {
      let tempData = cloneDeep(protocolData);
      tempData.sort((a, b) => {
        const aDate = new Date(a.approvalDate);
        const bDate = new Date(b.approvalDate);
        return bDate - aDate;
      });
      let temp = uniqBy(tempData, "protocol");
      for (let i = 0; i < temp.length; i++) {
        temp[i].associateddata = [];
        temp[i].linkEnabled = true;
      }
      console.log("check", temp);
      dispatch(getFollowedProtocols(temp));
    }
  }, []);
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
        fetchAssociateData={fetchAssociateData}
        handleUnfollow={handleUnfollow}
      />
    </>
  );
}

export default FollowedProtocols;
