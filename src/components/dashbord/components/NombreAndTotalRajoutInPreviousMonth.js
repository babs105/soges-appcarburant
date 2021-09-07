import React, { useContext } from "react";
import { DashbordContext } from "../../../context/DashbordContext";

function NombreAndTotalRajoutInPreviousMonth() {
  const { numberRajoutAndTotalQtePreviousMonth } = useContext(DashbordContext);

  return (
    <div className="row">
      <div className="col">
        {" "}
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <h6 className="text-center">
                <span className="text-muted text-warning">
                  Nombre d'approvision Cuve
                </span>
              </h6>
              {numberRajoutAndTotalQtePreviousMonth.map((data) => (
                <h1 className="text-center" key={data.totalNumberRajout}>
                  {data.totalNumberRajout}
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <h6 className="text-center">
                <span className="text-muted text-warning">
                  Quantité Totale Approvision
                </span>
              </h6>
              {numberRajoutAndTotalQtePreviousMonth.map((data) => (
                <h1 className="text-center" key={data.totalQteRajout}>
                  {data.totalQteRajout} L
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NombreAndTotalRajoutInPreviousMonth;
