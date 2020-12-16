import React, { useEffect, useState } from 'react';
import './App.scss';
import Routes from './Routes/routes';
import NavigationBar from 'apollo-react/components/NavigationBar';
import { useHistory, useLocation } from "react-router-dom";
import SettingsIcon from 'apollo-react-icons/Cog';
import HelpIcon from 'apollo-react-icons/Help';
import UserIcon from 'apollo-react-icons/User';
import Typography from 'apollo-react/components/Typography';

function App () {

  let history = useHistory();
  let location = useLocation();
  const [pathname, setPathname]= useState('/dashboard')

  useEffect(()=>{
    if(location && location.pathname){
      setPathname(location.pathname)
    }
  }, [location]);

  const menuItems = [
    {
      text: 'Dashboard',
      pathname: '/dashboard',
    },
    {
      text: 'Protocols',
      pathname: '/protocols',
    },
    {
      text: 'Search',
      pathname: '/Search',
    },
    
  ];
  const profileMenuProps = {
    name: '',
    title: 'Sales',
    email: 'asif@iqvia.com',
    logoutButtonProps: { pathname: '/logout' },
    menuItems: [
      {
        text: 'Profile',
        pathname: '/profile',
        icon: UserIcon,
      },
      {
        text: 'Settings',
        pathname: '/settings',
        icon: SettingsIcon,
      },
      {
        text: 'Help',
        pathname: '/help',
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
    setPathname(pathname)

  }
  const checknav = (item) => {
   return item.pathname
    ? item.pathname === pathname
    : item.menuItems.some((item) => item.pathname === pathname)
  }
  return (
    <>
     <NavigationBar
     LogoComponent={() => (
      <Typography
        style={{
          color: 'white',
          lineHeight: '56px',
          marginRight: 24,
          cursor: 'pointer',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
        // onClick={() => console.log('Logo clicked')}
        onClick={ () => history.push('/')}
      >
        IQVIA <span style={{ fontWeight: 400 }}>Protocol Library</span>
      </Typography>
    )}
      // logoProps={logoProps}
      menuItems={menuItems}
     profileMenuProps={profileMenuProps}
      onClick={({ pathname }) => onClickNavigation(pathname)}
      checkIsActive={(item) => checknav(item)
      }
       waves
    />
    <Routes />
    </>
  )
}

export default App;
