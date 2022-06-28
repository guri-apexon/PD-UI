import "./style.scss";
import { useEffect, useState } from "react";

import ProtocolOverview from "./Overview";
import ProtocolView from "./ProtocolView";
import Documents from "./Documents";
import POCProtocoolView from "./NewProtocolView";
import PTSearch from "./PTSearch";
import EntitySearch from "./EntitySearch";
import MetadataView from "./Metadata";
import Compare from "./ProtocolCompare";

const queryString = require("query-string");

const tabs = {
  OVERVIEW: "OVERVIEW",
  PROTOCOL_VIEW: "PROTOCOL_VIEW",
  DOCUMENT: "DOCUMENT",
  VERSION_COMPARE: "VERSION_COMPARE",
  POC_PROTOCOL_VIEW: "POC_PROTOCOL_VIEW",
  POC_TABLE_VIEW: "POC_TABLE_VIEW",
  POC_ENTITY_SEARCH: "POC_ENTITY_SEARCH",
  METADATA_VIEW: "METADATA_VIEW",
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
            activeTab === tabs.VERSION_COMPARE ? "tablinks active" : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.VERSION_COMPARE)}
        >
          Version Compare
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
            activeTab === tabs.METADATA_VIEW ? "tablinks active" : "tablinks"
          }
          onClick={(e) => handleTabClick(tabs.METADATA_VIEW)}
        >
          Metadata View
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
        id="version-compare"
        className="tabcontent"
        style={
          activeTab === tabs.VERSION_COMPARE
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.VERSION_COMPARE && (
          <Compare id={protocolId} name={protocolName} dfsPath={fileName} />
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
          <PTSearch id={protocolId} name={protocolName} dfsPath={fileName} />
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
        id="poc-metadata-view"
        className="tabcontent"
        style={
          activeTab === tabs.METADATA_VIEW
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {activeTab === tabs.METADATA_VIEW && (
          <MetadataView
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
