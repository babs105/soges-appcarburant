import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { alertService } from "../service/alertService";
import { ravitaillementForageService } from "../service/ravitaillementForageService";
import { CuveContext } from "./CuveContext";
import { TableListContext } from "./TableListContext";

export const RavitaillementForageContext = createContext();

export const RavitaillementForageProvider = (props) => {
  const [ravitaillementForages, setRavitaillementForages] = useState([]);
  const { setLogging } = useContext(TableListContext);
  const { getCuvesList } = useContext(CuveContext);
  const history = useHistory();
  useEffect(() => {
    getAllRavitaillementForage();
  }, []);
  const getAllRavitaillementForage = () => {
    setLogging(true);
    ravitaillementForageService
      .getAllRavitaillementForage()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementForages(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const updateRavitaillementForage = (data) => {
    setLogging(true);

    console.log(data);
    ravitaillementForageService
      .updateRavitaillementForage(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Ravitaillement Forage Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillementForages(
          ravitaillementForages.map((ravitaillement) =>
            ravitaillement.id === res.id ? res : ravitaillement
          )
        );
        history.push("/cuve/approvisionnement-forages");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Modification Ravitaillement Forage", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addRavitaillementForage = (data) => {
    setLogging(true);
    console.log(data);
    ravitaillementForageService
      .ravitaillerForage(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Forage Ravitaillé avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillementForages([res, ...ravitaillementForages]);
        getCuvesList();
        history.push("/cuve");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Ravitaillement Forage", {
          keepAfterRouteChange: true,
        });
      });
  };

  return (
    <RavitaillementForageContext.Provider
      value={{
        ravitaillementForages,
        addRavitaillementForage,
        updateRavitaillementForage,
      }}
    >
      {props.children}
    </RavitaillementForageContext.Provider>
  );
};
