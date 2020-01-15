import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import HomePage from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Space from "./components/Space";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store, { persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/space" exact component={Space} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
