import { useState } from "react";
import Header from "../components/Header";
import "../styles/UploadDoc.scss";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import app from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const UploadFile = () => {
  const user = useSelector((state) => state.user.user);
  const [isUpload, setIsUpload] = useState(false);
  const [isPriceDoc, setIsPriceDoc] = useState(false);
  const [defaultPrice, setDefaultPrice] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfPerc, setPdfPerc] = useState(0);
  //usestate file
  const [nameDoc, setNameDoc] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [category, setCategory] = useState("");
  const [priceDoc, setPriceDoc] = useState(0);
  const [preview, setPreview] = useState(0);
  const [description, setDescription] = useState("");

  //handle info form submission
  console.log("selectedFile", selectedFile);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    document.getElementById("fileInput").value = null;
  };
  const handlePriceDoc = (e) => {
    setPriceDoc(e.target.value);
    if (e.target.value == "Tự đặt giá") {
      setIsPriceDoc(true);
      setDefaultPrice(false);
    } else if (e.target.value == "Miễn phí") {
      setDefaultPrice(false);
      setIsPriceDoc(false);
      setPriceDoc(0);
    } else {
      setDefaultPrice(true);
      setIsPriceDoc(false);
    }
  };
  //validate form upload
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onHandleSubmit = async () => {
    //upload file to firebase storage
    const storage = getStorage(app);
    const fileName = new Date().getTime() + selectedFile?.name;
    const storageRef = ref(storage, "pdfs/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPdfPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("upload is paused");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            //user is not allowed
            console.log(error);
            break;
          case "storage/caceled":
            break;
          case "storage/unknown":
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //fetch api to create a new document
          axios
            .post(`${server}/doc/create-doc`, {
              name: nameDoc,
              category: category,
              description,
              uploadedBy: user._id,
              price: priceDoc,
              preview,
              keyWord,
              pdfUrl: downloadURL,
            })
            .then((res) => {
              if (res.data.success === true) {
                setNameDoc("");
                setCategory("");
                setKeyWord("");
                setPreview(0);
                setPriceDoc(0);
                setDescription("");
                toast.success(res.data.message);
              }
            })
            .catch((err) => {
              toast.error(err.response.data.message);
            });
        });
      }
    );
  };
  return (
    <>
      <Header />
      <section className="container">
        <div className="upload-doc">
          <div className="header-upload">
            Nơi chia sẻ tài liệu của Bạn bằng cách Upload files để mọi người có
            thể xem, tải và kết nối cùng Bạn. Chúng tôi sẽ mang đến cho các bạn
            hơn 10 triệu độc giả, thu nhập, danh tiếng và hơn thế nữa
          </div>
          <div className="content-upload">
            {!isUpload ? (
              <div className="content">
                <h3>Upload files để tận hưởng những ưu đãi khác biệt:</h3>
                <div className="offers">
                  <div className="item">
                    <img src="/svg/readers.svg" alt="" />
                    <p>Tiếp cần hàng ngàn độc giả</p>
                  </div>
                  <div className="item">
                    <img src="/svg/present.svg" alt="" />
                    <p>Cơ hội nhận những quà tặng và khuyến mãi</p>
                  </div>
                  <div className="item">
                    <img src="/svg/increase-profit.svg" alt="" />
                    <p>Gia tăng thu nhập từ tài liệu của bạn</p>
                  </div>
                  <div className="item">
                    <img src="/svg/chart.svg" alt="" />
                    <p>Phân tích và báo cáo chỉ số</p>
                  </div>
                </div>
                <div className="btn-upload">
                  <p>Tải tài liệu lên</p>
                  <button onClick={() => setIsUpload(!isUpload)}>
                    Tai len
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="active-upload"
                onSubmit={handleSubmit(onHandleSubmit)}
              >
                <div className="upload">
                  <div className="drag-upload">
                    <h3>Upload</h3>
                    <section className="section-upload">
                      <img src="/svg/upload.svg" alt="" />
                      <h4>
                        Keo tha file hoac{" "}
                        <input
                          id="fileInput"
                          type="file"
                          {...register("uploadFile", { required: true })}
                          style={{
                            color: "blue",
                            cursor: "pointer",
                          }}
                          onChange={handleFileChange}
                        />
                      </h4>
                      <p className="text-color-primary">
                        Ho tro dinh dang PDF, Word
                      </p>
                    </section>
                    {errors.uploadFile && (
                      <span className="error-info">Trường này là bắt buộc</span>
                    )}
                    <h4
                      style={{ textAlign: "start" }}
                      className="text-color-primary"
                    >
                      Uploaded File
                    </h4>

                    {selectedFile ? (
                      <>
                        <div className="session-loading">
                          <div className="text">
                            <p
                              style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {selectedFile.name.slice(0, 40)}
                              {"... "}
                              <TiDelete
                                className="delete__file-name"
                                onClick={handleRemoveFile}
                              />
                            </p>
                          </div>
                          <div className="loading">
                            <div className="line-box">
                              <div className="line"></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p style={{ textAlign: "start" }}> your-file-here.PDF</p>
                    )}
                    {pdfPerc > 0 ? (
                      <progress
                        value={pdfPerc}
                        max="100"
                        className="progress-bar"
                      ></progress>
                    ) : (
                      ""
                    )}
                    {pdfPerc > 0 ? (
                      <p style={{ margin: "5px" }}>
                        {pdfPerc > 0 &&
                          (pdfPerc === 100 ? "Uploaded " : "uploading... ") +
                            pdfPerc +
                            "%"}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="set-info-doc">
                    <p
                      style={{
                        backgroundColor: "#59EFB2",
                        padding: "5px 20px",
                        color: "white",
                        width: "100%",
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                      }}
                    >
                      Xac nhan thong tin
                    </p>
                    <h4
                      style={{
                        margin: "0",
                        width: "300px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Ten file: {selectedFile?.name}
                    </h4>

                    <div className="container-info">
                      <div action="">
                        <div className="row">
                          <div className="col-25">
                            <label htmlFor="fname">
                              Tieu de <span style={{ color: "red" }}>(*)</span>
                            </label>
                          </div>
                          <div className="col-75">
                            <input
                              type="text"
                              id="fname"
                              {...register("firstname", { required: true })}
                              aria-invalid={errors.firstname ? "true" : "false"}
                              placeholder="enter your title here"
                              value={nameDoc}
                              onChange={(e) => setNameDoc(e.target.value)}
                            />
                            {errors.firstname && (
                              <span className="error-info">
                                Trường này là bắt buộc
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-25">
                            <label htmlFor="lname">
                              {" "}
                              Danh muc <span style={{ color: "red" }}>(*)</span>
                            </label>
                          </div>
                          <div className="col-75">
                            <select
                              id="danhmucs"
                              {...register("category", { required: true })}
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              <option value="">-danh muc-</option>
                              <option value="cntt">Công nghệ thông tin</option>
                              <option value="lvbc">Luận văn báo cáo</option>
                              <option value="mkt">Kinh doanh maketting</option>
                              <option value="kt">Kinh tế</option>
                              <option value="ktcn">Kĩ thuật công nghệ</option>
                              <option value="tcng">Tài chính, ngân hàng</option>
                              <option value="ng">Ngoại ngữ</option>
                              <option value="khxh">Khoa học xã hội</option>
                              <option value="llcc">Lý luận chính trị</option>
                              <option value="others">Khác</option>
                            </select>
                            {errors.category &&
                              errors.category.type === "required" && (
                                <span className="error-info">
                                  Trường này là bắt buộc
                                </span>
                              )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-25">
                            <label htmlFor="fname">
                              tu khoa <span style={{ color: "red" }}>(*)</span>
                            </label>
                          </div>
                          <div className="col-75">
                            <input
                              type="text"
                              id="fname"
                              {...register("keyword", { required: true })}
                              value={keyWord}
                              onChange={(e) => setKeyWord(e.target.value)}
                            />
                            {errors.keyword && (
                              <span className="error-info">
                                Trường này là bắt buộc
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-25">
                            <label htmlFor="country">
                              gia ban <span style={{ color: "red" }}>(*)</span>
                            </label>
                          </div>
                          <div className="col-75">
                            <select
                              id="price"
                              value={priceDoc}
                              onChange={(e) => handlePriceDoc(e)}
                            >
                              <option value="">Miễn phí</option>
                              <option value="2000">2000</option>
                              <option value="6000">6000</option>
                              <option value="10000">10000</option>
                              <option value="15000">15000</option>
                              <option value="20000">20000</option>
                              <option value="setyourself">Tự đặt giá</option>
                            </select>

                            {isPriceDoc || defaultPrice ? (
                              <>
                                {isPriceDoc && (
                                  <>
                                    <input
                                      type="text"
                                      style={{
                                        marginTop: "10px",
                                        width: "60px",
                                      }}
                                      onChange={(e) =>
                                        setPriceDoc(e.target.value)
                                      }
                                    />
                                    <span>đ</span>
                                  </>
                                )}
                                <p style={{ margin: "5px 0 5px 10px" }}>
                                  xem trước:
                                </p>
                                <select
                                  id="preview"
                                  name="preview"
                                  value={preview}
                                  onChange={(e) => setPreview(e.target.value)}
                                >
                                  <option>Số trang xem trước</option>
                                  <option>3</option>
                                  <option>6</option>
                                  <option>9</option>
                                  <option>12</option>
                                </select>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-25">
                            <label htmlFor="subject">
                              {" "}
                              Mo ta <span style={{ color: "red" }}>(*)</span>
                            </label>
                          </div>
                          <div className="col-75">
                            <textarea
                              {...register("describe", { required: true })}
                              value={description}
                              placeholder="Write something.."
                              style={{ height: "120px" }}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                            {errors.describe && (
                              <span className="error-info">
                                Trường này là bắt buộc
                              </span>
                            )}
                          </div>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-upload-doc">
                  Upload file
                </button>
              </form>
            )}
            <div className="upload-guide">
              <img className="vertical-align" src="/svg/guide.svg" alt="" />{" "}
              <span className="header-guide">huong dan upload</span>
              <ul>
                <li>Hỗ trợ định dạng tài liệu: word, PDF.</li>
                <li>Để tránh lỗi font vui lòng chuyển sang font unicode.</li>
                <li>Dung lượng tối đa cho phép mỗi tài liệu là 20MB.</li>
              </ul>
              <img className="vertical-align" src="/svg/guide.svg" alt="" />{" "}
              <span className="header-guide">Quy định upload</span>
              <ul>
                <li>
                  Lưu ý: không upload tài liệu có bản quyền mà không có sự đồng
                  ý của tác giả.
                </li>
                <li>Không upload tài liệu có nội dung phản động.</li>
                <li>Không upload tài liệu vi phạm tuần phong mĩ tục.</li>
                <li>
                  Không upload tài liệu vi tuyệt mật liên quan đến quốc gia.
                </li>
                <li>
                  Vui lòng tham khảo chi tiết{" "}
                  <a href="#" style={{ textDecoration: "none", color: "blue" }}>
                    quy định upload tài liệu{" "}
                  </a>
                  của chúng tôi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UploadFile;
