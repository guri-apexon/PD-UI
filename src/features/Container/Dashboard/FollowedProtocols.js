import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL_8000 } from "../../../utils/api";

import {
  followedProtocolsList,
  tableLoader,
} from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/FollowingTable";
import { cloneDeep, uniqBy } from "lodash-es";
import { toast } from "react-toastify";
// import { date } from "@material-ui/pickers/constants/prop-types";

function FollowedProtocols({ pageRows, maxHeight }) {
  const dispatch = useDispatch();
  const protocolData = useSelector(followedProtocolsList);
  const userDetail = useSelector((state) => state.user.userDetail);
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
  const handleUnfollow = (row) => {
    console.log(row);
    console.log(userDetail);
    const id = userDetail.userId;
    let temp = cloneDeep(formatedData);
    var lists = temp.filter((item) => {
      return item.protocol !== row.protocol;
    });
    axios
      .post(`${BASE_URL_8000}/api/follow_protocol/`, {
        userId: id.substring(1),
        protocol: row.protocol,
        follow: false,
        userRole: row.UserRole,
      })
      .then((res) => {
        if (res && res.status === 200) {
          toast.info(`Protocol Successfully Unfollowed`);
          setFormatedData(lists);
          dispatch({ type: "GET_PROTOCOL_TABLE_SAGA", payload: lists });
        }
      })
      .catch(() => {
        toast.error("Something Went Wrong");
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
        handleUnfollow={handleUnfollow}
      />
    </>
  );
}

export default FollowedProtocols;
