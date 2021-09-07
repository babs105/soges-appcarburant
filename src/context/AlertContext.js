import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { alertActions } from "../actions/alertActions";
import alertReducer from "../reducers/alertReducer";

export const AlertContext = createContext();
export const AlertProvider = ({ children }) => {
  const initialState = {
    // type: "",
    // message: "",
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  useEffect(() => {
    // clear alert on location change
    // dispatch(alertActions.alertClear());
    console.log("alertContext");
  }, []);

  const alertSuccessMessage = (message) => {
    console.log("sucesss", message);
    dispatch(alertActions.alertSuccess(message));
  };
  const alertClear = () => {
    console.log("clear");
    dispatch(alertActions.alertClear());
  };
  const alertErrorMessage = (message) => {
    console.log("erreur", message);
    dispatch(alertActions.alertError(message));
  };
  return (
    <AlertContext.Provider
      value={{
        alertSuccessMessage,
        alertErrorMessage,
        alertClear,
        type: state.type,
        message: state.message,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
