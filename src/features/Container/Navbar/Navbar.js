/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavigationBar from 'apollo-react/components/NavigationBar';
import Alerts from './Alerts';
import {
  USER_MENU,
  QC1_MENU,
  QC2_MENU,
  ADMIN_MENU,
} from '../../../AppConstant/AppConstant';
import { baseUrlSSO } from '../../../utils/api';
import './Navbar.scss';

const setMenuItems = (value) => {
  switch (value) {
    case 'normal':
      return USER_MENU;
    case 'QC1':
      return QC1_MENU;
    case 'QC2':
      return QC2_MENU;
    case 'admin':
      return ADMIN_MENU;
    default:
      return [];
  }
};

const onLogoutClick = () => {
  window.location.href = `${baseUrlSSO}/logout_session`;
};

function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [userData, setUserData] = useState({});
  const userDetail = useSelector((state) => state.user.userDetail);
  const [pathname, setPathname] = useState('/dashboard');
  useEffect(() => {
    if ('userId' in userData) {
      const userID = userData.userId.substring(1);
      dispatch({ type: 'GET_NOTIFICATION_SAGA', payload: userID });
    }
  }, [userData, dispatch]);
  useEffect(() => {
    setUserData(userDetail);
  }, [userDetail]);

  useEffect(() => {
    if (location && location.pathname) {
      setPathname(location.pathname);
    }
  }, [location]);

  const onClickNavigation = (pathname) => {
    if (pathname !== '/protocols') {
      history.push(pathname);
      setPathname(pathname);
    }
  };

  const checknav = (item) => {
    return item.pathname
      ? item.pathname === pathname
      : item.menuItems.some((item) => item.pathname === pathname);
  };

  const profileMenuProps = {
    name: userDetail.username,
    title: '',
    email: userDetail.email,
    logoutButtonProps: {
      onClick: () => onLogoutClick(),
    },
    menuItems: [],
  };

  return (
    'userId' in userData &&
    userData.userId && (
      <div data-testid="navbar-test" className="navbar">
        <NavigationBar
          LogoComponent={() => (
            <div
              style={{
                color: 'white',
                lineHeight: '56px',
                marginRight: 24,
                cursor: 'pointer',
                zIndex: 2,
                whiteSpace: 'nowrap',
              }}
              onClick={() => history.push('/')}
            >
              IQVIA <span style={{ fontWeight: 400 }}>Protocol Library</span>
            </div>
          )}
          menuItems={setMenuItems(userDetail.user_type)}
          profileMenuProps={profileMenuProps}
          onClick={({ pathname }) => onClickNavigation(pathname)}
          checkIsActive={(item) => checknav(item)}
          waves
          otherButtons={<Alerts />}
        />
      </div>
    )
  );
}

export default React.memo(Navbar);
