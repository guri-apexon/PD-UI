import { useEffect, useMemo, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';
import ArrangePanel from './ArrangePanel';
import SideNav from './SideNav';
import SOATable from './SOATable';
import SOATabs from './SOATabs';
import './SOA.scss';
import TabelContext, { tableReducer, tableGridData } from './Context';

import { TableConst, TableEvents } from './Constants';

const style = {
  openSideNav: {
    flexGrow: 9,
  },
  closeSideNav: {
    flexGrow: 1,
  },
  default: {
    flexGrow: 10,
  },
};
function SOA({ docId }) {
  const apiState = useSelector((state) => state.protocol.SOAData);
  const [loader, setLoader] = useState(true);
  const apiDispatch = useDispatch();
  const [state, dispatch] = useReducer(tableReducer, tableGridData);
  const [showMessage, setMessage] = useState(false);
  useEffect(() => {
    if (apiState?.error) {
      setLoader(false);
      setMessage(true);
    }
    if (apiState?.soa_data) {
      const tabs = [];
      apiState.soa_data.forEach((item) => {
        if (item[TableConst.NORMALIZED_SOA].length > 0) tabs.push(item);
      });
      if (tabs.length > 0) {
        dispatch({
          type: TableEvents.SET_TABLES,
          payload: cloneDeep(tabs),
        });
        dispatch({ type: TableEvents.SET_SELECTED_TAB, payload: 0 });
      } else {
        setMessage(true);
      }
      setLoader(false);
    }

    // eslint-disable-next-line
  }, [apiState]);

  useEffect(() => {
    apiDispatch({
      type: 'GET_SOA_DATA',
      payload: { operationValue: 'SOATable', docId },
    });
    dispatch({ type: TableEvents.SET_DOC_ID, docId });
    return () => {
      apiDispatch({
        type: 'RESET_SOA_DATA',
      });
    };
    // eslint-disable-next-line
  }, []);
  const provider = useMemo(
    () => ({ state, dispatch, apiDispatch }),
    [state, dispatch, apiDispatch],
  );
  return (
    <div className="soa-content-holder" data-testid="soaTable">
      {showMessage && <h2 className="message">No Results Found</h2>}

      {loader && <Loader isInner />}
      {!loader && !showMessage && (
        <TabelContext.Provider value={provider}>
          <SOATabs />
          {!apiState?.error ? <ArrangePanel /> : null}
          <div className="soa-container">
            {state.openSettings ? (
              <>
                <SOATable style={style.openSideNav} />
                <SideNav style={style.closeSideNav} />
              </>
            ) : (
              <SOATable style={style.default} />
            )}
          </div>
        </TabelContext.Provider>
      )}
    </div>
  );
}
SOA.propTypes = {
  docId: PropTypes.isRequired,
};
export default SOA;
