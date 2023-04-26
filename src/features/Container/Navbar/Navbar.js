/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavigationBar from 'apollo-react/components/NavigationBar';
import Alerts from './Alerts';
import SettingsIcon from 'apollo-react-icons/Cog';
import {
  USER_MENU,
  QC1_MENU,
  QC2_MENU,
  ADMIN_MENU,
} from '../../../AppConstant/AppConstant';
import { baseUrlSSO } from '../../../utils/api';
import './Navbar.scss';
import Setting from './Setting/Setting';
import { discardDetails } from '../Protocols/protocolSlice';

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
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState();
  const discardSelector = useSelector(discardDetails);
  const [discardData, setDiscardData] = useState({});
  useEffect(() => {
    setDiscardData(discardSelector);
  }, [discardSelector]);

  useEffect(() => {
    if ('userId' in userData) {
      const userID = userData.userId.substring(1);
      setUserId(userID);

      dispatch({ type: 'GET_NOTIFICATION_SAGA', payload: { userID } });
      dispatch({
        type: 'GET_OPT_IN_OUT',
        payload: {
          userID,
        },
      });
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
    return item.pathname === pathname;
  };

  const handleSetting = () => {
    if (!discardData?.isEdited && !discardData?.labEdited) setModal(true);
  };
  const profileMenuProps = {
    name: userDetail.username,
    title: '',
    email: userDetail.email,
    logoutButtonProps: {
      onClick: () => onLogoutClick(),
    },
    menuItems: [
      {
        text: 'Settings',
        icon: SettingsIcon,
        onClick: () => {
          handleSetting();
        },
      },
    ],
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
        {modal && <Setting handleModal={setModal} userId={userId} />}
      </div>
    )
  );
}

export default React.memo(Navbar);
