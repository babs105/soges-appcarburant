import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { rajoutService } from "../service/rajoutService";
import { cuveService } from "../service/cuveService";
import { TableListContext } from "./TableListContext";
import { StationContext } from "./StationContext";
import { useHistory } from "react-router-dom";

export const RajoutContext = createContext();

export const RajoutProvider = (props) => {
  const history = useHistory();
  const [rajouts, setRajouts] = useState([]);

  const { setLogging } = useContext(TableListContext);

  //   const { cuves } = useContext(CuveContext);
  useEffect(() => {
    getRajoutList();
  }, []);
  const getRajoutList = () => {
    setLogging(true);
    rajoutService
      .getAllRajout()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRajouts(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //   const getCuves = () => {
  //     setLogging(true);
  //     cuveService
  //       .getAllCuves()
  //       .then((res) => {
  //         setLogging(false);
  //         console.log(res);
  //         setRajouts(res);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  //   const getRajoutList = () => {
  //     setLogging(true);
  //     rajoutService
  //       .getAllRajout()
  //       .then((res) => {
  //         setLogging(false);
  //         console.log(res);
  //         setRajouts(res);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };
  const updateRajout = (data) => {
    setLogging(true);

    console.log(data);
    rajoutService
      .updateRajout(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Rajout Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRajouts(
          rajouts.map((rajout) => (rajout.id === res.id ? res : rajout))
        );
      })
      .catch((e) => {
        alertService.error("Echec Modification Rajout", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addRajout = (data) => {
    setLogging(true);
    console.log(data);
    rajoutService
      .rajouterCuve(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Rajout enregistré avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRajouts([...rajouts, res]);
        history.push("/cuve-principale");
      })
      .catch((e) => {
        alertService.error("Echec Rajout", {
          keepAfterRouteChange: true,
        });
      });
  };
  return (
    <RajoutContext.Provider
      value={{
        rajouts,
        addRajout,
        updateRajout,
      }}
    >
      {props.children}
    </RajoutContext.Provider>
  );
};
