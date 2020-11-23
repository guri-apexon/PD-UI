import {
    Switch,
    Route,
  } from "react-router-dom";
  import { Counter as Csaga } from './features/counterSaga/Counter';
import { Counter } from './features/counter/Counter';

const Routes = () => {
    return(
      <Switch>
          <Route path="/" exact> <Counter /></Route>
        <Route path="/saga"> <Csaga /></Route>
      </Switch>
      )
    }
     
export default Routes