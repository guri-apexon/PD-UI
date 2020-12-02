import React, { useState } from 'react';
import './App.scss';
import Routes from './Routes/routes';
import NavigationBar from 'apollo-react/components/NavigationBar';
import { useHistory } from "react-router-dom";
import SettingsIcon from 'apollo-react-icons/Cog';
import HelpIcon from 'apollo-react-icons/Help';
import UserIcon from 'apollo-react-icons/User';

function App () {

  let history = useHistory();
  const [pathname, setPathname]= useState('/dashboard')

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
    name: 'Laura',
    title: 'Sales',
    email: 'laura@iqvia.com',
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
  const logoProps = {
    src: 'logo-img.png',
    alt: 'IQVIA Protocol Library',
    onClick: () => history.push('/'),
  };
  
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
      logoProps={logoProps}
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
