import { useState } from "react";
import styled from "styled-components";
import { FaRegSmile } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import useSendMessage from "../../../hooks/useSendMessage";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const handleSendMessage = async () => {
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <Container>
      <FaRegSmile />
      <input
        type="text"
        placeholder="Typing a message"
        className="input__send-text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <RiSendPlaneFill onClick={handleSendMessage} />
    </Container>
  );
};

export default MessageInput;
const Container = styled.div`
  background-color: #0f1125;
  display: flex;
  color: #696969;
  padding: 15px;
  font-size: 24px;
  margin: 0 15px 15px 15px;
  border-radius: 200px;
  .input__send-text {
    color: #ccc;
    flex-grow: 1;
    margin: 0 0 0 30px;
    border: none;
    font-size: 18px;
    caret-color: white;
    background-color: transparent;
  }
`;
