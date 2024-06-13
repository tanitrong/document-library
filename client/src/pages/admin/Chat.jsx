import ActionManage from "../../components/admin/ActionManage";
import Header from "../../components/admin/Header";
import styled from "styled-components";
import "../../styles/admin/Chat.scss";
import Sidebar from "../../components/admin/chat/Sidebar";
import MessageContainer from "../../components/admin/chat/MessageContainer";

const Chat = () => {
  return (
    <>
      <Container>
        <ActionManage />
        <div className="manage-chat">
          <Header />
          <div className="session-chatt">
            <Sidebar />
            <MessageContainer />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Chat;
const Container = styled.div`
  background-color: #f8f7fa;
  display: flex;
  gap: 20px;
  width: 108%;
`;
