/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import IdleTimer from 'react-idle-timer';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'apollo-react/components/Loader';
import Modal from 'apollo-react/components/Modal';
import Routes from './Routes/routes';
import { setUserDetails, loggedUser } from './store/userDetails';
import SessionExpired from './SessionOut';
import { baseUrlSSO, SSO_ENABLED, getToken } from './utils/api';
import Navbar from './features/Container/Navbar/Navbar';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('This page was restored from the bfcache.');
    window.location.reload();
  } else {
    console.log('This page was loaded normally.');
  }
});

function App() {
  const cookiesServer = new Cookies();
  const userDetails = useSelector(loggedUser);
  const dispatch = useDispatch();
  const idleTimer = useRef(null);
  const [isTimedOut, setIsTimeOut] = useState(false);
  const [timerId, setTimerId] = useState(0);
  const [idleId, setIdleid] = useState(0);
  const [jwt, setJwt] = useState(null);
  // ---------Revert-----------
  useEffect(() => {
    cookiesServer.remove('api_token');
    getToken().then((data) => {
      if (data.token) {
        setJwt(data.token);
      }
      if (data.err) {
        toast.error(data.err);
      }
    });
    if (SSO_ENABLED) {
      // comment in local to run
      axios
        .get('/session')
        .then((res) => {
          if (Object.keys(res.data).length) {
            dispatch(setUserDetails(res.data));
          }
        })
        .catch((err) => console.log(err));

      const curDate = new Date();
      const expDate = cookiesServer.get('exp') * 1000;
      if (!expDate) {
        window.location.href = `${baseUrlSSO}/logout_session`;
      } else {
        if (curDate >= expDate) {
          console.log('exp', true);
        }
        let dif = curDate - expDate;
        dif = Math.abs(dif / 1000 / 60);
        dif = Math.round(dif * 10) / 10;
        dif -= 1;
        const testInterval = setTimeout(function () {
          axios
            .get('/refresh', {
              params: {
                callbackUrl: window.location.href,
              },
            })
            .then((res) => {
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
        userId: process.env.REACT_APP_USERID,
        username: 'Test User',
        email: 'test@iqvia.com',
        user_type: 'normal',
      };
      dispatch(setUserDetails(details));
    }
  }, []);

  useEffect(() => {
    if (isTimedOut) {
      clearInterval(timerId);
      const id = setTimeout(function () {
        window.location.href = `${baseUrlSSO}/logout_session`;
      }, 60 * 5 * 1000);
      setIdleid(id);
      return () => {
        clearInterval(id);
      };
    }
  }, [isTimedOut]);

  const handleOnAction = (event) => {
    // console.log("user did something", event);
    // setIsTimeOut(false);
  };

  const handleOnActive = (event) => {
    console.log('user is active', event);
    // console.log("time remaining", idleTimer.getRemainingTime());
    // setIsTimeOut(false);
  };

  const handleOnIdle = (event) => {
    if (!isTimedOut) {
      axios
        .get('/refresh', {
          params: {
            callbackUrl: window.location.href,
          },
        })
        .then((res) => {
          if (res.data.code === 102) {
            setIsTimeOut(true);
          } else if (res.data.code === 101) {
            window.location.href = `${baseUrlSSO}/logout_session`;
          }
        })
        .catch((err) => {
          window.location.href = `${baseUrlSSO}/logout_session`;
        });
    }
  };

  const refreshTokens = () => {
    clearInterval(idleId);
    window.location.href = `${baseUrlSSO}/refresh_tokens?callback=${window.location.href}`;
  };
  const route =
    jwt && userDetails && userDetails.userId ? (
      <>
        <Navbar />
        <Routes userType={userDetails.user_type} />
      </>
    ) : (
      <Loader />
    );

  return (
    <>
      <IdleTimer
        ref={idleTimer}
        timeout={1000 * 40 * 60}
        onActive={handleOnActive}
        onIdle={handleOnIdle}
        onAction={handleOnAction}
        debounce={250}
      />
      {isTimedOut ? <SessionExpired /> : route}
      <Modal
        variant="default"
        open={isTimedOut}
        onClose={(e) => {
          if (e.target.localName === 'span') {
            window.location.href = `${baseUrlSSO}/logout_session`;
          }
        }}
        id="timer"
        buttonProps={[{}, { label: 'OK', onClick: refreshTokens }]}
      >
        <p>
          Application is about to timeout due to inactivity. Press OK to
          continue.
        </p>
      </Modal>
      <ToastContainer />
    </>
  );
}
export default App;
