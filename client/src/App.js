import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Host from "./pages/Host";
import Guest from "./pages/Guest";
import NoMatch from "./pages/NoMatch";
import { Header } from "./components/LayoutComponents";
import { Container } from "./components/Grid";
import Waiter from "./pages/Waiter";
// import Footer from "./components/Footer";
import "./App.css";

const App = () => (
  <Router>
    <div>
      <Header />
      <Container>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/waiter" component={Waiter} />
        <Route exact path="/guest" component={Guest} />
        <Route exact path="/*" component={Login} />
        <Route component={NoMatch} />
      </Switch>
      </Container>
      {/*<Footer />*/}
    </div>
  </Router>
);

export default App;
