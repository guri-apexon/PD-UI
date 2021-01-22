import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import Grid from "apollo-react/components/Grid";
import Button from "apollo-react/components/Button";
import { protocolCompare, dashboard } from "../Dashboard/dashboardSlice";
import { loggedUser } from "../../../store/userDetails";
import AddProtocol from "./AddProtocol/AddProtocol";
import ProtocolTable from "./ProtocolTable";
import DashboardSearch from "./DashboardSearch";


const Dashboard = () => {
  const userDetails = useSelector(loggedUser);
  const dispatch = useDispatch();
  const compare = useSelector(protocolCompare);
  const dashboardData = useSelector(dashboard);

  useEffect(() => {
    dispatch({ type: "DASHBOARD_ASYNC_SAGA" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    dispatch({ type: "TOGGLE_ADDPROTOCOL_MODAL" , payload: true});
  };

  const handleClose = () => {
    dispatch({ type: "TOGGLE_ADDPROTOCOL_MODAL" , payload: false});
  };

  let today = new Date()
let curHr = today.getHours()
let greet;
if (curHr < 12) {
  greet = 'Good Morning, '
  console.log('good morning')
} else if (curHr < 18) {
  greet = 'Good Afternoon, '
  console.log('good afternoon')
} else {
  greet = 'Good Evening, '
  console.log('good evening')
}

  return (
     <div className="dashboard-parent" style={{ padding: 20 }}>
     <h1>{greet} {userDetails && userDetails.username}</h1>
     <Grid container spacing={2}>
       <Grid item xs={12}>
         <div style={{ float: "right" }}>
           <AddProtocol
             handleClose={handleClose}
             handleOpen={handleOpen}
           />
         </div>
         {/* <div
           style={{ float: "right", marginTop: "10px", marginRight: "14px" }}
         >
           <Button variant="secondary" disabled={!compare}>
             {"Compare Selected"}
           </Button>
         </div> */}
       </Grid>
       <Grid item xs={12}>
         <ProtocolTable />
       </Grid>
       <Grid item xs={12}>
         <DashboardSearch />
       </Grid>
     </Grid>
   </div>
  )
};

export default Dashboard;
