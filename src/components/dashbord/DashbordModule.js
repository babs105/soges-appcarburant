import React from "react";
import { Route, Switch } from "react-router-dom";
import { DashbordProvider } from "../../context/DashbordContext";
import Dashboard from "./Dashboard";

function DashbordModule() {
  return (
    <DashbordProvider>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </DashbordProvider>
  );
}

export default DashbordModule;
