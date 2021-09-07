import React from "react";
import GraphQteCarburantPerVehiculePreviousMonth from "./components/GraphQteCarburantPerVehiculePreviousMonth";
import GraphTotalCarburantPreviousMonth from "./components/GraphTotalCarburantPreviousMonth";
import GraphTotalCarburantCurrentMonth from "./components/GraphTotalCarburantCurrentMonth";
import NombreAndTotalRajoutInCurrentMonth from "./components/NombreAndTotalRajoutInCurrentMonth";
import NombreAndTotalRajoutInPreviousMonth from "./components/NombreAndTotalRajoutInPreviousMonth";
import NombreAndTotalRavitaillementInCurrentMonth from "./components/NombreAndTotalRavitaillementInCurrentMonth;";
import NombreAndTotalRavitaillementInPreviousMonth from "./components/NombreAndTotalRavitaillementInPreviousMonth";
import QuantiteFuelAndNumberInCurrentMonthByVehicule from "./components/QuantiteFuelAndNumberInCurrentMonthByVehicule";
import QuantiteFuelAndNumberInPreviousMonthByVehicule from "./components/QuantiteFuelAndNumberInPreviousMonthByVehicule";
import GraphQteCarburantPerVehiculeCurrentMonth from "./components/GraphQteCarburantPerVehiculeCurrentMonth";
import QuantiteAndNumberRajoutByCuveInPreviousMonth from "./components/QuantiteAndNumberRajoutByCuveInPreviousMonth";
import QuantiteAndNumberRajoutByCuveInCurrentMonth from "./components/QuantiteAndNumberRajoutByCuveInCurrentMonth";
import RavitaillementByCuveInPreviousMonth from "./components/RavitaillementByCuveInPreviousMonth";
import RavitaillementByCuveInCurrentMonth from "./components/RavitaillementByCuveInCurrentMonth";
function Dashboard() {
  const current = new Date();
  const currentMonth = current
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  current.setMonth(current.getMonth() - 1);
  const previousMonth = current
    .toLocaleString("default", { month: "long" })
    .toUpperCase();

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="card mb-1 ">
            <div className="card-body">
              <h5 className="text-center">Consommations des Véhicules</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-warning">{previousMonth}</h5>
              <QuantiteFuelAndNumberInPreviousMonthByVehicule />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-success">{currentMonth}</h5>
              <QuantiteFuelAndNumberInCurrentMonthByVehicule />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-1 d-flex flex-coloumn flex-sm-row flex-sm-nowrap ">
        <div className="col">
          <NombreAndTotalRavitaillementInPreviousMonth />
        </div>
        <div className="col">
          <NombreAndTotalRavitaillementInCurrentMonth />
        </div>
      </div>
      {/* <div className="row d-flex justify-content-center">
        <div className="mt-4 col-sm-6  ">
          <div className="card mb-1 ">
            <div className=" h5 card-body text-center">
              Evolution Consommation
            </div>
            <GraphTotalCarburantCurrentMonth />
          </div>
        </div>
      </div> */}

      <div className="row">
        <div className="mt-3 col-sm-6 ">
          <div className="card mb-1">
            <div className=" card-body">
              <h5 className="text-center text-warning">{previousMonth}</h5>
              <h5 className="text-center ">Top véhicules Consommateurs</h5>
            </div>
            <GraphQteCarburantPerVehiculePreviousMonth />
          </div>
        </div>
        <div className="mt-3 col-sm-6 ">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-success">{currentMonth}</h5>
              <h5 className="text-center ">Top véhicules Consommateurs</h5>
            </div>
            <GraphQteCarburantPerVehiculeCurrentMonth />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card mt-5 mb-1 ">
            <div className="card-body">
              <h5 className="text-center">Ravitaillements des Cuves</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-warning">{previousMonth}</h5>
              <RavitaillementByCuveInPreviousMonth />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-success">{currentMonth}</h5>
              <RavitaillementByCuveInCurrentMonth />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card mt-5 mb-1 ">
            <div className="card-body">
              <h5 className="text-center">Approvisions des Cuves</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-warning">{previousMonth}</h5>
              <QuantiteAndNumberRajoutByCuveInPreviousMonth />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-1">
            <div className="card-body">
              <h5 className="text-center text-success">{currentMonth}</h5>
              <QuantiteAndNumberRajoutByCuveInCurrentMonth />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1 d-flex flex-coloumn flex-sm-row ">
        <div className="col">
          <NombreAndTotalRajoutInPreviousMonth />
        </div>
        <div className="col">
          <NombreAndTotalRajoutInCurrentMonth />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
