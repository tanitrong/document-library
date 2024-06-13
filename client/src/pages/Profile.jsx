import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/Profile.scss";
import ActionManage from "../components/profile/ActionManage";
import SessionAnalytic from "../components/profile/SessionAnalytic";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";
const Profile = () => {
  const [textManager, setTextManager] = useState("account");
  const authUser = useSelector((state) => state.user.user);
  const [formDataUser, setFormDataUser] = useState({
    name: authUser?.name,
    gender: authUser?.gender,
    dateOfBirth: authUser?.dateOfBirth,
    address: authUser?.address,
    career: authUser?.career,
    email: authUser?.email,
    phone: authUser?.phoneNumerber,
  });
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [infoPlan, setInfoPlan] = useState(null);
  let monthPlan;
  if (infoPlan?.plan === "basic") monthPlan = 1;
  if (infoPlan?.plan === "saving") monthPlan = 3;
  if (infoPlan?.plan === "value") monthPlan = 6;
  if (infoPlan?.plan === "premium") monthPlan = 12;

  const currentDate = new Date();
  const dateFromMongo = new Date(infoPlan?.planExpirationDate);
  const differenceInMilliseconds = dateFromMongo - currentDate;
  const remainingDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  console.log("Ngày của tháng hiện tại là:", remainingDays);
  //handle update user
  const handleUpdateUser = async () => {
    await axios.put(`${server}/user/update-profile`, {
      userId: authUser._id,
      newProfileData: formDataUser,
    });
    toast.success("Cập nhật thành công");
  };

  //handle change password
  const handleChangePassword = async () => {
    await axios
      .put(`${server}/user/change-password`, {
        userId: authUser._id,
        oldPassword,
        newPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  //get info plan
  useEffect(() => {
    (async () => {
      await axios
        .get(`${server}/user/get-info-plan/${authUser?._id}`)
        .then((res) => {
          setInfoPlan(res.data.infoPlan);
        });
    })();
  }, [authUser]);

  return (
    <>
      <Header />
      <div className=" group-profile">
        <ActionManage avatar={authUser?.avatar} />
        <div className="form-user">
          <SessionAnalytic />
          <div className="container-profile">
            <div className="form-group">
              <input
                type="button"
                value="Tài Khoản"
                style={{
                  backgroundColor: textManager === "account" ? "#00b7fe" : "",
                  color: textManager === "account" ? "white" : "",
                }}
                onClick={() => setTextManager("account")}
              />
              <input
                type="button"
                value="Bảo Mật"
                onClick={() => setTextManager("security")}
              />
              <input
                type="button"
                value="Tài Liệu"
                onClick={() => setTextManager("docs")}
              />
            </div>

            {textManager === "account" && (
              <>
                <div className="form-group">
                  <span className="info-label">Thông tin chung</span>
                </div>

                <div className="form-group">
                  <label htmlFor="fullname">Full Name:</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formDataUser?.name}
                    onChange={(e) =>
                      setFormDataUser({ ...formDataUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth:</label>

                  <input
                    type="date"
                    id="dob-day"
                    name="dob-day"
                    value={formDataUser?.dateOfBirth}
                    onChange={(e) =>
                      setFormDataUser({
                        ...formDataUser,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <div className="gender">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formDataUser?.gender === "male"}
                      onChange={(e) =>
                        setFormDataUser({
                          ...formDataUser,
                          gender: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="male">Male</label>
                  </div>
                  <div className="gender">
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      name="gender"
                      checked={formDataUser?.gender === "female"}
                      onChange={(e) =>
                        setFormDataUser({
                          ...formDataUser,
                          gender: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <select
                    id="address"
                    name="address"
                    value={formDataUser?.address}
                    onChange={(e) =>
                      setFormDataUser({
                        ...formDataUser,
                        address: e.target.value,
                      })
                    }
                  >
                    <option>Địa chỉ</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">Hồ Chí Minh</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="job">Ngành nghề:</label>
                  <select
                    id="job"
                    name="job"
                    value={formDataUser?.career}
                    onChange={(e) =>
                      setFormDataUser({
                        ...formDataUser,
                        career: e.target.value,
                      })
                    }
                  >
                    <option>Ngành nghề</option>
                    <option value="frontend">Front End</option>
                    <option value="backend">Back End</option>
                    <option value="other">Maketting</option>
                    <option value="other">Du lich</option>
                    <option value="other">Ngoai ngu</option>
                    <option value="other">Khac</option>
                  </select>
                </div>
                <div className="form-group">
                  <span className="info-label">Thông tin liên hệ</span>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formDataUser?.email}
                    onChange={(e) =>
                      setFormDataUser({
                        ...formDataUser,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formDataUser?.phone}
                    onChange={(e) =>
                      setFormDataUser({
                        ...formDataUser,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  className="btn-update"
                  onClick={() => handleUpdateUser()}
                >
                  {" "}
                  Cập Nhật{" "}
                </button>
              </>
            )}
            {textManager === "security" && (
              <>
                <div className="form-group">
                  <span className="info-label">Thay Đổi Mật Khẩu </span>
                </div>

                <div className="password-input">
                  <p
                    style={{
                      marginTop: "10px",
                      color: "#5E5E5E",
                      fontWeight: "400",
                    }}
                  >
                    Mật khẩu hiện tại
                  </p>
                  <input
                    className="input-password"
                    type="password"
                    id="old-pasword"
                    name="old-pasword"
                    placeholder="**********"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="dflex">
                  <div className="password-input">
                    <p
                      style={{
                        marginTop: "10px",
                        color: "#5E5E5E",
                        fontWeight: "400",
                      }}
                    >
                      Mật khẩu mới
                    </p>
                    <input
                      className="input-password"
                      type="password"
                      id="new-password"
                      name="new-password"
                      placeholder="**********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="password-input">
                    <p
                      style={{
                        marginTop: "10px",
                        color: "#5E5E5E",
                        fontWeight: "400",
                      }}
                    >
                      Xác nhận mật khẩu mới
                    </p>
                    <input
                      className="input-password"
                      type="password"
                      id="accept-new-password"
                      name="accept-new-password"
                      placeholder="**********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="password-note">
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "20px",
                      margin: "0 0 10px 0",
                    }}
                  >
                    Yêu cầu mật khẩu{" "}
                  </p>
                  <div className="dflex-between">
                    <li style={{ fontWeight: 400 }}>Tối thiểu 8 kí tự </li>
                    <li style={{ fontWeight: 400 }}>
                      Ít nhất 1 số và 1 kí tự{" "}
                    </li>
                  </div>
                  <li style={{ marginTop: "10px", fontWeight: 400 }}>
                    Ít nhất 1 chữ viết hoa{" "}
                  </li>
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    className="btn-security mr"
                    onClick={() => handleChangePassword()}
                  >
                    {" "}
                    Lưu thay đổi{" "}
                  </button>
                  <button className="btn-cancel"> Hủy </button>
                </div>
              </>
            )}
            {textManager === "docs" && (
              <>
                <div className="info-plan">
                  <div className="infor-docs">
                    <h3>Thông tin gói tải tài liệu:</h3>
                    <p>
                      Gói tải tài liệu hiện tại của bạn: Gói {monthPlan} tháng
                    </p>
                    <p>Ngày kích hoạt: {formatDate(infoPlan?.planStartDate)}</p>
                    <p>
                      Ngày hết hạn: {formatDate(infoPlan?.planExpirationDate)}
                    </p>
                    <p>Giá gói: 30 000đ</p>
                  </div>

                  <div className="remaining">
                    <div className="warning-plan">
                      <h3
                        style={{
                          margin: 0,
                        }}
                      >
                        Chúng tôi cần sự chú ý của bạn!
                      </h3>
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
                        Kế hoạch của bạn cần được cập nhật.
                      </p>
                    </div>
                    <div className="remaining-days">
                      <div className="dflex-between">
                        <p style={{ margin: 0 }}>Days</p>
                        <p style={{ margin: 0 }}>
                          {remainingDays} of {monthPlan * 30} Days
                        </p>
                      </div>
                      <progress
                        className="process-plan"
                        value={remainingDays}
                        max={monthPlan * 30}
                      />
                      <p style={{ margin: 0, fontWeight: 400 }}>
                        Gói của bạn hiện tại còn {remainingDays} ngày để kết
                        thúc
                      </p>
                    </div>
                  </div>
                </div>
                <div className="action-plan">
                  <button className="upgrade-plan"> Nang cap goi </button>
                  <button className="cancel-plan"> Hủy goi hien tai </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
