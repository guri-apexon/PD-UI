import {
    Switch,
    Route,
  } from "react-router-dom";
import Dashboard from '../features/Container/Dashboard/Dashboard';
import Protocols from '../features/Container/Protocols/Protocols';
import Search from '../features/Container/Search/Search';
import { Counter as Csaga } from '../features/counterSaga/Counter';
const Routes = () => {
    return(
      <Switch>
          <Route exact path='/'  component={Dashboard}/>
          <Route path="/saga"> <Csaga /></Route>
          <Route path='/dashboard'  component={Dashboard}/>
          <Route path='/protocols'  component={Protocols}/>
          <Route path='/search'  component={Search}/>
      </Switch>
      )
    }
     
export default Routes