import React, { useContext } from "react";
import { DashbordContext } from "../../../context/DashbordContext";
import { TableListContext } from "../../../context/TableListContext";

function QuantiteFuelAndNumberInPreviousMonthByVehicule() {
  const { ravitaillementVehiculePreviousMonth } = useContext(DashbordContext);
  const { logging } = useContext(TableListContext);
  let i = 0;
  return (
    <div className="e-panel card">
      <div className="card-body">
        <div className="card-title">
          <span className="text-muted  text-warning">
            Quantité Ravitaillée - Nombre de ravitaillement par Véhicule
          </span>
        </div>
        <div className="e-table">
          <div className="table-responsive table-lg mt-3">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Matricule</th>
                  <th>Quantité Totale</th>
                  <th>Nombre Ravitaillement</th>
                </tr>
              </thead>
              <tbody>
                {logging ? (
                  <tr className="">
                    <td className="text-center" colSpan="6">
                      <div className=" spinner-border text-success "></div>
                      <span className="sr-only">Loading...</span>
                    </td>
                  </tr>
                ) : (
                  ravitaillementVehiculePreviousMonth.map((data) => (
                    <tr key={i++}>
                      <td className="text-nowrap align-middle">
                        {data.immatricule}
                      </td>
                      <td className="text-nowrap align-middle">
                        {data.totalQteRavitaillement}
                      </td>
                      <td className="text-nowrap align-middle">
                        {data.nombreRavitaillement}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuantiteFuelAndNumberInPreviousMonthByVehicule;
