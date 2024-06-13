import styled from "styled-components";
import ActionManage from "../../components/admin/ActionManage";
import Header from "../../components/admin/Header";
import Sesion from "../../components/admin/Sesion";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/formatDate";

const Payment = () => {
  const authUser = useSelector((state) => state.user.user);
  const [transactionsWithdraw, setTransactionsWithdraw] = useState([]);
  console.log("transaction", transactionsWithdraw);
  useEffect(() => {
    const fetchTransactionWithdraw = async () => {
      await axios.get(`${server}/payment/transactions`).then((res) => {
        console.log("log", res.data);
        setTransactionsWithdraw(res.data);
      });
    };
    if (authUser) {
      fetchTransactionWithdraw();
    }
  }, [authUser]);
  return (
    <>
      <Container>
        <ActionManage />
        <div className="withdraw-request">
          <Header />
          <Sesion />
          <div
            style={{
              backgroundColor: "#666e80",
              width: "230px",
              color: "white",
              margin: "40px 0",
              padding: 6,
              fontWeight: 600,
            }}
          >
            Yêu cầu rút tiền từ người dùng
          </div>
          <table className="request-payment">
            <tbody>
              <tr>
                <th>Tên người dùng</th>
                <th>Số tiền</th>
                <th>Ngày thực hiện</th>
                <th>Action</th>
              </tr>
              {transactionsWithdraw &&
                transactionsWithdraw.map((trans, index) => {
                  return (
                    <tr key={index}>
                      <td>{trans.nameUser}</td>
                      <td style={{ color: "orange", fontWeight: 600 }}>
                        {trans.amount}đ
                      </td>
                      <td className="date-paid">
                        {formatDate(trans.createdAt)}
                      </td>
                      <td
                        style={{
                          color: "green",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        Duyệt
                      </td>
                    </tr>
                  );
                })}
              {/* <tr>
                <td>Hồ Nhật Tân</td>
                <td style={{ color: "orange", fontWeight: 600 }}>56000đ</td>
                <td className="date-paid">11/02/2024</td>
                <td
                  style={{ color: "green", fontWeight: 600, cursor: "pointer" }}
                >
                  Duyệt
                </td>
              </tr>
              <tr>
                <td>Hồ Nhật Tân</td>
                <td style={{ color: "orange", fontWeight: 600 }}>56000đ</td>
                <td className="date-paid">11/02/2024</td>
                <td
                  style={{ color: "green", fontWeight: 600, cursor: "pointer" }}
                >
                  Duyệt
                </td>
              </tr>
              <tr>
                <td>Hồ Nhật Tân</td>
                <td style={{ color: "orange", fontWeight: 600 }}>56000đ</td>
                <td className="date-paid">11/02/2024</td>
                <td
                  style={{ color: "green", fontWeight: 600, cursor: "pointer" }}
                >
                  Duyệt
                </td>
              </tr>
              <tr>
                <td>Hồ Nhật Tân</td>
                <td style={{ color: "orange", fontWeight: 600 }}>56000đ</td>
                <td className="date-paid">11/02/2024</td>
                <td
                  style={{ color: "green", fontWeight: 600, cursor: "pointer" }}
                >
                  Duyệt
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Payment;
const Container = styled.div`
  background-color: #f8f7fa;
  display: flex;
  gap: 20px;
  width: 100vw;
  height:100vh;
  .withdraw-request {
    margin-left: 170px;
    width: 77.9%;

    .request-payment{
      margin: 20px auto;
      width: 100%;
      background-color: white;
    }
  }
  
  }
`;
