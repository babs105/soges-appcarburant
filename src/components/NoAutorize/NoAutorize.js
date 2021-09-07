import React from "react";

function NoAutorize() {
  return (
    <>
      <div className="col">
        <div className="e-tabs mb-3 px-3 ">
          <ul className="nav nav-tabs">
            <li className="nav-item ">
              <a className="nav-link active " data-target="#users">
                Utilisateurs
              </a>
            </li>
            {/* <li className="nav-item">
      <a className="nav-link active" data-target="#commandes">
        Commande
      </a>
    </li> */}
          </ul>
        </div>
        <div className="e-panel card  h-75">
          <div className="card-body">
            <div className="card-title">
              <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <div className="display-4"> 405 - Not Allowed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoAutorize;
