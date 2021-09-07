import React, { useEffect, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import NosServices from "../components/NosServices/NosServices";
import Slider from "../components/slider/Slider";
import Vmc from "../components/Vmc/Vmc";
import { TableListContext } from "../context/TableListContext";
//  import src from "/images/heroImage.svg";

function Accueil() {
  // let history = useHistory();

  const { setLogging } = useContext(TableListContext);

  useEffect(() => {
    console.log("dans Accueil");
    setLogging(false);
  }, []);
  return (
    <div className="bg-dark">
      <Slider />
      {/* Mot du Directeur  */}
      {/* <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="main-heading"> MOTS DU DIRECTEUR</h3>
              <div className="underline mx-auto"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={"/images/bossImage.jpg"}
                alt="..."
                className="w-50 h-75"
              />
              <h4>Malick SOW </h4>
              <h5>Directeur Général </h5>
            </div>
            <div className="col-md-8 rounded bg-light shadow p-2">
              <h4 className="text-center">
                {" "}
                La mobilité, un nouveau mode de vie
              </h4>

              <p className="lead">
                « La mutation dans la notion de mobilité et l’innovation dans
                l’usage font du transport un véritable pilier sociétal. Bien
                au-delà de la seule idée de franchir une distance, la mobilité
                est de plus en plus comprise comme le moyen de créer des liens,
                des synergies et une source de développement. La vision d’une
                route refléte pour le voyageur, le travailleur, le citoyen
                nomade, un horizon de possibilités. La mobilité fait désormais
                partie du mode de vie standard de la société et de l’économie
                contemporaine. »
              </p>
            </div>
          </div>
        </div> */}
      {/* </section> */}

      {/* Vision mission Valeur */}
      {/* <Vmc /> */}

      {/* Services */}
      {/* <NosServices /> */}
    </div>
  );
}

export default Accueil;
