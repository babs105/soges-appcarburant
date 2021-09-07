import React, { createContext, useState, useEffect, useContext } from "react";
import { alertService } from "../service/alertService";
import { dashboardService } from "../service/dashboardService";
import { ravitailleService } from "../service/ravitaillementVehiculeService";
import { TableListContext } from "./TableListContext";

export const DashbordContext = createContext();

export const DashbordProvider = (props) => {
  const [
    ravitaillementVehiculePreviousMonth,
    setRavitaillementVehiculePreviousMonth,
  ] = useState([]);
  const [
    ravitaillementVehiculeCurrentMonth,
    setRavitaillementVehiculeCurrentMonth,
  ] = useState([]);

  const [
    totalRavitaillementPreviousMonth,
    setTotalRavitaillementPreviousMonth,
  ] = useState([]);

  const [totalRavitaillementCurrentMonth, setTotalRavitaillementCurrentMonth] =
    useState([]);
  const [
    numberRajoutAndTotalQtePreviousMonth,
    setNumberRajoutAndTotalQtePreviousMonth,
  ] = useState([]);
  const [
    numberRajoutAndTotalQteCurrentMonth,
    setNumberRajoutAndTotalQteCurrentMonth,
  ] = useState([]);

  const [rajoutByCuvePreviousMonth, setRajoutByCuvePreviousMonth] = useState(
    []
  );
  const [rajoutByCuveCurrentMonth, setRajoutByCuveCurrentMonth] = useState([]);
  const [ravitaillementCuvePreviousMonth, setRavitaillementCuvePreviousMonth] =
    useState([]);
  const [ravitaillementCuveCurrentMonth, setRavitaillementCuveCurrentMonth] =
    useState([]);

  const { setLogging } = useContext(TableListContext);

  useEffect(() => {
    getRavitaillementByVehiculeInPreviousMonth();
    getRavitaillementByVehiculeInCurrentMonth();
    getTotalRavitaillementAndVehiculeInPreviousMonth();
    getTotalRavitaillementAndVehiculeInCurrentMonth();
    getNumberRajoutAndTotalQteInCurrentMonth();
    getNumberRajoutAndTotalQteInPreviousMonth();
    getNumberRajoutAndTotalQteByCuveInCurrentMonth();
    getNumberRajoutAndTotalQteByCuveInPreviousMonth();
    getNumberRavitaillementByCuveInPreviousMonth();
    getNumberRavitaillementByCuveInCurrentMonth();
  }, []);
  const getRavitaillementByVehiculeInPreviousMonth = () => {
    setLogging(true);
    dashboardService
      .getRavitaillementByVehiculeInPreviousMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementVehiculePreviousMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getRavitaillementByVehiculeInCurrentMonth = () => {
    setLogging(true);
    dashboardService
      .getRavitaillementByVehiculeInCurrentMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementVehiculeCurrentMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const getTotalRavitaillementAndVehiculeInPreviousMonth = () => {
    setLogging(true);
    dashboardService
      .getTotalRavitaillementAndVehiculeInPreviousMonth()
      .then((res) => {
        setLogging(false);
        console.log("get Total ravitaillement", res);
        console.log("qte", res[0].totalRavitaillement);
        setTotalRavitaillementPreviousMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getTotalRavitaillementAndVehiculeInCurrentMonth = () => {
    setLogging(true);
    dashboardService
      .getTotalRavitaillementAndVehiculeInCurrentMonth()
      .then((res) => {
        setLogging(false);
        console.log("total ravitaille");
        console.log(res);
        setTotalRavitaillementCurrentMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  const getNumberRajoutAndTotalQteInCurrentMonth = () => {
    setLogging(true);
    dashboardService
      .getNumberRajoutAndTotalQteInCurrentMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setNumberRajoutAndTotalQteCurrentMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getNumberRajoutAndTotalQteInPreviousMonth = () => {
    setLogging(true);
    dashboardService
      .getNumberRajoutAndTotalQteInPreviousMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setNumberRajoutAndTotalQtePreviousMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getNumberRajoutAndTotalQteByCuveInCurrentMonth = () => {
    setLogging(true);
    dashboardService
      .getNumberRajoutAndTotalQteByCuveInCurrentMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRajoutByCuveCurrentMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getNumberRajoutAndTotalQteByCuveInPreviousMonth = () => {
    setLogging(true);
    dashboardService
      .getNumberRajoutAndTotalQteByCuveInPreviousMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRajoutByCuvePreviousMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getNumberRavitaillementByCuveInPreviousMonth = () => {
    setLogging(true);
    dashboardService
      .getNumberRavitaillementByCuveInPreviousMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementCuvePreviousMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };
  const getNumberRavitaillementByCuveInCurrentMonth = () => {
    setLogging(true);
    dashboardService
      .getNumberRavitaillementByCuveInCurrentMonth()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementCuveCurrentMonth(res);
      })
      .catch((e) => {
        setLogging(false);
        console.log(e);
      });
  };

  return (
    <DashbordContext.Provider
      value={{
        ravitaillementVehiculePreviousMonth,
        ravitaillementVehiculeCurrentMonth,
        ravitaillementCuvePreviousMonth,
        ravitaillementCuveCurrentMonth,
        totalRavitaillementPreviousMonth,
        totalRavitaillementCurrentMonth,
        numberRajoutAndTotalQtePreviousMonth,
        numberRajoutAndTotalQteCurrentMonth,
        rajoutByCuveCurrentMonth,
        rajoutByCuvePreviousMonth,
      }}
    >
      {props.children}
    </DashbordContext.Provider>
  );
};
