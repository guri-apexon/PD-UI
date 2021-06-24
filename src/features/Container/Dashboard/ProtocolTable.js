import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";

import {
  prtocolsError,
  setSelectedProtocols,
  hideAddprotocol,
} from "../Dashboard/dashboardSlice";
import MyProtocols from "./MyProtocols";
import FollowedProtocols from "./FollowedProtocols";

function ProtocolTable({ pageRows }) {
  const dispatch = useDispatch();
  const error = useSelector(prtocolsError);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, value) => {
    setValue(value);
  };
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
  }, []);
  useEffect(() => {
    if (value === 0) {
      dispatch(hideAddprotocol(true));
    } else {
      dispatch(hideAddprotocol(false));
    }
  }, [value]);
  return (
    <div>
      {error}
      <Tabs value={value} onChange={handleChangeTab} truncate>
        <Tab label="My Protocols" />
        <Tab label="Following Protocols" />
      </Tabs>
      <div style={{ padding: 24 }} id="protocol-table">
        {value === 0 && (
          <MyProtocols
            setSelectedProtocols={setSelectedProtocols}
            pageRows={pageRows}
          />
        )}
        {value === 1 && <FollowedProtocols pageRows={pageRows} />}
      </div>
    </div>
  );
}

export default ProtocolTable;
