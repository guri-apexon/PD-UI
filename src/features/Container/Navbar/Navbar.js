import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "apollo-react/components/NavigationBar";

import { navbarNotifications } from "./navbarSlice";
import Alerts from "./Alerts";

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
  const userDetail = useSelector((state) => state.user.userDetail);

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
