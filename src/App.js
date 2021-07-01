import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import IdleTimer from "react-idle-timer";
import Cookies from "universal-cookie";
import { ToastContainer } from "react-toastify";
import Loader from "apollo-react/components/Loader";
import Modal from "apollo-react/components/Modal";
import NavigationBar from "apollo-react/components/NavigationBar";

import Routes from "./Routes/routes";
import { dashboard } from "./features/Container/Dashboard/dashboardSlice";
import { setUserDetails, loggedUser } from "./store/userDetails";
import SessionExpired from "./SessionOut";
import { USER_MENU, QC1_MENU, QC2_MENU } from "./AppConstant/AppConstant";
import { baseUrlSSO, SSO_ENABLED } from "./utils/api";
import Navbar from "./features/Container/Navbar/Navbar";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const cookiesServer = new Cookies();
  const userDetails = useSelector(loggedUser);
  const dispatch = useDispatch();
  const idleTimer = useRef(null);
  let history = useHistory();
  let location = useLocation();
  const dashboardData = useSelector(dashboard);
  const [pathname, setPathname] = useState("/dashboard");
  const [isTimedOut, setIsTimeOut] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [idleId, setIdleid] = useState(0);
  const [navMenuItems, setNavMenuItems] = useState([]);
  const [typeOfUser, setTypeOfUser] = useState();
  //---------Revert-----------
  useEffect(() => {
    if (SSO_ENABLED) {
      // comment in local to run
      axios
        .get("/session")
        .then((res) => {
          if (Object.keys(res.data).length) {
            dispatch(setUserDetails(res.data));
          }
        })
        .catch((err) => console.log(err));

      const curDate = new Date();
      const expDate = cookiesServer.get("exp") * 1000;
      if (!expDate) {
        window.location.href = `${baseUrlSSO}/logout_session`;
        console.log("App Session");
      } else {
        if (curDate >= expDate) {
          console.log("exp", true);
        }
        let dif = curDate - expDate;
        dif = Math.abs(dif / 1000 / 60);
        dif = Math.round(dif * 10) / 10;
        dif = dif - 1;
        console.log("mins - ", dif);
        let testInterval = setTimeout(function () {
          axios
            .get("/refresh", {
              params: {
                callbackUrl: window.location.href,
              },
            })
            .then((res) => {
              console.log(res.data.code);
              if (res.data.code === 102) {
                window.location.href = `${baseUrlSSO}/refresh_tokens?callback=${window.location.href}`;
              }
            })
            .catch((err) => console.log(err));
        }, 60 * dif * 1000); // 60 * 1000 milsec
        setTimerId(testInterval);
      }
    } else {
      const details = {
        // userId: "q846158", // Arjun
        userId: "u1072231",
        username: "Test User",
        email: "test@iqvia.com",
        user_type: "normal",
      };
      dispatch(setUserDetails(details));
    }
  }, []);
  useEffect(() => {
    if (userDetails && userDetails.user_type) {
      setTypeOfUser(userDetails.user_type);
      setMenuItems(userDetails.user_type);
    }
  }, [userDetails]);
  const setMenuItems = (value) => {
    switch (value) {
      case "normal":
        setNavMenuItems(USER_MENU);
        break;
      case "QC1":
        setNavMenuItems(QC1_MENU);
        break;
      case "QC2":
        setNavMenuItems(QC2_MENU);
        break;
      default:
        setNavMenuItems([]);
    }
  };

  useEffect(() => {
    if (isTimedOut) {
      console.log("timerId", timerId);
      clearInterval(timerId);
      console.log("timer set to log out");
      let id = setTimeout(function () {
        console.log("logout");
        window.location.href = `${baseUrlSSO}/logout_session`;
      }, 60 * 5 * 1000);
      setIdleid(id);
      return () => {
        console.log("Interval cleared");
        clearInterval(id);
      };
    }
  }, [isTimedOut]);

  useEffect(() => {
    if (location && location.pathname) {
      setPathname(location.pathname);
    }
  }, [location]);
  const onLogoutClick = () => {
    window.location.href = `${baseUrlSSO}/logout_session`;
  };
  const profileMenuProps = {
    name: userDetails.username,
    title: "",
    email: userDetails.email,
    logoutButtonProps: {
      onClick: () => onLogoutClick(),
    },
    menuItems: [],
  };

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
    if (!isTimedOut) {
      axios
        .get("/refresh", {
          params: {
            callbackUrl: window.location.href,
          },
        })
        .then((res) => {
          console.log(res.data.code);
          if (res.data.code === 102) {
            console.log("idle pop up");
            setIsTimeOut(true);
          } else if (res.data.code === 101) {
            console.log("Logged out from UI");
            window.location.href = `${baseUrlSSO}/logout_session`;
          }
        })
        .catch((err) => {
          console.log(err);
          window.location.href = `${baseUrlSSO}/logout_session`;
        });
    }
  };

  const refreshTokens = () => {
    clearInterval(idleId);
    window.location.href = `${baseUrlSSO}/refresh_tokens?callback=${window.location.href}`;
  };
  const route =
    userDetails && userDetails.userId ? (
      <Routes userType={typeOfUser} />
    ) : (
      <Loader />
    );

  return (
    <>
      <div>
        <IdleTimer
          ref={idleTimer}
          timeout={1000 * 40 * 60}
          onActive={handleOnActive}
          onIdle={handleOnIdle}
          onAction={handleOnAction}
          debounce={250}
        />
        {isTimedOut ? (
          <NavigationBar
            LogoComponent={() => (
              <p
                style={{
                  color: "white",
                  lineHeight: "56px",
                  marginRight: 24,
                  cursor: "pointer",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
                onClick={() => history.push("/")}
              >
                IQVIA <span style={{ fontWeight: 400 }}>Protocol Library</span>
              </p>
            )}
          />
        ) : (
          <Navbar
            navMenuItems={navMenuItems}
            profileMenuProps={profileMenuProps}
            onClickNavigation={onClickNavigation}
            checknav={checknav}
          />
        )}

        {dashboardData && dashboardData.apiError && (
          <span className="main-error-message">
            {" "}
            Something Went Wrong, API Failed
          </span>
        )}
        {isTimedOut ? <SessionExpired /> : route}
        <Modal
          variant="default"
          open={isTimedOut}
          onClose={(e) => {
            if (e.target.localName === "span") {
              window.location.href = `${baseUrlSSO}/logout_session`;
            }
          }}
          id="timer"
          buttonProps={[{}, { label: "OK", onClick: refreshTokens }]}
        >
          <p>
            Applicaiton is about to timeout due to inactivity. Press OK to
            continue.
          </p>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}
export default App;
