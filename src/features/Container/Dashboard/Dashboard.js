import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import { protocolCompare } from "../Dashboard/dashboardSlice";
import AddProtocol from "./AddProtocol/AddProtocol";
import ProtocolTable from "./ProtocolTable";
import DashboardSearch from "./DashboardSearch";

const Dashboard = () => {
  const dispatch = useDispatch();
  const compare = useSelector(protocolCompare);
  const [state, setState] = useState({
    custom: false,
  });

  useEffect(() => {
    dispatch({ type: "DASHBOARD_ASYNC_SAGA" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (variant) => {
    let deeptemp = _.cloneDeep(state);
    deeptemp[variant] = true;
    setState(deeptemp)
  };

  const handleClose = (variant) => {
    let deeptemp = _.cloneDeep(state);
    deeptemp[variant] = false;
    setState(deeptemp)
  };
  const handleSave = (variant) => {
    let deeptemp = _.cloneDeep(state);
    deeptemp[variant] = false;
    setState(deeptemp)
  };

  return (
    <div className="dashboard-parent" style={{ padding: 20 }}>
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
