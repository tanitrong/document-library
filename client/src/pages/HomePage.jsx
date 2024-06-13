import { useEffect, useState } from "react";
import Header from "../components/Header";
import ContainerDoc from "../components/ContainerDoc";
import "../styles/HomePage.scss";
import RecentDoc from "../components/RecentDoc";
import ChatContainer from "../components/ChatContainer";
import Footer from "../components/Footer";
import Store from "../redux/store";
import { loadUser } from "../redux/actions/user";
import axios from "axios";
import { server } from "../server";
const HomePage = () => {
  const [documentsTopViews, setDocumentsTopViews] = useState([]);
  useEffect(() => {
    const getTopViewedDocuments = async () => {
      await axios.get(`${server}/doc/get-all-docs/?status=All`).then((res) => {
        setDocumentsTopViews(res.data.documents);
      });
    };
    getTopViewedDocuments();
  }, []);
  console.log("documentsTopViews", documentsTopViews);
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <div>
      <Header />
      <div className="slider">
        <div className="content">
          <h2>
            Nền Tảng Cung Cấp <br />
            Da Dạng Tài Liệu
          </h2>
          <p>
            Nền tảng thư viện tài liệu trực tuyến này cung cấp một kho <br />
            lưu trữ đa dạng về tài liệu từ nhiều lĩnh vực khác nhau. Người dùng{" "}
            <br />
            có thể truy cập vào đó để tìm kiếm, xem và tải xuống các tài liệu{" "}
            <br />
            như sách, bài báo, bài giảng, và nhiều loại tài liệu khác.
          </p>
        </div>
        <img src="/svg/reading_time.svg" alt="" />
      </div>
      <div className="explore-docs">
        <div className="dflex">
          <hr
            style={{
              width: "30px",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              backgroundColor: "#ED553B",
            }}
          />
          <span className="primary-color">Document</span>
        </div>
        <div className="dflex dflex-between mb-40">
          <h3>Khám phá tài liệu</h3>
          <p>
            Bạn có thể khám phá nhiều loại tài liệu ở nhiều lĩnh vực khác nhau
          </p>
        </div>
        <div className="items-category">
          <div className="item">
            <img src="/svg/education.svg" alt="" />
            <h3>cao đẳng - đại học</h3>
            <p>
              Trong lĩnh vực này, nền tảng tập trung vào cung cấp tài liệu hữu
              ích cho sinh viên và giảng viên ở cấp độ cao đẳng và đại học. Mục
              tiêu là hỗ trợ sinh viên trong quá trình học tập và nghiên cứu,
              đồng thời cung cấp nguồn tài liệu chất lượng cho giảng viên để sử
              dụng trong việc dạy và nghiên cứu.
            </p>
          </div>
          <div className="item">
            <img src="/svg/knowledge.svg" alt="" />

            <h3>Luận văn báo cáo</h3>
            <p>
              Nền tảng cung cấp một bộ sưu tập đa dạng về các luận văn, báo cáo
              nghiên cứu từ các chuyên ngành khác nhau. Các tài liệu này có thể
              là nguồn tham khảo quan trọng cho các sinh viên, học giả và nhà
              nghiên cứu khi họ thực hiện các nghiên cứu của riêng mình.
            </p>
          </div>
          <div className="item">
            <img src="/svg/notebook.svg" alt="" />

            <h3>bài giảng</h3>
            <p>
              Nền tảng tập trung vào việc cung cấp các tài liệu và nguồn thông
              tin liên quan đến việc giảng dạy và học tập. Điều này bao gồm các
              bài giảng PowerPoint, tài liệu tham khảo, video bài giảng và các
              tài liệu hỗ trợ khác.
            </p>
          </div>
        </div>
      </div>
      <div className="weekly-review">
        <div className="separator" style={{ alignItems: "center" }}>
          <hr
            style={{
              width: "26%",
              height: "2px",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              backgroundColor: "#fa8c00",
              border: "none",
            }}
          />
          <h1>Tài Liệu Xem Nhiều Mỗi Tuần</h1>
          <hr
            style={{
              height: "2px",
              width: "26%",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              border: "none",
              backgroundColor: "#fa8c00",
            }}
          />
        </div>
        <ContainerDoc data={documentsTopViews} />
      </div>
      <div className="featured-document">
        <div className="separator" style={{ alignItems: "center" }}>
          <hr
            style={{
              width: "26%",
              height: "2px",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              backgroundColor: "#fa8c00",
              border: "none",
            }}
          />
          <h1>Tài Liệu Nổi Bật</h1>
          <hr
            style={{
              width: "26%",
              height: "2px",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              backgroundColor: "#fa8c00",
              border: "none",
            }}
          />
        </div>
        <ContainerDoc data={documentsTopViews} />
      </div>

      <div className="recent-doc">
        <div className="separator" style={{ alignItems: "center" }}>
          <hr
            style={{
              width: "26%",
              height: "2px",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              backgroundColor: "#fa8c00",
              border: "none",
            }}
          />
          <h1>Tài Liệu Mới Đăng</h1>
          <hr
            style={{
              width: "26%",
              height: "2px",
              textAlign: "left",
              marginLeft: 0,
              marginRight: 10,
              backgroundColor: "#fa8c00",
              border: "none",
            }}
          />
        </div>
        <RecentDoc data={documentsTopViews} />
      </div>
      <ChatContainer />
      <Footer />
    </div>
  );
};

export default HomePage;
