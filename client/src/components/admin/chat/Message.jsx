import styled from "styled-components";
import { useSelector } from "react-redux";
import useConversation from "../../../zustand/useConversation";
import { extractTime } from "../../../utils/formatDate";

const Message = ({ message }) => {
  const loggedUser = useSelector((state) => state.user.user);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === loggedUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  return (
    <Container>
      <div className={`${chatClassName}`}>
        <div style={{ position: "relative" }}>
          <img
            className="img-message"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "999px",
              marginRight: "10px",
            }}
            src={selectedConversation.avatar}
            alt=""
          />
          <span className="online-indicator"></span>
        </div>
        <div>
          <p className="content-chat">{message.message}</p>
          <small
            className="time-chat"
            style={{ color: "#6D6D6D", fontWeight: "bold" }}
          >
            {extractTime(message.createdAt)}
          </small>
        </div>
      </div>
    </Container>
  );
};

export default Message;
const Container = styled.div`
  margin-bottom: 10px;
  .online-indicator {
    position: absolute;
    top: -3px;
    right: 8px;
    width: 10px;
    height: 10px;
    border: 3px solid white;
    border-radius: 50%;
    background-color: #00ff19;
  }
  .content-chat {
    margin: 0;
    padding: 10px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    font-size: 18px;
    max-width: 400px;
    color: #acacac;
    background-color: #4e4e4e;
  }
  .chat-start {
    display: flex;
    justify-content: start;
  }
  .chat-end {
    display: flex;
    justify-content: end;
    flex-direction: row-reverse;
    .img-message {
      display: none;
    }
    .online-indicator {
      display: none;
    }
    .content-chat {
      background-color: #0584fe;
      color: #ffffff;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 0;
    }
    .time-chat {
      float: right;
    }
  }
`;
