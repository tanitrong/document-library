import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LuArrowDownUp } from "react-icons/lu";
import "../styles/SeachDocs.scss";
const SearchDocs = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("lastest");
  const [priceType, setPriceType] = useState("all");
  console.log("log", { category, priceType, sortBy });
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  console.log("filteredDocuments", filteredDocuments);
  const handleSetCategory = (event) => {
    const selectedCategory = event.target.getAttribute("value");
    setCategory(selectedCategory);
  };
  const handleSetPrice = (event) => {
    const selectedPrice = event.target.getAttribute("value");
    setPriceType(selectedPrice);
  };
  const handleSetPriority = (event) => {
    const selectedPriority = event.target.getAttribute("value");
    setSortBy(selectedPriority);
  };

  //fetch documents with keyword
  useEffect(() => {
    const getDocInCategory = async () => {
      await axios.get(`${server}/doc/search?q=${keyword}`).then((res) => {
        setDocuments(res.data);
      });
    };
    getDocInCategory();
  }, [keyword]);
  useEffect(() => {
    const filterDocuments = () => {
      let filtered = documents;

      // Filter by priceType
      if (priceType === "free") {
        filtered = filtered.filter((doc) => doc.price === 0);
      } else if (priceType === "paid") {
        filtered = filtered.filter((doc) => doc.price > 0);
      }
      // Filter by category
      if (category !== "all") {
        filtered = filtered.filter((doc) => doc.category === category);
      }

      // Sort by views or latest
      if (sortBy === "views") {
        filtered = filtered.sort((a, b) => b.views - a.views);
      } else if (sortBy === "latest") {
        filtered = filtered.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }

      setFilteredDocuments(filtered);
    };

    filterDocuments();
  }, [documents, category, priceType, sortBy]);

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

  const handleViewDetail = async (docId) => {
    navigate(`/document/${docId}`);
  };

  return (
    <>
      <Header />
      <div className="doc-searched">
        <p className="result-keyword">
          Ket qua voi tim kiem
          <span style={{ color: "#ff9900" }}> &quot;{keyword}&quot;</span>
        </p>
        <div className="filter__doc">
          <div className="item">
            Danh muc:{" "}
            <span
              style={{
                color: "#12ab7f",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              {category}
            </span>
            <LuArrowDownUp style={{ float: "right", color: "#12ab7f" }} />
            <ul className="drop__down-category">
              <li value="all" onClick={handleSetCategory}>
                Tất cả
              </li>
              <li value="lvbc" onClick={handleSetCategory}>
                Luận văn, báo cáo
              </li>
              <li value="kd" onClick={handleSetCategory}>
                Kinh doanh maketting
              </li>
              <li value="tcnh" onClick={handleSetCategory}>
                Tài chính, ngân hàng
              </li>
              <li value="kt" onClick={handleSetCategory}>
                Kinh tế
              </li>
              <li value="cntt" onClick={handleSetCategory}>
                Công nghệ thông tin
              </li>
              <li value="khxh" onClick={handleSetCategory}>
                Khoa học xã hội
              </li>
              <li value="ktcn" onClick={handleSetCategory}>
                Kĩ thuật công nghệ
              </li>
              <li value="others" onClick={handleSetCategory}>
                Thể loại khác
              </li>
            </ul>
          </div>
          <div className="item">
            Sap xep:{" "}
            <span
              style={{
                color: "#12ab7f",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              {sortBy}
            </span>
            <LuArrowDownUp style={{ float: "right", color: "#12ab7f" }} />
            <ul className="drop__down-price">
              <li value="latest" onClick={handleSetPriority}>
                Moi dang
              </li>
              <li value="views" onClick={handleSetPriority}>
                Xem nhieu
              </li>
            </ul>
          </div>
          <div className="item">
            Giá cả:{" "}
            <span
              style={{
                color: "#12ab7f",
                fontWeight: "600",
                marginRight: "20px",
              }}
            >
              {priceType}
            </span>
            <LuArrowDownUp style={{ float: "right", color: "#12ab7f" }} />
            <ul className="drop__down-priority">
              <li value="all" onClick={handleSetPrice}>
                Tat ca
              </li>
              <li value="free" onClick={handleSetPrice}>
                mien phi
              </li>
              <li value="paid" onClick={handleSetPrice}>
                Tra phi
              </li>
            </ul>
          </div>
        </div>
        <div className="dflex">
          <div className="display-docs">
            {filteredDocuments ? (
              filteredDocuments.map((doc, index) => {
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() => handleViewDetail(doc._id)}
                  >
                    <img src={doc.thumbnail} alt="" />
                    <div className="info-doc">
                      <h3 style={{ margin: 0, color: "black" }}>{doc.name}</h3>
                      <p style={{ color: "black" }}>{doc.description}</p>
                      <div className="dflex">
                        <p style={{ marginRight: 10 }}>
                          Ngay tai len: {formatDate(doc.createdAt)}
                        </p>
                        <p>Luot xem: {doc.views}</p>
                      </div>
                      <div className="dflex">
                        <p style={{ marginRight: 10 }}>
                          luot tai ve: {doc.downloads}
                        </p>
                        <p>nguoi tai: {doc.nameUser}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>không có tài liệu nào phù hợp</p>
            )}
          </div>
          <div className="keyword-related">
            <h4 style={{ margin: "10px 0" }}>Tu khoa lien quan</h4>
            <button className="item"> cong nghe thong tin</button>
            <button className="item"> block chain</button>
            <button className="item"> lap trinh iot</button>
            <button className="item"> cong nghe thong tin</button>
            <button className="item"> block chain</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchDocs;
