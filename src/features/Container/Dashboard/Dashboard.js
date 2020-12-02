import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import { dashboard, protocolCompare } from "../Dashboard/dashboardSlice";
import AddProtocol from "./AddProtocol";
import ProtocolTable from "./ProtocolTable";
import DashboardSearch from "./DashboardSearch";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const dashboardData = useSelector(dashboard);
  const compare = useSelector(protocolCompare);
  const [state, setState] = useState({
    custom: false,
  });

  console.log('compare', compare)

  useEffect(() => {
    dispatch({ type: "DASHBOARD_ASYNC_SAGA" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (variant) => {
    setState({ ...state, [variant]: true });
  };

  const handleClose = (variant) => {
    setState({ ...state, [variant]: false });
  };
  const handleSave = (variant) => {
    console.log("variant :", variant);
    setState({ ...state, custom: false });
  };

  return (
    <div className="dashboard-parent"  style={{padding: 20}}>
      <h1>Good Morning, Laura</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ float: "right" }}>
            <AddProtocol
              state={state}
              handleClose={handleClose}
              handleOpen={handleOpen}
              handleSave={handleSave}
            />
          </div>
          <div
            style={{ float: "right", marginTop: "10px", marginRight: "14px" }}
          >
            <Button variant="secondary" disabled={!compare}>
              {"Compare Selected"}
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
