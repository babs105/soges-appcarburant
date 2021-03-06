import React from "react";
import { Link } from "react-router-dom";

function MenuUsers({ reset, setIsEditUser }) {
  return (
    <div
      className="c-height d-sm-flex justify-content-start align-items-center d-lg-block w-50  col-12 col-lg-2 bg-c-light border-right border-bottom  p-1 p-lg-4 "
      // style={{ height: "100vh" }}
    >
      <h6 className="text-center ml-4 mb-0 mr-2">Utilisateurs</h6>

      <hr className="d-none d-lg-block my-2" />

      <div className="text-center m-1  ">
        <Link
          className=""
          style={{ textDecoration: "none" }}
          //   to={{ pathname: "/station/add-station" }}
        >
          <button
            className="btn  btn-sm btn-outline-success btn-block  shadow-none"
            type="button"
            data-toggle="modal"
            data-target="#user-form-modal"
            onClick={() => {
              reset();
              // setUser({});
              setIsEditUser(false);
            }}
          >
            Nouveau Utilisateur
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      <div className="text-center  m-1">
        <Link
          style={{ textDecoration: "none" }}
          to={{ pathname: "/users" }}
          className=""
        >
          <button className="btn  btn-sm btn-outline-success btn-block shadow-none">
            Liste Utilisateurs
          </button>
        </Link>
      </div>
      <hr className="d-none d-lg-block my-2" />
      {/* <div className="text-center text-sm">
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
      <hr className="my-3" /> */}
    </div>
  );
}

export default MenuUsers;
