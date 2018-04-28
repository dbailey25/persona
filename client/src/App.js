import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import CaptureImage from "./pages/CaptureImage";
// import Waiter from "./pages/Waiter";
// import Customer from "./pages/Customer";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/captureimage" component={CaptureImage} />
        {/*<Route exact path="/waiter" component={Waiter} />
        <Route exact path="/customer" component={Customer} />*/}
        <Route component={NoMatch} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
