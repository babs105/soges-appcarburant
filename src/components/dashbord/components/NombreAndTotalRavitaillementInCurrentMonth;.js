import React, { useContext } from "react";
import { DashbordContext } from "../../../context/DashbordContext";

function NombreAndTotalRavitaillementInCurrentMonth() {
  const { totalRavitaillementCurrentMonth } = useContext(DashbordContext);

  let i = 0;
  return (
    <div className="row">
      <div className="col">
        {" "}
        <div className="e-panel card">
          <div className="card-body">
            <div className="card-title">
              <h6 className="text-center">
                <span className="text-muted text-success">
                  Nombre de ravitaillement
                </span>
              </h6>
              {totalRavitaillementCurrentMonth.map((data) => (
                <h1 className="text-center" key={data.totalVehiculeRavitaille}>
                  {data.totalVehiculeRavitaille}
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
                  Quantité Totale Ravitaillée
                </span>
              </h6>
              {totalRavitaillementCurrentMonth.map((data) => (
                <h1 className="text-center" key={data.totalRavitaillement}>
                  {data.totalRavitaillement} L
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NombreAndTotalRavitaillementInCurrentMonth;
