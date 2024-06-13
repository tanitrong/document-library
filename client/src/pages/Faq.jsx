import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Faq.scss";
const Faq = () => {
  return (
    <>
      <Header />
      <div className="faq-head">
        <p>FAQs</p>
        <h1>Chung toi o day de giup ban</h1>
        <p>Ban co cau hoi gi khong?Bat cu dieu gi ban muon biet?</p>
        <button className="btn-getstated"> Get stated </button>
      </div>
      <div className="faq-under-head">
        <h1>Cac cau hoi thuong gap</h1>
        <p>Bat cu dieu gi ban muon biet tu trang web cua chung toi</p>
      </div>
      <div className="faq-main">
        <p>Lam sao de dang ky tro thanh thanh vien cua DT docs</p>
        <div className="underline"></div>
        <p>Lay lai mat khau nhu the nao?</p>
        <div className="underline"></div>
        <p> Lam the nao de nap tien vao tai khoan ?</p>
        <div className="underline"></div>
        <p>Lam the nao de kiem tra tai khoan ca nhan?</p>
        <div className="underline"></div>
        <p>Tai sao toi download tai lieu ve ma khong mo duoc?</p>
        <div className="underline"></div>
        <p>Quy trinh duyet tai lieu tren DT docs?</p>
        <div className="underline"></div>
        {/* FAQ */}
      </div>

      <Footer />
    </>
  );
};
export default Faq;
