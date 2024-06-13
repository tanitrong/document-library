import { useSelector } from "react-redux";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/formatDate";

const Message = ({ message, admin }) => {
  const loggedUser = useSelector((state) => state.user.user);

  const fromMe = message.senderId === loggedUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  return (
    <div className={`${chatClassName}`}>
      <div style={{ position: "relative" }}>
        <img
          className="img-message"
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "999px",
            marginRight: "10px",
          }}
          src={admin.avatar}
          alt=""
        />
        <span className="online-indicator"></span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <p className="content-chat">{message.message}</p>
        <small
          className="time-chat"
          style={{ color: "#6D6D6D", fontWeight: "bold", fontSize: "10px" }}
        >
          {extractTime(message.createdAt)}
        </small>
      </div>
    </div>
  );
};

export default Message;
