import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import UsersList from "./UsersList";
function UserModule() {
  return (
    <>
      <Switch>
        <Route exact path="/users" component={UsersList} />
      </Switch>
    </>
  );
}

export default UserModule;
