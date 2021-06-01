import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";

import { loggedUser } from "../../../store/userDetails";
import AddProtocol from "./AddProtocol/AddProtocol";
import ProtocolTable from "./ProtocolTable";
import DashboardSearch from "./DashboardSearch";
import { displayAddProtocol, selectedProtocolsList } from "./dashboardSlice";

const Dashboard = () => {
  const userDetails = useSelector(loggedUser);
  const hide = useSelector(displayAddProtocol);
  const selectedProtocols = useSelector(selectedProtocolsList);
  const dispatch = useDispatch();
  // const compare = useSelector(protocolCompare);

  useEffect(() => {
    dispatch({ type: "DASHBOARD_ASYNC_SAGA" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendQcReview = () => {
    dispatch({ type: "SEND_QC_REVIEW_SAGA" });
  };

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

  return (
    <div className="dashboard-parent" style={{ padding: 20 }}>
      <h1>
        {greet} {userDetails && userDetails.username}
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {hide && (
            <div style={{ float: "right" }}>
              <AddProtocol />
            </div>
          )}
          <div
            style={{ float: "right", marginTop: "10px", marginRight: "14px" }}
          >
            <Button
              variant="secondary"
              onClick={sendQcReview}
              disabled={selectedProtocols.length ? false : true}
            >
              {"Send To QC Review"}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <ProtocolTable />
        </Grid>
        <Grid item xs={12}>
          <DashboardSearch />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
