import { useEffect, useState } from "react";
import "../styles/RecentDoc.scss";
import axios from "axios";
import { server } from "../server";
// eslint-disable-next-line react/prop-types
const RecentDoc = () => {
  const [documentsCntt, setDocumentCntt] = useState([]);
  const [documentsLvbc, setDocumentLvbc] = useState([]);
  const [documentsKtct, setDocumentKtct] = useState([]);
  const formatDate = (dateTo) => {
    const date = new Date(dateTo);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;

    return formattedDate;
  };
  useEffect(() => {
    const getTopViewedDocuments = async () => {
      axios.get(`${server}/doc/lvbc`).then((res) => {
        setDocumentLvbc(res.data.docs);
      });
      axios.get(`${server}/doc/cntt`).then((res) => {
        setDocumentCntt(res.data.docs);
      });
      axios.get(`${server}/doc/kt`).then((res) => {
        setDocumentKtct(res.data.docs);
      });
    };
    getTopViewedDocuments();
  }, []);
  return (
    <>
      <div className="container">
        <div className="lvbc">LUẬN VĂN BÁO CÁO</div>
        <div className="doc-item-rencent">
          {documentsCntt.map((doc, i) => {
            return (
              <div className="item" key={i}>
                <div className="filename">{doc.name}</div>
                <div className="container-item">
                  <div className="date info">
                    <img src="/svg/Date.svg" alt="" />
                    {formatDate(doc.createdAt)}
                  </div>
                  <div className="views info">
                    <img src="/svg/view.svg" alt="" />
                    {doc.views}
                  </div>
                  <div className="user info">
                    <img src="/svg/user.svg" alt="" />
                    {doc.nameUser}
                  </div>
                  <div className="download info">
                    <img src="/svg/download.svg" alt="" />
                    {doc.downloads}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="underline"></div>
      <div className="container">
        <div className="cntt">CNTT</div>
        <div className="doc-item-rencent">
          {documentsLvbc.map((doc, i) => {
            return (
              <div className="item" key={i}>
                <div className="filename">{doc.name}</div>
                <div className="container-item">
                  <div className="date info">
                    <img src="/svg/Date.svg" alt="" />
                    {formatDate(doc.createdAt)}
                  </div>
                  <div className="views info">
                    <img src="/svg/view.svg" alt="" />
                    {doc.views}
                  </div>
                  <div className="user info">
                    <img src="/svg/user.svg" alt="" />
                    {doc.nameUser}
                  </div>
                  <div className="download info">
                    <img src="/svg/download.svg" alt="" />
                    {doc.downloads}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="underline"></div>
      <div className="container">
        <div className="ktct">KINH TẾ CHÍNH TRỊ</div>
        <div className="doc-item-rencent">
          {documentsKtct.map((doc, i) => {
            return (
              <div className="item" key={i}>
                <div className="filename">{doc.name}</div>
                <div className="container-item">
                  <div className="date info">
                    <img src="/svg/Date.svg" alt="" />
                    {formatDate(doc.createdAt)}
                  </div>
                  <div className="views info">
                    <img src="/svg/view.svg" alt="" />
                    {doc.views}
                  </div>
                  <div className="user info">
                    <img src="/svg/user.svg" alt="" />
                    {doc.nameUser}
                  </div>
                  <div className="download info">
                    <img src="/svg/download.svg" alt="" />
                    {doc.downloads}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RecentDoc;
