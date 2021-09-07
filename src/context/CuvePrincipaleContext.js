import React, { createContext, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { alertService } from "../service/alertService";
import { cuvePrincipaleService } from "../service/cuvePrincipaleService";
import { rajoutService } from "../service/rajoutService";
import { ravitaillementCuveMobileService } from "../service/ravitaillerCuveMobileService";
import { TableListContext } from "./TableListContext";

export const CuvePrincipaleContext = createContext();

export const CuvePrincipaleProvider = (props) => {
  const history = useHistory();
  const { setLogging } = useContext(TableListContext);
  const [cuvesPrincipale, setCuvesPrincipale] = useState([]);
  const [rajouts, setRajouts] = useState([]);
  const [ravitaillementsCuveMobile, setRavitaillementsCuveMobile] = useState(
    []
  );

  useEffect(() => {
    getCuvePrincipaleList();
    getRajoutList();
    getAllRavitaillementCuveMobile();
  }, []);
  const getCuvePrincipaleList = () => {
    setLogging(true);
    cuvePrincipaleService
      .getAllCuvePrincipale()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setCuvesPrincipale(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getAllRavitaillementCuveMobile = () => {
    setLogging(true);
    ravitaillementCuveMobileService
      .getAllRavitaillementCuveMobile()
      .then((res) => {
        setLogging(false);
        console.log(res);
        setRavitaillementsCuveMobile(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
  const updateCuvePrincipale = (data) => {
    setLogging(true);
    console.log(data);
    cuvePrincipaleService
      .updateCuvePrincipale(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Cuve Principale Modifiée avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setCuvesPrincipale(
          cuvesPrincipale.map((cuve) => (cuve.id === res.id ? res : cuve))
        );
        history.push("/cuve-principale");
      })
      .catch((e) => {
        alertService.error("Echec Modification Cuve", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addCuvePrincipale = (data) => {
    setLogging(true);
    console.log(data);
    cuvePrincipaleService
      .createCuvePrincipale(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Cuve Principale créé avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setCuvesPrincipale([res, ...cuvesPrincipale]);
      })
      .catch((e) => {
        alertService.error("Echec Création Cuve Principale", {
          keepAfterRouteChange: true,
        });
      });
  };
  const addRajoutCuvePrincipale = (data) => {
    setLogging(true);
    console.log(data);
    rajoutService
      .rajouterCuve(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Rajout Cuve Principale avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRajouts([res, ...rajouts]);
        getCuvePrincipaleList();
        history.push("/cuve-principale");
      })
      .catch((e) => {
        alertService.error("Echec Rajout", {
          keepAfterRouteChange: true,
        });
      });
  };
  const updateRajoutCuvePrincipale = (data) => {
    setLogging(true);

    // console.log("", data);
    rajoutService
      .updateRajout(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Approvisionnement Modifié avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);
        setRajouts(
          rajouts.map((rajout) => (rajout.id === res.id ? res : rajout))
        );
        history.push("/cuve-principale/appoints");
      })
      .catch((e) => {
        alertService.error("Echec Modification ", {
          keepAfterRouteChange: true,
        });
      });
  };
  const ravitaillerCuveMobile = (data) => {
    setLogging(true);

    console.log(data);
    ravitaillementCuveMobileService
      .ravitaillerCuveMobile(data)
      .then((res) => {
        setLogging(false);
        alertService.success("Ravitaillement Cuve Mobile avec Success", {
          keepAfterRouteChange: true,
        });
        console.log(res);

        setRavitaillementsCuveMobile([res, ...ravitaillementsCuveMobile]);
        getCuvePrincipaleList();
        history.push("/cuve-principale");
      })
      .catch((e) => {
        alertService.error("Echec Modification ", {
          keepAfterRouteChange: true,
        });
      });
  };
  const updateRavitaillementCuveMobile = (data) => {
    setLogging(true);

    console.log(data);
    ravitaillementCuveMobileService
      .updateRavitaillementCuveMobile(data)
      .then((res) => {
        setLogging(false);
        alertService.success(
          "Modification Ravitaillement Cuve Mobile avec Success",
          {
            keepAfterRouteChange: true,
          }
        );
        console.log(res);

        setRavitaillementsCuveMobile(
          ravitaillementsCuveMobile.map((ravitaillement) =>
            ravitaillement.id === res.id ? res : ravitaillement
          )
        );
        history.push("/cuve-principale/ravitaillements-cuve-mobile");
      })
      .catch((e) => {
        alertService.error("Echec Modification ", {
          keepAfterRouteChange: true,
        });
      });
  };

  return (
    <CuvePrincipaleContext.Provider
      value={{
        cuvesPrincipale,
        addCuvePrincipale,
        updateCuvePrincipale,
        addRajoutCuvePrincipale,
        updateRajoutCuvePrincipale,
        ravitaillerCuveMobile,
        updateRavitaillementCuveMobile,
        ravitaillementsCuveMobile,
        rajouts,
      }}
    >
      {props.children}
    </CuvePrincipaleContext.Provider>
  );
};
