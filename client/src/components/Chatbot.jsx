import styled from "styled-components";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../server";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chatbot = ({ setIsOpenChatBot, currentDoc }) => {
  const [question, setQuestion] = useState("");
  const [contentChats, setContentChats] = useState([]);
  const authUser = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const { docId } = useParams();
  //ask AI

  const handleAskAi = async () => {
    if (question.trim() === "") return;
    const newChat = { role: "user", content: question };
    setContentChats([...contentChats, newChat]);
    setQuestion("");
    setIsLoading(true);
    try {
      const res = await axios.put(`${server}/doc/chatbox/ask/${authUser._id}`, {
        docId,
        question,
      });
      setContentChats(res.data.chatHistory);
    } catch (error) {
      console.error("Error asking AI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //get historychat
  useEffect(() => {
    axios
      .get(`${server}/doc/chatbox/history/${authUser._id}/${docId}`)
      .then((res) => {
        setContentChats(res.data.chatHistory);
      });
  }, [authUser._id, docId]);

  //format response chatbot
  const formatContent = (content) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <h3 key={index}>{line.replace(/\*\*/g, "")}</h3>;
      } else if (line.startsWith("- ")) {
        return <li key={index}>{line.substring(2)}</li>;
      } else {
        return <p key={index}>{line}</p>;
      }
    });
  };

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [contentChats]);
  return (
    <Container>
      <div className="related-question">
        <u
          onClick={() => setIsOpenChatBot(false)}
          style={{ cursor: "pointer" }}
        >
          Quay về
        </u>
        <h3 style={{ marginTop: "30px" }}>Có thể bạn muốn hỏi</h3>
        <ul className="items">
          <li onClick={(e) => setQuestion(e.target.textContent)}>
            Hãy tóm tắt tài liệu
          </li>
          <li onClick={(e) => setQuestion(e.target.textContent)}>
            Tìm các từ khóa quan trọng trong tài liệu
          </li>
          <li onClick={(e) => setQuestion(e.target.textContent)}>
            Liệt kê các thành phần trong tài liệu
          </li>
          <li onClick={(e) => setQuestion(e.target.textContent)}>
            Phân tích dữ liệu dưới dạng bảng
          </li>
          <li onClick={(e) => setQuestion(e.target.textContent)}>
            Trích xuất các đoạn văn bản chứa từ khóa
          </li>
          <li onClick={(e) => setQuestion(e.target.textContent)}>
            Giải thích các khái niệm chính
          </li>
        </ul>
      </div>
      <div className="container-chat">
        <div className="name-doc">Bạn đang chat với: {currentDoc.name}</div>
        <div className="content-messages">
          {contentChats ? (
            contentChats.map((chat, index) => {
              return (
                <div
                  ref={lastMessageRef}
                  key={index}
                  className={chat.role === "user" ? "user-chat" : "AI-chat"}
                >
                  {chat.role === "user" ? (
                    <span style={{ padding: 10, fontWeight: 600 }}>You</span>
                  ) : (
                    <img
                      className="img-message"
                      style={{
                        width: "26px",
                        height: "26px",
                        marginRight: "10px",
                      }}
                      src="/svg/chatbot.svg"
                      alt=""
                    />
                  )}
                  <div style={{ marginBottom: "10px" }}>
                    <div className="content-chat">
                      {formatContent(chat.content)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Hay chat voi tai lieu</p>
          )}
          {isLoading && (
            <div className="AI-chat">
              <img
                className="img-message"
                style={{
                  width: "26px",
                  height: "26px",
                  marginRight: "10px",
                }}
                src="/svg/chatbot.svg"
                alt=""
              />
              <div className="content-chat">
                Đang phản hồi{" "}
                <img
                  style={{ width: "30px", verticalAlign: "middle" }}
                  src="/svg/loading.svg"
                  alt=""
                />{" "}
              </div>
            </div>
          )}
        </div>
        <div className="input-message">
          <input
            type="text"
            placeholder="Ask AI any questions about document"
            className="input__send-text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAskAi();
              }
            }}
          />
          <RiSendPlaneFill
            onClick={() => handleAskAi()}
            style={{ margin: "auto 10px", fontSize: 24, cursor: "pointer" }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Chatbot;
const Container = styled.div`
  display: flex;
  color: white;
  width: 100%;
  height: 100vh;
  .related-question {
    box-sizing: border-box;
    padding: 20px;
    background-color: #131313;
    width: 25%;
    .items {
      padding: 0;
      margin-top: 60px;

      li {
        background-color: #2f2f2f;
        margin-top: 15px;
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        width: fit-content;
        color: white;
      }
    }
  }
  .container-chat {
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    right: 50px;
    background-color: #212121;
    width: 75%;
    gap: 40px;
    line-height: 27px;
    .name-doc {
      text-align: center;
      font-size: 20px;
      font-weight: 400;
    }
    .content-messages {
      margin-left: 50px;
      flex-grow: 1;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 7px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #ccc;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #888888;
        border-radius: 666px;
      }
      .content-chat {
        margin: 0px;
        padding: 10px;
        border-radius: 20px;
        font-size: 17px;
        // max-width: 80%;
        background-color: #2f2f2f;
        p {
          color: white;
          margin: 0;
        }
        li {
          color: white;
        }
      }
      .user-chat {
        display: flex;
      }
      .AI-chat {
        display: flex;
        .content-chat {
          background-color: transparent;
          padding: 0 10px;
        }
      }
    }
    .input-message {
      background-color: #2f2f2f;
      margin-right: 10px;
      margin-bottom: 6px;
      padding: 8px;
      border-radius: 200px;
      color: #888888;
      display: flex;
      .input__send-text {
        background-color: transparent;
        border: none;
        color: white;
        flex-grow: 1;
        padding: 5px 20px;
      }
    }
  }
`;
