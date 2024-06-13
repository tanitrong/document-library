import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import "../styles/EachCategory.scss";
import axios from "axios";
import { server } from "../server";
import { useNavigate, useParams } from "react-router-dom";
import useMenuCategory from "../zustand/useCategory";

function EachCategory() {
  const navigate = useNavigate();
  const { category } = useParams();
  let categoryName;
  if (category == "lvbc") categoryName = "Luận văn báo cáo";
  if (category == "kdmt") categoryName = "Kinh doanh makketing";
  if (category == "tcnh") categoryName = "Tài chính ngân hàng";
  if (category == "kt") categoryName = "Kinh tế";
  if (category == "cntt") categoryName = "Công nghệ thông tin";
  if (category == "khxh") categoryName = "Khoa học xã hội";
  if (category == "ktcn") categoryName = "Kĩ thuật công nghệ";
  if (category == "others") categoryName = "Thể loại khác";
  const [docs, setDocs] = useState([]);
  const { menuCategory, setMenuCategory } = useMenuCategory();
  console.log("menuCategory", menuCategory);

  useEffect(() => {
    (async () => {
      await axios.get(`${server}/doc/${category}`).then((res) => {
        setDocs(res.data.docs);
      });
    })();
  }, [category]);

  const handleSetCategory = (category) => {
    navigate(`/${category}`);
    setMenuCategory(category);
  };

  return (
    <>
      <Header />

      <div className="category-page">
        <div className="categorys">
          <h2>Các danh mục </h2>
          <ul>
            <li
              className={`${menuCategory === "lvbc" ? "active" : ""}`}
              onClick={() => handleSetCategory("lvbc")}
            >
              <span>Luận văn, báo cáo</span>
            </li>
            <li
              className={`${menuCategory === "kdmt" ? "active" : ""}`}
              onClick={() => handleSetCategory("kdmt")}
            >
              <span>Kinh doanh maketting</span>
            </li>
            <li
              className={`${menuCategory === "tcnh" ? "active" : ""}`}
              onClick={() => handleSetCategory("tcnh")}
            >
              <span>Tài chính, ngân hàng</span>
            </li>
            <li
              className={`${menuCategory === "kt" ? "active" : ""}`}
              onClick={() => handleSetCategory("kt")}
            >
              <span>Kinh tế</span>
            </li>
            <li
              className={`${menuCategory === "cntt" ? "active" : ""}`}
              onClick={() => handleSetCategory("cntt")}
            >
              <span>Công nghệ thông tin</span>
            </li>
            <li
              className={`${menuCategory === "khxh" ? "active" : ""}`}
              onClick={() => handleSetCategory("khxh")}
            >
              <span>Khoa học xã hội</span>
            </li>
            <li
              className={`${menuCategory === "ktcn" ? "active" : ""}`}
              onClick={() => handleSetCategory("ktcn")}
            >
              <span>Kĩ thuật công nghệ</span>
            </li>
            <li
              className={`${menuCategory === "others" ? "active" : ""}`}
              onClick={() => handleSetCategory("others")}
            >
              <span>Thể loại khác</span>
            </li>
          </ul>
        </div>
        <div className="content-category">
          <div className="name-category">{categoryName}</div>
          <div className="session-categorys">
            {docs?.map((doc, i) => {
              return (
                <div
                  className="item"
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/document/${doc._id}`)}
                >
                  <div
                    style={{
                      borderRadius: "12px",
                      width: "120px",
                      height: "120px",
                      border: "12px solid #e6ebef",
                    }}
                  >
                    <img src={doc.thumbnail} alt="" />
                  </div>
                  <h3>{doc.name}</h3>
                </div>
              );
            })}
          </div>
          <Pagination />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default EachCategory;
