import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
// import Host from "./pages/Host";
// import Waiter from "./pages/Waiter";
// import Customer from "./pages/Customer";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        {/*}<Route exact path="/host" component={Host} />
        <Route exact path="/waiter" component={Waiter} />
        <Route exact path="/customer" component={Customer} />*/}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
