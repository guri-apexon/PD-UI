import React, { useState } from "react";
import { useSelector } from "react-redux";

import Breadcrumbs from "apollo-react/components/Breadcrumbs";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";
// import QCTable from './QCTable/QCTable';
import QCProtocolTable from "./QCTable/QCProtocolTable";

// import QCProtocolView from "./QCProtocolView/QCProtocolView";
import QCProtocolView from "./QCProtocolView/QCProtocolView";
import { userType } from "../../../store/userDetails";
import "./QC.scss";
import "../Protocols/protocols.scss";

const QCContainer = () => {
  const type = useSelector(userType);
  const [value, setValue] = useState(0);
  const [protocolId, setprotocolId] = useState("");
  const [protocolNumber, setProtocolNumber] = useState("");
  const [filePath, setFilePath] = useState("");

  const handleClick = (e) => {
    e.preventdefault();
  };
  const handleChangeTab = (event, value) => {
    if (value !== 1) setValue(value);
    if (value === 0) {
      setprotocolId("");
      setProtocolNumber("");
      setFilePath("");
    }
  };
  const handleProtocolClick = ({ id, path, protocol }) => {
    console.log("id11111", id);
    setValue(1);
    setprotocolId(id);
    setProtocolNumber(protocol);
    setFilePath(path);
  };
  // let today = new Date();
  // let curHr = today.getHours();
  // let greet;
  // if (curHr < 12) {
  //   greet = "Good Morning, ";
  // } else if (curHr < 18) {
  //   greet = "Good Afternoon, ";
  // } else {
  //   greet = "Good Evening, ";
  // }

  const breadItems = [
    { href: "/qc", onClick: (e) => handleClick(e) },
    {
      href: "/qc",
      title: "QC",
      onClick: handleClick,
    },
  ];

  if (protocolNumber) {
    breadItems.push({
      title: protocolNumber,
    });
  }

  return (
    <div
      className="dashboard-parent qc-parent protocols"
      style={{ padding: 20 }}
    >
      {/* <h1>
        {greet} {userDetails && userDetails.username}
      </h1> */}
      <Breadcrumbs
        items={breadItems}
        style={{ paddingInlineStart: 0, marginBottom: 0 }}
      />
      <div
        className="qc-tabs-parent"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div style={{ flex: 1 }}>
          <Tabs value={value} onChange={handleChangeTab} size="small" truncate>
            <Tab label="QC Protocols" />
            <Tab label="QC Protocol View" />
          </Tabs>
        </div>
      </div>
      <div className="tab-container">
        {value === 0 && (
          <QCProtocolTable handleProtocolClick={handleProtocolClick} />
        )}
        {/* {value === 1 && <QCProtocolView  />} */}
        {value === 1 && (
          <QCProtocolView protId={protocolId} path={filePath} userType={type} />
        )}
      </div>
    </div>
  );
};

export default QCContainer;
