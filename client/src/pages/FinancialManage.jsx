import Header from "../components/Header";
import Footer from "../components/Footer";
import { Doughnut } from "react-chartjs-2";
import "../styles/FinancialManage.scss";
import SessionAnalytic from "../components/profile/SessionAnalytic";
import ActionManage from "../components/profile/ActionManage";
import { useEffect, useState } from "react";
import { BANK } from "../../data/bank";
import axios from "axios";
import { server } from "../server";
import { useSelector } from "react-redux";
import { formatDate } from "../utils/formatDate";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import Store from "../redux/store";
import { loadUser } from "../redux/actions/user";
import { API_GET_PAID, API_KEY, MY_BANK } from "../../data/payment";
import { useNavigate } from "react-router-dom";
const FinancialManage = () => {
  // const [methodPaid, setMethodPaid] = useState("QRcode");
  const navigate = useNavigate();
  const [history, setHistory] = useState("service");
  const authUser = useSelector((state) => state.user.user);
  const [transactions, setTransactions] = useState(null);
  const [isWithDraw, setIsWithDraw] = useState(false);
  const [amountWithdraw, setAmountWithdraw] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [transactionsWithdraw, setTransactionsWithdraw] = useState([]);
  const [isOpenRecharge, setIsOpenRecharge] = useState(false);
  const [isOpenQR, setIsOpenQR] = useState(false);
  //deposits session
  let [tranferContent, setTranferContent] = useState("");
  const [countdown, setCountdown] = useState(600);
  const [deposits, setDeposits] = useState(0);
  const [depositsSuccess, setDepositsSuccess] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [qr, setQr] = useState("");
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  //handle deposit
  const handleDeposits = () => {
    setIsOpenRecharge(false);
    setIsOpenQR(true);
    const generateToken = Math.random().toString(36).substring(2, 8);
    setTranferContent(`DTDOC${generateToken}`);
    setQr(
      `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${
        MY_BANK.ACCOUNT_NO
      }-qr_only.png?amount=${deposits}&addInfo=${`DTDOC${generateToken}`}&accountName=${
        MY_BANK.ACCOUNT_NAME
      }`
    );
  };
  useEffect(() => {
    let timer = null;
    if (isOpenQR && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            setIsFinal(true);
            clearInterval(timer);
            return 0;
          }
          if (depositsSuccess) {
            clearInterval(timer);
            return 0;
          }
          checkPaid();
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOpenQR, countdown, depositsSuccess]);
  //checkPaid
  const checkPaid = async () => {
    try {
      const response = await fetch(API_GET_PAID, {
        headers: {
          Authorization: `apikey ${API_KEY}`,
        },
      });
      const data = await response.json();
      const lastPaid = data.data.records[data.data.records.length - 1];
      const lastPrice = lastPaid.amount == deposits;
      const lastContent = lastPaid.description.includes(tranferContent);
      console.table(lastPaid);
      console.log("lastPrice", lastPaid.amount, deposits);
      console.log("lastContent", lastPaid.description, tranferContent);
      if (lastPrice && lastContent) {
        setDepositsSuccess(true);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  //handle when paidSuccess
  useEffect(() => {
    if (depositsSuccess) {
      setIsOpenQR(false);
      const updateDepositsForUser = async () => {
        const paidContent = "Nạp Tiền";

        await axios.post(`${server}/payment/deposits/${authUser?._id}`, {
          amount: deposits,
          paidContent,
          paymentMedthod: "QRcode",
        });
      };
      updateDepositsForUser();
    }
  }, [deposits, authUser?._id, depositsSuccess]);

  //get initial withdraw state
  const getInitialWithdraw = () => {
    const storedWithdraw = localStorage.getItem("withdrawInfo");
    return storedWithdraw
      ? JSON.parse(storedWithdraw)
      : { nameBank: "", nameUser: "", accountNo: "" };
  };
  const [withdraw, setWithdraw] = useState(getInitialWithdraw());

  useEffect(() => {
    Store.dispatch(loadUser());
  }, [balance]);

  //get withdraw state from local storage
  useEffect(() => {
    localStorage.setItem("withdrawInfo", JSON.stringify(withdraw));
  }, [withdraw]);
  const bankUrl = withdraw
    ? BANK.find((bank) => bank.name === withdraw.nameBank)?.url
    : "";

  //get transactions from API
  useEffect(() => {
    const getTransactions = async () => {
      if (authUser) {
        await axios.get(`${server}/payment/${authUser?._id}`).then((res) => {
          setTransactions(res.data.result);
        });
      }
    };
    getTransactions();
  }, [authUser]);

  //handle with draw
  const handleWithdraw = async () => {
    await axios
      .post(`${server}/payment/withdraw/${authUser._id}`, {
        userId: authUser._id,
        nameBank: withdraw.nameBank,
        accountNo: withdraw.accountNo,
        amount: amountWithdraw,
        nameUser: authUser.name,
      })
      .then((res) => {
        toast.success(res.data.message);
        setBalance(res.data.balance);
        setIsWithDraw(false);
      })
      .catch((err) => {
        toast.error(err.response?.data.message);
      });
  };
  //handle fetch transaction with draw
  useEffect(() => {
    const fetchTransactionWithdraw = async () => {
      await axios
        .get(`${server}/payment/withdraw/${authUser?._id}`)
        .then((res) => {
          console.log("log", res.data);
          setTransactionsWithdraw(res.data);
        });
    };
    if (authUser) {
      fetchTransactionWithdraw();
    }
  }, [authUser, balance]);

  return (
    <>
      <div>
        <Header />
        <div className="dflex" style={{ marginTop: "40px" }}>
          <ActionManage avatar={authUser?.avatar} />
          <div className="container_qltc">
            <SessionAnalytic />
            <div className="info_account ">
              <div className="info">
                <div className="info_stk">
                  <div className="ttsd">
                    Thông tin số dư tài khoản
                    <button
                      type="button"
                      onClick={() => setIsOpenRecharge(true)}
                    >
                      Nạp tiền
                    </button>
                  </div>
                  <div className="sodu">{authUser?.balance}đ</div>
                </div>
                <div className="sdgoi">
                  <div className="goitl" style={{ margin: "20px 0" }}>
                    Gói tải tài liệu: <span>0d</span>{" "}
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#00cc66",
                        color: "white",
                        border: "#00cc66",
                      }}
                      onClick={() => {
                        navigate("/upgrade");
                      }}
                    >
                      Đăng ký
                    </button>
                  </div>
                  <div className="sdgmd" style={{ marginBottom: 20 }}>
                    Bạn đang sử dụng gói:{" "}
                    <span style={{ textTransform: "uppercase" }}>
                      {transactions ? transactions?.plan : "default"}
                    </span>
                  </div>
                  <div className="gioihan" style={{ marginBottom: 20 }}>
                    Giới hạn tải tài liệu: <span>Các tài liệu 0đ</span>
                  </div>
                </div>
              </div>
              <div className="graph_info">
                <div className="graph">
                  <Doughnut
                    data={{
                      labels: [
                        `${transactions ? transactions?.totalAmount : 0}đ`,
                        "7000đ",
                        "5000đ",
                      ],
                      datasets: [
                        {
                          label: "",
                          data: [
                            transactions ? transactions?.totalAmount : 0,
                            28000,
                            12000,
                          ],
                          backgroundColor: [
                            "rgb(0, 204, 102)",
                            "rgb(54, 162, 235)",
                            "rgb(255, 205, 86)",
                          ],
                          hoverOffset: 4,
                        },
                      ],
                    }}
                  />
                </div>

                <div className="doanhthu_graph">
                  <div className="dt1_gr">
                    {" "}
                    <div
                      className="donut"
                      style={{ border: "4px solid #00CC66" }}
                    ></div>
                    <span>Tổng số tiền nạp </span>
                  </div>
                  <div className="dt1_gr">
                    {" "}
                    <div
                      className="donut"
                      style={{ border: "4px solid #551FFF" }}
                    ></div>
                    <span>Khoản tiền đã dùng </span>
                  </div>
                  <div className="dt1_gr">
                    <div
                      className="donut"
                      style={{ border: "4px solid #FF9900" }}
                    ></div>
                    <span>Doanh thu từ tài liệu của bạn </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="information_banking">
              <div className="banking_info">
                <div className="tt_atm">Cấu hình rút tiền</div>
                <div className="banking_top">
                  <div className="info_atm">
                    {/* <div className="setup_atm">
                    <div className="momo_atm">
                      <div
                        className="donut"
                        style={{
                          border:
                            methodPaid == "QRcode"
                              ? "7px solid #551FFF"
                              : "2px solid #551FFF",
                        }}
                        onClick={() => setMethodPaid("QRcode")}
                      ></div>
                      <span>QRcode</span>
                    </div>
                    <div className="vnpay_atm">
                      <div
                        className="donut"
                        style={{
                          border:
                            methodPaid == "VNpay"
                              ? "7px solid #551FFF"
                              : "2px solid #551FFF",
                        }}
                        onClick={() => setMethodPaid("VNpay")}
                      ></div>
                      <span>VnPay</span>
                    </div>
                  </div> */}
                    <div className="form_input">
                      <form>
                        <label style={{ color: "#5E5E5E" }}>
                          Tên bank <br />
                          <select
                            className="name_bank"
                            value={withdraw.nameBank}
                            style={{ display: "block", width: "100%" }}
                            onChange={(e) =>
                              setWithdraw({
                                ...withdraw,
                                nameBank: e.target.value,
                              })
                            }
                          >
                            <option value="">Chọn ngân hàng</option>
                            <option value="TPBANK">TPBANK</option>
                            <option value="AGRIBANK">AGRIBANK</option>
                            <option value="TECHCOMBANK">TECHCOMBANK</option>
                            <option value="BIDV">BIDV</option>
                            <option value="VIETINBANK">VIETINBANK</option>
                            <option value="VIETCOMBANK">VIETCOMBANK</option>
                            <option value="VPBANK">VPBANK</option>
                            <option value="ACB">ACB</option>
                            <option value="SACOMBANK">SACOMBANK</option>
                            <option value="MB">MB</option>
                          </select>
                        </label>
                        <label style={{ color: "#5E5E5E" }}>
                          Số thẻ <br />
                          <input
                            type="text"
                            placeholder="1234 5678 9875 5432"
                            value={withdraw.accountNo}
                            onChange={(e) =>
                              setWithdraw({
                                ...withdraw,
                                accountNo: e.target.value,
                              })
                            }
                          />
                        </label>
                        <br />
                        <label style={{ color: "#5E5E5E" }}>
                          Tên chủ thẻ <br />
                          <input
                            type="text"
                            placeholder="TEN CHU THE"
                            value={withdraw.nameUser}
                            onChange={(e) =>
                              setWithdraw({
                                ...withdraw,
                                nameUser: e.target.value,
                              })
                            }
                          />
                        </label>
                      </form>
                    </div>
                  </div>
                  <div className="card_atm">
                    <div className="dflex-between" style={{ marginBottom: 50 }}>
                      <img src="/svg/card-payment/icon1.svg" alt="" />
                      <img src="/svg/card-payment/icon2.svg" alt="" />
                    </div>
                    <div className="dflex-between">
                      <div>
                        <h3>
                          {withdraw.accountNo
                            ? withdraw.accountNo
                            : "1234 567 8912"}
                        </h3>
                        <h3>
                          {withdraw.nameUser
                            ? withdraw.nameUser
                            : "NGUYEN VAN A"}
                        </h3>
                      </div>

                      <img
                        style={{
                          width: bankUrl ? "130px" : "40px",
                          objectFit: "contain",
                          marginTop: "30px",
                        }}
                        src={bankUrl ? bankUrl : "/png/bank.png"}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="btn_submit">
                  <div className="save_btn">
                    <button type="button" onClick={() => setIsWithDraw(true)}>
                      Rút tiền
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="fluctuations">
              <div className="biendongsodu">
                <div className="title_hd">Lịch sử biến động số dư</div>
                <div className="option">
                  <label htmlFor="cars">Loại</label>
                  <button
                    type="button"
                    onClick={() => setHistory("service")}
                    style={{
                      backgroundColor: history === "service" ? "#69b3fe" : "",
                      color: history === "service" ? "white" : "",
                    }}
                  >
                    Dịch vụ
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor:
                        history === "revenueDocs" ? "#69b3fe" : "",
                      color: history === "revenueDocs" ? "white" : "",
                    }}
                    onClick={() => setHistory("revenueDocs")}
                  >
                    Doanh thu tài liệu
                  </button>
                  <button
                    type="button"
                    style={{
                      backgroundColor:
                        history === "historyWithdraw" ? "#69b3fe" : "",
                      color: history === "historyWithdraw" ? "white" : "",
                    }}
                    onClick={() => setHistory("historyWithdraw")}
                  >
                    Lịch sử rút tiền
                  </button>
                </div>
                <div className="table_bd">
                  {history === "service" && (
                    <table>
                      <tbody>
                        <tr>
                          <th>Dịch vụ</th>
                          <th>Số tiền</th>
                          <th>Ngày thực hiện</th>
                          <th>Trạng thái</th>
                        </tr>
                        {transactions
                          ? transactions.transactions.map((tran, index) => {
                              return (
                                <tr key={index}>
                                  <td>{tran.paidContent}</td>
                                  <td className="balance">{tran.amount}đ</td>
                                  <td className="date-paid">
                                    {formatDate(tran.createdAt)}
                                  </td>
                                  <td>Thành công</td>
                                </tr>
                              );
                            })
                          : ""}
                      </tbody>
                    </table>
                  )}
                  {history === "revenueDocs" && (
                    <table>
                      <tbody>
                        <tr>
                          <th>Tên tài liệu</th>
                          <th>Số tiền</th>
                          <th>Ngày nhận</th>
                        </tr>
                        <tr>
                          <td>Blockchain kết nối ứng dụng trong....</td>
                          <td className="balance">+2000đ</td>
                          <td className="date-paid">11/02/2024</td>
                        </tr>
                        <tr>
                          <td>Kinh tế thế giới những năm chiến....</td>
                          <td className="balance">+6000đ</td>
                          <td className="date-paid">15/02/2024</td>
                        </tr>
                        <tr>
                          <td>Blockchain kết nối ứng dụng trong....</td>
                          <td className="balance">+10000đ</td>
                          <td className="date-paid">17/02/2024</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  {history === "historyWithdraw" && (
                    <table>
                      <tbody>
                        <tr>
                          <th>Số tiền rút</th>
                          <th>Ngày thực hiện</th>
                          <th>Trạng thái</th>
                        </tr>
                        {transactionsWithdraw?.map((transaction, index) => {
                          return (
                            <tr key={index}>
                              <td className="balance">{`${transaction.amount}đ`}</td>
                              <td className="date-paid">
                                {formatDate(transaction.createdAt)}
                              </td>
                              <td>
                                <span
                                  style={{
                                    backgroundColor: "#0a1d56",
                                    padding: "5px 10px",
                                    color: "white",
                                    borderRadius: "3px",
                                  }}
                                >
                                  {transaction.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="list_btn">
                  <button type="button">Previous</button>
                  <button type="button">1</button>
                  <button type="button">2</button>
                  <button type="button">3</button>
                  <button type="button">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {isWithDraw && (
        <div className="with-draw">
          <div className="info-with-draw">
            <div className="dflex-between">
              <h3 style={{ margin: "0px", lineHeight: "34px" }}>
                Xác nhận rút tiền
              </h3>
              <IoCloseOutline
                onClick={() => setIsWithDraw(false)}
                style={{
                  color: "black",
                  fontSize: "34px",
                  cursor: "pointer",
                  verticalAlign: "middle",
                }}
              />
            </div>
            <div
              style={{ borderBottom: "1px solid #ccc" }}
              className="dflex-between"
            >
              <p>Tên chủ thẻ</p>
              <p>{withdraw.nameUser}</p>
            </div>
            <div
              style={{ borderBottom: "1px solid #ccc" }}
              className="dflex-between"
            >
              <p>Tên ngân hàng</p>
              <p>{withdraw.nameBank}</p>
            </div>
            <div
              style={{ borderBottom: "1px solid #ccc" }}
              className="dflex-between"
            >
              <p>Số tài khoản</p>
              <p>{withdraw.accountNo}</p>
            </div>
            <div
              style={{ borderBottom: "1px solid #ccc" }}
              className="dflex-between"
            >
              <p>Số tiền</p>
              <input
                placeholder="Nhập số tiền muốn rút"
                type="text"
                value={amountWithdraw}
                style={{
                  border: "none",
                  textAlign: "right",
                  fontSize: "16px",
                  color: "#0a1d56",
                }}
                onChange={(e) => setAmountWithdraw(e.target.value)}
              />
            </div>
            <small
              style={{
                display: "block",
                margin: "20px 0",
                color: "#ff9900",
                fontWeight: "600",
              }}
            >
              Lưu ý: số tiền rút tối thiểu là 50 000đ
            </small>
            <div className="dflex-between" style={{ marginTop: "20px" }}>
              <button
                onClick={() => setIsWithDraw(false)}
                style={{
                  cursor: "pointer",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  border: "none",
                  backgroundColor: "#ccc",
                  width: "20%",
                }}
              >
                Hủy
              </button>
              <button
                style={{
                  color: "white",
                  cursor: "pointer",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  border: "none",
                  backgroundColor: "#0a1d56",
                  width: "70%",
                }}
                onClick={() => handleWithdraw()}
              >
                Rút tiền
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenRecharge && (
        <div className="deposits">
          <div className="info-deposits">
            <div className="dflex-between">
              <h3 style={{ margin: "0px", lineHeight: "34px" }}>
                Nhập số tiền cần nạp
              </h3>
              <IoCloseOutline
                onClick={() => setIsOpenRecharge(false)}
                style={{
                  color: "black",
                  fontSize: "34px",
                  cursor: "pointer",
                  verticalAlign: "middle",
                }}
              />
            </div>

            <div
              style={{ borderBottom: "1px solid #ccc" }}
              className="dflex-between"
            >
              <p>Số tiền</p>
              <input
                placeholder="Nhập số tiền muốn nạp"
                type="text"
                value={deposits}
                style={{
                  border: "none",
                  textAlign: "right",
                  fontSize: "16px",
                  color: "#0a1d56",
                }}
                onChange={(e) => setDeposits(e.target.value)}
              />
            </div>
            <small
              style={{
                display: "block",
                margin: "20px 0",
                color: "#ff9900",
                fontWeight: "600",
              }}
            >
              Lưu ý: số tiền nạp tối thiểu là 30 000đ
            </small>
            <div className="dflex-between" style={{ marginTop: "20px" }}>
              <button
                style={{
                  color: "white",
                  cursor: "pointer",
                  padding: "10px 20px",
                  borderRadius: "3px",
                  border: "none",
                  backgroundColor: "#0a1d56",
                  width: "70%",
                  margin: "auto",
                }}
                onClick={() => handleDeposits()}
              >
                Nạp tiền
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenQR && (
        <div className="popup-plan">
          {!depositsSuccess && (
            <div className="info-payment">
              <IoCloseOutline
                onClick={() => {
                  setIsOpenQR(false);
                  setCountdown(600);
                }}
                style={{
                  color: "black",
                  float: "right",
                  display: "block",
                  fontSize: "34px",
                  cursor: "pointer",
                }}
              />
              {qr ? (
                <img style={{ width: "260px" }} src={qr} alt="" />
              ) : (
                "loading..."
              )}
              <p
                style={{
                  margin: "8px 0",
                  wordSpacing: "0px",
                  color: "#F4B42B",
                  fontWeight: "600",
                }}
              >
                Mã QR thanh toán tự động
              </p>
              <p
                style={{
                  margin: "8px 0",
                  wordSpacing: "0px",
                  color: "#F4B42B",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                (Thường không quá 3’)
              </p>
              <p
                style={{
                  margin: "8px 0",
                  fontWeight: "600",
                  wordSpacing: "0px",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                Số tiền: {deposits}đ
              </p>
              <p
                style={{
                  margin: "8px 0",
                  wordSpacing: "0px",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "left",
                }}
              >
                Nội dung (bắt buộc):
                <span
                  style={{
                    margin: "8px 0",
                    wordSpacing: "0px",
                    color: "#F4B42B",
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {tranferContent}
                </span>
              </p>{" "}
              <p
                style={{
                  margin: "8px 0",
                  fontWeight: "600",
                  fontSize: "14px",
                  wordSpacing: "0px",
                  textAlign: "left",
                }}
              >
                Người hưởng thụ: BUI DAI THANH
              </p>
              <div className="count-down">
                <div className="dflex-between">
                  <p>Đang chờ thanh toán </p>
                  <p>
                    {" "}
                    {minutes}:{seconds.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
              {isFinal && <p>Đếm ngược đã kết thúc!</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FinancialManage;
