/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";

import {
  prtocolsError,
  setSelectedProtocols,
  hideAddprotocol,
  tableLoader,
} from "../Dashboard/dashboardSlice";
import MyProtocols from "./MyProtocols";
import FollowedProtocols from "./FollowedProtocols";
import Loader from "../../Components/Loader/Loader";

function ProtocolTable({ pageRows, maxHeight }) {
  const dispatch = useDispatch();
  const error = useSelector(prtocolsError);
  const [value, setValue] = React.useState(0);
  const loader = useSelector(tableLoader);
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
  if (loader) {
    return (
      <div
        style={{
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Loader />
      </div>
    );
  }
  return (
    <>
      {error}
      <Tabs value={value} onChange={handleChangeTab} truncate>
        <Tab className="my-protocols" label="My Protocols" />
        <Tab className="following-protocols" label="Following Protocols" />
      </Tabs>
      <div style={{ padding: 24 }} id="protocol-table">
        {value === 0 && (
          <MyProtocols
            setSelectedProtocols={setSelectedProtocols}
            pageRows={pageRows}
            maxHeight={maxHeight}
          />
        )}
        {value === 1 && (
          <FollowedProtocols pageRows={pageRows} maxHeight={maxHeight} />
        )}
      </div>
    </>
  );
}

export default React.memo(ProtocolTable);
