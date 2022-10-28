/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";
import Card from "apollo-react/components/Card";
import Loader from "apollo-react/components/Loader";
import UsersTable from "./UsersTable";
import UsersRole from "./UsersRole";
import getColumns from "./columns.data";
import "./AdminTable.scss";

import {
  usersList,
  userRolesList,
  rolesOptionsList,
  loader,
} from "./adminSlice";
import ProtocolMap from "./ProtocolMap";

import GuidedTour from "../../Components/GuidedTour/src/components/GuidedTour";
import { guidedTourState } from "../Dashboard/dashboardSlice";
import cards from "../GuidedTour/AdminTourCards";

const adminPath = '/admin';

function Admin() {
  const dispatch = useDispatch();
  const isLoading = useSelector(loader);
  const users = useSelector(usersList);
  const userRoles = useSelector(userRolesList);
  const roleOptions = useSelector(rolesOptionsList);
  const [value, setValue] = useState(0);
  const [columns, setColumns] = useState([]);

  const currentPath = window.location.pathname;
  const adminTour = useSelector(guidedTourState);
  const [pathname, setPathname] = React.useState(currentPath);
  const isAdmin = (pathname === adminPath);

  useEffect(() => {
    setPathname(currentPath);
  }, [currentPath]);

  const handleCloseTour = () => {
    dispatch({
      type: "SET_TOUR_ACTIVE",
      payload: false,
    })
  };

  useEffect(() => {
    if ("user" in roleOptions && roleOptions.user.length > 0) {
      const columnList = getColumns(roleOptions.user);
      setColumns(columnList);
    }
  }, [roleOptions]);

  useEffect(() => {
    dispatch({ type: "GET_USERS_SAGA" });
  }, []);

  const handleChangeTab = (event, value) => {
    setValue(value);
  };
  return (
    <div style={{ padding: 20, marginTop: 60 }}>
      {isAdmin && adminTour && (<GuidedTour cards={cards} closeTourCallback={handleCloseTour} />)}
      <Card style={{ padding: 20 }}>
        <Tabs value={value} onChange={handleChangeTab} truncate>
          <Tab label="Users" />
          <Tab label="User Roles" />
          <Tab label="Protocol Mapping" />
        </Tabs>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {value === 0 && columns.length && (
              <UsersTable initialRows={users} columns={columns} />
            )}
            {value === 1 && <UsersRole initialRows={userRoles} />}
            {value === 2 && <ProtocolMap />}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Admin;
