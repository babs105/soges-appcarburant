import React from "react";
import { Link } from "react-router-dom";

function MenuRapport() {
  return (
    <div
      className="c-height d-sm-flex justify-content-start align-items-center d-lg-block c-menu-height col-12 col-lg-2 bg-c-light border-right border-bottom  p-1 p-lg-4   "
      // style={{ height: "100vh" }}
    >
      <h6 className="text-center ml-4 mb-0 mr-2">RAPPORT</h6>

      <hr className="d-none d-lg-block my-2" />

      <div className="text-center m-1  ">
        <Link
          className=""
          style={{ textDecoration: "none" }}
          to={{ pathname: "/rapports/cuve-principale" }}
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Cuve Principale
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center text-sm m-1">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/cuve" }}
          className=""
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Cuve Mobile
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center text-sm m-1">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/cuve/ravitaillements-vehicules" }}
          className=""
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Forages
          </button>
        </Link>
      </div>

      <hr className="d-none d-lg-block my-2" />

      <div className="text-sm m-1">
        <Link
          className=""
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/cuve/approvisionnement-forages",
          }}
        >
          <button className="btn btn-sm btn-outline-success btn-block shadow-none">
            Véhicules
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
    </div>
  );
}

export default MenuRapport;
