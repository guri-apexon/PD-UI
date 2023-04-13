import { useEffect, useState, createRef } from 'react';
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
import {
  protocolSummary,
  getProcotoclToc,
  discardDetails,
  resetProtocolTocData,
} from './protocolSlice';
import { isPrimaryUser } from '../../../utils/utilFunction';

// ------------------- Components ------------
import ProtocolOverview from './ProtocolOverview';
import ProtocolView from './ProtocolView';
import Documents from './Documents';
import NoResultFound from '../../Components/NoResultFound';

// ------------------- Third Party -----------

function Protocols({ location }) {
  const summary = useSelector(protocolSummary);
  const discardSelector = useSelector(discardDetails);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [idPresent, setIdPresent] = useState(false);
  const [pdfArray] = useState([]);
  const [summarydata, setSummaryData] = useState();
  const [discardData, setDiscardData] = useState({});

  useEffect(() => {
    setSummaryData({
      ...summary.data,
      userPrimaryRoleFlag: isPrimaryUser(summary.data),
    });
  }, [summary]);

  useEffect(() => {
    setDiscardData(discardSelector);
  }, [discardSelector]);

  useEffect(() => {
    if (!discardData?.isEdited && discardData?.protocolTab >= 0) {
      setValue(discardData?.protocolTab);
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: false,
          isDiscarded: false,
          protocolTab: -1,
        },
      });
    }
    // eslint-disable-next-line
  }, [discardData]);

  useEffect(() => {
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
    // setSectionIndex(new Array(Records.length));
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  const pdfPage = async () => {
    for (let index = 0; index < 250; index++) {
      pdfArray.push(index);
    }
  };

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
    pdfPage();
    // eslint-disable-next-line
  }, [dispatch, location]);
  /* istanbul ignore next */

  const handleChangeTab = (event, value) => {
    if (discardData?.isEdited) {
      dispatch({
        type: 'DISCARD_DETAILS',
        payload: {
          isEdited: true,
          isDiscarded: true,
          protocolTab: value,
        },
      });
      // setValue(value);
    } else {
      setValue(value);
      dispatch(resetProtocolTocData());
      dispatch({
        type: 'RESET_SECTION_DATA',
      });
    }
  };

  const refs = pdfArray.reduce((refs, value) => {
    refs[value] = createRef();
    return refs;
  }, {});
  if (idPresent) {
    const { data, success } = summary;
    const showQcMessage = data?.qcStatus === 'QC1';
    return (
      <>
        {success && data ? (
          <div className="protocols" data-testid="protocols-component-test">
            <div className="protocol-header">
              <div className="breadcrumb-wrapper ">
                <Breadcrumbs
                  className="protocol-breadcrumb"
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
                />
                <h2 className="header">{data.Protocol}</h2>
              </div>
              <div className="protocol-qc-message">
                {showQcMessage && (
                  <div className="message-blue">
                    <p className="message-content">
                      This Protocol currently is under Quality Review
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="tab-column">
              <div className="d-flex-row">
                <div className="p-rl-20 tabs-wrapper">
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    size="small"
                    className="protocol-tabs"
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
                {value === 1 && (
                  <ProtocolView
                    protId={data.id}
                    data={summarydata}
                    refs={refs}
                  />
                )}
                {value === 2 && <Documents handleChangeTab={handleChangeTab} />}
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
