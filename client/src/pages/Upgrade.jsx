import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { pricePlan, MY_BANK, API_GET_PAID, API_KEY } from "../../data/payment";
import { IoCloseOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CheckSuccess from "../components/CheckSuccess";
import axios from "axios";
import { server } from "../server";
const Upgrade = () => {
  const [isPopup, setIsPopup] = useState(false);
  let [tranferContent, setTranferContent] = useState("");
  const [countdown, setCountdown] = useState(600);
  let [amountPrice, setAmountPrice] = useState(0);
  const [paidSuccess, setpaidSuccess] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [qr, setQr] = useState("");
  const authUser = useSelector((state) => state.user.user);
  console.log("paidSuccess:", paidSuccess);

  //handle subscribe plan
  const handleSubcribePlan = (pl) => {
    setIsPopup(true);
    const generateToken = Math.random().toString(36).substring(2, 8);
    setTranferContent(`DTDOC${generateToken}`);
    setAmountPrice(pl.pricePlan);
    setQr(
      `https://img.vietqr.io/image/${MY_BANK.BANK_ID}-${
        MY_BANK.ACCOUNT_NO
      }-qr_only.png?amount=${pl.pricePlan}&plan=${
        pl.monthExpire
      }&token=${generateToken}&addInfo=${`DTDOC${generateToken}`}&accountName=${
        MY_BANK.ACCOUNT_NAME
      }`
    );
  };

  //handle when paidSuccess
  useEffect(() => {
    if (paidSuccess) {
      const updatePaymentForUser = async () => {
        let paidContent;
        if (amountPrice == 5000) paidContent = "nang cap goi 1 thang";
        if (amountPrice == 6000) paidContent = "nang cap goi 3 thang";
        if (amountPrice == 60000) paidContent = "nang cap goi 6 thang";
        if (amountPrice == 90000) paidContent = "nang cap goi 12 thang";
        await axios.post(`${server}/payment/${authUser?._id}`, {
          amount: amountPrice,
          paidContent,
          paymentMedthod: "QRcode",
        });
      };
      updatePaymentForUser();
    }
  }, [amountPrice, authUser?._id, paidSuccess]);

  useEffect(() => {
    let timer = null;
    if (isPopup && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 0) {
            setIsFinal(true);
            clearInterval(timer);
            return 0;
          }
          if (paidSuccess) {
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
  }, [isPopup, countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

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
      const lastPrice = lastPaid.amount == amountPrice;
      const lastContent = lastPaid.description.includes(tranferContent);
      console.table(lastPaid);
      console.log("lastPrice", lastPaid.amount, amountPrice);
      console.log("lastContent", lastPaid.description, tranferContent);
      if (lastPrice && lastContent) {
        setpaidSuccess(true);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Container>
        <h4 style={{ fontSize: "34px", margin: "20px auto", padding: "20px" }}>
          Simple Pricing
        </h4>
        <div
          style={{
            width: "700px",
            margin: "auto",
            color: "",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p>Quyền lợi của Tài khoản VIP</p>
          <p>Xem và tải hơn 800.000 tài liệu chọn lọc</p>
          <p>Tải tất cả các tài liệu HOT và không phải chờ</p>
          <p>Tắt QC Popup suốt quá trình duyệt xem tài liệu</p>
        </div>
        <div className="upgrade">
          {pricePlan.map((pl, index) => {
            return (
              <div className="item" key={index}>
                <h4 className="month-expire">{pl.monthExpire} tháng</h4>
                <h1 className="price-plan">
                  {pl.pricePlan / 1000}
                  <span style={{ fontSize: "20px" }}>000đ</span>
                </h1>
                <button
                  className="subcribe-plan"
                  onClick={() => handleSubcribePlan(pl)}
                >
                  Đăng Ký
                </button>
              </div>
            );
          })}
        </div>
        {isPopup && (
          <div className="popup-plan">
            {!paidSuccess ? (
              <div className="info-payment">
                <IoCloseOutline
                  onClick={() => {
                    setIsPopup(false);
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
                  Số tiền: {amountPrice}đ
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
            ) : (
              <CheckSuccess />
            )}
          </div>
        )}
      </Container>
      <div style={{ marginTop: "300px" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Upgrade;
const Container = styled.div`
  padding: 30px;
  box-sizing: border-box;
  color: white;
  text-align: center;
  width: 100%;
  height: 464px;
  background: linear-gradient(45deg, #062b3a, #37316a);
  p {
    font-size: 18px;
    margin: 5px;
    word-spacing: 10px;
    letter-spacing: 2px;
    font-weight: 300;
  }
  .upgrade {
    display: flex;
    justify-content: center;

    .item {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      margin: 60px 20px;
      padding: 10px;
      border-radius: 5px;
      background-color: white;
      width: 242px;
      height: 240px;
      box-shadow: -4px -4px 5px rgba(255, 255, 255, 0.2),
        4px 4px 4px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
      .month-expire {
        font-size: 20px;
        color: #f98d01;
        margin: 10px 0;
      }
      .price-plan {
        color: #4f4f4f;
        font-size: 40px;

        margin: 10px 0;
      }
      .subcribe-plan {
        background-color: #fa8c00;
        color: #fff;
        border: none;
        border-radius: 200px;
        width: 200px;
        padding: 14px;
        margin: 60px auto 0 auto;
        &:hover {
          cursor: pointer;
        }
      }
      .ribbon {
        position: absolute;
        top: 20px;
        left: -70px;
        color: white;
        width: 200px;
        padding: 10px;
        transform: rotate(-45deg);
        background-color: #31c975;
      }
    }
  }
  .popup-plan {
    position: fixed;
    padding-top: 80px;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    .info-payment {
      box-shadow: -4px -4px 10px rgba(255, 255, 255, 0.4),
        4px 4px 4px 1px rgba(255, 255, 255, 0.4);
      color: white;
      border-radius: 10px;
      padding: 40px;
      background-color: #2a2a4f !important;
      width: 290px;
      height: 480px;
      margin: auto;
    }
    .count-down {
      border-top: 1px #ccc solid;
      margin: 30px 0;
      p {
        margin: 8px 0;
        font-weight: 600;
        font-size: 14px;
        word-spacing: 0px;
        text-align: left;
      }
    }
  }
`;
