import React from "react";
import { useSelector } from "react-redux";
import Grid from "apollo-react/components/Grid";
import { loggedUser } from "../../../store/userDetails";

import ProtocolTable from "./ProtocolTable";
import { dashboadAPIError } from "./dashboardSlice";
import ActionButtons from "./ActionButtons";

let today = new Date();
let curHr = today.getHours();
let greet;
/* istanbul ignore next */
if (curHr < 12) {
  greet = "Good Morning, ";
} else if (curHr < 18) {
  greet = "Good Afternoon, ";
} else {
  greet = "Good Evening, ";
}

const Dashboard = () => {
  const userDetails = useSelector(loggedUser);
  const memoizedPageRows = React.useMemo(() => [5, 20, 30, "All"], []);
  const dashboardError = useSelector(dashboadAPIError);
  return (
    <div className="dashboard-parent" style={{ padding: 20 }}>
      {/* istanbul ignore next */}
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
};

export default React.memo(Dashboard);
