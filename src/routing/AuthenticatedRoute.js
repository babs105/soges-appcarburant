import React from "react";
import { Route, Redirect } from "react-router-dom";

import { authenticationHelper } from "../utils/AuthenticationHelper";

const AuthenticatedRoute = (props) => {
  console.log(" AuthenticatedRoute");
  if (authenticationHelper.isUserLoggedIn()) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

export default AuthenticatedRoute;
