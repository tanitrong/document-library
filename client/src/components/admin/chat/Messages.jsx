import useGetMessages from "../../../hooks/useGetMessages";
import styled from "styled-components";
import Message from "../chat/Message";
import { useEffect, useRef } from "react";
import useListenMessages from "../../../hooks/useListenMessages";
const Messages = () => {
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
            <Message message={mes} />
          </div>
        ))}
      {messages.length === 0 && (
        <p style={{ color: "white", fontWeight: 600, fontSize: 24 }}>
          send a message to start the conversation
        </p>
      )}
    </Container>
  );
};

export default Messages;
const Container = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #0f1125;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 666px;
  }
`;
