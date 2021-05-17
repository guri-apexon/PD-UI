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
  const userId1 = useSelector(userId);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch({ type: "GET_NOTIFICATION_SAGA" });
  }, []);

  const checkForPrimary = async (data) => {
    dispatch({ type: "SET_NOTIFICATION_READ_SAGA", payload: data.id });
    const userresp = await axios.get(
      `${BASE_URL_8000}/api/user_protocol/is_primary_user?userId=${userId1.substring(
        1
      )}&protocol=${data.protocolNumber}`
    );
    if (userresp && userresp.data) {
      history.push(`/protocols?protocolId=${data.aidocId}&tab=3`);
    } else {
      toast.warn(
        "You are not an approved primary user of this protocol. Access to details denied"
      );
      // alert(
      //   "You are not an approved primary user of this protocol. Access to details denied"
      // );
    }
  };

  useEffect(() => {
    console.log(notificationsMenuProps);
    const noti = _.cloneDeep(notificationsMenuProps);
    if (noti.length) {
      let newNotifications = false;
      // Sorting by latest timestamp
      noti.sort(function (a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      // converting timestamp to moment
      // adding icons
      // checking for new notifications
      let notifications = noti.map((item) => {
        item.icon = InfoIcon;
        item.timestamp = moment(item.timestamp);
        item.onClick = () => checkForPrimary(item);
        // (window.location.href = `/protocols?protocolId=${item.id}&tab=3`);
        if (!item.read) {
          newNotifications = true;
        }
        return item;
      });
      let data = {
        newNotifications: newNotifications,
        notifications: notifications,
      };

      console.log("notificationsMenuProps", data);
      setData(data);
    }
  }, [notificationsMenuProps]);

  const notificationsMenuPropsTest = {
    newNotifications: true,
    notifications: [
      {
        icon: InfoIcon,
        read: false,
        header: "Header 1",
        details: "Lorem ipsum dolor sit ame. Lorem ipsum dolor sit ame.",
        timestamp: moment("2013-09-17T00:00:00"),
      },
      {
        icon: InfoIcon,
        read: false,
        header: "Header",
        details: "Lorem ipsum dolor sit ame. Lorem ipsum dolor sit ame.",
        timestamp: moment(),
      },
      {
        icon: InfoIcon,
        read: true,
        header: "Header",
        details: "Lorem ipsum dolor sit ame",
        timestamp: moment().subtract(1, "day"),
      },
      {
        icon: InfoIcon,
        read: false,
        header: "Header",
        details: "Lorem ipsum dolor sit ame",
        timestamp: moment().subtract(2, "day"),
      },
      {
        icon: InfoIcon,
        read: true,
        header: "Header",
        details: "Lorem ipsum dolor sit ame",
        timestamp: moment().subtract(3, "day"),
      },
    ],
  };

  return (
    <NavigationBar
      LogoComponent={() => (
        <Typography
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
        </Typography>
      )}
      // logoProps={logoProps}
      notificationsMenuProps={data}
      menuItems={navMenuItems}
      profileMenuProps={profileMenuProps}
      onClick={({ pathname }) => onClickNavigation(pathname)}
      checkIsActive={(item) => checknav(item)}
      waves
    />
  );
}

export default Navbar;
