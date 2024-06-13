import React from "react";
import { styled } from "styled-components";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <FooterContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className="col">
          <h2 style={{ color: "#09D298" }}>
            DT<span style={{ color: "white" }}>Doc</span>
          </h2>
          <p style={{ color: "#09D298" }}>THEO DÕI CHÚNG TÔI</p>
          <div>
            <FaFacebook className="icon-contact" />
            <FaTwitter className="icon-contact" />
            <FaYoutube className="icon-contact" />
            <AiFillInstagram className="icon-contact" />
          </div>
        </div>
        <div className="col">
          <h2 style={{ color: "#09D298" }}>GIÚP ĐỠ</h2>
          <Link to={"/faq"} style={{ color: "white", textDecoration: "none" }}>
            CÁC CÂU HỎI THƯỜNG GẶP
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }}>
            ĐIỀU KHOẢN SỬ DỤNG
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }}>
            CHÍNH SÁCH{" "}
          </Link>

          <Link style={{ color: "white", textDecoration: "none" }}>
            HƯỚNG DẪN THANH TOÁN
          </Link>
        </div>
        <div className="col">
          <h2 style={{ color: "#09D298" }}>THÔNG TIN</h2>
          <Link style={{ color: "white", textDecoration: "none" }}>
            VỀ CHÚNG TÔI
          </Link>
          <Link to="/policy" style={{ color: "white", textDecoration: "none" }}>
            QUY ĐỊNH BẢO MẬT
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }}>
            THỎA THUẬN SỬ DỤNG
          </Link>

          <Link style={{ color: "white", textDecoration: "none" }}>
            QUY CHẾ HOẠT ĐỘNG
          </Link>
        </div>
      </div>
      <div className="dflex-between">
        <p style={{ color: "#09D298" }}>© 2022 Arihant. All Rights Reserved</p>
        <Link to="/terms" style={{ color: "#09D298" }}>
          Privacy | Terms of Service
        </Link>
      </div>
    </FooterContainer>
  );
};

export default Footer;
const FooterContainer = styled.div`
  margin-top: 100px;
  box-sizing: border-box;
  padding: 0px 150px;
  background-color: #5b5b5b;
  .col {
    display: flex;
    flex-direction: column;
    .icon-contact {
      color: white;
      font-size: 30px;
      margin-right: 20px;
    }
  }
`;
