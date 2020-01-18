import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Workspace from "./components/Features/Workspace";
import Math from "./components/Features/Math";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store, { persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/workspace" exact component={Workspace} />
            <Route path="/math" exact component={Math} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
