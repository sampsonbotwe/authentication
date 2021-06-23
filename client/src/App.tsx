import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ActivationPage from "./pages/ActivationPage";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/account/activate/:activationToken">
        <ActivationPage />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/">
        <LoginPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
