import React from 'react';
import './App.scss';
import Routes from './Routes/routes';
import NavigationBar from 'apollo-react/components/NavigationBar';
import { useHistory } from "react-router-dom";

function App () {

  let history = useHistory();

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
  const onClickNavigation = (pathname) => {
    console.log('pathname :', pathname);
    history.push(pathname);

  }
  
  return (
    <>
     <NavigationBar
     // logoProps={logoProps}
      menuItems={menuItems}
     // profileMenuProps={profileMenuProps}
      onClick={({ pathname }) => onClickNavigation(pathname)}
      // checkIsActive={(item) =>
      //   item.pathname
      //     ? item.pathname === pathname
      //     : item.menuItems.some((item) => item.pathname === pathname)
      // }
      // waves
    />
    <Routes />
    </>
  )
}

export default App;
