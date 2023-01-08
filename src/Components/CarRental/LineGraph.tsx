import {
  Chart as ChartJS,
  CategoryScale,
  ChartDatasetProperties,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  Point,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = ({ prices }: { prices: number[] }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  const options = {
    tension: 0.4,
    title: {
      display: true,
      text: "linechart",
    },
    scales: {
      y: [
        {
          display: true,
          stacked: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            min: 0,
            max: 100,
          },
        },
      ],
    },
  };
  return (
    <Line
      data={{
        datasets: prices as unknown as ChartDatasetProperties<
          "line",
          number | Point | null
        >[],
      }}
      //   options={options}
    />
  );
};

export default LineGraph;
