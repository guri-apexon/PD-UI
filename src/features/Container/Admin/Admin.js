/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";
// import Button from "apollo-react/components/Button";
import Card from "apollo-react/components/Card";
import UsersTable from "./UsersTable";
import UsersRole from "./UsersRole";
import "./AdminTable.scss";

import { usersList, rolesList } from "./adminSlice";
import ProtocolMap from "./ProtocolMap";

function Admin() {
  const dispatch = useDispatch();
  const users = useSelector(usersList);
  const roles = useSelector(rolesList);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, value) => {
    setValue(value);
  };

  useEffect(() => {
    dispatch({ type: "GET_USERS_SAGA" });
    dispatch({ type: "GET_ROLES_SAGA" });
  }, []);

  return (
    <div style={{ padding: 20, marginTop: 60 }}>
      <Card style={{ padding: 20 }}>
        <Tabs value={value} onChange={handleChangeTab} truncate>
          <Tab label="Users" />
          <Tab label="User Roles" />
          <Tab label="Protocol Mapping" />
        </Tabs>
        <div>
          {value === 0 && <UsersTable initialRows={users} />}
          {value === 1 && <UsersRole initialRows={roles} />}
          {value === 2 && <ProtocolMap initialRows={[]} />}
        </div>
      </Card>
    </div>
  );
}

export default Admin;
