import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() =>
  import("../features/Container/Dashboard/Dashboard")
);
const Search = lazy(() => import("../features/Container/Search/Search"));
const Protocols = lazy(() =>
  import("../features/Container/Protocols/Protocols")
);
const PageNotFound = lazy(() =>
  import("../features/Container/PageNotFound/PageNotFound")
);
const QC = lazy(() => import("../features/Container/QC/QC"));

// import Dashboard from '../features/Container/Dashboard/Dashboard';
// import Protocols from '../features/Container/Protocols/Protocols';
// import Search from '../features/Container/Search/Search';
// import { Counter as Csaga } from "../features/counterSaga/Counter";
const Routes = ({ userType }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {userType === "normal" && (
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          {/* <Route exact path='/'  component={Dashboard}/> */}
          {/* <Route path="/saga"> <Csaga /></Route> */}
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/protocols" component={Protocols} />
          <Route path="/search" component={Search} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      )}
      {userType === "QC1" && (
        <Switch>
          <Redirect exact from="/" to="/qc" />
          <Redirect exact from="/dashboard" to="/qc" />
          <Route path="/qc" component={QC} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      )}
      {userType === "QC2" && (
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/protocols" component={Protocols} />
          <Route path="/search" component={Search} />
          <Route path="/qc" component={QC} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      )}
    </Suspense>
  );
};

export default Routes;
