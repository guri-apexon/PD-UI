import React, { useEffect, useState } from "react";
import queryString from "query-string";

//------------------- CSS -------------------
import "./protocols.scss";

//------------------- Redux -----------------
import { useSelector, useDispatch } from "react-redux";
import { protocolSummary, getSummary } from "./protocolSlice.js";

//------------------- Components ------------
import ProtocolOverview from "./ProtocolOverview";
import ProtocolViewClass from "./ProtocolViewClass";
import AmendmentCompare from "./AmendmentCompare";
import Documents from "./Documents";
import ProtocolTable from "../Dashboard/ProtocolTable";
import NoResultFound from "../../Components/NoResultFound";

//------------------- Third Party -----------
import Breadcrumbs from "apollo-react/components/Breadcrumbs";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";
import Switch from "apollo-react/components/Switch";
import Loader from "apollo-react/components/Loader";

//------------------ Constants --------------
// import BASE_URL from "../../../utils/api";
// import Breadcrumb from "../../Component/BreadCrum";

const Protocols = (props) => {
  const summary = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [follow, setFollow] = useState(false);
  const [idPresent, setIdPresent] = useState(false);
  const [prot, setProt] = useState({
    prot1: "",
    prot2: "",
  });

  useEffect(() => {
    let params = props.location.search;
    const parsed = queryString.parse(params);
    if ("protocolId" in parsed) {
      setIdPresent(true);
      dispatch({ type: "GET_PROTOCOL_SUMMARY", payload: parsed.protocolId });
    }
    if ("protocolId2" in parsed && "value" in parsed) {
      setValue(2);
      setProt({
        prot1: parsed.protocolId,
        prot2: parsed.protocolId2,
      });
    }
  }, [dispatch, props.location]);

  const handleClick = (e) => {
    e.preventdefault();
  };
  const handleChangeTab = (event, value) => {
    setValue(value);
  };
  const handleChange = (e, checked) => {
    setFollow(checked);
  };
  if (idPresent) {
    const { data } = summary;
    return (
      <>
        {summary.success && summary.data ? (
          <div className="protocols">
            <Breadcrumbs
              items={[
                { href: "/dashboard", onClick: (e) => handleClick(e) },
                {
                  href: "/protocols",
                  title: "Protocols",
                  onClick: handleClick,
                },
                {
                  title: data.protocol,
                },
              ]}
              style={{ paddingInlineStart: 0, marginBottom: 0 }}
            />

            <h2 className="header">{data.Protocol}</h2>
            <div className="tab-column">
              <div className="overview">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: 1 }}>
                    <Tabs
                      value={value}
                      onChange={handleChangeTab}
                      size="small"
                      truncate
                    >
                      <Tab label="Overview" />
                      <Tab label="Protocol View" />
                      <Tab label="Version Compare" />
                      <Tab label="Documents" />
                    </Tabs>
                  </div>
                  <div style={{ marginTop: -20 }}>
                    {value !== 3 && (
                      <Switch
                        label="Follow Protocol"
                        checked={follow}
                        onChange={handleChange}
                        size="small"
                        style={{ marginRight: 0 }}
                      />
                    )}
                  </div>
                </div>

                <div className="tab-container">
                  {value === 0 && <ProtocolOverview data={data} />}
                  {value === 1 && <ProtocolViewClass protId ={data.id} />}
                  {value === 2 && (
                    <AmendmentCompare prot11={prot.prot1} prot22={prot.prot2} />
                  )}
                  {value === 3 && (
                    <Documents handleChangeTab={handleChangeTab} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          !summary.loading && <NoResultFound />
        )}
        {summary.loading && <Loader isInner />}
      </>
    );
  } else {
    return (
      <div className="protocols">
        <ProtocolTable />
      </div>
    );
  }
};

export default Protocols;
