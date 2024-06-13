import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Thống kê tăng trưởng người dùng",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const myData1 = [200, 400, 300, 500, 100, 200, 900];
const myData2 = [400, 200, 500, 300, 600, 300, 100];
export const data = {
  labels,
  datasets: [
    {
      label: "người đăng ký mới",
      data: myData1,
      borderColor: "#FF9900",
      backgroundColor: "#FF9900",
    },
    {
      label: "người nâng cấp gói ",
      data: myData2,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} className="Line" />;
}
