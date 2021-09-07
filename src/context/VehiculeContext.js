import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { vehiculeService } from "../service/vehiculeService";
import { TableListContext } from "./TableListContext";

export const VehiculeContext = createContext();

export const VehiculeProvider = (props) => {
  const [vehicules, setVehicules] = useState([]);
  const { setLogging } = useContext(TableListContext);

  useEffect(() => {
    getVehiculeList();
  }, []);
  const getVehiculeList = () => {
    setLogging(true);
    vehiculeService
      .getAllVehicules()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setVehicules(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const updateVehicule = (data) => {
    setLogging(true);

    console.log(data);
    vehiculeService
      .updateVehicule(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Vehicule Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setVehicules(
          vehicules.map((vehicule) =>
            vehicule.immatricule === res.immatricule ? res : vehicule
          )
        );
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Ajout Vehicule", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addVehicule = (data) => {
    setLogging(true);
    console.log(data);
    vehiculeService
      .createVehicule(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Véhicule enregistré avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setVehicules([res.vehicule, ...vehicules]);
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Ajout Véhicule", {
          keepAfterRouteChange: true,
        });
      });
  };

  return (
    <VehiculeContext.Provider
      value={{
        vehicules,
        addVehicule,
        updateVehicule,
      }}
    >
      {props.children}
    </VehiculeContext.Provider>
  );
};
