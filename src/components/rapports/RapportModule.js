import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import { CuvePrincipaleProvider } from "../../context/CuvePrincipaleContext";
import { RapportProvider } from "../../context/RapportContext";
import { RavitaillementProvider } from "../../context/RavitaillementVehiculeContext";
import { VehiculeProvider } from "../../context/VehiculeContext";
import Rapport from "./Rapport";
import RapportCuvePrincipale from "./RapportCuvePrincipale";

function RapportModule() {
  return (
    <>
      <RapportProvider>
        <CuvePrincipaleProvider>
          <CuveProvider>
            <RavitaillementProvider>
              <VehiculeProvider>
                <Switch>
                  <Route exact path="/rapports" component={Rapport} />
                </Switch>
                <Switch>
                  <Route
                    exact
                    path="/rapports/cuve-principale"
                    component={RapportCuvePrincipale}
                  />
                </Switch>
              </VehiculeProvider>
            </RavitaillementProvider>
          </CuveProvider>
        </CuvePrincipaleProvider>
      </RapportProvider>
    </>
  );
}

export default RapportModule;
