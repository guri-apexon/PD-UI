import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() =>
  import("../features/Container/Dashboard/Dashboard")
);
const Search = lazy(() => import("../features/Container/Search/Search"));
const Protocols = lazy(() =>
  import("../features/Container/Protocols/Protocols")
);

// import Dashboard from '../features/Container/Dashboard/Dashboard';
// import Protocols from '../features/Container/Protocols/Protocols';
// import Search from '../features/Container/Search/Search';
// import { Counter as Csaga } from "../features/counterSaga/Counter";
const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        {/* <Route exact path='/'  component={Dashboard}/> */}
        {/* <Route path="/saga"> <Csaga /></Route> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/protocols" component={Protocols} />
        <Route path="/search" component={Search} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
