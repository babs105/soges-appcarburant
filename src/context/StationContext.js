import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { stationService } from "../service/stationService";
import { useHistory } from "react-router";
import { TableListContext } from "./TableListContext";

export const StationContext = createContext();

export const StationProvider = (props) => {
  const [stations, setStations] = useState([]);
  const { setLogging } = useContext(TableListContext);

  const history = useHistory();

  useEffect(() => {
    console.log("in station context");
    getStationList();
  }, []);
  const getStationList = () => {
    setLogging(true);
    stationService
      .getAllStation()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setStations(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateStation = (data) => {
    setLogging(true);

    console.log(data);
    stationService
      .updateStation(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Station Modifiée avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setStations(
          stations.map((station) => (station.id === res.id ? res : station))
        );
        history.push("/station");
      })
      .catch((e) => {
        alertService.error("Echec Ajout Station", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addStation = (data) => {
    setLogging(true);
    console.log(data);
    stationService
      .createStation(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Station enregistrée avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setStations([res, ...stations]);
      })
      .catch((e) => {
        alertService.error("Echec Ajout Station", {
          keepAfterRouteChange: true,
        });
      });
  };
  return (
    <StationContext.Provider
      value={{
        stations,
        addStation,
        updateStation,
      }}
    >
      {props.children}
    </StationContext.Provider>
  );
};
