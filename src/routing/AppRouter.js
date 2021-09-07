import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import AuthenticatedRoute from "./AuthenticatedRoute";

import Login from "../page/LoginForm";
import { Alert } from "../components/alert/Alert";
import history from "../utils/history";
import { TableListProvider } from "../context/TableListContext";
import { UserContext, UserProvider } from "../context/UserContext";
import Accueil from "../page/Accueil";
import Register from "../page/Register";
import AlertContext from "../context/AlertContext";
import NavBar from "../components/navbar/NavBar";
import About from "../page/About";
import Contact from "../page/Contact";

const AppRouter = () => {
  const { type, message, alertClear } = useContext(AlertContext);

  useEffect(() => {
    console.log("dans app router");
  }, []);
  return (
    console.log("mmmm", message),
    (
      <>
        <Router history={history}>
          <TableListProvider>
            <UserProvider>
              <Alert />

              {message && (
                <div className=" my-alert fixed-bottom">
                  <div
                    className={`alert ${type} alert-dismissible fade show d-flex justify-content-center align-items-center  " `}
                    // role="alert"
                  >
                    {message}
                    <button
                      type="button"
                      className="close "
                      data-dismiss="alert"
                      aria-label="Close"
                      onClick={() => alertClear()}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
              )}
              <NavBar />
              <Switch>
                <Route
                  path="/"
                  exact
                  render={(props) => <Accueil {...props} />}
                />
                <Route
                  path="/login"
                  exact
                  render={(props) => <Login {...props} />}
                />

                <Route
                  path="/register"
                  exact
                  render={(props) => <Register {...props} />}
                />
                <Route
                  path="/about"
                  exact
                  render={(props) => <About {...props} />}
                />
                <Route
                  path="/contact"
                  exact
                  render={(props) => <Contact {...props} />}
                />

                <AuthenticatedRoute
                  path="/"
                  render={(props) => <PrivateRoutes {...props} />}
                />

                {/* <Route path="/" component={PrivateRoutes} /> */}
              </Switch>
            </UserProvider>
          </TableListProvider>
        </Router>
      </>
    )
  );
};

export default AppRouter;
