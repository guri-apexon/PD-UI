import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "apollo-react/components/Grid";
import { loggedUser } from "../../../store/userDetails";

import ProtocolTable from "./ProtocolTable";
import { dashboadAPIError } from "./dashboardSlice";
import ActionButtons from "./ActionButtons";

import GuidedTour from "../../Components/GuidedTour/src/components/GuidedTour";
import { guidedTourState } from "../Dashboard/dashboardSlice";

import Cards from "../GuidedTour/Cards";

const dashboardPath = '/dashboard';

let today = new Date();
let curHr = today.getHours();
let greet;

if (curHr < 12) {
  greet = "Good Morning, ";
} else if (curHr < 18) {
  greet = "Good Afternoon, ";
} else {
  greet = "Good Evening, ";
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(loggedUser);
  const memoizedPageRows = React.useMemo(() => [5, 20, 30, "All"], []);
  const dashboardError = useSelector(dashboadAPIError);

  const currentPath = window.location.pathname;
  const dashboardTour = useSelector(guidedTourState);
  const [pathname, setPathname] = React.useState(currentPath);
  const isDashboard = (pathname === dashboardPath);

  useEffect(() => {
    setPathname(currentPath);
  }, [currentPath]);

  const handleCloseTour = () => {
    dispatch({
      type: "SET_TOUR_ACTIVE",
      payload: false,
    })
  };

  return (
    <>
      {isDashboard && dashboardTour && (
        <GuidedTour cards={Cards} closeTourCallback={handleCloseTour} />
      )}
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
    </>
  );
};

export default React.memo(Dashboard);
