import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import { CuvePrincipaleProvider } from "../../context/CuvePrincipaleContext";
import { RapportProvider } from "../../context/RapportContext";
import { RavitaillementProvider } from "../../context/RavitaillementVehiculeContext";
import { VehiculeProvider } from "../../context/VehiculeContext";
import Rapport from "./Rapport";
import RapportCPRajouts from "./RapportCPRajouts";
import RapportCPRavitaillementCM from "./RapportCPRavitaillementCM";

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
                    path="/rapports/cuve-principale/rajouts"
                    component={RapportCPRajouts}
                  />
                  <Route
                    exact
                    path="/rapports/cuve-principale/ravitaillements"
                    component={RapportCPRavitaillementCM}
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
