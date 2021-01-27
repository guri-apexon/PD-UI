import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Cookies from "universal-cookie";
import { setUserDetails, loggedUser } from "./store/userDetails";
// import Loader from "./features/Components/Loader/Loader";
import SessionExpired from "./SessionOut";
import Loader from "apollo-react/components/Loader";
import axios from "axios";
function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  createCookie(name, "", -1);
}

// const onLogoutClick = ()=>{
//   window.location.href = "https://ca2utmsa04q.quintiles.net:8080/v1/login";
// }

function App(props) {
  const cookiesServer = new Cookies();
  const userDetails = useSelector(loggedUser);
  const dispatch = useDispatch();
  const idleTimer = useRef(null);
  let history = useHistory();
  let location = useLocation();
  const dashboardData = useSelector(dashboard);
  const [pathname, setPathname] = useState("/dashboard");
  const [isTimedOut, setIsTimeOut] = useState(false);

//---------Revert-----------
  // useEffect(() => {
  //   // comment in local to run
  //   // axios.get("/session")
  //   // .then(res => {
  //   //   console.log(res.data)
  //   //   if (Object.keys(res.data).length) {
  //   //     dispatch(setUserDetails(res.data));
  //   //   }
  //   // })
  //   // .catch(err => console.log(err))
  //   // Uncomment below code in local to run
  //   const details = {
  //       userId: 'u1072231',
  //       username: 'Sohan',
  //       email: 'test@iqvia.com'
  //     }
  //     dispatch(setUserDetails(details));

  // },[])

  useEffect(() => {
    if (location && location.pathname) {
      setPathname(location.pathname);
    }
  }, [location]);
  console.log(userDetails);
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
  const onLogoutClick = () => {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      eraseCookie(cookies[i].split("=")[0]);
    }
    // axios.get("https://ca2utmsa04q.quintiles.net:8080/logout_session")
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    //---------Revert-----------
    // window.location.href =
    //   "https://ca2utmsa04q.quintiles.net:8080/v1/logout_session";
  };
  const profileMenuProps = {
    name: userDetails.username,
    title: "",
    email: userDetails.email,
    logoutButtonProps: {
      // pathname: "/logout",
      onClick: () => onLogoutClick(),
    },
    menuItems: [
      // {
      //   text: "Profile",
      //   pathname: "/profile",
      //   icon: UserIcon,
      // },
      // {
      //   text: "Settings",
      //   pathname: "/settings",
      //   icon: SettingsIcon,
      // },
      // {
      //   text: "Help",
      //   pathname: "/help",
      //   icon: HelpIcon,
      // },
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
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      eraseCookie(cookies[i].split("=")[0]);
    }
    localStorage.setItem("isLoggedIn", false);
    //---------Revert-----------
    // window.location.href = "https://ca2utmsa04q.quintiles.net:8080/v1/login";
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
  const route = userDetails && userDetails.userId ? <Routes /> : <Loader />;

  return (
    <>
      <div>
        <IdleTimer
          ref={idleTimer}
          timeout={1000 * 5 * 60}
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
        {isTimedOut ? <SessionExpired /> : route}
      </div>
    </>
  );
}
export default App;
