import styled from "styled-components";
import Messages from "../chat/Messages";
import MessageInput from "../chat/MessageInput";
import useConversation from "../../../zustand/useConversation";
import { useEffect } from "react";
const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <Container>
      {!selectedConversation ? (
        <>
          <img
            style={{ width: "300px", margin: "auto" }}
            src="/gif/robot.gif"
            alt=""
          />
          <p
            style={{
              margin: "auto",
              marginTop: "-230px",
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Chọn đối tượng để bắt đầu cuộc trò chuyện
          </p>
        </>
      ) : (
        <>
          <div className="to-user">
            <span>To: </span>
            <span style={{ fontWeight: "bold" }}>
              {selectedConversation.name}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </Container>
  );
};

export default MessageContainer;
const Container = styled.div`
  width: 100%;
  //   padding: 20px;
  display: flex;
  flex-direction: column;
  .to-user {
    color: #acacac;
    font-size: 18px;
    padding: 0.6rem 2rem;
    background-color: #4e4e4e;
  }
`;
