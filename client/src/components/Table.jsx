import axios from "axios";
import { formatDate } from "../utils/formatDate";
import Pagination from "./Pagination";
import { server } from "../server";
import { toast } from "react-toastify";
const Table = ({
  header,
  currentDocs,
  totalDocs,
  docsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const handleDeleteDoc = async (docId) => {
    try {
      await axios.delete(`${server}/doc/delete/${docId}`);
      toast.success("Tài liệu đã được xóa thành công!");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <div className="table-info__docs">
        <div className="table">
          <div className="table-header">
            {header.map((h, i) => {
              return (
                <div className={`header__item${i + 1}`} key={i}>
                  <p id="name" className="filter__link" href="">
                    {h}
                  </p>
                </div>
              );
            })}

            <div className="header__item5">
              <p
                id="total"
                className="filter__link filter__link--number"
                href=""
              >
                Action
              </p>
            </div>
          </div>
          <div className="table-content">
            {currentDocs?.length > 0 ? (
              currentDocs?.map((doc, i) => {
                return (
                  <div className="table-row" key={i}>
                    <div className="table-data1">{doc.name}</div>
                    <div className="table-data2">
                      {formatDate(doc.createdAt)}
                    </div>
                    <div className="table-data3">{doc.status}</div>
                    <div className="table-data4">
                      {doc.price === 0 ? "Free" : doc.price}
                    </div>
                    <div
                      className="table-data5"
                      style={{
                        color: "#f27474",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteDoc(doc._id)}
                    >
                      Xóa
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>
                Ban chua upload tai lieu nao ca
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="pagination">
        <Pagination
          totalDocs={totalDocs}
          docsPerPage={docsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Table;
