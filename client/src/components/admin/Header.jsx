import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <Container>
      <div className="greeting-text">
        <span className="highlight-text">hi</span>,{" "}
        <span className="name-text">{user?.name}</span>
      </div>
      <img
        loading="lazy"
        src={user?.avatar}
        className="img"
        alt=""
        style={{ width: "30px", height: "30px", borderRadius: "50px" }}
      />
    </Container>
  );
};

export default Header;
const Container = styled.div`
  // margin-left: 60px;
  box-sizing: border-box;
  display: flex;
  justify-content: end;
  gap: 12px;
  padding: 16px 16px 16px 80px;
  border-radius: 6px;

  background-color: white;
  font-weight: 600;
  letter-spacing: 1.68px;
  text-transform: uppercase;
  .highlight-text {
    color: rgba(255, 153, 0, 1);
  }

  .name-text {
    color: rgba(18, 171, 127, 1);
  }
`;
