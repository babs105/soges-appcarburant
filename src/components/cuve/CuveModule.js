import React from "react";
import { Route, Switch } from "react-router-dom";
import { CuveProvider } from "../../context/CuveContext";
import { ForageProvider } from "../../context/ForageContext";
import { RavitaillementForageProvider } from "../../context/RavitaillementForageContext";
import { RavitaillementProvider } from "../../context/RavitaillementVehiculeContext";
import { VehiculeProvider } from "../../context/VehiculeContext";
import AddCuve from "./AddCuve";
import AllApprovisionnementsForage from "./AllApprovisionnementsForage";
import AllRavitaillementVehicule from "./AllRavitaillementVehicule";
import CuveList from "./CuveList";
import EditCuve from "./EditCuve";
import EditRavitaillementForage from "./EditRavitaillementForage";
import EditRavitaillementVehicule from "./EditRavitaillementVehicule";
import RavitaillerForage from "./RavitaillerForage";
import RavitaillerVehicule from "./RavitaillerVehicule";
function CuveModule() {
  return (
    <>
      <CuveProvider>
        <RavitaillementForageProvider>
          <RavitaillementProvider>
            <VehiculeProvider>
              <ForageProvider>
                <Switch>
                  <Route exact path="/cuve" component={CuveList} />
                  <Route exact path="/cuve/add-cuve" component={AddCuve} />
                  <Route exact path="/cuve/edit-cuve" component={EditCuve} />
                  <Route
                    exact
                    path="/cuve/ravitailler-vehicule"
                    component={RavitaillerVehicule}
                  />
                  <Route
                    exact
                    path="/cuve/ravitaillements-vehicules"
                    component={AllRavitaillementVehicule}
                  />
                  <Route
                    exact
                    path="/cuve/approvisionnement-forages"
                    component={AllApprovisionnementsForage}
                  />
                  <Route
                    exact
                    path="/cuve/edit-ravitaillement-vehicule"
                    component={EditRavitaillementVehicule}
                  />
                  <Route
                    exact
                    path="/cuve/ravitailler-forage"
                    component={RavitaillerForage}
                  />
                  <Route
                    exact
                    path="/cuve/edit-ravitaillement-forage"
                    component={EditRavitaillementForage}
                  />
                </Switch>
              </ForageProvider>
            </VehiculeProvider>
          </RavitaillementProvider>
        </RavitaillementForageProvider>
      </CuveProvider>
    </>
  );
}
export default CuveModule;
