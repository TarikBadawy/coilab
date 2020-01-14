import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/CoilabNavbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        {/* <Route path="/profile" exact component={Profile} /> */}
      </Switch>
    </Router>
  );
}

export default App;
