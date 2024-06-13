import { styled } from "styled-components";
import { FiUsers } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { LuBarChart3 } from "react-icons/lu";
import { BiMessageRoundedDots } from "react-icons/bi";
import useMenuActionAdmin from "../../zustand/useMenuActionAdmin";
import { useNavigate } from "react-router-dom";
const ActionManage = () => {
  const { menuActive, setMenuActive } = useMenuActionAdmin();
  const navigate = useNavigate();

  return (
    <Container>
      <span
        style={{
          color: "#12AB7F",
          font: " italic 600 32px / normal Inter, sans-serif",
        }}
      >
        DT
      </span>
      <span
        style={{
          color: "white",
          font: " italic 600 32px / normal Inter, sans-serif",
        }}
      >
        doc
      </span>
      <ul>
        <li
          className={`dflex item-action ${
            menuActive == "user" ? "active" : ""
          }`}
          onClick={() => {
            setMenuActive("user");
            navigate("/admin/manage-user");
          }}
        >
          <FiUsers className="icon-action__manage" />
          <p>User </p>
        </li>
        <li
          className={`dflex item-action ${
            menuActive == "manage-docs" ? "active" : ""
          }`}
          onClick={() => {
            setMenuActive("manage-docs");
            navigate("/admin/manage-docs");
          }}
        >
          <IoDocumentTextOutline className="icon-action__manage" />
          <p>Documents </p>
        </li>

        <li
          className={`dflex item-action ${
            menuActive == "manage-payment" ? "active" : ""
          }`}
          onClick={() => {
            setMenuActive("manage-payment");
            navigate("/admin/manage-payment");
          }}
        >
          <MdOutlinePayment className="icon-action__manage" />
          <p>Withdraw request</p>
        </li>

        <li
          className={`dflex item-action ${
            menuActive == "chart" ? "active" : ""
          }`}
          onClick={() => {
            setMenuActive("chart");
            navigate("/admin/chart");
          }}
        >
          <LuBarChart3 className="icon-action__manage" />
          <p>Chart analytic</p>
        </li>
        <li
          className={`dflex item-action ${
            menuActive == "manage-chat" ? "active" : ""
          }`}
          onClick={() => {
            setMenuActive("manage-chat");
            navigate("/admin/manage-chat");
          }}
        >
          <BiMessageRoundedDots className="icon-action__manage" />
          <p>Chat </p>
        </li>
      </ul>
    </Container>
  );
};

export default ActionManage;
const Container = styled.div`
  // width: 264px;
  padding: 35px 30px 80px 26px;
  position: fixed;
  height: 100vh;
  box-sizing: border-box;
  box-shadow: -4px -4px 4px rgba(255, 255, 255, 0.1),
    4px 4px 4px rgba(0, 0, 0, 0.1);
  background-color: #242745;
  font-size: 20px;
  letter-spacing: 2px;
  color: #b7b7b7;
  margin-left: -110px;
  .active {
    cursor: pointer;
    background: linear-gradient(45deg, #6256de, #542fa2);
    border-radius: 5px;
    color: #fff;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
      rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
      rgba(0, 0, 0, 0.07) 0px 16px 16px;
    p {
      color: white;
    }
  }
  ul {
    margin: 34px 0px 0px -40px;
    width: 100%;
    li {
      height: 50px;
      font-weight: 600;
      padding: 0px 0 0px 20px;
      margin-bottom: 10px;
      font-size: 18px;
      &:hover {
        cursor: pointer;
        background: linear-gradient(45deg, #6256de, #542fa2);
        border-radius: 5px;
        color: #fff;
        box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px,
          rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px,
          rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px;
        p {
          color: white;
        }
      }
      p {
        color: #a6a6a6;
        text-decoration: none;
      }
      .icon-action__manage {
        verical-align: middle;
        margin: auto 10px auto 0;
      }
    }
  }
`;
