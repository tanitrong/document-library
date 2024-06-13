import styled from "styled-components";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import { useEffect, useRef } from "react";
import Message from "./Message";

const Messages = ({ admin }) => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [messages]);
  return (
    <Container>
      {messages.length > 0 &&
        messages.map((mes) => (
          <div key={mes._id} ref={lastMessageRef}>
            <Message message={mes} admin={admin} />
          </div>
        ))}
      {messages.length === 0 && <p>send a message to start the conversation</p>}
    </Container>
  );
};

export default Messages;
const Container = styled.div`
  margin-top: 10px;
  .online-indicator {
    position: absolute;
    top: -3px;
    right: 8px;
    width: 8px;
    height: 8px;
    border: 3px solid white;
    border-radius: 50%;
    background-color: #00ff19;
  }
  .content-chat {
    margin: 0px;
    padding: 6px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    font-size: 14px;
    max-width: 150px;
    color: #3c3c3c;
    background-color: #f0f0f0;
  }
  .chat-start {
    display: flex;
    justify-content: start;
  }
  .chat-end {
    margin-right: 10px;
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
