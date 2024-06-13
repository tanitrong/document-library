import { LuUser } from "react-icons/lu";
import {
  IoDocumentTextOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useMenuAction from "../../zustand/useMenuAction";
import axios from "axios";
import { server } from "../../server";
const ActionManage = ({ avatar }) => {
  const navigate = useNavigate();
  const { menuActive, setMenuActive } = useMenuAction();
  const handleLogout = async () => {
    axios.get(`${server}/user/logout`, { withCredentials: true }).then(() => {
      navigate("/login");
    });
  };
  return (
    <Session>
      <div>
        <img
          style={{ width: "50px", height: "50px", borderRadius: "200px" }}
          loading="lazy"
          src={avatar}
          alt=""
        />
      </div>
      <div
        className={`action-item  ${
          menuActive === "user" ? "action-active" : ""
        } dflex`}
        onClick={() => {
          setMenuActive("user");
          navigate("/profile");
        }}
      >
        <LuUser
          style={{ margin: "auto 0", fontSize: "20px" }}
          className="vertical-align action-icon secondary-color"
        />
        <p className="secondary-color ml">Quản lý tài khoản</p>
      </div>
      <div
        className={`action-item  ${
          menuActive === "document" ? "action-active" : ""
        } dflex`}
        onClick={() => {
          setMenuActive("document");
          navigate("/manage-docs");
        }}
      >
        <IoDocumentTextOutline
          style={{ margin: "auto 0", fontSize: "20px" }}
          className="vertical-align secondary-color action-icon"
        />
        <p className="secondary-color ml">Quản lý tài liệu</p>
      </div>
      <div
        className={`action-item  ${
          menuActive === "finance" ? "action-active" : ""
        } dflex`}
        onClick={() => {
          setMenuActive("finance");
          navigate("/finance");
        }}
      >
        <IoDocumentTextOutline
          style={{ margin: "auto 0", fontSize: "20px" }}
          className="vertical-align secondary-color action-icon"
        />
        <p className="secondary-color ml">Quản lý tài chính</p>
      </div>
      <div
        className={`action-item  ${
          menuActive === "setting" ? "action-active" : ""
        } dflex`}
      >
        <IoSettingsOutline
          style={{ margin: "auto 0", fontSize: "20px" }}
          className="vertical-align secondary-color action-icon"
        />
        <p className="secondary-color ml">Setting</p>
      </div>
      <div
        className={`action-item  ${
          menuActive === "notify" ? "action-active" : ""
        } dflex`}
      >
        <IoNotificationsOutline
          style={{ margin: "auto 0", fontSize: "20px" }}
          className="vertical-align secondary-color action-icon"
        />
        <p className="secondary-color ml">Thông báo</p>
      </div>
      <div
        className={`action-item  ${
          menuActive === "logout" ? "action-active" : ""
        } dflex`}
        onClick={() => setMenuActive("logout")}
      >
        <IoLogOutOutline
          style={{ margin: "auto 0", fontSize: "20px" }}
          className="vertical-align secondary-color action-icon"
        />
        <p className="secondary-color ml" onClick={() => handleLogout()}>
          Logout
        </p>
      </div>
    </Session>
  );
};

export default ActionManage;
const Session = styled.section`

    text-align: center;
    box-sizing: border-box;
    padding: 20px;
    width: 20%;
    .action-item {
      cursor: pointer;
      padding-left: 10px;
      box-sizing: border-box;
      .action-icon {
        margin-right: 20px;
      }
    }
  }
  .action-active {
    background-color: #f3f0ff;
    .action-icon {
      color: #551fff;
      margin-right: 20px;
    }
    p {
      font-weight: 600;
      color: #551fff;
    }
  
`;
