import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { StationContext } from "../../context/StationContext";
import { TableListContext } from "../../context/TableListContext";
import { CuveContext } from "../../context/CuveContext";
import MenuRapport from "./MenuRapport";
// import Rapport from "./Rapporting";

function Rapport({ history }) {
  return (
    <div className="row w-100 mx-0">
      {/* <MenuRapport /> */}
      <div className="col col-lg-10 mt-4 mx-auto">
        <div className="tabs ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active h6 " data-target="#users" href="#/">
                Rapport
              </a>
            </li>
            {/* <li className="nav-item">
            <a className="nav-link active" data-target="#commandes">
              Commande
            </a>
          </li> */}
          </ul>
        </div>
        <div className="card mt-2 ">
          <div className="card-title">
            <h6 className="text-center mt-4"> GENERER LES RAPPORTS</h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col col-sm-4">
                <div class="card mb-2 shadow">
                  <div class="card-body bg-c-light ">
                    <h5 class="card-title">Cuve Principale</h5>
                    {/* <p class="card-text">Editer les rapports</p> */}
                    <Link
                      to="/rapports/cuve-principale"
                      class="btn btn-outline-success"
                    >
                      Editer les rapports
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col col-sm-4">
                <div class="card  mb-2 shadow">
                  <div class="card-body bg-c-light">
                    <h5 class="card-title">Cuve Mobile</h5>
                    {/* <p class="card-text">Editer les rapports</p> */}
                    <Link
                      to="/rapports/cuve-principale"
                      class="btn btn-outline-success"
                    >
                      Editer les rapports
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col col-sm-4">
                <div class="card  mb-2 shadow">
                  <div class="card-body bg-c-light">
                    <h5 class="card-title">Forages</h5>
                    {/* <p class="card-text">Editer les rapports</p> */}
                    <Link
                      to="/rapports/cuve-principale"
                      class="btn btn-outline-success"
                    >
                      Editer les rapports
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col col-sm-4">
                <div class="card mb-2 shadow">
                  <div class="card-body bg-c-light">
                    <h5 class="card-title">Véhicules</h5>
                    {/* <p class="card-text">Editer les rapports</p> */}
                    <Link
                      to="/rapports/cuve-principale"
                      class="btn btn-outline-success"
                    >
                      Editer les rapports
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="h3"> Ajout Station</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Rapport;
