import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Register from "../page/Register";
import LoginForm from "../components/login/LoginForm";
import Accueil from "../page/Accueil";

const PublicRoutes = () => (
  <>
    <Switch>
      <Route exact path="/" component={Accueil} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={LoginForm} />
    </Switch>
  </>
);

export default PublicRoutes;
