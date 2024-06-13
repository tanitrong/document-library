import { useEffect, useState } from "react";
import ActionManage from "../../components/admin/ActionManage";
import Header from "../../components/admin/Header";
import Sesion from "../../components/admin/Sesion";
import { Document, Page } from "react-pdf";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCalendarDate, CiUser } from "react-icons/ci";
import { pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import axios from "axios";
import { server } from "../../server";
import { formatDate } from "../../utils/formatDate";
import axiosInstance from "../../api/axios";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const AdminViewDoc = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const [currentDoc, setCurrentDoc] = useState(undefined);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [firstImage, setFirstImage] = useState(null);
  console.log("firstImage", firstImage);
  useEffect(() => {
    const getDocCurrent = async () => {
      const { data } = await axios.get(`${server}/doc/get-doc/${docId}`);
      setCurrentDoc(data.doc);
    };
    getDocCurrent();
  }, [docId]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  setTimeout(() => {
    const parent = document.getElementsByClassName("react-pdf__Page")[0];
    const canvas = parent.getElementsByClassName("react-pdf__Page__canvas")[0];

    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    setFirstImage(image);
  }, 4000);
  const handleApproveDoc = async () => {
    try {
      await axiosInstance.put(`${server}/doc/approve-docs/${docId}`, {
        firstImage,
      });

      toast.success("duyet thanh cong");
      navigate("/admin/manage-docs");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const handleDenyDoc = () => {};

  return (
    <>
      <div className="manage-page">
        <ActionManage />
        <div className="p2">
          <Header />
          <Sesion />
          <div
            style={{
              width: "130px",
              color: "white",
              boxSizing: "border-box",
              margin: "40px",
              padding: "2px 4px",
              backgroundColor: "#666E80",
            }}
          >
            thông tin tài liệu
          </div>

          {currentDoc && (
            <Container>
              {!currentDoc.pdfUrl ? (
                <p>loading........</p>
              ) : (
                <div style={{ marginLeft: "30px", width: "880px" }}>
                  <h2 style={{ color: "#0A694E" }}>{currentDoc.name}</h2>
                  <Document
                    file="https://firebasestorage.googleapis.com/v0/b/datn-d711e.appspot.com/o/pdfs%2F1716554969862Gi%C3%A1o%20tr%C3%ACnh%20m%C3%B4n%20K%C4%A9%20thu%E1%BA%ADt%20vi%20x%E1%BB%AD%20l%C3%AD.pdf?alt=media&token=c057b98a-3526-42fe-b437-611994789c11"
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    {Array.apply(null, Array(numPages))
                      .map((x, i) => i + 1)
                      .map((page, index) => {
                        return (
                          <Page
                            key={index}
                            className="blockchain"
                            pageNumber={page}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          >
                            <p className="sub">{`${index + 1}/${numPages}`}</p>
                          </Page>
                        );
                      })}
                  </Document>
                </div>
              )}
              <div className="doc-explorer">
                {currentDoc ? (
                  <img
                    style={{
                      width: "200px",
                      objectFit: "cover",
                    }}
                    src={firstImage}
                    alt=""
                  />
                ) : (
                  "loading..."
                )}
                <div>
                  <MdOutlinePendingActions
                    style={{
                      fontSize: "20px",
                      verticalAlign: "middle",
                      marginRight: "20px",
                    }}
                  />
                  pending
                </div>
                <div>
                  <CiCalendarDate
                    style={{
                      fontSize: "20px",
                      verticalAlign: "middle",
                      marginRight: "20px",
                    }}
                  />
                  {formatDate(currentDoc.createdAt)}
                </div>
                <div className="dflex-between">
                  <div>
                    <CiUser
                      style={{
                        fontSize: "20px",
                        verticalAlign: "middle",
                        marginRight: "20px",
                      }}
                    />
                    {currentDoc.nameUser}
                  </div>
                  <span style={{ color: "#FF9900", fontWeight: 600 }}>
                    {currentDoc.price}
                  </span>
                </div>
                <div>
                  <button
                    style={{
                      color: "white",
                      padding: "10px 20px",
                      backgroundColor: "gray",
                      cursor: "pointer",
                      border: "none",
                      marginRight: "40px",
                      borderRadius: "5px",
                    }}
                    onClick={() => handleDenyDoc()}
                  >
                    từ chối
                  </button>
                  <button
                    style={{
                      color: "white",
                      padding: "10px 20px",
                      backgroundColor: "#12AB7F",
                      border: "none",
                      borderRadius: "5px",

                      cursor: "pointer",
                    }}
                    onClick={() => handleApproveDoc()}
                  >
                    Duyệt
                  </button>
                </div>
              </div>
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminViewDoc;
const Container = styled.div`
  display: flex;
  width: 100%;
  .view-more {
    width: 100px;
    color: #ccc;
    margin: auto;
    margin-bottom: 10px;
    text-align: center;

    padding: 5px;
    background-color: red;
  }
  .react-pdf__Document {
    box-sizing: border-box;
    height: 1200px;
    overflow: scroll;
    border-top: 16px solid #12ab7f;
    width: 834px;
    position: relative;
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #12ab7f;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #12ab7f;
    }
    .sub {
      position: absolute;
      top: -20px;
      right: 10px;
      color: white;
      font-weight: bold;
      background-color: #12ab7f;
      display: flex;
      padding: 0 5px;
      justify-content: end;
      margin-right: 20px;
      margin-top: 30px;
    }
    .react-pdf__Page__canvas {
      // margin-top: -16px;
      width: 784px !important;
      height: 1110px !important;
      border: 20px solid #12ab7f;
      object-fit: contain;
      border-top: none;
    }
  }
  .doc-explorer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    height: 470px;
    box-sizing: border-box;
    margin-top: 100px;
    width: 240px;
    background-color: white;
    box-shadow: -4px -4px 4px rgba(255, 255, 255, 0.1),
      4px 4px 4px rgba(0, 0, 0, 0.1);
  }
`;
