import { useState } from "react";
import "../styles/Header.scss";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaSearch,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import axios from "axios";
import { server } from "../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMenuAction from "../zustand/useMenuAction";
import useMenuCategory from "../zustand/useCategory";
// eslint-disable-next-line react/prop-types
const Header = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const { setMenuActive } = useMenuAction();
  const [searchText, setSearchText] = useState("");
  const { setMenuCategory } = useMenuCategory();
  const [menuActived, setMenuActived] = useState(false);

  const handleSearch = () => {
    navigate(`/search/${searchText}`);
  };

  const handleMiniPhotoClick = () => {
    setMenuActived(!menuActived);
  };
  const handleLogout = async () => {
    axios.get(`${server}/user/logout`, { withCredentials: true });
  };

  return (
    <header>
      {/* <img src={currentUser.avatar} alt="" /> */}
      <div className="top">
        <a href="">
          <FaPhoneAlt />
          <small> +84 824318812</small>
        </a>
        <div className="contact">
          <a href="">
            <FaFacebookF />
          </a>
          <a href="">
            <FaInstagram />
          </a>
          <a href="">
            <FaLinkedinIn />
          </a>
          <a href="">
            <FaTwitter />
          </a>
        </div>
      </div>
      <div className="middle">
        <Link to="/">
          {" "}
          <img
            style={{ objectFit: "contain", width: 80 }}
            className="logo"
            src="/png/DTdoc.png"
            alt=""
          />
        </Link>
        <div className="category">
          <CiMenuFries className="iconx2" style={{ color: " #12ab7f" }} />
          <ul className="drop-down">
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "black",
                  color: "black",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("lvbc")}
                to="/lvbc"
                style={{ textDecoration: "none", color: "black" }}
              >
                Luận văn, báo cáo
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#0c5776",
                  color: "#0c5776",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("kdmt")}
                to="/kdmt"
                style={{ textDecoration: "none", color: "black" }}
              >
                Kinh doanh maketting
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#de741c",
                  color: "#de741c",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("tcng")}
                to="/tcnh"
                style={{ textDecoration: "none", color: "black" }}
              >
                Tài chính, ngân hàng
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#b85b56",
                  color: "#b85b56",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("kt")}
                to="/kt"
                style={{ textDecoration: "none", color: "black" }}
              >
                Kinh tế
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#593e67",
                  color: "#593e67",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("cntt")}
                to="/cntt"
                style={{ textDecoration: "none", color: "black" }}
              >
                Công nghệ thông tin
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#84495f",
                  color: "#84495f",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("khxh")}
                to="/khxh"
                style={{ textDecoration: "none", color: "black" }}
              >
                Khoa học xã hội
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#2d99ae",
                  color: "#2d99ae",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("ktcn")}
                to="/ktcn"
                style={{ textDecoration: "none", color: "black" }}
              >
                Kĩ thuật công nghệ
              </Link>
            </li>
            <li>
              <span
                className="block-dropdown"
                style={{
                  backgroundColor: "#001c44",
                  color: "#001c44",
                }}
              >
                .
              </span>
              <Link
                onClick={() => setMenuCategory("others")}
                to="/others"
                style={{ textDecoration: "none", color: "black" }}
              >
                Thể loại khác
              </Link>
            </li>
          </ul>
        </div>
        <div className="search-docs">
          <input
            type="text"
            placeholder="Tim kiem tai lieu..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <FaSearch
            className="ab"
            style={{ color: "#888888", cursor: "pointer" }}
            onClick={() => handleSearch()}
          />
        </div>
        <Link to="/upgrade" className="upgrade dflex">
          <h3 className="mr">UPGRAGE</h3>
          <img src="/svg/upgrade.svg" alt="" className="iconx2" />
        </Link>
        <button className="upload">
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              alignSelf: "center",
            }}
            to="/upload-file"
          >
            <FaCloudUploadAlt className="mr iconx2" />
            UPLOAD
          </Link>
        </button>

        {currentUser && (
          <p style={{ textTransform: "uppercase", color: "#12AB7F" }}>
            <span style={{ color: "#FF9900" }}>HI,</span> {currentUser?.name}
          </p>
        )}
        {currentUser ? (
          <div className="user-menu-wrap">
            <a
              className="mini-photo-wrapper"
              href="#"
              onClick={() => handleMiniPhotoClick()}
            >
              <img
                style={{ width: "40px", height: "40px", borderRadius: "50px" }}
                src={currentUser?.avatar}
                alt=""
              />
            </a>
            <div className={`menu-container ${menuActived ? "active" : ""}`}>
              <ul className="user-menu">
                <li
                  className="user-menu__item"
                  onClick={() => setMenuActive("user")}
                >
                  <Link to="/profile" className="user-menu-link">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/trophy.png"
                      alt="trophy_icon"
                      width={20}
                      height={20}
                    />
                    <div>Thông tin cá nhân</div>
                  </Link>
                </li>
                <li
                  className="user-menu__item"
                  onClick={() => setMenuActive("finance")}
                >
                  <Link className="user-menu-link" to="/finance">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/team.png"
                      alt="team_icon"
                      width={20}
                      height={20}
                    />
                    <div>Quản lý tài chính</div>
                  </Link>
                </li>
                <li
                  className="user-menu__item"
                  onClick={() => setMenuActive("document")}
                >
                  <Link to="/manage-docs" className="user-menu-link" href="#">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/book.png"
                      alt="team_icon"
                      width={20}
                      height={20}
                    />
                    <div>Quản lý tài liệu</div>
                  </Link>
                </li>
                <li className="user-menu__item">
                  <Link
                    className="user-menu-link"
                    to="/login"
                    style={{ color: "#F44336" }}
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </Link>
                </li>
                <li className="user-menu__item">
                  <a className="user-menu-link" href="#">
                    Cài đặt
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="btn-signup"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
            <button
              className="btn-signin"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              Đăng ký
            </button>
          </div>
        )}
      </div>
      <hr style={{ width: "100%", textAlign: "left", marginLeft: 0 }} />
      <ul className="bottom">
        <li>
          <Link to="/">TRANG CHU</Link>
        </li>
        <li>
          <Link to="/about-us">VE CHUNG TOI</Link>
        </li>
        <li>
          <Link to="/documents">TAT CA TAI LIEU</Link>
        </li>
        <li>
          <Link to="">LIEN HE</Link>
        </li>
        <li>
          <Link to="/upgrade">NANG CAP</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
