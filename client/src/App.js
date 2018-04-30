import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import CaptureImage from "./pages/CaptureImage";
// import Waiter from "./pages/Waiter";
// import Customer from "./pages/Customer";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Waiter from "./pages/Waiter";
import Footer from "./components/Footer";
import WebcamCapture from "./App0"

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
<Route exact path="/app0" component={WebcamCapture} />
        <Route exact path="/" component={Login} />
        <Route exact path="/host" component={CaptureImage} />
        <Route exact path="/waiter" component={Waiter} />
        {/*<Route exact path="/customer" component={Customer} />*/}
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
