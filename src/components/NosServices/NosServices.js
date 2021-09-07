import React from "react";
import { NavLink } from "react-router-dom";

function NosServices() {
  return (
    <section className="section  border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="main-heading">NOS SERVICES</h3>
            <div className="underline mx-auto"></div>
          </div>
          <div className="col-md-4 ">
            <div className="card shadow">
              <img
                src={"/images/repartition.jpg"}
                className="w-100 border-bottom"
                alt="..."
              />
              <div className="card-body text-center">
                <h6 className="">REPARTITION</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card shadow">
              <img
                src={"/images/Patrouille.jpg"}
                className="w-100 img-fluid  border-bottom"
                alt="..."
              />
              <div className="card-body text-center">
                <h6>PATROUILLE</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card shadow">
              <img
                src={"/images/remorque.jpg"}
                className="w-100 img-fluid border-bottom"
                alt="..."
              />
              <div className="card-body text-center">
                <h6>REMORQUE</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <NavLink className="nav-link" to="/service">
              <button className="btn btn-success  "> Voir Plus</button>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NosServices;
