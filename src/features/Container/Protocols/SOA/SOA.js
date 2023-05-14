import { useEffect, useMemo, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import PropTypes from 'prop-types';
import ArrangePanel from './ArrangePanel';
import SideNav from './SideNav';
import SOATable from './SOATable';
import SOATabs from './SOATabs';
import './SOA.scss';
import TabelContext, { tableReducer, tableGridData } from './Context';

import { TableEvents } from './Constants';

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

  useEffect(() => {
    if (apiState?.error) {
      setLoader(false);
    }
    if (apiState?.soa_data) {
      dispatch({
        type: TableEvents.SET_TABLES,
        payload: JSON.parse(JSON.stringify(apiState.soa_data)),
      });
      dispatch({ type: TableEvents.SET_SELECTED_TAB, payload: 0 });
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
      <TabelContext.Provider value={provider}>
        {loader ? <Loader isInner /> : ''}
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
    </div>
  );
}
SOA.propTypes = {
  docId: PropTypes.isRequired,
};
export default SOA;
