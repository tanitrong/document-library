import "../styles/Chat.scss";
import { FaRegSmile } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import Messages from "./chat/Messages";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../server";
import useSendMessage from "../hooks/useSendMessage";
const ChatContainer = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  useEffect(() => {
    const getAdmin = async () => {
      const { data } = await axios.get(
        `${server}/user/user-info/65f7c03cdeb32b18f0b466a6`
      );
      setAdmin(data.user);
    };
    getAdmin();
  }, []);

  const handleSendMessage = async () => {
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <section className="help-section">
      {isChatVisible ? (
        <div id="chat-container">
          <div className="header-chat">
            <div
              style={{
                marginTop: "-10px",
                fontWeight: "600",
                position: "relative",
              }}
            >
              <img
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "300px",
                  verticalAlign: "middle",
                }}
                src={admin && admin.avatar}
                alt=""
              />
              Admin
            </div>
            <IoCloseOutline
              style={{
                cursor: "pointer",
                fontSize: "18px",
                marginTop: "-6px",
              }}
              onClick={() => setChatVisible(!isChatVisible)}
            />
          </div>

          <div className="content-messages">
            <Messages admin={admin} />
          </div>
          <div className="input-message">
            <FaRegSmile />
            <input
              type="text"
              placeholder="Typing a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                backgroundColor: "transparent",
                flexGrow: 1,
                border: "none",
              }}
            />
            <RiSendPlaneFill onClick={handleSendMessage} />
          </div>
        </div>
      ) : (
        <div
          className="help-offer"
          onClick={() => setChatVisible(!isChatVisible)}
        >
          Bạn muốn trợ giúp gì không? <div className="triangle"></div>
        </div>
      )}

      <div className="icon-container">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ed4e2568b3cd8fad51396eb795f9e0f471eb1829b0f0afb04a63b8c8a38373f?apiKey=a8e99f3721b24ee5acfd958ae906ebbf&"
          className="feedback-icon"
          alt="Feedback Icon"
        />
      </div>
    </section>
  );
};

export default ChatContainer;
