import "./style.scss";
import { useEffect, useState } from "react";

import ProtocolOverview from "../Overview";
import ProtocolView from "../ProtocolView";
import Documents from "../Document";
import POCProtocoolView from "../POC/ProtocolView";
import Table from "../POC/PT";
import EntitySearch from "../POC/EnityValue";
import ObjectiveEndpoints from "../POC/ObjNEndpoints";

const queryString = require("query-string");

const tabs = {
  OVERVIEW: "OVERVIEW",
  PROTOCOL_VIEW: "PROTOCOL_VIEW",
  DOCUMENT: "DOCUMENT",
  POC_PROTOCOL_VIEW: "POC_PROTOCOL_VIEW",
  POC_TABLE_VIEW: "POC_TABLE_VIEW",
  POC_ENTITY_SEARCH: "POC_ENTITY_SEARCH",
  OBJECTIVE_ENDPOINTS: "OBJECTIVE_ENDPOINTS",
};

const TabContainer = ({ history }) => {
  const [activeTab, setActiveTab] = useState(tabs.OVERVIEW);
  const [protocolId, setProtocolId] = useState("");
  const [protocolName, setProtocolName] = useState("");
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const { location } = history;
    const parsed = queryString.parse(location.search);
    setActiveTab(parsed.tab);
    setProtocolId(parsed.protocolId);
    setProtocolName(parsed.protocol);
    setFileName(parsed.file);
  }, [history]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    history.replace({
      pathname: "/protocols",
      search: `?tab=${tabName}&protocol=${protocolName}&protocolId=${protocolId}&file=${fileName}`,
    });
  };

  return (
    <div className="protocols-tab-container">
      <div className="tab">
        <button
          className={
            activeTab === tabs.OVERVIEW ? "tablinks active" : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.OVERVIEW)}
        >
          Overview
        </button>
        <button
          className={
            activeTab === tabs.PROTOCOL_VIEW ? "tablinks active" : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.PROTOCOL_VIEW)}
        >
          Protocol View
        </button>
        <button
          className={
            activeTab === tabs.DOCUMENT ? "tablinks active" : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.DOCUMENT)}
        >
          Document
        </button>
        <button
          className={
            activeTab === tabs.POC_PROTOCOL_VIEW
              ? "tablinks active"
              : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.POC_PROTOCOL_VIEW)}
        >
          POC Protocol View
        </button>
        <button
          className={
            activeTab === tabs.POC_TABLE_VIEW ? "tablinks active" : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.POC_TABLE_VIEW)}
        >
          DEBUG PT Search
        </button>
        <button
          className={
            activeTab === tabs.POC_ENTITY_SEARCH
              ? "tablinks active"
              : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.POC_ENTITY_SEARCH)}
        >
          DEBUG ENTITY Search
        </button>
        <button
          className={
            activeTab === tabs.OBJECTIVE_ENDPOINTS
              ? "tablinks active"
              : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.OBJECTIVE_ENDPOINTS)}
        >
          Objectives & Endpoints
        </button>
      </div>

      <div
        id="overview"
        className="tabcontent"
        style={
          activeTab === tabs.OVERVIEW
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.OVERVIEW && (
          <ProtocolOverview id={protocolId} name={protocolName} />
        )}
      </div>

      <div
        id="view"
        className="tabcontent"
        style={
          activeTab === tabs.PROTOCOL_VIEW
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.PROTOCOL_VIEW && (
          <ProtocolView id={protocolId} name={protocolName} />
        )}
      </div>

      <div
        id="document"
        className="tabcontent"
        style={
          activeTab === tabs.DOCUMENT
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.DOCUMENT && (
          <Documents id={protocolId} name={protocolName} />
        )}
      </div>
      <div
        id="poc-protocol-view"
        className="tabcontent"
        style={
          activeTab === tabs.POC_PROTOCOL_VIEW
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.POC_PROTOCOL_VIEW && (
          <POCProtocoolView
            id={protocolId}
            name={protocolName}
            dfsPath={fileName}
          />
        )}
      </div>
      <div
        id="poc-table-view"
        className="tabcontent"
        style={
          activeTab === tabs.POC_TABLE_VIEW
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.POC_TABLE_VIEW && (
          <Table id={protocolId} name={protocolName} dfsPath={fileName} />
        )}
      </div>
      <div
        id="poc-entity-view"
        className="tabcontent"
        style={
          activeTab === tabs.POC_ENTITY_SEARCH
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.POC_ENTITY_SEARCH && (
          <EntitySearch
            id={protocolId}
            name={protocolName}
            dfsPath={fileName}
          />
        )}
      </div>
      <div
        id="poc-objective-view"
        className="tabcontent"
        style={
          activeTab === tabs.OBJECTIVE_ENDPOINTS
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.OBJECTIVE_ENDPOINTS && (
          <ObjectiveEndpoints
            id={protocolId}
            name={protocolName}
            dfsPath={fileName}
          />
        )}
      </div>
    </div>
  );
};

export default TabContainer;
