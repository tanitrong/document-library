import axios from "axios";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { server } from "../server";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentEditor from "../components/Comments";
import { MdOutlineDateRange } from "react-icons/md";
import { IoCloudDownloadOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import "../styles/DetailDoc.scss";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Store from "../redux/store";
import { loadUser } from "../redux/actions/user";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { pdfjs } from "react-pdf";
import LoadAnimation from "../components/LoadAnimation";
import Chatbot from "../components/Chatbot";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const DocDetail = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state?.user?.user);
  const userPaid = authUser?.plan !== "default";
  const { docId } = useParams();
  const [numPages, setNumPages] = useState();
  const [currentDoc, setCurrentDoc] = useState(undefined);
  const [relatedDocs, setRelatedDocs] = useState(undefined);
  const [viewMoreNum, setViewMoreNum] = useState(3);
  const [isPopup, setIsPopup] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [collection, setCollection] = useState([]);
  const [popupCollection, setPopupCollection] = useState(false);
  const [addCollection, setAddCollection] = useState(false);
  const [nameCollection, setNameCollection] = useState("");
  const [descCollection, setDescCollection] = useState("");
  const [isOpenChatBot, setIsOpenChatBot] = useState(false);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, [isPaid]);

  // handle view more
  const handleViewMore = () => {
    //case free document
    if (currentDoc.price == 0) {
      if (userPaid) {
        setViewMoreNum((prev) => prev + 3);
      } else {
        if (viewMoreNum < currentDoc.preview) {
          setViewMoreNum((prev) => prev + 3);
        } else {
          alert("VUi lòng nâng cấp gói tài liệu để tiếp tục xem");
        }
      }
    } else {
      //case document paid
      const isEligibleForViewMore =
        authUser?.purchasedDocuments.includes(currentDoc._id) ||
        authUser._id === currentDoc.uploadedBy ||
        viewMoreNum < currentDoc.preview;

      if (isEligibleForViewMore) {
        setViewMoreNum((prev) => prev + 3);
      } else {
        setIsPopup(true);
      }
    }
  };

  //handle Download
  const handleDownload = async () => {
    if (currentDoc.price == 0) {
      if (userPaid) {
        const response = await axios.get(
          `https://firebasestorage.googleapis.com/v0/b/datn-d711e.appspot.com/o/pdfs%2F1713976124007X%C3%82Y%20D%E1%BB%B0NG%20TRANG%20CH%E1%BB%A6%20bookstore%20.net.pdf?alt=media&token=f5763caa-4e1f-4d32-b340-b2eba83955c6`,
          {
            responseType: "blob",
          }
        );
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `${currentDoc.name}.pdf`;
        link.click();
      } else {
        toast.warning("Vui long nang cap goi tai lieu");
      }
    } else {
      if (authUser?.purchasedDocuments.includes(currentDoc._id)) {
        const response = await axios.get(
          `https://firebasestorage.googleapis.com/v0/b/datn-d711e.appspot.com/o/pdfs%2F1713976124007X%C3%82Y%20D%E1%BB%B0NG%20TRANG%20CH%E1%BB%A6%20bookstore%20.net.pdf?alt=media&token=f5763caa-4e1f-4d32-b340-b2eba83955c6`,
          {
            responseType: "blob",
          }
        );
        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `${currentDoc.name}.pdf`;
        link.click();
      } else {
        toast.warning("Vui lòng thanh toán để download!");
      }
    }
  };
  //get current document
  useEffect(() => {
    const getDocCurrent = async () => {
      const { data } = await axios.get(`${server}/doc/get-doc/${docId}`);
      setCurrentDoc(data.doc);
      setRelatedDocs(data.relatedDocs);
      console.log("data", data);
    };
    getDocCurrent();

    //caculate views
    const lastViewed = localStorage.getItem(`lastViewed_${docId}`);
    const now = new Date().getTime();
    const viewLimit = 2 * 60 * 60 * 1000;

    if (!lastViewed || now - lastViewed > viewLimit) {
      // Increment view count
      axios
        .put(`${server}/doc/${docId}/view`)
        .then(() => {
          localStorage.setItem(`lastViewed_${docId}`, now);
          console.log("đã tăng view");
        })
        .catch(() => {
          console.log("đợi 2h");
        });
    }
  }, [docId]);

  //handle like document
  let likedDocuments = JSON.parse(localStorage.getItem("likedDocuments")) || [];
  function addLikedDocument(document) {
    const existingDocument = likedDocuments.find(
      (item) => item.id === document.id
    );
    if (!existingDocument) {
      likedDocuments.push(document);
      localStorage.setItem("likedDocuments", JSON.stringify(likedDocuments));
      toast.success("Đã thêm vào yêu thích thành công!!!");
    } else {
      toast.error("Opps!!!, Bạn đã thêm vào yêu thích trước đó rồi.");
    }
  }

  //handle paid document
  const handlePaidDocument = async () => {
    await axios
      .put(`${server}/doc/paid-document/${docId}`, {
        purchaseUserId: authUser._id,
        priceDoc: currentDoc.price,
      })
      .then(() => {
        setIsPaid(true);
        toast.success("bạn đã mua thành công");
        setIsPopup(false);
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      });
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  //get collection
  useEffect(() => {
    (async () => {
      await axios
        .get(`${server}/doc/get-collection/${authUser?._id}`)
        .then((res) => {
          setCollection(res.data);
        });
    })();
  }, [authUser]);

  //handle Add Collection
  const handleAddCollection = async (collectionId) => {
    await axios
      .put(`${server}/doc/add-collection/${collectionId}`, {
        documentId: currentDoc._id,
      })
      .then(() => {
        toast.success("thêm vào bộ sưu tập thành công");
        Store.dispatch(loadUser());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  //handle create Collection
  const handleCreateCollection = async () => {
    await axios
      .post(`${server}/doc/create-collection/${authUser._id}`, {
        name: nameCollection,
        description: descCollection,
      })
      .then(() => {
        toast.success("Tạo bộ sưu tập thành công");
        Store.dispatch(loadUser());
      });
  };
  const onClickRelatedDoc = async (docId) => {
    navigate(`/document/${docId}`);
  };

  return (
    <>
      <Header />
      {!isOpenChatBot ? (
        currentDoc && (
          <>
            <Container>
              {!currentDoc.pdfUrl ? (
                <p>loading........</p>
              ) : (
                <div style={{ width: "880px" }}>
                  <p
                    style={{
                      color: "#0A694E",
                      fontSize: "24px",
                      fontWeight: 400,
                    }}
                  >
                    {currentDoc.uploadedBy === authUser?._id ? (
                      <>
                        {currentDoc.name}{" "}
                        <span style={{ fontSize: "18px", color: "#ff9900" }}>
                          (your document)
                        </span>
                      </>
                    ) : (
                      currentDoc.name
                    )}
                  </p>
                  <div className="dflex">
                    <div className="dflex mr" style={{ marginBottom: " 10px" }}>
                      <div className="mr">
                        <div className="mr secondary-color">
                          <MdOutlineDateRange className="secondary-color mr iconx2" />
                          {formatDate(currentDoc.createdAt)}
                        </div>
                        <div className="secondary-color">
                          <IoEyeOutline className="secondary-color mr iconx2" />
                          {currentDoc.views}
                        </div>
                      </div>
                      <div>
                        <div className="mr secondary-color">
                          <FaRegUser className="secondary-color mr iconx2" />
                          {currentDoc.nameUser}
                        </div>

                        <div className="secondary-color ">
                          {" "}
                          <IoCloudDownloadOutline className="secondary-color mr iconx2" />
                          {currentDoc.downloads}
                        </div>
                      </div>
                    </div>
                    <div className="dflex">
                      <button
                        className="action__with-doc"
                        style={{
                          backgroundColor: "#5080FA",
                          boxShadow:
                            "4px 4px 4px rgba(29, 88, 242, 0.1),4px 4px 4px rgba(29, 88, 242, 0.1)",
                          color: "white",
                        }}
                        onClick={() =>
                          addLikedDocument({
                            id: currentDoc._id,
                            createdAt: currentDoc.createdAt,
                            user: currentDoc.nameUser,
                            name: currentDoc.name,
                          })
                        }
                      >
                        <AiOutlineLike
                          className="iconx2"
                          style={{
                            marginRight: "6px",
                          }}
                        />
                        Like
                      </button>
                      <button
                        className="action__with-doc"
                        style={{
                          border: "1px solid #ccc",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => setPopupCollection(true)}
                      >
                        {" "}
                        <FaSquarePlus
                          className="mr iconx2"
                          style={{
                            color: "#ED553B",

                            marginRight: "6px",
                          }}
                        />
                        Thêm vào bộ sưu tập
                      </button>
                      <button
                        className="action__with-doc"
                        style={{
                          backgroundColor: "#59EFB2",
                          boxShadow:
                            "3px 3px 3px rgba(89, 239, 242, 0.2),3px 3px 3px rgba(29, 88, 242, 0.2)",
                          color: "white",
                        }}
                        onClick={() => handleDownload()}
                      >
                        <MdDownload
                          className="mr iconx2"
                          style={{
                            color: "white",

                            marginRight: "6px",
                          }}
                        />
                        download
                      </button>
                      <button
                        className="action__with-doc"
                        style={{
                          backgroundColor: "#FF9900",
                          color: "white",
                          letterSpacing: "1.5px",
                          cursor: "text",
                        }}
                      >
                        {currentDoc.price === 0
                          ? "Free"
                          : `${currentDoc.price}đ`}
                      </button>
                      {authUser?.purchasedDocuments.includes(
                        currentDoc._id
                      ) && (
                        <button
                          className="action__with-doc"
                          style={{
                            backgroundColor: "#39515B",
                            color: "white",
                            letterSpacing: "1.5px",
                            cursor: "text",
                          }}
                          onClick={() => handleDownload()}
                        >
                          Đã mua
                        </button>
                      )}
                    </div>
                  </div>

                  <Document
                    loading={<LoadAnimation />}
                    file="https://firebasestorage.googleapis.com/v0/b/datn-d711e.appspot.com/o/pdfs%2F1716554969862Gi%C3%A1o%20tr%C3%ACnh%20m%C3%B4n%20K%C4%A9%20thu%E1%BA%ADt%20vi%20x%E1%BB%AD%20l%C3%AD.pdf?alt=media&token=c057b98a-3526-42fe-b437-611994789c11"
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.apply(null, Array(numPages))
                      .map((x, i) => i + 1)
                      .map((page, index) => {
                        if (viewMoreNum && page < viewMoreNum + 1) {
                          return (
                            <Page
                              key={index}
                              pageNumber={page}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                            >
                              <p className="sub">{`${
                                index + 1
                              }/${numPages}`}</p>
                            </Page>
                          );
                        }
                      })}
                  </Document>
                  <div className="view-more" onClick={() => handleViewMore()}>
                    {`Xem thêm ${viewMoreNum}/${numPages}`}
                  </div>
                  <CommentEditor docId={docId} />
                </div>
              )}
              <div className="interest-doc">
                <div
                  className="ask-ai dflex-between"
                  onClick={() => setIsOpenChatBot(true)}
                >
                  <div>
                    Hỏi đáp với AI{" "}
                    <img
                      style={{
                        width: "25px",
                        height: "25px",
                        verticalAlign: "middle",
                      }}
                      src="/svg/chatbot.svg"
                      alt=""
                    />
                  </div>
                  <img
                    style={{
                      verticalAlign: "middle",
                      marginLeft: "80px",
                    }}
                    src="/svg/tooltip.svg"
                    alt=""
                  />
                </div>
                <div className="header">Có thể bạn quan tâm</div>
                {relatedDocs ? (
                  relatedDocs.map((relatedDoc, index) => {
                    return (
                      <div
                        className="item"
                        key={index}
                        onClick={() => onClickRelatedDoc(relatedDoc._id)}
                      >
                        <div className="item-details">
                          <div className="item-title">{relatedDoc.name}</div>
                          <div className="dflex">
                            <div className="mr">
                              <div className="item-date">
                                <MdOutlineDateRange className="iconx2 mr" />
                                {formatDate(relatedDoc.createdAt)}
                              </div>
                              <div className="item-views">
                                <IoEyeOutline className="iconx2 mr" />
                                {relatedDoc.views}
                              </div>
                            </div>
                            <div>
                              <div className="item-author">
                                <FaRegUser className="iconx2 mr" />
                                {relatedDoc.nameUser}
                              </div>
                              <div className="item-likes">
                                <MdDownload className="iconx2 mr" />{" "}
                                {relatedDoc.downloads}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <LoadAnimation />
                )}
              </div>
              {isPopup && (
                <div className="payment-confirm">
                  <div className="payment-or-no">
                    <h3>{` Bạn cần trả ${currentDoc.price}đ để tiếp tục xem và download`}</h3>
                    <div className="dflex-between">
                      <button
                        style={{ backgroundColor: "#D9D9D9", color: "#858585" }}
                        onClick={() => setIsPopup(false)}
                      >
                        Không
                      </button>
                      <button
                        style={{ backgroundColor: "#FA8C00" }}
                        onClick={() => handlePaidDocument()}
                      >
                        Mua
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {popupCollection && (
                <div className="collection">
                  <div className="collection-content">
                    <IoIosCloseCircle
                      style={{
                        color: "white",
                        float: "right",
                        fontSize: "38px",
                        cursor: "pointer",
                      }}
                      onClick={() => setPopupCollection(false)}
                    />
                    <button
                      className={`${
                        addCollection ? "active" : ""
                      } btn-collecton`}
                      type=""
                      onClick={() => setAddCollection(true)}
                    >
                      Danh sách
                    </button>
                    <button
                      className={`${
                        !addCollection ? "active" : ""
                      } btn-collecton`}
                      type=""
                      onClick={() => setAddCollection(false)}
                    >
                      Tạo bộ sưu tập
                    </button>

                    {addCollection ? (
                      <>
                        {collection.map((c, i) => {
                          return (
                            <div className="item" key={i}>
                              <p className="">{c.name}</p>

                              {c.documents.includes(currentDoc._id) ? (
                                <img src="/gif/icons8-checkmark.gif" alt="" />
                              ) : (
                                <button
                                  onClick={() => handleAddCollection(c._id)}
                                >
                                  add
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="add-collection">
                        <input
                          type="text"
                          name=""
                          value={nameCollection}
                          placeholder="Nhập tên bộ sưu tập"
                          onChange={(e) => setNameCollection(e.target.value)}
                        />
                        <textarea
                          name=""
                          placeholder="Nhập mô tả"
                          id=""
                          cols="30"
                          rows="5"
                          value={descCollection}
                          onChange={(e) => setDescCollection(e.target.value)}
                        ></textarea>
                        <button
                          className="btn-add-bst"
                          onClick={() => handleCreateCollection()}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Container>
            <Footer />
          </>
        )
      ) : (
        <Chatbot setIsOpenChatBot={setIsOpenChatBot} currentDoc={currentDoc} />
      )}
    </>
  );
};

export default DocDetail;
const Container = styled.div`
  margin-top: 60px;
  width: 90%;
  display: flex;
  margin: 60px auto;
`;
