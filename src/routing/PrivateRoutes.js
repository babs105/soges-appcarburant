import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import CuveModule from "../components/cuve/CuveModule";

import Navigation from "../components/navigation/Navigation";
import RavitaillementModule from "../components/ravitaillement/RavitaillementModule";
import StationModule from "../components/station/StationModule";
import UserModule from "../components/users/UserModule";
import NotFound from "../components/NoAutorize/NoFound";

import VehiculeModule from "../components/vehicule/VehiculeModule";
import { UserContext } from "../context/UserContext";
import NoAutorize from "../components/NoAutorize/NoAutorize";
import DashbordModule from "../components/dashbord/DashbordModule";
import Profile from "../components/profile/Profile";
import RapportModule from "../components/rapports/RapportModule";
import CuvePrincipaleModule from "../components/cuve-principale/CuvePrincipaleModule";

import ForageModule from "../components/forage/ForageModule";
const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="d-none d-sm-block">
        {" "}
        <Navigation />
      </div>
      <div>
        <Switch>
          {user.role === "Admin" ? (
            <Route path="/users" component={UserModule} />
          ) : (
            <Route path="/users" component={NoAutorize} />
          )}

          <Route path="/station" component={StationModule} />
          <Route path="/ravitaillement" component={RavitaillementModule} />
          {/* <Route path="/rajout" component={RajoutModule} /> */}
          <Route path="/vehicule" component={VehiculeModule} />

          <Route path="/cuve" component={CuveModule} />
          <Route path="/cuve-principale" component={CuvePrincipaleModule} />

          <Route path="/forage" component={ForageModule} />
          <Route path="/dashboard" component={DashbordModule} />
          <Route path="/rapports" component={RapportModule} />
          <Route path="/profile" component={Profile} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
};
export default PrivateRoutes;
