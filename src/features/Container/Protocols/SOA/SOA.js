import { useEffect, useMemo, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArrangePanel from './ArrangePanel';
import SideNav from './SideNav';
import SOATable from './SOATable';
import SOATabs from './SOATabs';
import './styles.css';
import TabelContext, { tableReducer, tableGridData } from './Context';

import { TableEvents } from './Constants';

function SOA({ docId }) {
  const apiState = useSelector((state) => state.protocol.SOAData);
  const apiDispatch = useDispatch();
  const [state, dispatch] = useReducer(tableReducer, tableGridData);
  useEffect(() => {
    if (apiState?.soa_data) {
      dispatch({
        type: TableEvents.SET_TABLES,
        payload: JSON.parse(JSON.stringify(apiState.soa_data)),
      });
      dispatch({ type: TableEvents.SET_SELECTED_TAB, payload: 0 });
    }
  }, [apiState]);

  useEffect(() => {
    apiDispatch({
      type: 'GET_SOA_DATA',
      payload: { operationValue: 'SOATable', docId },
    });
    // eslint-disable-next-line
  }, []);
  const provider = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <div className="soa-content-holder" data-testid="soaTable">
      <TabelContext.Provider value={provider}>
        <SOATabs />
        <ArrangePanel />
        <div className="soa-container">
          {state.openSettings ? (
            <>
              <SOATable style={{ flexGrow: 9 }} />
              <SideNav style={{ flexGrow: 1 }} />
            </>
          ) : (
            <SOATable style={{ flexGrow: 10 }} />
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
