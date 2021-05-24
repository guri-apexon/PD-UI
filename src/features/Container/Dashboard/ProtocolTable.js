import React from "react";
import { useSelector } from "react-redux";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";

import { prtocolsError } from "../Dashboard/dashboardSlice";
import MyProtocols from "./MyProtocols";
import FollowedProtocols from "./FollowedProtocols";

function ProtocolTable() {
  const error = useSelector(prtocolsError);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, value) => {
    setValue(value);
  };
  return (
    <div>
      {error}
      <Tabs value={value} onChange={handleChangeTab} truncate>
        <Tab label="My Protocols" />
        <Tab label="Following Protocols" />
      </Tabs>
      <div style={{ padding: 24 }} id="protocol-table">
        {value === 0 && <MyProtocols />}
        {value === 1 && <FollowedProtocols />}
      </div>
    </div>
  );
}

export default ProtocolTable;
