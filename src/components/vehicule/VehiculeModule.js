import React from "react";
import { Route, Switch } from "react-router-dom";
import { VehiculeProvider } from "../../context/VehiculeContext";
import AddVehicule from "./AddVehicule";
import PhotoVehicule from "./PhotoVehicule";
import EditVehicule from "./EditVehicule";
import VehiculeList from "./VehiculeList";

function VehiculeModule() {
  return (
    <VehiculeProvider>
      <>
        <Switch>
          <Route
            exact
            path="/vehicule"
            render={(props) => <VehiculeList {...props} />}
          />
          <Route
            exact
            path="/vehicule/add-vehicule"
            render={(props) => <AddVehicule {...props} />}
          />
          {/* <Route
            exact
            path="/vehicule/add-vehicule"
            render={(props) => <PhotoVehicule {...props} />}
          /> */}
          <Route
            exact
            path="/vehicule/edit-vehicule"
            render={(props) => <EditVehicule {...props} />}
          />
        </Switch>
      </>
    </VehiculeProvider>
  );
}

export default VehiculeModule;
