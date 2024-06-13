import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ActionManage from "../../components/admin/ActionManage";
import Header from "../../components/admin/Header";
import "../../styles/admin/Chart.scss";
import styled from "styled-components";
import { LineChart } from "../../components/admin/chart/LineChart";
import { PieDonut } from "../../components/admin/chart/PieDonut";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// eslint-disable-next-line react-refresh/only-export-components
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Doanh thu 6 thang gan nhat",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June"];
const myData1 = [200, 400, 300, 500, 100, 900];
const myData2 = [400, 200, 500, 300, 600, 100];
export const data = {
  labels,
  datasets: [
    {
      label: "Doanh thu từ nâng cấp gói",
      data: myData1,
      backgroundColor: "#FFC405",
    },
    {
      label: "Doanh thu từ download tài liệu",
      data: myData2,
      backgroundColor: "#6771DC",
    },
  ],
};
export default function Chart() {
  return (
    <Container>
      <ActionManage />
      <div className="manage-chart">
        <Header />
        <div className="session-chart">
          <div className="dflex">
            <div>
              <div className="dflex">
                <div className="total-user mr">
                  <div className="dflex-between">
                    Total User
                    <img src="/svg/chart/group-user.svg" alt="" />
                  </div>
                  <h1 style={{ margin: "10px" }}>7,458</h1>
                  <div className="dflex">
                    <img
                      style={{
                        verticalAlign: "middle",
                        width: 20,
                        height: 20,
                        marginRight: "5px",
                      }}
                      src="/svg/chart/increase.svg"
                      alt=""
                    />
                    <span
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "#5AB267",
                      }}
                    >
                      10.12%
                    </span>
                    <p style={{ margin: 0 }}>Since last week</p>
                  </div>
                </div>
                <div className="new-user">
                  <div className="dflex-between">
                    News Users
                    <img src="/svg/chart/user.svg" alt="" />
                  </div>
                  <h1 style={{ margin: "10px" }}>120</h1>
                  <div className="dflex">
                    <img
                      style={{
                        verticalAlign: "middle",
                        width: 20,
                        height: 20,
                        marginRight: "5px",
                      }}
                      src="/svg/chart/increase.svg"
                      alt=""
                    />
                    <span
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "#5AB267",
                      }}
                    >
                      14%
                    </span>
                    <p style={{ margin: 0 }}>Since last week</p>
                  </div>
                </div>
              </div>
              <div className="dflex">
                <div className="total-docs mr">
                  <div className="dflex-between">
                    Total Docs
                    <img src="/svg/chart/document.svg" alt="" />
                  </div>
                  <h1 style={{ margin: "10px" }}>12054</h1>
                  <div className="dflex">
                    <img
                      style={{
                        verticalAlign: "middle",
                        width: 20,
                        height: 20,
                        marginRight: "5px",
                      }}
                      src="/svg/chart/degrease.svg"
                      alt=""
                    />
                    <span
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "#5AB267",
                      }}
                    >
                      21%
                    </span>
                    <p style={{ margin: 0 }}>Since last week</p>
                  </div>
                </div>
                <div className="visitor">
                  <div className="dflex-between">
                    Visitors
                    <img src="/svg/chart/visitor.svg" alt="" />
                  </div>
                  <h1 style={{ margin: "10px" }}>2014</h1>
                  <div className="dflex">
                    <img
                      style={{
                        verticalAlign: "middle",
                        width: 20,
                        height: 20,
                        marginRight: "5px",
                      }}
                      src="/svg/chart/increase.svg"
                      alt=""
                    />
                    <span
                      style={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        color: "#5AB267",
                      }}
                    >
                      8%
                    </span>
                    <p style={{ margin: 0 }}>Since last week</p>
                  </div>
                </div>
              </div>
            </div>
            <Bar className="Bar" options={options} data={data} />
          </div>
          <div className="dflex" style={{ marginTop: 30 }}>
            <LineChart />
            <div className="info-pie-chart dflex">
              <PieDonut />
              <div className="content__pie-chart">
                <h4>Doanh thu thang truoc: 200,000d</h4>
                <p>
                  <span
                    className="donut"
                    style={{ border: "4px solid #FFC405" }}
                  ></span>
                  Tổng so tien nang goi
                </p>
                <p>
                  {" "}
                  <span
                    className="donut"
                    style={{ border: "4px solid #FF5668" }}
                  ></span>{" "}
                  Khoan tien mua documents
                </p>
                <p>
                  {" "}
                  <span
                    className="donut"
                    style={{ border: "4px solid #4D53E0" }}
                  ></span>{" "}
                  So chi cho user rut tien
                </p>
              </div>
            </div>
          </div>
          <div className="dflex-between" style={{ marginTop: 30 }}>
            <div style={{ width: "80%", borderRadius: "5px" }}>
              <p
                style={{
                  backgroundColor: "white",
                  margin: "0",
                  padding: "10px",
                  textAlign: "center",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  fontSize: "20px",
                  color: "#9B9B9B",
                }}
              >
                recently reported documents
              </p>
              <table className="table__rp-docs">
                <thead>
                  <tr style={{ backgroundColor: "orange", color: "white" }}>
                    <th>Name</th>
                    <th>Reason</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Block-chain và cách nó hoạt...</td>
                    <td>Su dung ngon tu chua phu hop</td>
                    <td>20/02/2024</td>
                  </tr>
                  <tr>
                    <td>Chinh tri xa hoi thu nho trong...</td>
                    <td>Noi dung vi pham den chinh tri dat...</td>
                    <td>20/02/2024</td>
                  </tr>
                  <tr>
                    <td>Block-chain và cách nó hoạt...</td>
                    <td>Su dung ngon tu chua phu hop</td>
                    <td>20/02/2024</td>
                  </tr>
                  <tr>
                    <td>Chinh tri xa hoi thu nho trong...</td>
                    <td>Noi dung vi pham den chinh tri dat...</td>
                    <td>20/02/2024</td>
                  </tr>
                  <tr>
                    <td>Block-chain và cách nó hoạt...</td>
                    <td>Su dung ngon tu chua phu hop</td>
                    <td>20/02/2024</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="violation">
              <div className="user_locked dflex">
                <img src="/svg/user_lock.svg" alt="" />
                <div>
                  <h3 style={{ margin: "0 20px" }}>
                    So nguoi bi khoa tai khoan
                  </h3>
                  <h1 style={{ margin: "0 20px" }}>45</h1>
                </div>
              </div>
              <div className="docs_locked dflex">
                <img src="/svg/docs_locked.svg" alt="" />
                <div>
                  <h3 style={{ margin: "0 20px" }}>So tai lieu vi pham</h3>
                  <h1 style={{ margin: "0 20px" }}>45</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #f4f5fa;
  display: flex;
  gap: 20px;
  width: 92vw;
`;
