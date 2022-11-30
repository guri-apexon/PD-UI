import { useEffect, useState } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
// ------------------- CSS -------------------
import './protocols.scss';

// ------------------- Redux -----------------
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumbs from 'apollo-react/components/Breadcrumbs';
import Tab from 'apollo-react/components/Tab';
import Tabs from 'apollo-react/components/Tabs';
import Loader from 'apollo-react/components/Loader';
import { protocolSummary, getProcotoclToc } from './protocolSlice';

// ------------------- Components ------------
import ProtocolOverview from './ProtocolOverview';
import ProtocolView from './ProtocolView';
import Documents from './Documents';
import NoResultFound from '../../Components/NoResultFound';

// ------------------- Third Party -----------

function Protocols({ location }) {
  const summary = useSelector(protocolSummary);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [idPresent, setIdPresent] = useState(false);

  useEffect(() => {
    debugger;
    const params = location.search;
    const parsed = queryString.parse(params);

    if ('tab' in parsed) {
      setValue(parseInt(parsed.tab, 10));
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
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  useEffect(() => {
    const params = location.search;
    const parsed = queryString.parse(params);
    /* istanbul ignore else */

    if ('protocolId' in parsed) {
      setIdPresent(true);
      dispatch({ type: 'GET_PROTOCOL_SUMMARY', payload: parsed.protocolId });
    }
    /* istanbul ignore else */
    if ('protocolId2' in parsed && 'value' in parsed) {
      setValue(2);
    }
  }, [dispatch, location]);
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
                { href: '/dashboard' },
                {
                  title: 'Protocols',
                  className: 'br-cr-protocol',
                  disabled: true,
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
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ flex: 1 }}>
                    <Tabs
                      value={value}
                      onChange={handleChangeTab}
                      size="small"
                      truncate
                      data-testid="protocols-tabs"
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
  }
  return (
    <div className="protocols">
      {/* <ProtocolTable pageRows={[10, 20, 30, "All"]} maxHeight={600} /> */}
    </div>
  );
}

export default Protocols;

Protocols.propTypes = {
  location: PropTypes.isRequired,
};
