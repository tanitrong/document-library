import { Link } from "react-router-dom";
import styled from "styled-components";

const CheckSuccess = () => {
  return (
    <Container>
      <div
        style={{
          width: 200,
          height: 250,
          backgroundColor: "#2a2a4f",
          borderRadius: 10,
          margin: "120px auto",
          padding: "20px",
          boxShadow:
            "-4px -4px 10px rgba(255, 255, 255, 0.4),4px 4px 4px 1px rgba(255, 255, 255, 0.4)",
        }}
      >
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip" />
            <span className="icon-line line-long" />
            <div className="icon-circle" />
            <div className="icon-fix" />
          </div>
        </div>
        <p
          style={{
            color: "orange",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Thanh toan thanh cong
        </p>
        <Link
          to="/finance"
          style={{
            cursor: "pointer",
            color: "white",
            textDecoration: "none",
            padding: "10px",
            backgroundColor: "#fa8c00",
            borderRadius: "5px",
            display: "block",
            marginTop: "36px",
          }}
        >
          di den quan ly so du
        </Link>
      </div>
    </Container>
  );
};

export default CheckSuccess;
const Container = styled.div`
  .success-checkmark {
    width: 80px;
    height: 115px;
    margin: 0 auto;

    .check-icon {
      width: 80px;
      height: 80px;
      position: relative;
      border-radius: 50%;
      box-sizing: content-box;
      border: 4px solid #4caf50;

      &::before {
        top: 3px;
        left: -2px;
        width: 30px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
      }

      &::after {
        top: 0;
        left: 30px;
        width: 60px;
        transform-origin: 0 50%;

        border-radius: 0 100px 100px 0;
        animation: rotate-circle 4.25s ease-in;
      }

      &::before,
      &::after {
        content: "";
        height: 100px;
        position: absolute;
        background: transparent;
        transform: rotate(-45deg);
      }

      .icon-line {
        height: 5px;
        background-color: white;
        display: block;
        border-radius: 2px;
        position: absolute;
        z-index: 10;

        &.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        &.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }
      }

      .icon-circle {
        top: -4px;
        left: -4px;
        z-index: 10;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        box-sizing: content-box;
        border: 4px solid white;
      }

      .icon-fix {
        top: 8px;
        width: 5px;
        left: 26px;
        z-index: 1;
        height: 85px;
        position: absolute;
        transform: rotate(-45deg);
        background-color: transparent;
      }
    }
  }

  @keyframes rotate-circle {
    0% {
      transform: rotate(-45deg);
    }
    5% {
      transform: rotate(-45deg);
    }
    12% {
      transform: rotate(-405deg);
    }
    100% {
      transform: rotate(-405deg);
    }
  }

  @keyframes icon-line-tip {
    0% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 45px;
    }
  }

  @keyframes icon-line-long {
    0% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0px;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }
`;
