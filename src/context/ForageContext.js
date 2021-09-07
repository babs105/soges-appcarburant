import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { forageService } from "../service/forageService";
import { TableListContext } from "./TableListContext";
import { useHistory } from "react-router-dom";

export const ForageContext = createContext();

export const ForageProvider = (props) => {
  const [forages, setForages] = useState([]);
  const { setLogging } = useContext(TableListContext);
  const history = useHistory();
  useEffect(() => {
    getAllForage();
  }, []);
  const getAllForage = () => {
    setLogging(true);
    forageService
      .getAllForages()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setForages(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const updateForage = (data) => {
    setLogging(true);

    console.log(data);
    forageService
      .updateForage(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Forage Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setForages(
          forages.map((forage) => (forage.id === res.id ? res : forage))
        );
        history.push("/forage");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Modification", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addForage = (data) => {
    setLogging(true);
    console.log(data);
    forageService
      .createForage(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Forage enregistré avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setForages([res, ...forages]);
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Enregistrement Forage", {
          keepAfterRouteChange: true,
        });
      });
  };

  return (
    <ForageContext.Provider
      value={{
        forages,
        addForage,
        updateForage,
        getAllForage,
      }}
    >
      {props.children}
    </ForageContext.Provider>
  );
};
