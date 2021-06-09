import React, { useEffect, useState } from "react";
import queryString from "query-string";

//------------------- CSS -------------------
import "./protocols.scss";

//------------------- Redux -----------------
import { useSelector, useDispatch } from "react-redux";
import { protocolSummary, getProcotoclToc } from "./protocolSlice.js";

//------------------- Components ------------
import ProtocolOverview from "./ProtocolOverview";
import ProtocolView from "./ProtocolView";
import Documents from "./Documents";
import ProtocolTable from "../Dashboard/ProtocolTable";
import NoResultFound from "../../Components/NoResultFound";

//------------------- Third Party -----------
import Breadcrumbs from "apollo-react/components/Breadcrumbs";
import Tab from "apollo-react/components/Tab";
import Tabs from "apollo-react/components/Tabs";
import Switch from "apollo-react/components/Switch";
import Loader from "apollo-react/components/Loader";

const Protocols = (props) => {
  const summary = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [idPresent, setIdPresent] = useState(false);

  useEffect(() => {
    let params = props.location.search;
    const parsed = queryString.parse(params);

    if ("tab" in parsed) {
      setValue(parseInt(parsed.tab));
    }
    const viewData = {
      iqvdataSoa: [],
      iqvdataSummary: {},
      iqvdataToc: {
        data: [],
      },
      loader: true,
    };
    getProcotoclToc(viewData);
  }, []);

  useEffect(() => {
    let params = props.location.search;
    const parsed = queryString.parse(params);
    /* istanbul ignore else */

    if ("protocolId" in parsed) {
      setIdPresent(true);
      dispatch({ type: "GET_PROTOCOL_SUMMARY", payload: parsed.protocolId });
    }
    /* istanbul ignore else */
    if ("protocolId2" in parsed && "value" in parsed) {
      setValue(2);
    }
  }, [dispatch, props.location]);
  /* istanbul ignore next */
  // const handleClick = (e) => {
  //   e.preventdefault();
  // };
  /* istanbul ignore next */
  const handleChangeTab = (event, value) => {
    setValue(value);
  };

  if (idPresent) {
    const { data } = summary;
    return (
      <>
        {summary.success && summary.data ? (
          <div className="protocols" data-testid="protocols-component-test">
            <Breadcrumbs
              items={[
                { href: "/dashboard" },
                {
                  href: "/protocols",
                  title: "Protocols",
                  // onClick: handleClick,
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
                      <Tab label="Documents" />
                    </Tabs>
                  </div>
                </div>

                <div className="tab-container">
                  {value === 0 && <ProtocolOverview data={data} />}
                  {value === 1 && <ProtocolView protId={data.id} />}
                  {value === 2 && (
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
        <ProtocolTable pageRows={[10, 20, 30, "All"]} />
      </div>
    );
  }
};

export default Protocols;
