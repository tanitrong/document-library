import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 23],
      backgroundColor: ["#FFC405", "#FF5668", "#4D53E0"],
      borderColor: ["white", "white", "white"],
      borderWidth: 3,
      borderRadius: 5,
    },
  ],
};

export function PieDonut() {
  return <Doughnut data={data} className="PieDonut" />;
}
