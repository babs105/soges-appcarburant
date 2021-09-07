import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import { RavitaillementProvider } from "../../context/RavitaillementVehiculeContext";
import { VehiculeProvider } from "../../context/VehiculeContext";
import AddRavitaillement from "./AddRavitaillement";
import EditRavitaillement from "./EditRavitaillement";
import RavitaillementList from "./RavitaillementList";
import Soutirement from "./Soutirement";
function RavitaillementModule() {
  return (
    <>
      <RavitaillementProvider>
        <CuveProvider>
          <VehiculeProvider>
            <Switch>
              <Route
                exact
                path="/ravitaillement"
                component={RavitaillementList}
              />
              <Route
                exact
                path="/ravitaillement/add"
                component={AddRavitaillement}
              />
              <Route
                exact
                path="/ravitaillement/soutire"
                component={Soutirement}
              />
              <Route
                exact
                path="/ravitaillement/edit"
                component={EditRavitaillement}
              />
            </Switch>
          </VehiculeProvider>
        </CuveProvider>
      </RavitaillementProvider>
    </>
  );
}

export default RavitaillementModule;
