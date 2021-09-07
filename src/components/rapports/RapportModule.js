import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import { RavitaillementProvider } from "../../context/RavitaillementVehiculeContext";
import { VehiculeProvider } from "../../context/VehiculeContext";
import Rapport from "./Rapport";

function RapportModule() {
  return (
    <>
      <RavitaillementProvider>
        <CuveProvider>
          <VehiculeProvider>
            <Switch>
              <Route exact path="/rapports" component={Rapport} />
            </Switch>
          </VehiculeProvider>
        </CuveProvider>
      </RavitaillementProvider>
    </>
  );
}

export default RapportModule;
