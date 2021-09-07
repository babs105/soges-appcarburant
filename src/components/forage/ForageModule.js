import React from "react";
import { Route, Switch } from "react-router-dom";
import { ForageProvider } from "../../context/ForageContext";
import { RavitaillementGroupeProvider } from "../../context/RavitaillementGroupeContext";
import AddForage from "./AddForage";
import AllRavitaillementGroupe from "./AllRavitaillementGroupe";
import EditForage from "./EditForage";
import ForageList from "./ForageList";
import EditRavitaillementGroupe from "./EditRavitaillementGroupe";
import RavitaillerGroupe from "./RavitaillerGroupe";
function ForageModule() {
  return (
    <>
      <ForageProvider>
        <RavitaillementGroupeProvider>
          <Switch>
            <Route exact path="/forage" component={ForageList} />
            <Route exact path="/forage/add-forage" component={AddForage} />
            <Route exact path="/forage/edit-forage" component={EditForage} />
            <Route
              exact
              path="/forage/ravitailler-groupe"
              component={RavitaillerGroupe}
            />
            <Route
              exact
              path="/forage/edit-ravitaillement-groupe"
              component={EditRavitaillementGroupe}
            />
            <Route
              exact
              path="/forage/ravitaillements-groupe"
              component={AllRavitaillementGroupe}
            />

            {/* <Route exact path="/cuve/edit-cuve" component={EditCuve} />
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
                component={AllApprovisionnementsForages}
              />
              <Route
                exact
                path="/cuve/edit-ravitaillement-vehicule"
                component={EditRavitaillementVehicule}
              /> */}
          </Switch>
        </RavitaillementGroupeProvider>
      </ForageProvider>
    </>
  );
}
export default ForageModule;
