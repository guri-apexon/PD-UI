import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL_8000 } from "../../../utils/api";

import {
  followedProtocolsList,
  tableLoader,
  getFollowedProtocols,
} from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/FollowingTable";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";
import { toast } from "react-toastify";
// import { date } from "@material-ui/pickers/constants/prop-types";

function FollowedProtocols({ pageRows, maxHeight }) {
  const dispatch = useDispatch();
  const protocolData = useSelector(followedProtocolsList);
  // const userDetail = useSelector((state) => state.user.userDetail);
  const loader = useSelector(tableLoader);
  // const [formatedData, setFormatedData] = useState([]);

  const fetchAssociateData = async (row) => {
    try {
      const resp = await axios.get(
        `${BASE_URL_8000}/api/Related_protocols/?protocol=${row.protocol}`
      );
      const respData = resp.data;
      const data = respData.sort((a, b) => {
        return new Date(b.approvalDate) - new Date(a.approvalDate);
      });
      if (data.length > 0) {
        let temp = cloneDeep(protocolData);
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === row.id) {
            temp[i].associateddata = data;
            temp[i].linkEnabled = false;
          }
        }
        dispatch(getFollowedProtocols(temp));
      } else {
        let temp = cloneDeep(protocolData);
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].id === row.id) {
            temp[i].linkEnabled = false;
          }
        }
        dispatch(getFollowedProtocols(temp));
        toast.info(
          `The Protocol: "${row.protocol}" selected has no associated protocols available`
        );
      }
    } catch (e) {
      console.log(e);
    }
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
