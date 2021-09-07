import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

import { alertService } from "../service/alertService";
import { userService } from "../service/userService";
import { TableListContext } from "./TableListContext";

import { userActions } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import userReducer from "../reducers/userReducer";
import AlertContext from "./AlertContext";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setLogging } = useContext(TableListContext);
  const { alertSuccessMessage, alertErrorMessage, alertClear } =
    useContext(AlertContext);

  const initialState = {
    users: [],
    user: sessionStorage.getItem("user")
      ? { ...JSON.parse(sessionStorage.getItem("user")) }
      : {},
    isLogged: sessionStorage.getItem("user") ? true : false,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  //const [users, setUsers] = useState([]);
  let history = useHistory();

  useEffect(() => {
    console.log("dans User Context");
    getUserList();
    // state.isLogged = sessionStorage.getItem("user") ? true : false;
    // console.log("value islogged", state.isLogged);
  }, []);
  const getUserList = () => {
    setLogging(true);
    userService
      .getAllUsers()
      .then((res) => {
        setLogging(false);
        //setUsers((prevState) => [...prevState, ...res]);
        dispatch(userActions.getAllUsersSuccess(res));
      })
      .catch((error) => {
        dispatch(userActions.getAllUsersFailure(error));
        console.log(error);
      });
  };
  const addUser = (data) => {
    setLogging(true);
    console.log(data);
    userService
      .register(data)
      .then((res) => {
        // alertService.success("Compte Créé avec Success", {
        //   keepAfterRouteChange: true,
        // });
        console.log("userCreated", res);
        setLogging(false);
        // setUsers((prevState) =>
        //   prevState.map((user) => (user.id === res.id ? res : user))
        // );
        dispatch(userActions.registerSuccess(res));
        alertSuccessMessage(
          "Compte créé avec Suceess: " +
            res.username +
            " Merci de Vous Connecter"
        );
        // dispatch(alertActions.alertSuccess());
      })
      .catch((error) => {
        setLogging(false);
        dispatch(userActions.registerFailure(error));

        // alertService.error("ECHEC ENREGISTREMENT", {
        //   keepAfterRouteChange: true,
        // });
        alertErrorMessage("Erreur Ouverture Compte");
        // dispatch(alertActions.alertError("Erreur Ouverture Compte"));
      });
  };
  const editUser = (data) => {
    setLogging(true);
    console.log(data);
    userService
      .update(data)
      .then((res) => {
        // alertService.success("Modification enregistrée avec Success", {
        //   keepAfterRouteChange: true,
        // });
        alertSuccessMessage("Modification enregistrée avec Success");
        setLogging(false);
        // setUsers((prevState) =>
        //   prevState.map((user) => (user.id === res.id ? res : user))
        // );
        dispatch(userActions.editUserSuccess(res));
      })
      .catch((error) => {
        setLogging(false);
        dispatch(userActions.editUserFailure(error));
        // alertService.error("ECHEC ENREGISTREMENT", {
        //   keepAfterRouteChange: true,
        // });
        alertErrorMessage("Erreur Modification");
      });
  };

  const login = (data) => {
    setLogging(true);
    console.log(data);
    userService
      .login(data)
      .then((res) => {
        // alertService.success("Connexion réussite! Bienvenue....", {
        //   keepAfterRouteChange: true,
        // });
        setLogging(false);
        console.log(res);
        if (res.user.active) {
          // setUserInfo((prevState) => ({ ...prevState, ...res.user }));
          dispatch(userActions.loginSuccess(res.user));
          alertSuccessMessage("Connexion réussite! Bienvenue");
          // dispatch(alertActions.alertSuccess("Connexion réussite! Bienvenue"));
          history.push("/dashboard");
        } else {
          alertErrorMessage("Erreur Authentification");
        }
      })
      .catch((error) => {
        setLogging(false);
        dispatch(userActions.loginFailure(error));
        alertErrorMessage("Erreur Connexion ! Utilisateur non retrouvé");
        // dispatch(alertActions.alertError("Erreur Connexion !"));
        // alertService.error("ECHEC DE CONNEXION ", {
        //   keepAfterRouteChange: true,
        // });

        console.log(error);
      });
  };

  const logout = () => {
    userService.logout();
    dispatch(userActions.logout());
    alertClear();
  };

  return (
    <UserContext.Provider
      value={{
        login,
        logout,
        users: state.users,
        user: state.user,
        isLogged: state.isLogged,
        addUser,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
