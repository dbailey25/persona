import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Host from "./pages/Host";
// import Waiter from "./pages/Waiter";
// import Customer from "./pages/Customer";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { Container } from "./components/Grid";
import Waiter from "./pages/Waiter";
import Footer from "./components/Footer";
import WebcamCapture from "./App0"

let userName = "N/A";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Container>
      <h4>User: {userName}</h4>
      <Switch>
<Route exact path="/app0" component={WebcamCapture} />
        <Route exact path="/" component={Login} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/waiter" component={Waiter} />
        {/*<Route exact path="/customer" component={Customer} />*/}
        <Route component={NoMatch} />
      </Switch>
      </Container>
      <Footer />
    </div>
  </Router>
);

export default App;
