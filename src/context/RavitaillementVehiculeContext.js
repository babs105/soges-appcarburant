import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { alertService } from "../service/alertService";
import { ravitailleService } from "../service/ravitaillementVehiculeService";
import { CuveContext } from "./CuveContext";
import { TableListContext } from "./TableListContext";

export const RavitaillementContext = createContext();

export const RavitaillementProvider = (props) => {
  const [ravitaillements, setRavitaillements] = useState([]);
  const { setLogging } = useContext(TableListContext);
  const { getCuvesList } = useContext(CuveContext);
  const history = useHistory();
  useEffect(() => {
    getAllRavitaillements();
  }, []);
  const getAllRavitaillements = () => {
    setLogging(true);
    ravitailleService
      .getAllOperationsCuve()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillements(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const updateRavitaillementVehicule = (data) => {
    setLogging(true);

    console.log(data);
    ravitailleService
      .updateRavitaillement(data)
      .then((res) => {
        setLogging(false);
        alertService.success(
          " Modification Ravitaillement Vehicule avec Success",
          {
            keepAfterRouteChange: true,
          }
        );
        console.log(res);
        setRavitaillements(
          ravitaillements.map((ravitaillement) =>
            ravitaillement.id === res.id ? res : ravitaillement
          )
        );
        history.push("/cuve/ravitaillements-vehicules");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Modification Ravitaillement", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addRavitaillement = (data) => {
    setLogging(true);
    console.log(data);
    ravitailleService
      .ravitaillerVehicule(data)
      .then((res) => {
        setLogging(false);
        alertService.success("V??hicule Ravitaill?? avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRavitaillements([res, ...ravitaillements]);
        getCuvesList();
        history.push("/cuve");
      })
      .catch((e) => {
        setLogging(false);
        alertService.error("Echec Ravitaillement V??hicule", {
          keepAfterRouteChange: true,
        });
      });
  };
  // const soutirer = (data) => {
  //   setLogging(true);
  //   console.log(data);
  //   ravitailleService
  //     .soutirerVehicule(data)
  //     .then((res) => {
  //       setLogging(false);
  //       alertService.success("V??hicule soutir?? avec Success", {
  //         keepAfterRouteChange: true,
  //       });
  //       console.log(res);
  //       setRavitaillements([...ravitaillements, res]);
  //     })
  //     .catch((e) => {
  //       setLogging(false);
  //       alertService.error("Echec Soutirement V??hicule", {
  //         keepAfterRouteChange: true,
  //       });
  //     });
  // };

  return (
    <RavitaillementContext.Provider
      value={{
        ravitaillements,
        addRavitaillement,
        updateRavitaillementVehicule,
        // soutirer,
      }}
    >
      {props.children}
    </RavitaillementContext.Provider>
  );
};
