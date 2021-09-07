import React from "react";
import { Link } from "react-router-dom";

function MenuCuvePrincipale() {
  return (
    <div
      className=" d-sm-flex justify-content-start align-items-center d-lg-block c-menu-height col-12 col-lg-2 bg-light border-right border-bottom  p-1 p-lg-4  "
      //   style={{ height: "100vh" }}
    >
      <h6 className="text-center ml-4 mb-0 mr-2">CUVE PRINCIPALE</h6>

      <hr className="d-none d-lg-block my-2" />

      <div className="text-center m-1 ">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/cuve-principale/add" }}
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Nouvelle Cuve
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center text-sm m-1">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/cuve-principale" }}
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Liste Cuve Principale
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center text-sm m-1">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/cuve-principale/appoints" }}
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Liste des Rajouts
          </button>
        </Link>
      </div>

      <hr className="d-none d-lg-block my-2" />

      <div className="text-sm m-1 ">
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: "/cuve-principale/ravitaillements-cuve-mobile",
          }}
        >
          <button className="btn btn-sm btn-outline-success btn-block shadow-none">
            Liste des Ravitaillements
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
    </div>
  );
}

export default MenuCuvePrincipale;
