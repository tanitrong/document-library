import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { RiSecurePaymentFill, RiPassValidFill } from "react-icons/ri";
const Sesion = () => {
  return (
    <Container>
      <div className="session-card">
        <div className="header-session dflex-between">
          <p className="header-session__text">Session</p>

          <FaUser
            className="icon-session"
            style={{ backgroundColor: "#a4e5ff", color: "#00b7fe" }}
          />
        </div>
        <h2 style={{ color: "#7F7F7F", margin: 0 }}>
          11,500 <small className="percent-text">(+38%)</small>
        </h2>
        <p style={{ color: "#7F7F7F" }}>Total user</p>
      </div>
      <div className="session-card">
        <div className="header-session dflex-between">
          <p className="header-session__text">Paid User</p>
          <RiSecurePaymentFill
            className="icon-session"
            style={{ backgroundColor: "#FFD2AA", color: "#FF6A00" }}
          />
        </div>
        <h2 style={{ color: "#7F7F7F", margin: 0 }}>
          2100 <small className="percent-text">(+12%)</small>
        </h2>
        <p style={{ color: "#7F7F7F" }}>Total paid user</p>
      </div>
      <div className="session-card">
        {" "}
        <div className="header-session dflex-between">
          <p className="header-session__text">Activity User</p>
          <RiPassValidFill
            className="icon-session"
            style={{ backgroundColor: "#FFEBEF", color: "#FD2254" }}
          />
        </div>
        <h2 style={{ color: "#7F7F7F", margin: 0 }}>
          7500 <small className="percent-text">(+28%)</small>
        </h2>
        <p style={{ color: "#7F7F7F" }}>Total actived user</p>
      </div>
      <div
        className="session-card"
        style={{ backgroundColor: "transparent" }}
      ></div>
    </Container>
  );
};

export default Sesion;
const Container = styled.div`
  display: flex;
  gap: 20px;
  // margin-left: 30px;
  margin-top: 32px;
  .session-card {
    box-sizing: border-box;
    width: 284px;
    height: 140px;
    border-radius: 8px;

    background-color: white;
    padding: 18px 20px 0px 20px;
    font: 400 15px Alata, sans-serif;
    letter-spacing: 1.8px;
    .header-session__text {
      color: #a6a6a6;
      font-weight: bold;
    }
    .icon-session {
      verical-align: middle;
      margin: auto 0;
      padding: 12px;
      border-radius: 10px;
      font-size: 16px;
    }
    .percent-text {
      color: #07ba71;
      font-size: 14px;
    }
  }
`;
