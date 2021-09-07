import React, { useContext, useEffect } from "react";
import {
  BarSeries,
  ChartProvider,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "rough-charts";
import { DashbordContext } from "../../../context/DashbordContext";

function GraphTotalCarburantPreviousMonth(props) {
  const current = new Date();
  current.setMonth(current.getMonth() - 1);
  const previousMonth = current
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const { totalRavitaillementPreviousMonth, totalRavitaillementCurrentMonth } =
    useContext(DashbordContext);
  const data = [
    {
      name: previousMonth,
      ...totalRavitaillementPreviousMonth[0],
    },

    // {
    //   name: "Total Mois Cours",
    //   ...totalRavitaillementCurrentMonth[0],
    // },
  ];
  // useEffect(() => {
  //   console.log("test", totalRavitaillementPreviousMonth);
  console.log(data);
  // }, []);

  const [activeIndex, setIndex] = React.useState(-1);
  function generateRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    // console.log("cccooc", data),

    <ChartProvider data={data} height={300} {...props}>
      <YAxis fontSize={12} tickCount={10} tickSize={5} />
      <XAxis dataKey="name" fontSize={12} tickCount={5} tickSize={5} />
      <BarSeries
        dataKey="totalRavitaillement"
        options={{
          fill: generateRandomColor(),
        }}
      />

      {/* <BarSeries
        dataKey="totalVehiculeRavitaille"
        options={{
          fill: generateRandomColor(),
        }}
      /> */}

      <Tooltip fontSize={12} height={40} />
    </ChartProvider>
  );
}

export default GraphTotalCarburantPreviousMonth;
