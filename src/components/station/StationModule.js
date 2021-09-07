import React from "react";
import { Route, Switch } from "react-router-dom";
import StationList from "./StationList";
import AddStation from "./AddStation";
import EditStation from "./EditStation";
import { StationProvider } from "../../context/StationContext";

function StationModule() {
  return (
    <StationProvider>
      <Switch>
        <Route
          exact
          path="/station"
          component={StationList}
          // render={(props) => <StationList {...props} />}
        />
        <Route
          exact
          path="/station/add-station"
          render={(props) => <AddStation {...props} />}
        />
        <Route
          exact
          path="/station/edit-station"
          render={(props) => <EditStation {...props} />}
        />
      </Switch>
    </StationProvider>
  );
}

export default StationModule;
