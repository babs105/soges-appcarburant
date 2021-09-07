import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { alertService } from "../service/alertService";
import { ravitaillementForageService } from "../service/ravitaillementForageService";
import { ravitaillementGroupeService } from "../service/ravitaillementGroupeService";
import { CuveContext } from "./CuveContext";
import { ForageContext } from "./ForageContext";
import { TableListContext } from "./TableListContext";

export const RavitaillementGroupeContext = createContext();

export const RavitaillementGroupeProvider = (props) => {
  const [ravitaillementGroupes, setRavitaillementGroupes] = useState([]);
  const { getAllForage } = useContext(ForageContext);
  const { setLogging } = useContext(TableListContext);
  const history = useHistory();
  useEffect(() => {
    getAllRavitaillementGroupe();
  }, []);
  const getAllRavitaillementGroupe = () => {
    setLogging(true);
    ravitaillementGroupeService
      .getAllRavitaillementGroupe()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementGroupes(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const updateRavitaillementGroupe = (data) => {
    setLogging(true);

    console.log(data);
    ravitaillementGroupeService
      .updateRavitaillementGroupe(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Ravitaillement Groupe Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillementGroupes(
          ravitaillementGroupes.map((ravitaillement) =>
            ravitaillement.id === res.id ? res : ravitaillement
          )
        );
        history.push("/forage/ravitaillements-groupe");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Modification Ravitaillement Groupe", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addRavitaillementGroupe = (data) => {
    setLogging(true);
    console.log(data);
    ravitaillementGroupeService
      .ravitaillerGroupe(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Groupe Ravitaillé avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillementGroupes([res, ...ravitaillementGroupes]);
        getAllForage();
        history.push("/forage");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Ravitaillement ", {
          keepAfterRouteChange: true,
        });
      });
  };

  return (
    <RavitaillementGroupeContext.Provider
      value={{
        ravitaillementGroupes,
        addRavitaillementGroupe,
        updateRavitaillementGroupe,
      }}
    >
      {props.children}
    </RavitaillementGroupeContext.Provider>
  );
};
