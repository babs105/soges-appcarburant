import React, { useContext, useEffect } from "react";
import { dashboardService } from "../../../service/dashboardService";
import { Bar } from "react-chartjs-2";
//import { DashbordContext } from "../../../context/DashbordContext";

function GraphQteCarburantPerVehiculeCurrentMonth(props) {
  //  const { ravitaillementVehiculeCurrentMonth } = useContext(DashbordContext);

  const [chartData, setChartData] = React.useState({});
  const [immatricule, setImmatricule] = React.useState([]);
  const [totalQteRavitaillement, setTotalQteRavitaillement] = React.useState(
    []
  );

  function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const Chart = () => {
    let immatriculeTab = [];
    let totalQteRavitaillementTab = [];
    let backgroundColorTab = [];
    dashboardService
      .getRavitaillementByVehiculeInCurrentMonth()
      .then((res) => {
        for (const dataObj of res) {
          immatriculeTab.push(dataObj.immatricule);
          totalQteRavitaillementTab.push(
            parseInt(dataObj.totalQteRavitaillement)
          );
        }

        for (var i = 0; i < immatriculeTab.length; i++) {
          backgroundColorTab.push(generateRandomColor());
        }
        setChartData({
          labels: immatriculeTab,
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
      .catch((err) => {
        console.log(err);
      });
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

export default GraphQteCarburantPerVehiculeCurrentMonth;
