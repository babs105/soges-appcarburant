import React from "react";
import { NavLink } from "react-router-dom";

function Slider() {
  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner ">
        <div class="carousel-item active">
          {/* <div className="d-flex flex-column justify-content-center align-items-center "> */}
          <img
            src={"/images/banniereAO.jpg"}
            className="img-fluid d-block w-100"
            alt="..."
          />
          <div class="carousel-caption ">
            <h1 className="text-primary">
              Gestion <span className="text-success">Carburant</span>
            </h1>

            <h1 className="text-primary">SOGES</h1>
            <NavLink to="/login">
              <button className="btn btn-warning btn-lg">
                Démarrer maintenant
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
