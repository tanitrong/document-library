import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";
import useGetConversations from "../../../hooks/useGetConversations";
import useConversation from "../../../zustand/useConversation";
import { useSocketContext } from "../../../context/SocketContext";

const Sidebar = () => {
  const { loading, conversations } = useGetConversations();
  const { selectedConversation, setSelectedConversation, lastMessage } =
    useConversation();
  const { onlineUsers } = useSocketContext();

  return (
    <Container>
      <form className="search-input">
        <input type="text" placeholder="Search" className="input-search" />
        <button type="submit" className="btn-search">
          <FaSearch />
        </button>
      </form>
      <div className="conversations">
        {conversations.map((con) => {
          return (
            <div
              className={`item ${
                selectedConversation?._id === con._id ? "selectedCon" : ""
              }`}
              key={con._id}
              onClick={() => setSelectedConversation(con)}
            >
              <div style={{ position: "relative", float: "left" }}>
                <img
                  className="img-message"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "999px",
                    marginRight: "10px",
                  }}
                  src={con.avatar}
                  alt=""
                />
                {onlineUsers.includes(con._id) ? (
                  <span className="online-indicator"></span>
                ) : (
                  ""
                )}
              </div>
              <div style={{ marginRight: "30px" }}>
                <h4 style={{ margin: 0, color: "#7A7A7A" }}>{con.name}</h4>
                <p style={{ margin: 0, color: "#ADADAD" }}>{lastMessage}</p>
              </div>
            </div>
          );
        })}
      </div>
      <FaAnglesDown
        style={{
          display: "block",
          margin: "auto",
          color: "#676A7F",
          cursor: "pointer",
        }}
      />
    </Container>
  );
};

export default Sidebar;
const Container = styled.div`
  background-color: #0f1125;
  //   padding: 26px;
  margin: 0;
  .search-input {
    padding: 26px;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    .input-search {
      border: 1px solid #818181;
      border-radius: 9999px;
      padding: 0.8rem 0.75rem;
      background-color: transparent;
      caret-color: white;
    }
    .btn-search {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      transition: all 0.2s ease-in-out;
      border-radius: 9999px;
      padding: 14px;
      background-color: white;
      color: black;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
  }

  .conversations {
    display: flex;
    overflow: auto;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    flex-direction: column;
    .selectedCon {
      background-color: #3d3f4e;
    }
    .item {
      padding: 0.5rem 0 0 0.5rem;
      // justify-content: space-around;
      display: flex;
      margin: 0.3rem 1rem;
      &:hover {
        cursor: pointer;
        background-color: #3d3f4e;
      }
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
    }
  }
`;
