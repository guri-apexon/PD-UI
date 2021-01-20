import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import Routes from "./Routes/routes";
import NavigationBar from "apollo-react/components/NavigationBar";
import { useHistory, useLocation } from "react-router-dom";
import { dashboard } from "./features/Container/Dashboard/dashboardSlice";
import SettingsIcon from "apollo-react-icons/Cog";
import HelpIcon from "apollo-react-icons/Help";
import UserIcon from "apollo-react-icons/User";
import Typography from "apollo-react/components/Typography";
import IdleTimer from "react-idle-timer";

import SessionExpired from "./SessionOut";

function App(props) {
  const idleTimer = useRef(null);
  let history = useHistory();
  let location = useLocation();
  const dashboardData = useSelector(dashboard);
  const [pathname, setPathname] = useState("/dashboard");
  const [isTimedOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    if (location && location.pathname) {
      setPathname(location.pathname);
    }
  }, [location]);

  const menuItems = [
    {
      text: "Dashboard",
      pathname: "/dashboard",
    },
    {
      text: "Protocols",
      pathname: "/protocols",
    },
    {
      text: "Search",
      pathname: "/search",
    },
  ];
  const sessionMenuItems = [
    {
      text: "Login",
      pathname: "/login",
    },
  ];
  const profileMenuProps = {
    name: "",
    title: "Sales",
    email: "asif@iqvia.com",
    logoutButtonProps: { pathname: "/logout" },
    menuItems: [
      {
        text: "Profile",
        pathname: "/profile",
        icon: UserIcon,
      },
      {
        text: "Settings",
        pathname: "/settings",
        icon: SettingsIcon,
      },
      {
        text: "Help",
        pathname: "/help",
        icon: HelpIcon,
      },
    ],
  };
  // const logoProps = {
  //   src: 'logo-img.png',
  //   alt: 'IQVIA Protocol Library',
  //   onClick: () => history.push('/'),
  // };

  const onClickNavigation = (pathname) => {
    history.push(pathname);
    setPathname(pathname);
  };
  const checknav = (item) => {
    return item.pathname
      ? item.pathname === pathname
      : item.menuItems.some((item) => item.pathname === pathname);
  };

  const handleOnAction = (event) => {
    // console.log("user did something", event);
    // setIsTimeOut(false);
  };

  const handleOnActive = (event) => {
    console.log("user is active", event);
    // console.log("time remaining", idleTimer.getRemainingTime());
    // setIsTimeOut(false);
  };

  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    setIsTimeOut(true);
    window.location.href = "http://www.google.com";
    // console.log("p", props);
    // console.log("last active", idleTimer.getLastActiveTime());
    // const isTimedOut = isTimedOut;

    // if (isTimedOut) {
    // console.log("Timout")
    // this.props.history.push("/");
    // } else {
    // this.setState({ showModal: true });
    // this.idleTimer.reset();
    // this.setState({ isTimedOut: true });

    // }
  };
  return (
    <>
      <div>
        <IdleTimer
          ref={idleTimer}
          timeout={1000*5*60}
          onActive={handleOnActive}
          onIdle={handleOnIdle}
          onAction={handleOnAction}
          debounce={250}
        />
        {isTimedOut ? (
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
          />
        ) : (
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
            menuItems={menuItems}
            profileMenuProps={profileMenuProps}
            onClick={({ pathname }) => onClickNavigation(pathname)}
            checkIsActive={(item) => checknav(item)}
            waves
          />
        )}
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
          menuItems={menuItems}
          profileMenuProps={profileMenuProps}
          onClick={({ pathname }) => onClickNavigation(pathname)}
          checkIsActive={(item) => checknav(item)}
          waves
        />
        {dashboardData && dashboardData.apiError && (
          <span className="main-error-message">
            {" "}
            Something Went Wrong, API Failed
          </span>
        )}
        {isTimedOut ? <SessionExpired /> : <Routes />}
      </div>
    </>
  );
}

export default App;
