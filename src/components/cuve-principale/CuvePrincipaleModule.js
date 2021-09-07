import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveContext, CuveProvider } from "../../context/CuveContext";
import { CuvePrincipaleProvider } from "../../context/CuvePrincipaleContext";
import { RajoutProvider } from "../../context/RajoutContext";
import { StationProvider } from "../../context/StationContext";
import AddCuvePrincipale from "./AddCuvePrincipale";
import AllRajoutCuvePrincipale from "./AllRajoutCuvePrincipale";
import AllRavitaillementsCuveMobile from "./AllRavitaillementsCuveMobile";
import CuvePrincipaleList from "./CuvePrincipaleList";
import EditCuvePrincipale from "./EditCuvePrincipale";
import EditRajoutCuvePrincipale from "./EditRajoutCuvePrincipale";
import EditRavitaillementCuveMobile from "./EditRavitaillementCuveMobile";
import RajoutCuvePrincipale from "./RajoutCuvePrincipale";
import RavitaillerCuveMobile from "./RavitaillerCuveMobile";

function CuvePrincipaleModule() {
  return (
    <>
      <CuvePrincipaleProvider>
        <CuveProvider>
          <StationProvider>
            <Switch>
              <Route
                exact
                path="/cuve-principale"
                component={CuvePrincipaleList}
              />
              <Route
                exact
                path="/cuve-principale/add"
                component={AddCuvePrincipale}
              />
              <Route
                exact
                path="/cuve-principale/edit"
                component={EditCuvePrincipale}
              />
              <Route
                exact
                path="/cuve-principale/appoint"
                component={RajoutCuvePrincipale}
              />
              <Route
                exact
                path="/cuve-principale/appoints"
                component={AllRajoutCuvePrincipale}
              />
              <Route
                exact
                path="/cuve-principale/edit-appoints"
                component={EditRajoutCuvePrincipale}
              />
              <Route
                exact
                path="/cuve-principale/ravitailler-cuve-mobile"
                component={RavitaillerCuveMobile}
              />
              <Route
                exact
                path="/cuve-principale/ravitaillements-cuve-mobile"
                component={AllRavitaillementsCuveMobile}
              />
              <Route
                exact
                path="/cuve-principale/edit-ravitaillements-cuve-mobile"
                component={EditRavitaillementCuveMobile}
              />
            </Switch>
          </StationProvider>
        </CuveProvider>
      </CuvePrincipaleProvider>
    </>
  );
}

export default CuvePrincipaleModule;
