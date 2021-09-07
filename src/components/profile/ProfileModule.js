import React from "react";
import { Route, Switch } from "react-router";
import Profile from "./Profile";

function ProfileModule() {
  return (
    <Switch>
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
}

export default ProfileModule;
