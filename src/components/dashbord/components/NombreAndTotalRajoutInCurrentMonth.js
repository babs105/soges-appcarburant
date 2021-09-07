import React, { useContext } from "react";
import { DashbordContext } from "../../../context/DashbordContext";

function NombreAndTotalRajoutInCurrentMonth() {
  const { numberRajoutAndTotalQteCurrentMonth } = useContext(DashbordContext);

  return (
    <div className="row">
      <div className="col">
        {" "}
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <h6 className="text-center  text-success">
                <span className="text-muted">Nombre d'approvision Cuve</span>
              </h6>
              {numberRajoutAndTotalQteCurrentMonth.map((data) => (
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
                <span className="text-muted text-success">
                  Quantité Totale Approvision
                </span>
              </h6>
              {numberRajoutAndTotalQteCurrentMonth.map((data) => (
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

export default NombreAndTotalRajoutInCurrentMonth;
