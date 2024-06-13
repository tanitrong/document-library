import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/ManageDocs.scss";
import Table from "../components/Table";
import axios from "axios";
import { server } from "../server";
import { useSelector } from "react-redux";
import ActionManage from "../components/profile/ActionManage";
import SessionAnalytic from "../components/profile/SessionAnalytic";
import { formatDate } from "../utils/formatDate";
const ManageDocs = () => {
  const authUser = useSelector((state) => state.user.user);
  const [typeFilterDoc, setTypeFilerDoc] = useState("upload");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dataDoc, setDataDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const [likedDocuments, setLikedDocuments] = useState(
    JSON.parse(localStorage.getItem("likedDocuments")) || []
  );

  const docsPerPage = 4;
  const header = ["name", "uploadDate", "status", "fee"];

  //get collections
  useEffect(() => {
    (async () => {
      await axios
        .get(`${server}/doc/get-collection/${authUser?._id}`)
        .then((res) => {
          setCollections(res.data);
          console.log("collections", res.data);
        });
    })();
  }, [authUser]);

  //get all docs of user
  useEffect(() => {
    const getDataDoc = async () => {
      const { data } = await axios.get(
        `${server}/doc/get-all-docs/${authUser?._id}`
      );

      setDataDoc(data.docs);
    };
    getDataDoc();
  }, [authUser?._id]);

  //handleRemoveFavorite
  const handleRemoveFavorite = (id) => {
    let likedDocumentsRemove = likedDocuments.filter(
      (document) => document.id !== id
    );
    setLikedDocuments(likedDocumentsRemove);
    localStorage.setItem(
      "likedDocuments",
      JSON.stringify(likedDocumentsRemove)
    );
  };

  const lastDocIndex = currentPage * docsPerPage;
  const firstDocindex = lastDocIndex - docsPerPage;
  const currentDocs = dataDoc.slice(firstDocindex, lastDocIndex);
  const totalDocs = dataDoc.length;
  console.log("typeFIle", likedDocuments);
  return (
    <>
      <Header />
      <section className="manage-docs">
        <ActionManage avatar={authUser?.avatar} />
        <section className="info-docs">
          <SessionAnalytic />
          <div className="table-data__section">
            <div className="filter-docs">
              <button
                className={` ${typeFilterDoc === "upload" ? "active" : ""}`}
                onClick={() => setTypeFilerDoc("upload")}
              >
                {" "}
                Tài liệu upload
              </button>
              <button
                className={` ${typeFilterDoc === "favorite" ? "active" : ""}`}
                onClick={() => setTypeFilerDoc("favorite")}
              >
                {" "}
                Tài liệu yêu thích
              </button>
              <button
                className={` ${typeFilterDoc === "download" ? "active" : ""}`}
                onClick={() => setTypeFilerDoc("download")}
              >
                {" "}
                Tài liệu download
              </button>
              <button
                className={` ${typeFilterDoc === "colection" ? "active" : ""}`}
                onClick={() => setTypeFilerDoc("colection")}
              >
                Bộ sưu tập
              </button>
            </div>
            {typeFilterDoc === "upload" && (
              <>
                <p className="sub-filter">
                  Filter:{" "}
                  <span
                    className={`${statusFilter === "all" ? "selected" : ""}`}
                    onClick={() => setStatusFilter("all")}
                  >
                    All |
                  </span>{" "}
                  <span
                    className={`${
                      statusFilter === "approved" ? "selected" : ""
                    }`}
                    onClick={() => setStatusFilter("approved")}
                  >
                    đã duyệt |
                  </span>{" "}
                  <span
                    className={`${
                      statusFilter === "processing" ? "selected" : ""
                    }`}
                    onClick={() => setStatusFilter("processing")}
                  >
                    chờ duyệt |
                  </span>{" "}
                  <span
                    className={`${
                      statusFilter === "rejected" ? "selected" : ""
                    }`}
                    onClick={() => setStatusFilter("rejected")}
                  >
                    bị từ chối
                  </span>
                </p>
                {dataDoc && (
                  <Table
                    header={header}
                    data={dataDoc}
                    currentDocs={currentDocs}
                    totalDocs={totalDocs}
                    docsPerPage={docsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                )}
              </>
            )}
            {typeFilterDoc === "favorite" && (
              <>
                <table>
                  <tbody>
                    <tr>
                      <th>Tên tài liệu</th>
                      <th>Ngày tải lên</th>
                      <th>Người tải</th>
                      <th>action</th>
                    </tr>
                    {likedDocuments.map((doc, index) => {
                      return (
                        <tr key={index}>
                          <td className="user-upload">{doc.name}</td>
                          <td className="date-upload">
                            {formatDate(doc.createdAt)}
                          </td>
                          <td className="user-upload">{doc.user}</td>
                          <td>
                            <span
                              className="remove-favorite"
                              onClick={() => handleRemoveFavorite(doc.id)}
                            >
                              Xóa
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {likedDocuments.length == 0 && (
                  <p style={{ textAlign: "center" }}>
                    Bạn chưa có tài liệu yêu thích nào cả.
                  </p>
                )}
              </>
            )}
            {typeFilterDoc === "colection" && (
              <div className="collections">
                {collections?.map((col, i) => {
                  return (
                    <div className="item" key={i}>
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "160px",
                        }}
                      >
                        <img
                          loading="lazy"
                          className="pattern"
                          src="/png/9142838.jpg"
                          alt=""
                        />
                        <h3
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            margin: 0,
                            color: "white",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {col.documents.length}
                        </h3>
                      </div>
                      <div className="info_collection">
                        <h4>{col.name}</h4>
                        <p>{col.documents.length} tai lieu</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
};

export default ManageDocs;
