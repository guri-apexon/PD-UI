import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from 'apollo-react/components/Grid';
import { loggedUser } from '../../../store/userDetails';

import ProtocolTable from './ProtocolTable';
import { dashboadAPIError } from './dashboardSlice';
import ActionButtons from './ActionButtons';

const today = new Date();
const curHr = today.getHours();
let greet;

if (curHr < 12) {
  greet = 'Good Morning, ';
} else if (curHr < 18) {
  greet = 'Good Afternoon, ';
} else {
  greet = 'Good Evening, ';
}

function Dashboard() {
  const userDetails = useSelector(loggedUser);
  const memoizedPageRows = React.useMemo(() => [5, 20, 30, 'All'], []);
  const dashboardError = useSelector(dashboadAPIError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'TOGGLE_ADDPROTOCOL_MODAL', payload: false });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard-parent" style={{ padding: 20 }}>
      {dashboardError && dashboardError.apiError && (
        <span className="main-error-message" data-testid="API-Error">
          Something Went Wrong, API Failed
        </span>
      )}
      <h1>
        {greet} {userDetails && userDetails.username}
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ActionButtons />
        </Grid>
        <Grid item xs={12}>
          <ProtocolTable pageRows={memoizedPageRows} maxHeight={400} />
        </Grid>
        {/* <Grid item xs={12}>
          <DashboardSearch />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default React.memo(Dashboard);
