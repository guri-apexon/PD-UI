import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";

import { prtocolsList, prtocolsError } from "../Dashboard/dashboardSlice";
import ProtocolTableComp from "../../Components/Dashboard/ProtocolTable";

function ProtocolTable() {
  const dispatch = useDispatch();
  const protocolData = useSelector(prtocolsList);
  const error = useSelector(prtocolsError);
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, value) => {
    setValue(value);
  };
  useEffect(() => {
    dispatch({ type: "GET_PROTOCOL_TABLE_SAGA" });
  }, []);
  return (
    <div>
      {error}
      <Tabs value={value} onChange={handleChangeTab} truncate>
        <Tab label="My Protocols" />
        <Tab label="Following Protocols" />
      </Tabs>
      <div style={{ padding: 24 }} id="protocol-table">
        {value === 0 && (
          <ProtocolTableComp
            initialRows={
              protocolData && protocolData.length > 0 ? protocolData : []
            }
            pageRows={[5, 20, 30, "All"]}
          />
        )}
        {value === 1 && (
          <ProtocolTableComp
            initialRows={
              protocolData && protocolData.length > 0 ? protocolData : []
            }
            pageRows={[5, 20, 30, "All"]}
          />
        )}
      </div>
    </div>
  );
}

export default ProtocolTable;
