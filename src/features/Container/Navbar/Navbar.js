import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import InfoIcon from "apollo-react-icons/Info";
import NavigationBar from "apollo-react/components/NavigationBar";
import Typography from "apollo-react/components/Typography";
import { BASE_URL_8000, UI_URL } from "../../../utils/api";
import { navbarNotifications } from "./navbarSlice";
import { userId } from "../../../store/userDetails";
import Alerts from "./Alerts";

import { toast } from "react-toastify";

function Navbar({
  profileMenuProps,
  navMenuItems,
  onClickNavigation,
  checknav,
}) {
  const dispatch = useDispatch();
  let history = useHistory();
  const notificationsMenuProps = useSelector(navbarNotifications);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const userDetail = useSelector((state) => state.user.userDetail);

  // console.log(">>>>>", userDetail);
  useEffect(() => {
    if ("userId" in userData) {
      const userID = userData.userId.substring(1);
      if (userID) {
        dispatch({ type: "GET_NOTIFICATION_SAGA", payload: userID });
      }
    }
  }, [userData, dispatch]);
  useEffect(() => {
    setUserData(userDetail);
  }, [userDetail]);
  const checkForPrimary = async (data) => {
    // debugger;
    const postObj = {
      id: data.id,
      protocol: data.protocol,
      aidocId: data.aidocId,
      readFlag: true,
    };
    const notificationUrl = `${BASE_URL_8000}/api/notification_read`;
    try {
      const readResp = await axios.post(notificationUrl, postObj);
      if (readResp) {
        const userID = userData.userId.substring(1);
        const userresp = await axios.get(
          `${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userID}&protocol=${data.protocolNumber}`
        );
        if (userresp && userresp.data) {
          dispatch({ type: "GET_NOTIFICATION_SAGA", payload: userID });
          history.push(`/protocols?protocolId=${data.aidocId}&tab=2`);
        } else {
          toast.warn(
            "You are not an approved primary user of this protocol. Access to details denied"
          );
        }
      } else {
      }
    } catch (err) {}
    // dispatch({ type: "SET_NOTIFICATION_READ_SAGA", payload: postObj });

    //---- Remove in local-----------
    // const axiosResp = await axios.get("/session");
    // const axiosUser = axiosResp.data;
    // const userID = axiosUser.userId.substring(1);

    //------Uncomment in Local -------
  };

  return (
    "userId" in userData &&
    userData.userId && (
      <div data-testid="navbar-test">
        <NavigationBar
          LogoComponent={() => (
            <div
              style={{
                color: "white",
                lineHeight: "56px",
                marginRight: 24,
                cursor: "pointer",
                zIndex: 2,
                whiteSpace: "nowrap",
              }}
              // onClick={() => console.log('Logo clicked')}
              onClick={() => history.push("/")}
            >
              IQVIA <span style={{ fontWeight: 400 }}>Protocol Library</span>
            </div>
          )}
          // logoProps={logoProps}
          // notificationsMenuProps={data}
          menuItems={navMenuItems}
          profileMenuProps={profileMenuProps}
          onClick={({ pathname }) => onClickNavigation(pathname)}
          checkIsActive={(item) => checknav(item)}
          waves
          otherButtons={<Alerts list={notificationsMenuProps} />}
        />
      </div>
    )
  );
}

export default Navbar;
