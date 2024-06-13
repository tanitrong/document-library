import styled from "styled-components";

const Pagination = ({
  totalDocs,
  docsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  console.log(totalDocs, docsPerPage);
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalDocs / docsPerPage); i++) {
    pages.push(i);
  }
  return (
    <Container>
      <button
        type=""
        className={`btn-pagination `}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Trước
      </button>
      {pages.map((page, index) => {
        return (
          <button
            className={`btn-pagination ${page == currentPage ? "active" : ""}`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        type=""
        className={`btn-pagination `}
        onClick={() => setCurrentPage((prev) => prev + 1)}
      >
        Sau
      </button>
    </Container>
  );
};

export default Pagination;
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  .btn-pagination {
    margin: 20px 0 0 10px;
    text-align: center;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid #ccc;
    color: #5e5e5e;
    cursor: pointer;
    border-radius: 5px;
  }
  .active {
    background-color: #00b7fe;
    color: white;
  }
`;
