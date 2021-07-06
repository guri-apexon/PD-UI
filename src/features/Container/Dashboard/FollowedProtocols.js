import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL_8000 } from "../../../utils/api";

import {
  followedProtocolsList,
  tableLoader,
} from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/FollowingTable";
import { cloneDeep, uniqBy } from "lodash-es";

function FollowedProtocols({ pageRows, maxHeight }) {
  const protocolData = useSelector(followedProtocolsList);
  const loader = useSelector(tableLoader);
  const [formatedData, setFormatedData] = useState([]);
 
  const fetchAssociateData = async (row) => {
    
    try {
      const resp = await axios.get(
        `${BASE_URL_8000}/api/Related_protocols/?protocol=${row.protocol}`
      );
      const data = resp.data;
      let temp = cloneDeep(formatedData);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === row.id) {
          temp[i].associateddata = data;
          temp[i].linkEnabled = false;
        }
      }
      setFormatedData(temp);
      // console.log(formatedData);
      console.log("data", temp);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (protocolData.length > 0) {
      let tempData = cloneDeep(protocolData);
      let temp = uniqBy(tempData, "protocol");
      for (let i = 0; i < temp.length; i++) {
        temp[i].associateddata = [];
        temp[i].linkEnabled = true;
      }
      console.log("check", temp);
      setFormatedData(temp);
    }
  }, []);
  return (
    <>
      <ProtocolTableComp
        initialRows={
          protocolData && protocolData.length > 0 ? formatedData : []
        }
        isLoading={loader}
        pageRows={protocolData && protocolData.length > 0 ? pageRows : []}
        screen="FollowedProtocols"
        maxHeight={maxHeight}
        defaultRows={pageRows[0]}
        fetchAssociateData={fetchAssociateData}
      />
    </>
  );
}

export default FollowedProtocols;
