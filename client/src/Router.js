import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/user/Signup";

const Router = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  );
};

export default Router;
