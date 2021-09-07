import React from "react";
import { Link } from "react-router-dom";

function MenuForage() {
  return (
    <div
      className=" d-sm-flex justify-content-start align-items-center d-lg-block c-menu-height col-12 col-lg-2 bg-light border-right border-bottom  p-1 p-lg-4 "
      // style={{ height: "100vh" }}
    >
      <h6 className="text-center ml-4 mb-0 mr-2">FORAGE</h6>

      <hr className="d-none d-lg-block my-2" />

      <div className="text-center m-1  ">
        <Link
          className=""
          style={{ textDecoration: "none" }}
          to={{ pathname: "/forage/add-forage" }}
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Nouveau Forage
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center m-1 text-sm">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/forage" }}
          className=""
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Liste Forage
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center m-1 text-sm">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/forage/ravitaillements-groupe" }}
          className=""
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Liste Ravtaillement Groupe
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
    </div>
  );
}

export default MenuForage;
