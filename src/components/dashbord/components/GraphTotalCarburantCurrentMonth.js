import { get } from "jquery";
import React, { useContext, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import { dashboardService } from "../../../service/dashboardService";
//import { DashbordContext } from "../../../context/DashbordContext";

function GraphTotalCarburantCurrentMonth(props) {
  const current = new Date();
  const currentMonth = current
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  current.setMonth(current.getMonth() - 1);
  const previousMonth = current
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const [chartData, setChartData] = React.useState({});

  function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  let monthTab = [previousMonth, currentMonth];
  let totalQteRavitaillementTab = [];
  let backgroundColorTab = [];

  const getRavitaillementPreviousMonth = () => {
    dashboardService
      .getTotalRavitaillementAndVehiculeInPreviousMonth()
      .then((res) => {
        console.log("total Conso juin", res);
        for (const dataObj of res) {
          totalQteRavitaillementTab.push(parseInt(dataObj.totalRavitaillement));
        }

        console.log("data Conso juin", totalQteRavitaillementTab);
      })
      .catch((err) => console.log(err));
  };
  const getRavitaillementCurrentMonth = () => {
    dashboardService
      .getTotalRavitaillementAndVehiculeInCurrentMonth()
      .then((res) => {
        console.log("total Conso juillet", res);
        for (const dataObj of res) {
          totalQteRavitaillementTab.push(parseInt(dataObj.totalRavitaillement));
        }
        console.log("data Conso juillet", totalQteRavitaillementTab);
        for (var i = 0; i < monthTab.length; i++) {
          backgroundColorTab.push(generateRandomColor());
        }
        setChartData({
          labels: monthTab,
          datasets: [
            {
              label: "Volume Consommé",
              data: totalQteRavitaillementTab,
              backgroundColor: backgroundColorTab,
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => console.log(err));
  };
  const Chart = () => {
    getRavitaillementPreviousMonth();
    getRavitaillementCurrentMonth();
  };
  useEffect(() => {
    Chart();
  }, []);

  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        title: {
          text: "CONSOMMATION PAR VEHICULE",
          display: true,
        },
        scales: {
          yAxes: {
            ticks: {
              beginAtZero: true,
            },
          },
        },
      }}
    />
  );
}

export default GraphTotalCarburantCurrentMonth;
